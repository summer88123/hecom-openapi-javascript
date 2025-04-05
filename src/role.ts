import { AuthService } from './auth';
import { BizRecord, ObjectMetaDetail, QueryOptions, QueryResult } from './types';
import { buildQueryUrl } from './util';

export class RoleService {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private async request<R, P = void>(method: string, url: string, param?: P): Promise<R> {
        return this.authService.request(method, url, param);
    }

    /**
     * 获取角色对象描述
     * @returns 角色对象描述信息
     */
    public async getRoleDescription(): Promise<ObjectMetaDetail> {
        return this.request('GET', '/v1/data/app/roleconfig/objects/Role/description');
    }

    /**
     * 新建角色
     * @param roleData 角色数据
     * @returns 角色code
     */
    public async createRole(roleData: BizRecord): Promise<string> {
        return this.request('POST', '/v1/data/app/roleconfig/objects/Role', roleData);
    }

    /**
     * 修改角色信息
     * @param code 角色code
     * @param roleData 角色数据
     * @returns 角色code
     */
    public async updateRole(code: string, roleData: BizRecord): Promise<string> {
        return this.request('PATCH', `/v1/data/app/roleconfig/objects/Role/${code}`, roleData);
    }

    /**
     * 获取角色详情
     * @param code 角色code
     * @returns 角色详情
     */
    public async getRoleDetail(code: string): Promise<BizRecord> {
        return this.request('GET', `/v1/data/app/roleconfig/objects/Role/${code}`);
    }

    /**
     * 查询角色数据
     * @param options 查询选项
     * @returns 角色数据列表
     */
    public async queryRoles(options: QueryOptions): Promise<QueryResult> {
        const url = buildQueryUrl('Role', options, '/v1/data/app/roleconfig/objects');
        return this.request('GET', url);
    }

    /**
     * 使用SQL查询角色数据
     * @param sql SQL查询语句
     * @returns 角色数据列表
     */
    public async queryRolesBySQL(sql: string): Promise<QueryResult> {
        const encodedSql = encodeURIComponent(sql);
        const url = `/v1/data/app/roleconfig/query?sql=${encodedSql}`;
        return this.request('GET', url);
    }
}
