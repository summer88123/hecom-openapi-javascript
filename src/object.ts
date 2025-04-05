import { ObjectMeta, ObjectMetaDetail } from './types';
import { AuthService } from './auth';

export class ObjectService {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private async request<R, P = void>(method: string, url: string, param?: P): Promise<R> {
        return this.authService.request(method, url, param);
    }

    /**
     * 获取业务对象列表
     * @returns ObjectMeta[]
     */
    public async getObjects(): Promise<ObjectMeta[]> {
        return this.request('GET', `/v1/data/objects`);
    }

    /**
     * 获取业务对象描述
     * @param metaName 业务对象api名称
     * @returns ObjectMetaDetail
     */
    public async getObjectDescription(metaName: string): Promise<ObjectMetaDetail> {
        return this.request('GET', `/oapi/v1/data/objects/${metaName}/description`);
    }
}
