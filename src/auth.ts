import { Config } from './types';
import axios from 'axios';
import BASE64 from 'base-64';
import { BizHecomError, NetHecomError } from './error';

export class AuthService {
    private authConfig: Config;
    private accessToken?: string;
    private refreshToken: string | null = null;
    private expiresIn: number = 0;
    private endPoint?: string;

    constructor(config: Config) {
        this.verifyConfig(config);
        this.authConfig = config;
    }

    private verifyConfig(config: Config) {
        if (!config) {
            throw new Error('配置不能为空');
        }
        if (!config.clientId || !config.clientSecret) {
            throw new Error('clientId和clientSecret不能为空');
        }
        if (!config.username) {
            throw new Error('username不能为空');
        }
        if (!config.apiHost) {
            config.apiHost = 'https://tc.cloud.hecom.cn';
        }
    }

    private async getAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.expiresIn) {
            return this.accessToken;
        }

        const authUrl = `${this.authConfig.apiHost}/hecom-tenancy/oauth/token`;
        const authHeader = `Basic ${BASE64.encode(`${this.authConfig.clientId}:${this.authConfig.clientSecret}`)}`;

        const data = this.accessToken
            ? {
                  grant_type: 'refresh_token',
                  refresh_token: this.refreshToken || this.accessToken,
              }
            : {
                  grant_type: 'client_credentials',
                  username: this.authConfig.username,
              };
        console.log(authUrl);
        const response = await axios.post(authUrl, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: authHeader,
            },
        });

        this.accessToken = response.data.access_token;
        this.refreshToken = response.data.refresh_token;
        this.expiresIn = Date.now() + response.data.expires_in * 1000;
        this.endPoint = response.data.endPoint;

        return this.accessToken || '';
    }

    private getEndPoint(): string | undefined {
        return this.endPoint;
    }

    public async request<R, P = void>(method: string, url: string, param?: P): Promise<R> {
        const token = await this.getAccessToken();
        const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        try {
            const { data } = await axios.request({
                method,
                url,
                data: param,
                headers,
                baseURL: this.getEndPoint(),
            });

            if (data.result === '0') {
                return data.data;
            } else {
                throw new BizHecomError(data.desc, data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const err = error as any;
                throw new NetHecomError(err.response.data.desc, err.response.data.code, url);
            } else {
                throw error;
            }
        }
    }
}
