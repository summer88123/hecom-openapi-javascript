export declare class BizHecomError extends HecomError {
    code: string;
    data?: any;
    constructor(message: string, code: string, data?: any);
}

export declare interface BizRecord extends SysRecord {
    [key: string]: unknown;
}

export declare interface BizType {
    /** 类型唯一id */
    code: number;
    /** 类型描述 */
    description: string;
    /** 是否默认类型 0-否 1-是 */
    isDefault: 0 | 1;
    /** 类型描述 */
    label: string;
    /** 类型名称 */
    name: string;
}

export declare interface Config {
    /** 客户端ID */
    clientId: string;
    /** 客户端密钥 */
    clientSecret: string;
    /** API主机地址 */
    apiHost?: string;
    /** 用户名 */
    username: string;
}

export declare interface ConstantGroup extends SysRecord {
    cascade: number;
    description: string;
    label: string;
}

export declare interface ConstantOption extends SysRecord {
    children: ConstantOption[];
    groupName: string;
    label: string;
    pinyin: string;
}

export declare interface Field {
    /** 字段扩展属性集 */
    attributes: {
        /** 文本填写提示 */
        regExpRemind: string;
        /** 数值支持千分位 */
        thousandsSupported: boolean;
        /** 最大长度 */
        maxLen: number;
        /** 人员是否添加到跟进人（人员字段） */
        addToTeamUser: boolean;
        /** 数值单位 */
        unit: string;
        /** 小数位数 */
        decimal: number;
    };
    /** 字段ID */
    fieldId: number;
    /** 字段中文名 */
    label: string;
    /** 字段api名称 */
    name: string;
    /** 是否标准字段 */
    std: 0 | 1;
    /** 字段类型 */
    type: string;
    /** 字段子类型 */
    subType: string;
    /** 是否可创建 */
    createable: number;
    /** 是否可读 */
    readable: 0 | 1;
    /** 是否可修改 */
    writeble: 0 | 1;
    /** 是否必填 */
    required: 0 | 1;
}

declare class HClient {
    private authService;
    private objectService;
    private dataService;
    private userService;
    private deptService;
    private roleService;
    private constantGroupService;
    config: {
        pageSize: number;
    };
    constructor(config: Config);
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
     * @param selectFields 要查询的字段列表
     * @param pageNo 页码，从1开始，不传则默认为1
     * @param pageSize 每页大小，不传则默认为10
     * @param query 查询条件，格式为 {fieldName: value}
     * @returns 业务数据列表
     */
    queryData(metaName: string, options: QueryOptions): Promise<QueryResult>;
    /**
     * 查询业务数据
     * @param sql 查询语句，支持where、order by、limit、offset等
     * @returns 业务数据列表
     */
    queryDataBySQL(sql: string): Promise<QueryResult>;
    /**
     * 查询辅助或内置对象业务数据
     * @param metaName 业务对象api名称
     * @param selectFields 要查询的字段列表
     * @param pageNo 页码，从1开始，不传则默认为1
     * @param pageSize 每页大小，不传则默认为10
     * @param query 查询条件，格式为 {fieldName: value}
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
    createUser(userData: Partial<BizRecord>): Promise<string>;
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
     * @param sql 查询SQL
     * @returns 组织数据列表
     */
    queryDeptsBySQL(sql: string): Promise<QueryResult>;
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
     * 获取选项值集列表
     * @returns ConstantGroup[]
     */
    getConstantGroups(): Promise<ConstantGroup[]>;
    /**
     * 获取选项值集选项列表
     * @param groupName 选项值集名称
     * @returns ConstantOption[]
     */
    getConstantOptions(groupName: string): Promise<ConstantOption[]>;
    /**
     * 新增选项
     * @param groupName 选项值集名称
     * @param name 选项name
     * @param label 选项标签
     * @param parentName 上级选项name
     * @returns ConstantOption
     */
    createConstantOption(groupName: string, name: string, label: string, parentName?: string): Promise<ConstantOption>;
    /**
     * 修改选项
     * @param groupName 选项值集名称
     * @param optionName 选项name
     * @param label 选项标签
     * @returns ConstantOption
     */
    updateConstantOption(groupName: string, optionName: string, label: string): Promise<ConstantOption>;
}
export default HClient;

export declare class HecomError extends Error {
    constructor(message: string);
}

export declare class NetHecomError extends HecomError {
    statusCode: number;
    url: string;
    constructor(message: string, statusCode: number, url: string);
}

export declare interface ObjectMeta {
    /** 业务对象中文名称 */
    label: string;
    /** 业务对象api名称 */
    name: string;
    /** 业务对象描述 */
    description: string;
    /** 业务对象ID */
    objId: number;
    /** 是否标准对象， 0=自定义对象，1=标准对象 */
    std: 0 | 1;
}

export declare interface ObjectMetaDetail extends ObjectMeta {
    /** 业务类型 */
    bizTypes: BizType[];
    /** 字段列表 */
    fieldList: Field[];
}

export declare interface QueryOptions {
    selectFields: string[];
    pageNo: number;
    pageSize: number;
    query: Record<string, string | number>;
}

export declare interface QueryResult {
    totalCount: number;
    metaName: string;
    records: BizRecord[];
}

declare interface Response_2<D> {
    /** 响应数据 */
    data: D;
    /** 响应描述 */
    desc: string;
    /** 响应结果 */
    result: string;
    /** 响应时间 */
    time: number;
}
export { Response_2 as Response }

export declare interface SysRecord {
    id: number;
    code: string;
    name: string;
    entCode: string;
    metaName: string;
    status: number;
    createdOn: number;
    updatedOn: number;
}

export { }
