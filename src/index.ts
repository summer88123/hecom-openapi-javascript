import { AuthService } from './auth';
import { ConstantGroupService } from './constantgroup';
import { DataService } from './data';
import { DeptService } from './dept';
import { BizHecomError, HecomError, NetHecomError } from './error';
import { ObjectService } from './object';
import { RoleService } from './role';
import {
    BizRecord,
    Config,
    ConstantGroup,
    ConstantOption,
    ObjectMeta,
    ObjectMetaDetail,
    QueryOptions,
    QueryResult,
    RelatedData,
    TreeRelatedData,
} from './types';
import { UserService } from './user';

export default class HClient {
    private authService: AuthService;
    private objectService: ObjectService;
    private dataService: DataService;
    private userService: UserService;
    private deptService: DeptService;
    private roleService: RoleService;
    private constantGroupService: ConstantGroupService;

    config = {
        pageSize: 10,
    };

    constructor(config: Config) {
        this.authService = new AuthService(config);
        this.objectService = new ObjectService(this.authService);
        this.dataService = new DataService(this.authService);
        this.userService = new UserService(this.authService);
        this.deptService = new DeptService(this.authService);
        this.roleService = new RoleService(this.authService);
        this.constantGroupService = new ConstantGroupService(this.authService);
    }

    /**
     * 获取业务对象列表
     * @returns ObjectMeta[]
     */
    public async getObjects(): Promise<ObjectMeta[]> {
        return this.objectService.getObjects();
    }

    /**
     * 获取业务对象描述
     * @param metaName 业务对象api名称
     * @returns ObjectMetaDetail
     */
    public async getObjectDescription(metaName: string): Promise<ObjectMetaDetail> {
        return this.objectService.getObjectDescription(metaName);
    }

    /**
     * 创建业务数据
     * @param metaName 业务对象api名称
     * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
     * @returns 创建的业务数据code
     */
    public async createData(metaName: string, data: Partial<BizRecord>): Promise<string> {
        return this.dataService.createData(metaName, data);
    }

    /**
     * 创建主子业务数据
     * 此方法适用于同时写入带有少量子数据的单据，如果具有较多子明细数据，请按标准新建方法，主和子分别写入
     * @param metaName 主业务对象api名称
     * @param data 主业务数据
     * @param related 标准子明细数据
     * @param treeRelated 树形子明细数据
     * @returns 
     */
    public async createDataWithRelated(
        metaName: string,
        data: Partial<BizRecord>,
        related?: RelatedData,
        treeRelated?: TreeRelatedData
    ): Promise<ReturnType<DataService['createDataWithRelated']>> {
        return this.dataService.createDataWithRelated(metaName, {
            data,
            related,
            treeRelated,
        });
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
        return this.dataService.updateData(metaName, code, data);
    }

    /**
     * 批量新增业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条
     * @returns 创建的业务数据code数组
     */
    public async batchCreateData(metaName: string, records: BizRecord[]): Promise<string[]> {
        return this.dataService.batchCreateData(metaName, records);
    }

    /**
     * 删除业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 删除的业务数据code
     */
    public async deleteData(metaName: string, code: string): Promise<string> {
        return this.dataService.deleteData(metaName, code);
    }

    /**
     * 批量更新业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条，每条必须包含code字段
     * @returns 更新的业务数据code数组
     */
    public async batchUpdateData(metaName: string, records: BizRecord[]): Promise<string[]> {
        return this.dataService.batchUpdateData(metaName, records);
    }

    /**
     * 获取业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 业务数据
     */
    public async getData(metaName: string, code: string): Promise<BizRecord> {
        return this.dataService.getData(metaName, code);
    }

    /**
     * 查询业务数据
     * @param metaName 业务对象api名称
     * @param selectFields 要查询的字段列表
     * @param pageNo 页码，从1开始，不传则默认为1
     * @param pageSize 每页大小，不传则默认为10
     * @param query 查询条件，格式为 {fieldName: value}
     * @returns 业务数据列表
     */
    public async queryData(metaName: string, options: QueryOptions): Promise<QueryResult> {
        return this.dataService.queryData(metaName, options);
    }

    /**
     * 查询业务数据
     * @param sql 查询语句，支持where、order by、limit、offset等
     * @returns 业务数据列表
     */
    public async queryDataBySQL(sql: string): Promise<QueryResult> {
        return this.dataService.queryDataBySQL(sql);
    }

    /**
     * 查询辅助或内置对象业务数据
     * @param metaName 业务对象api名称
     * @param selectFields 要查询的字段列表
     * @param pageNo 页码，从1开始，不传则默认为1
     * @param pageSize 每页大小，不传则默认为10
     * @param query 查询条件，格式为 {fieldName: value}
     * @returns 业务数据列表
     */
    public async queryAuxiliaryData(metaName: string, options: QueryOptions): Promise<QueryResult> {
        return this.dataService.queryAuxiliaryData(metaName, options);
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
        return this.dataService.transferOwner(metaName, code, newOwner, addTeam, deptFollowNewOwner);
    }

    /**
     * 获取用户对象描述
     * @returns 用户对象描述信息
     */
    public async getUserDescription(): Promise<ObjectMetaDetail> {
        return this.userService.getUserDescription();
    }

    /**
     * 新建用户
     * @param userData 用户数据
     * @returns 用户code
     */
    public async createUser(userData: Partial<BizRecord>): Promise<string> {
        return this.userService.createUser(userData);
    }

    /**
     * 修改用户数据
     * @param code 用户code
     * @param userData 用户数据
     * @returns 用户code
     */
    public async updateUser(code: string, userData: BizRecord): Promise<string> {
        return this.userService.updateUser(code, userData);
    }

    /**
     * 获取用户详情
     * @param code 用户code
     * @returns 用户详情
     */
    public async getUserDetail(code: string): Promise<BizRecord> {
        return this.userService.getUserDetail(code);
    }

    /**
     * 获取组织对象描述
     * @returns 组织对象描述信息
     */
    public async getDeptDescription(): Promise<ObjectMetaDetail> {
        return this.deptService.getDeptDescription();
    }

    /**
     * 新建组织
     * @param deptData 组织数据
     * @returns 组织code
     */
    public async createDept(deptData: BizRecord): Promise<string> {
        return this.deptService.createDept(deptData);
    }

    /**
     * 修改组织信息
     * @param code 组织code
     * @param deptData 组织数据
     * @returns 组织code
     */
    public async updateDept(code: string, deptData: BizRecord): Promise<string> {
        return this.deptService.updateDept(code, deptData);
    }

    /**
     * 获取组织详情
     * @param code 组织code
     * @returns 组织详情
     */
    public async getDeptDetail(code: string): Promise<BizRecord> {
        return this.deptService.getDeptDetail(code);
    }

    /**
     * 查询组织数据
     * @param sql 查询SQL
     * @returns 组织数据列表
     */
    public async queryDeptsBySQL(sql: string): Promise<QueryResult> {
        return this.deptService.queryDeptsBySQL(sql);
    }

    /**
     * 获取角色对象描述
     * @returns 角色对象描述信息
     */
    public async getRoleDescription(): Promise<ObjectMetaDetail> {
        return this.roleService.getRoleDescription();
    }

    /**
     * 新建角色
     * @param roleData 角色数据
     * @returns 角色code
     */
    public async createRole(roleData: BizRecord): Promise<string> {
        return this.roleService.createRole(roleData);
    }

    /**
     * 修改角色信息
     * @param code 角色code
     * @param roleData 角色数据
     * @returns 角色code
     */
    public async updateRole(code: string, roleData: BizRecord): Promise<string> {
        return this.roleService.updateRole(code, roleData);
    }

    /**
     * 获取角色详情
     * @param code 角色code
     * @returns 角色详情
     */
    public async getRoleDetail(code: string): Promise<BizRecord> {
        return this.roleService.getRoleDetail(code);
    }

    /**
     * 获取选项值集列表
     * @returns ConstantGroup[]
     */
    public async getConstantGroups(): Promise<ConstantGroup[]> {
        return this.constantGroupService.getConstantGroups();
    }

    /**
     * 获取选项值集选项列表
     * @param groupName 选项值集名称
     * @returns ConstantOption[]
     */
    public async getConstantOptions(groupName: string): Promise<ConstantOption[]> {
        return this.constantGroupService.getConstantOptions(groupName);
    }

    /**
     * 新增选项
     * @param groupName 选项值集名称
     * @param name 选项name
     * @param label 选项标签
     * @param parentName 上级选项name
     * @returns ConstantOption
     */
    public async createConstantOption(
        groupName: string,
        name: string,
        label: string,
        parentName?: string
    ): Promise<ConstantOption> {
        return this.constantGroupService.createConstantOption(groupName, name, label, parentName);
    }

    /**
     * 修改选项
     * @param groupName 选项值集名称
     * @param optionName 选项name
     * @param label 选项标签
     * @returns ConstantOption
     */
    public async updateConstantOption(groupName: string, optionName: string, label: string): Promise<ConstantOption> {
        return this.constantGroupService.updateConstantOption(groupName, optionName, label);
    }
}
export * from './types';
export { BizHecomError, HecomError, NetHecomError };
