import { Config } from './types';
export declare class AuthService {
    private authConfig;
    private accessToken?;
    private refreshToken;
    private expiresIn;
    private endPoint?;
    constructor(config: Config);
    private verifyConfig;
    private getAccessToken;
    private getEndPoint;
    request<R, P = void>(method: string, url: string, param?: P): Promise<R>;
}
