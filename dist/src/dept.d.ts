import { AuthService } from './auth';
import { BizRecord, ObjectMetaDetail, QueryOptions, QueryResult } from './types';
export declare class DeptService {
    private authService;
    constructor(authService: AuthService);
    private request;
    /**
     * 获取组织对象描述
     * @returns 组织对象描述信息
     */
    getDeptDescription(): Promise<ObjectMetaDetail>;
    /**
     * 新建组织
     * @param deptData 组织数据
     * @returns 组织code
     */
    createDept(deptData: BizRecord): Promise<string>;
    /**
     * 修改组织信息
     * @param code 组织code
     * @param deptData 组织数据
     * @returns 组织code
     */
    updateDept(code: string, deptData: BizRecord): Promise<string>;
    /**
     * 获取组织详情
     * @param code 组织code
     * @returns 组织详情
     */
    getDeptDetail(code: string): Promise<BizRecord>;
    /**
     * 查询组织数据
     * @param options 查询选项
     * @returns 组织数据列表
     */
    queryDepts(options: QueryOptions): Promise<QueryResult>;
    /**
     * 使用SQL查询组织数据
     * @param sql SQL查询语句
     * @returns 组织数据列表
     */
    queryDeptsBySQL(sql: string): Promise<QueryResult>;
    /**
     * 停用部门
     * @param code 部门code
     * @param moveToDeptCode 迁移部门code
     * @returns 部门code
     */
    disableDept(code: string, moveToDeptCode?: string): Promise<string>;
    /**
     * 启用部门
     * @param code 部门code
     * @returns 部门code
     */
    enableDept(code: string): Promise<string>;
    /**
     * 部门修改上级
     * @param code 部门code
     * @param dept 新上级部门code
     * @returns 修改后的部门code数组
     */
    changeDeptParent(code: string, dept: string): Promise<string[]>;
}
