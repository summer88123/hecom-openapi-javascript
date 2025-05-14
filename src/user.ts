import { AuthService } from './auth';
import { BizRecord, ObjectMetaDetail, QueryOptions, QueryResult } from './types';
import { buildQueryUrl } from './util';

export class UserService {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private async request<R, P = void>(method: string, url: string, param?: P): Promise<R> {
        return this.authService.request(method, url, param);
    }

    /**
     * 获取用户对象描述
     * @returns 用户对象描述信息
     */
    public async getUserDescription(): Promise<ObjectMetaDetail> {
        return this.request('GET', '/v1/data/app/userconfig/objects/User/description');
    }

    /**
     * 新建用户
     * @param userData 用户数据
     * @returns 用户code
     */
    public async createUser(userData: Partial<BizRecord>): Promise<string> {
        return this.request('POST', '/v1/data/app/userconfig/objects/User', userData);
    }

    /**
     * 修改用户数据
     * @param code 用户code
     * @param userData 用户数据
     * @returns 用户code
     */
    public async updateUser(code: string, userData: BizRecord): Promise<string> {
        return this.request('PATCH', `/v1/data/app/userconfig/objects/User/${code}`, userData);
    }

    /**
     * 获取用户详情
     * @param code 用户code
     * @returns 用户详情
     */
    public async getUserDetail(code: string): Promise<BizRecord> {
        return this.request('GET', `/v1/data/app/userconfig/objects/User/${code}`);
    }

    /**
     * 查询用户数据
     * @param options 查询选项
     * @returns 用户数据列表
     */
    public async queryUsers(options: QueryOptions): Promise<QueryResult> {
        const url = buildQueryUrl('User', options, '/v1/data/app/userconfig/objects');
        return this.request('GET', url);
    }

    /**
     * 冻结用户
     * @param code 用户code
     * @returns 用户code
     */
    public async freezeUser(code: string): Promise<string> {
        return this.request('POST', `/v1/data/app/userconfig/freeze/${code}`);
    }

    /**
     * 解冻用户
     * @param code 用户code
     * @returns 用户code
     */
    public async unfreezeUser(code: string): Promise<string> {
        return this.request('POST', `/v1/data/app/userconfig/unfreeze/${code}`);
    }

    /**
     * 离职用户
     * @param code 用户code
     * @returns 用户code
     */
    public async dimissionUser(code: string): Promise<string> {
        return this.request('POST', `/v1/data/app/userconfig/dimission/${code}`);
    }

    /**
     * 复职用户
     * @param code 用户code
     * @param dept 复职后部门
     * @param phone 绑定手机号
     * @returns 用户code
     */
    public async resumeUser(code: string, dept: string, phone?: string): Promise<string> {
        return this.request('POST', `/v1/data/app/userconfig/resume/${code}`, {
            dept,
            phone,
        });
    }

    /**
     * 分配用户角色
     * @param code 用户code
     * @param roles 角色code集合
     * @returns 用户code
     */
    public async assignRoles(code: string, roles: string[]): Promise<string> {
        return this.request('POST', `/v1/data/app/userconfig/assignRoles/${code}`, {
            roles,
        });
    }

    /**
     * 使用SQL查询用户数据
     * @param sql SQL查询语句
     * @returns 用户数据列表
     */
    public async queryUsersBySQL(sql: string): Promise<QueryResult> {
        const encodedSql = encodeURIComponent(sql);
        const url = `/v1/data/app/userconfig/query?sql=${encodedSql}`;
        return this.request('GET', url);
    }

    /**
     * 调整部门
     * @param code 用户code
     * @param oldDeptCode 原部门code
     * @param newDeptCode 新部门code
     * @param transferData 是否转移部门下的数据
     * @returns 用户code
     */
    public async transferUserDept(
        code: string,
        oldDeptCode: string,
        newDeptCode: string,
        transferData: boolean
    ): Promise<string> {
        return this.request('POST', `/v1/data/app/userconfig/transferUserDept/${code}`, {
            oldDeptCode,
            newDeptCode,
            transferData,
        });
    }
}
