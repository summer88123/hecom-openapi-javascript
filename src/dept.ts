import { AuthService } from './auth';
import { BizRecord, ObjectMetaDetail, QueryOptions, QueryResult } from './types';
import { buildQueryUrl } from './util';

export class DeptService {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private async request<R, P = void>(method: string, url: string, param?: P): Promise<R> {
        return this.authService.request(method, url, param);
    }

    /**
     * 获取组织对象描述
     * @returns 组织对象描述信息
     */
    public async getDeptDescription(): Promise<ObjectMetaDetail> {
        return this.request('GET', '/v1/data/app/orgconfig/objects/Org/description');
    }

    /**
     * 新建组织
     * @param deptData 组织数据
     * @returns 组织code
     */
    public async createDept(deptData: BizRecord): Promise<string> {
        return this.request('POST', '/v1/data/app/orgconfig/objects/Org', deptData);
    }

    /**
     * 修改组织信息
     * @param code 组织code
     * @param deptData 组织数据
     * @returns 组织code
     */
    public async updateDept(code: string, deptData: BizRecord): Promise<string> {
        return this.request('PATCH', `/v1/data/app/orgconfig/objects/Org/${code}`, deptData);
    }

    /**
     * 获取组织详情
     * @param code 组织code
     * @returns 组织详情
     */
    public async getDeptDetail(code: string): Promise<BizRecord> {
        return this.request('GET', `/v1/data/app/orgconfig/objects/Org/${code}`);
    }

    /**
     * 查询组织数据
     * @param options 查询选项
     * @returns 组织数据列表
     */
    public async queryDepts(options: QueryOptions): Promise<QueryResult> {
        const url = buildQueryUrl('Org', options, '/v1/data/app/orgconfig/objects');
        return this.request('GET', url);
    }

    /**
     * 使用SQL查询组织数据
     * @param sql SQL查询语句
     * @returns 组织数据列表
     */
    public async queryDeptsBySQL(sql: string): Promise<QueryResult> {
        const encodedSql = encodeURIComponent(sql);
        const url = `/v1/data/app/orgconfig/query?sql=${encodedSql}`;
        return this.request('GET', url);
    }

    /**
     * 停用部门
     * @param code 部门code
     * @param moveToDeptCode 迁移部门code
     * @returns 部门code
     */
    public async disableDept(code: string, moveToDeptCode?: string): Promise<string> {
        return this.request('PATCH', `/v1/data/app/orgconfig/objects/Org/disableOrg/${code}`, {
            moveToDeptCode,
        });
    }

    /**
     * 启用部门
     * @param code 部门code
     * @returns 部门code
     */
    public async enableDept(code: string): Promise<string> {
        return this.request('PATCH', `/v1/data/app/orgconfig/objects/Org/enableOrg/${code}`);
    }

    /**
     * 部门修改上级
     * @param code 部门code
     * @param dept 新上级部门code
     * @returns 修改后的部门code数组
     */
    public async changeDeptParent(code: string, dept: string): Promise<string[]> {
        return this.request('POST', `/v1/data/app/orgconfig/objects/Org/changeOrgDept/${code}`, {
            dept,
        });
    }
}
