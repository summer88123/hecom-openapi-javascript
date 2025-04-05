import { BizRecord, QueryOptions, QueryResult } from './types';
import { AuthService } from './auth';
import { buildQueryUrl } from './util';

export class DataService {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private async request<R, P = void>(method: string, url: string, param?: P): Promise<R> {
        return this.authService.request(method, url, param);
    }

    /**
     * 获取业务类型
     * @param metaName 业务对象api名称
     * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
     * @returns 创建的业务数据code
     */
    public async createData(metaName: string, data: BizRecord): Promise<string> {
        return this.request('POST', `/v1/data/objects/${metaName}`, data);
    }

    /**
     * 更新业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @param data 字段数据 {fieldName: 'fieldValue'}
     * @returns 更新的业务数据code
     * @throws Error 更新业务数据失败
     */
    public async updateData(metaName: string, code: string, data: BizRecord): Promise<string> {
        return this.request('PATCH', `/v1/data/objects/${metaName}/${code}`, data);
    }

    /**
     * 批量新增业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条
     * @returns 创建的业务数据code数组
     */
    public async batchCreateData(metaName: string, records: BizRecord[]): Promise<string[]> {
        if (records.length > 30) {
            throw new Error('批量新增业务数据最多30条');
        }
        if (records.length === 0) {
            throw new Error('批量新增业务数据不能为空');
        }
        return this.request('POST', `/oapi/v1/data/objects/${metaName}/batch`, { records });
    }

    /**
     * 删除业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 删除的业务数据code
     */
    public async deleteData(metaName: string, code: string): Promise<string> {
        return this.request('DELETE', `/v1/data/objects/${metaName}/${code}`);
    }

    /**
     * 批量更新业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条，每条必须包含code字段
     * @returns 更新的业务数据code数组
     */
    public async batchUpdateData(metaName: string, records: BizRecord[]): Promise<string[]> {
        if (records.length > 30) {
            throw new Error('批量更新业务数据最多30条');
        }
        if (records.length === 0) {
            throw new Error('批量更新业务数据不能为空');
        }
        if (records.some(record => !record.code)) {
            throw new Error('批量更新业务数据必须包含code字段');
        }
        return this.request('PATCH', `/oapi/v1/data/objects/${metaName}/batch`, { records });
    }

    /**
     * 获取业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 业务数据
     */
    public async getData(metaName: string, code: string): Promise<BizRecord> {
        return this.request('GET', `/v1/data/objects/${metaName}/${code}`);
    }

    /**
     * 查询业务数据
     * @param metaName 业务对象api名称
     * @param options 查询选项
     * @returns 业务数据列表
     */
    public async queryData(metaName: string, options: QueryOptions): Promise<QueryResult> {
        const url = buildQueryUrl(metaName, options);
        return this.request('GET', url);
    }

    /**
     * 查询业务数据
     * @param sql 查询语句，支持where、order by、limit、offset等
     * @returns 业务数据列表
     */
    public async queryDataBySQL(sql: string) {
        const encodedSql = encodeURIComponent(sql);
        const url = `/v1/data/query?sql=${encodedSql}`;

        return this.request('GET', url);
    }

    /**
     * 查询辅助或内置对象业务数据
     * @param metaName 业务对象api名称
     * @param options 查询选项
     * @returns 业务数据列表
     */
    public async queryAuxiliaryData(metaName: string, options: QueryOptions): Promise<QueryResult> {
        const url = buildQueryUrl(metaName, options, '/v1/data/objects/listAuxiliaryBizData');
        return this.request('GET', url);
    }

    /**
     * 业务数据转移负责人
     * @param metaName 业务对象的metaName
     * @param code 数据code
     * @param newOwner 新负责人code
     * @param addTeam 是否添加当前负责人为跟进人 (0 否 1 是)
     * @param deptFollowNewOwner 所属部门是否和新负责人保持一致 (0 否 1 是)
     * @returns 转移后的业务数据code
     */
    public async transferOwner(
        metaName: string,
        code: string,
        newOwner: string,
        addTeam: boolean,
        deptFollowNewOwner: boolean
    ): Promise<string> {
        if (!code) {
            throw new Error('数据code不能为空');
        }
        if (!newOwner) {
            throw new Error('新负责人code不能为空');
        }
        return this.request('PATCH', `/oapi/v1/data/${metaName}/${code}/tansferOwner`, {
            newOwner,
            addTeam: addTeam ? 1 : 0,
            deptFollowNewOwner: deptFollowNewOwner ? 1 : 0,
        });
    }
}
