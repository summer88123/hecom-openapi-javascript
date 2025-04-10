import { BizRecord, QueryOptions, QueryResult } from './types';
import { AuthService } from './auth';
export declare class DataService {
    private authService;
    constructor(authService: AuthService);
    private request;
    /**
     * 获取业务类型
     * @param metaName 业务对象api名称
     * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
     * @returns 创建的业务数据code
     */
    createData(metaName: string, data: BizRecord): Promise<string>;
    /**
     * 更新业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @param data 字段数据 {fieldName: 'fieldValue'}
     * @returns 更新的业务数据code
     * @throws Error 更新业务数据失败
     */
    updateData(metaName: string, code: string, data: BizRecord): Promise<string>;
    /**
     * 批量新增业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条
     * @returns 创建的业务数据code数组
     */
    batchCreateData(metaName: string, records: BizRecord[]): Promise<string[]>;
    /**
     * 删除业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 删除的业务数据code
     */
    deleteData(metaName: string, code: string): Promise<string>;
    /**
     * 批量更新业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条，每条必须包含code字段
     * @returns 更新的业务数据code数组
     */
    batchUpdateData(metaName: string, records: BizRecord[]): Promise<string[]>;
    /**
     * 获取业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 业务数据
     */
    getData(metaName: string, code: string): Promise<BizRecord>;
    /**
     * 查询业务数据
     * @param metaName 业务对象api名称
     * @param options 查询选项
     * @returns 业务数据列表
     */
    queryData(metaName: string, options: QueryOptions): Promise<QueryResult>;
    /**
     * 查询业务数据
     * @param sql 查询语句，支持where、order by、limit、offset等
     * @returns 业务数据列表
     */
    queryDataBySQL(sql: string): Promise<unknown>;
    /**
     * 查询辅助或内置对象业务数据
     * @param metaName 业务对象api名称
     * @param options 查询选项
     * @returns 业务数据列表
     */
    queryAuxiliaryData(metaName: string, options: QueryOptions): Promise<QueryResult>;
    /**
     * 业务数据转移负责人
     * @param metaName 业务对象的metaName
     * @param code 数据code
     * @param newOwner 新负责人code
     * @param addTeam 是否添加当前负责人为跟进人 (0 否 1 是)
     * @param deptFollowNewOwner 所属部门是否和新负责人保持一致 (0 否 1 是)
     * @returns 转移后的业务数据code
     */
    transferOwner(metaName: string, code: string, newOwner: string, addTeam: boolean, deptFollowNewOwner: boolean): Promise<string>;
}
