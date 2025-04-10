export interface Config {
    /** 客户端ID */
    clientId: string;
    /** 客户端密钥 */
    clientSecret: string;
    /** API主机地址 */
    apiHost: string;
    /** 用户名 */
    username: string;
}
export interface Response<D> {
    /** 响应数据 */
    data: D;
    /** 响应描述 */
    desc: string;
    /** 响应结果 */
    result: string;
    /** 响应时间 */
    time: number;
}
export interface ObjectMeta {
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
export interface BizType {
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
export interface Field {
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
}
export interface ObjectMetaDetail extends ObjectMeta {
    /** 业务类型 */
    bizTypes: BizType[];
    /** 字段列表 */
    fieldList: Field[];
}
export interface SysRecord {
    id: number;
    code: string;
    name: string;
    entCode: string;
    metaName: string;
    status: number;
    createdOn: number;
    updatedOn: number;
}
export interface BizRecord extends SysRecord {
    [key: string]: unknown;
}
export interface QueryOptions {
    selectFields: string[];
    pageNo: number;
    pageSize: number;
    query: Record<string, string | number>;
}
export interface QueryResult {
    totalCount: number;
    metaName: string;
    records: BizRecord[];
}
export interface ConstantGroup extends SysRecord {
    cascade: number;
    description: string;
    label: string;
}
export interface ConstantOption extends SysRecord {
    children: ConstantOption[];
    groupName: string;
    label: string;
    pinyin: string;
}
