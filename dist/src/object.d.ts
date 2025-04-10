import { ObjectMeta, ObjectMetaDetail } from './types';
import { AuthService } from './auth';
export declare class ObjectService {
    private authService;
    constructor(authService: AuthService);
    private request;
    /**
     * 获取业务对象列表
     * @returns ObjectMeta[]
     */
    getObjects(): Promise<ObjectMeta[]>;
    /**
     * 获取业务对象描述
     * @param metaName 业务对象api名称
     * @returns ObjectMetaDetail
     */
    getObjectDescription(metaName: string): Promise<ObjectMetaDetail>;
}
