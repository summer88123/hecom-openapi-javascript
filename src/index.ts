import { Config, ObjectMeta, ObjectMetaDetail } from './types';
import axios from 'axios';
import BASE64 from 'base-64';

export default class HClient {
    config: Config;
    accessToken: string | null = null;
    refreshToken: string | null = null;
    expiresIn: number = 0;
    endPoint: string | null = null;

    constructor(config: Config) {
        this.verifyConfig(config);
        this.config = config;
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
            config.apiHost = 'tc.cloud.hecom.cn';
        }
    }

    async getAccessToken() {
        if (this.accessToken && Date.now() < this.expiresIn) {
            return this.accessToken;
        }

        const authUrl = `${this.config.apiHost}/hecom-tenancy/oauth/token`;
        console.log(authUrl);
        const authHeader = `Basic ${BASE64.encode(`${this.config.clientId}:${this.config.clientSecret}`)}`;

        const data = this.accessToken
            ? {
                  grant_type: 'refresh_token',
                  refresh_token: this.refreshToken || this.accessToken,
              }
            : {
                  grant_type: 'client_credentials',
                  username: this.config.username,
              };

        try {
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

            return this.accessToken;
        } catch (error: any) {
            console.log(JSON.stringify(error.response.data));
            throw new Error(`获取访问令牌失败: ${error.response ? error.response.data : error.message}`);
        }
    }

    async getObjects(): Promise<ObjectMeta[]> {
        const token = await this.getAccessToken();
        const url = `${this.endPoint}/v1/data/objects`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data.data);
            return response.data.data;
        } catch (error: any) {
            console.log(JSON.stringify(error.response.data));
            throw new Error(`获取业务对象列表失败: ${error.response ? error.response.data : error.message}`);
        }
    }

    async getObject(apiName: string): Promise<ObjectMetaDetail> {
        const token = await this.getAccessToken();
        const url = `${this.endPoint}/v1/data/objects/${apiName}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.data;
        } catch (error: any) {
            throw new Error(`获取业务对象列表失败: ${error.response ? error.response.data : error.message}`);
        }
    }

    async getData(apiName: string, code: string): Promise<any> {
        const token = await this.getAccessToken();
        const url = `${this.endPoint}/v1/data/objects/${apiName}/${code}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.data;
        } catch (error: unknown) {
            // 为error添加类型定义
            if (error instanceof Error) {
                throw new Error(`获取业务数据失败: ${error.message}`);
            } else {
                throw new Error(`获取业务数据失败: 未知错误`);
            }
        }
    }

    async createData(apiName: string, data: any): Promise<any> {
        // 为入参添加类型定义
        const token = await this.getAccessToken();
        const url = `${this.endPoint}/v1/data/objects/${apiName}`;

        try {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.data;
        } catch (error: unknown) {
            // 为error添加类型定义
            if (error instanceof Error) {
                throw new Error(`新建业务数据失败: ${error.message}`);
            } else {
                throw new Error(`新建业务数据失败: 未知错误`);
            }
        }
    }

    async updateData(apiName: string, code: string, data: any): Promise<any> {
        // 为入参添加类型定义
        const token = await this.getAccessToken();
        const url = `${this.endPoint}/v1/data/objects/${apiName}/${code}`;

        try {
            const response = await axios.patch(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.data;
        } catch (error: unknown) {
            // 为error添加类型定义
            if (error instanceof Error) {
                throw new Error(`更新业务数据失败: ${error.message}`);
            } else {
                throw new Error(`更新业务数据失败: 未知错误`);
            }
        }
    }

    async deleteData(apiName: string, code: string): Promise<any> {
        // 为入参添加类型定义
        const token = await this.getAccessToken();
        const url = `${this.endPoint}/v1/data/objects/${apiName}/${code}`;

        try {
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.data;
        } catch (error: unknown) {
            // 为error添加类型定义
            if (error instanceof Error) {
                throw new Error(`删除业务数据失败: ${error.message}`);
            } else {
                throw new Error(`删除业务数据失败: 未知错误`);
            }
        }
    }

    // 新增查询业务数据方法（通过字段值查询）
    async queryDataByField(
        apiName: string,
        selectFields: string[],
        pageNo: number,
        pageSize: number,
        field: string,
        value: string
    ) {
        const token = await this.getAccessToken();
        const url = `${this.endPoint}/v1/data/objects/${apiName}?selectFields=${selectFields.join(',')}&pageNo=${pageNo}&pageSize=${pageSize}&${field}=${value}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`查询业务数据失败: ${error.message}`);
            } else {
                throw new Error(`查询业务数据失败: 未知错误`);
            }
        }
    }

    // 新增查询业务数据方法（通过SQL查询）
    async queryDataBySQL(sql: string) {
        const token = await this.getAccessToken();
        const encodedSql = encodeURIComponent(sql);
        const url = `${this.endPoint}/v1/data/query?sql=${encodedSql}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            return response.data.data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`查询业务数据失败: ${error.message}`);
            } else {
                throw new Error(`查询业务数据失败: 未知错误`);
            }
        }
    }

    // 其他方法可以根据需要继续添加
}
