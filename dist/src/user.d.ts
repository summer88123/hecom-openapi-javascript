import { AuthService } from './auth';
import { BizRecord, ObjectMetaDetail, QueryOptions, QueryResult } from './types';
export declare class UserService {
    private authService;
    constructor(authService: AuthService);
    private request;
    /**
     * 获取用户对象描述
     * @returns 用户对象描述信息
     */
    getUserDescription(): Promise<ObjectMetaDetail>;
    /**
     * 新建用户
     * @param userData 用户数据
     * @returns 用户code
     */
    createUser(userData: BizRecord): Promise<string>;
    /**
     * 修改用户数据
     * @param code 用户code
     * @param userData 用户数据
     * @returns 用户code
     */
    updateUser(code: string, userData: BizRecord): Promise<string>;
    /**
     * 获取用户详情
     * @param code 用户code
     * @returns 用户详情
     */
    getUserDetail(code: string): Promise<BizRecord>;
    /**
     * 查询用户数据
     * @param options 查询选项
     * @returns 用户数据列表
     */
    queryUsers(options: QueryOptions): Promise<QueryResult>;
    /**
     * 冻结用户
     * @param code 用户code
     * @returns 用户code
     */
    freezeUser(code: string): Promise<string>;
    /**
     * 解冻用户
     * @param code 用户code
     * @returns 用户code
     */
    unfreezeUser(code: string): Promise<string>;
    /**
     * 离职用户
     * @param code 用户code
     * @returns 用户code
     */
    dimissionUser(code: string): Promise<string>;
    /**
     * 复职用户
     * @param code 用户code
     * @param dept 复职后部门
     * @param phone 绑定手机号
     * @returns 用户code
     */
    resumeUser(code: string, dept: string, phone?: string): Promise<string>;
    /**
     * 分配用户角色
     * @param code 用户code
     * @param roles 角色code集合
     * @returns 用户code
     */
    assignRoles(code: string, roles: string[]): Promise<string>;
    /**
     * 使用SQL查询用户数据
     * @param sql SQL查询语句
     * @returns 用户数据列表
     */
    queryUsersBySQL(sql: string): Promise<QueryResult>;
    /**
     * 调整部门
     * @param code 用户code
     * @param oldDeptCode 原部门code
     * @param newDeptCode 新部门code
     * @param transferData 是否转移部门下的数据
     * @returns 用户code
     */
    transferUserDept(code: string, oldDeptCode: string, newDeptCode: string, transferData: boolean): Promise<string>;
}
