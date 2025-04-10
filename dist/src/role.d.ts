import { AuthService } from './auth';
import { BizRecord, ObjectMetaDetail, QueryOptions, QueryResult } from './types';
export declare class RoleService {
    private authService;
    constructor(authService: AuthService);
    private request;
    /**
     * 获取角色对象描述
     * @returns 角色对象描述信息
     */
    getRoleDescription(): Promise<ObjectMetaDetail>;
    /**
     * 新建角色
     * @param roleData 角色数据
     * @returns 角色code
     */
    createRole(roleData: BizRecord): Promise<string>;
    /**
     * 修改角色信息
     * @param code 角色code
     * @param roleData 角色数据
     * @returns 角色code
     */
    updateRole(code: string, roleData: BizRecord): Promise<string>;
    /**
     * 获取角色详情
     * @param code 角色code
     * @returns 角色详情
     */
    getRoleDetail(code: string): Promise<BizRecord>;
    /**
     * 查询角色数据
     * @param options 查询选项
     * @returns 角色数据列表
     */
    queryRoles(options: QueryOptions): Promise<QueryResult>;
    /**
     * 使用SQL查询角色数据
     * @param sql SQL查询语句
     * @returns 角色数据列表
     */
    queryRolesBySQL(sql: string): Promise<QueryResult>;
}
