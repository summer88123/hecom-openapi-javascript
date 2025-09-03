import u from "axios";
import g from "base-64";
class p extends Error {
  constructor(e) {
    super(e), this.name = "HecomError";
  }
}
class v extends p {
  constructor(e, t, r) {
    super(e), this.name = "NetHecomError", this.statusCode = t, this.url = r;
  }
}
class S extends p {
  constructor(e, t, r) {
    super(e), this.name = "BizHecomError", this.code = t, this.data = r;
  }
}
class q {
  constructor(e) {
    this.refreshToken = null, this.expiresIn = 0, this.verifyConfig(e), this.authConfig = e;
  }
  verifyConfig(e) {
    if (!e)
      throw new Error("配置不能为空");
    if (!e.clientId || !e.clientSecret)
      throw new Error("clientId和clientSecret不能为空");
    if (!e.username)
      throw new Error("username不能为空");
    e.apiHost || (e.apiHost = "https://tc.cloud.hecom.cn");
  }
  async getAccessToken() {
    if (this.accessToken && Date.now() < this.expiresIn)
      return this.accessToken;
    const e = `${this.authConfig.apiHost}/hecom-tenancy/oauth/token`, t = `Basic ${g.encode(`${this.authConfig.clientId}:${this.authConfig.clientSecret}`)}`, r = this.accessToken ? {
      grant_type: "refresh_token",
      refresh_token: this.refreshToken || this.accessToken
    } : {
      grant_type: "client_credentials",
      username: this.authConfig.username
    };
    console.log(e);
    const s = await u.post(e, r, {
      headers: {
        "Content-Type": "application/json",
        Authorization: t
      }
    });
    return this.accessToken = s.data.access_token, this.refreshToken = s.data.refresh_token, this.expiresIn = Date.now() + s.data.expires_in * 1e3, this.endPoint = s.data.endPoint, this.accessToken || "";
  }
  getEndPoint() {
    return this.endPoint;
  }
  async request(e, t, r) {
    const c = {
      Authorization: `Bearer ${await this.getAccessToken()}`,
      "Content-Type": "application/json"
    };
    try {
      const {
        data: n
      } = await u.request({
        method: e,
        url: t,
        data: r,
        headers: c,
        baseURL: this.getEndPoint()
      });
      if (n.result === "0")
        return n.data;
      throw new S(n.desc, n);
    } catch (n) {
      if (u.isAxiosError(n)) {
        const o = n;
        throw new v(o.response.data.desc, o.response.data.code, t);
      } else
        throw n;
    }
  }
}
class D {
  constructor(e) {
    this.authService = e;
  }
  async request(e, t, r) {
    return this.authService.request(e, t, r);
  }
  /**
   * 获取业务对象列表
   * @returns ObjectMeta[]
   */
  async getObjects() {
    return this.request("GET", "/v1/data/objects");
  }
  /**
   * 获取业务对象描述
   * @param metaName 业务对象api名称
   * @returns ObjectMetaDetail
   */
  async getObjectDescription(e) {
    return this.request("GET", `/v1/data/objects/${e}/description`);
  }
}
function i(a, e) {
  let {
    selectFields: t,
    pageNo: r,
    pageSize: s,
    query: c
  } = e, n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "/v1/data/objects", o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 10;
  const d = c ? Object.keys(c).reduce((y, h) => `&${y}${h}=${c[h]}`, "") : "", l = Array.isArray(t) && t.length > 0 ? t.join(",") : "code,name";
  return `${n}/${a}?selectFields=${l}&pageNo=${r || 1}&pageSize=${s || o}${d}`;
}
class f {
  constructor(e) {
    this.authService = e;
  }
  async request(e, t, r) {
    return this.authService.request(e, t, r);
  }
  /**
   * 获取业务类型
   * @param metaName 业务对象api名称
   * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
   * @returns 创建的业务数据code
   */
  async createData(e, t) {
    return this.request("POST", `/v1/data/objects/${e}`, t);
  }
  /**
   * 更新业务数据
   * @param metaName 业务对象api名称
   * @param code 业务数据code
   * @param data 字段数据 {fieldName: 'fieldValue'}
   * @returns 更新的业务数据code
   * @throws Error 更新业务数据失败
   */
  async updateData(e, t, r) {
    return this.request("PATCH", `/v1/data/objects/${e}/${t}`, r);
  }
  /**
   * 批量新增业务数据
   * @param metaName 业务对象api名称
   * @param records 业务数据数组，最多30条
   * @returns 创建的业务数据code数组
   */
  async batchCreateData(e, t) {
    if (t.length > 30)
      throw new Error("批量新增业务数据最多30条");
    if (t.length === 0)
      throw new Error("批量新增业务数据不能为空");
    return this.request("POST", `/oapi/v1/data/objects/${e}/batch`, {
      records: t
    });
  }
  /**
   * 删除业务数据
   * @param metaName 业务对象api名称
   * @param code 业务数据code
   * @returns 删除的业务数据code
   */
  async deleteData(e, t) {
    return this.request("DELETE", `/v1/data/objects/${e}/${t}`);
  }
  /**
   * 批量更新业务数据
   * @param metaName 业务对象api名称
   * @param records 业务数据数组，最多30条，每条必须包含code字段
   * @returns 更新的业务数据code数组
   */
  async batchUpdateData(e, t) {
    if (t.length > 30)
      throw new Error("批量更新业务数据最多30条");
    if (t.length === 0)
      throw new Error("批量更新业务数据不能为空");
    if (t.some((r) => !r.code))
      throw new Error("批量更新业务数据必须包含code字段");
    return this.request("PATCH", `/oapi/v1/data/objects/${e}/batch`, {
      records: t
    });
  }
  /**
   * 获取业务数据
   * @param metaName 业务对象api名称
   * @param code 业务数据code
   * @returns 业务数据
   */
  async getData(e, t) {
    return this.request("GET", `/v1/data/objects/${e}/${t}`);
  }
  /**
   * 查询业务数据
   * @param metaName 业务对象api名称
   * @param options 查询选项
   * @returns 业务数据列表
   */
  async queryData(e, t) {
    const r = i(e, t);
    return this.request("GET", r);
  }
  /**
   * 查询业务数据
   * @param sql 查询语句，支持where、order by、limit、offset等
   * @returns 业务数据列表
   */
  async queryDataBySQL(e) {
    const r = `/v1/data/query?sql=${encodeURIComponent(e)}`;
    return this.request("GET", r);
  }
  /**
   * 查询辅助或内置对象业务数据
   * @param metaName 业务对象api名称
   * @param options 查询选项
   * @returns 业务数据列表
   */
  async queryAuxiliaryData(e, t) {
    const r = i(e, t, "/v1/data/objects/listAuxiliaryBizData");
    return this.request("GET", r);
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
  async transferOwner(e, t, r, s, c) {
    if (!t)
      throw new Error("数据code不能为空");
    if (!r)
      throw new Error("新负责人code不能为空");
    return this.request("PATCH", `/oapi/v1/data/${e}/${t}/tansferOwner`, {
      newOwner: r,
      addTeam: s ? 1 : 0,
      deptFollowNewOwner: c ? 1 : 0
    });
  }
}
class T {
  constructor(e) {
    this.authService = e;
  }
  async request(e, t, r) {
    return this.authService.request(e, t, r);
  }
  /**
   * 获取用户对象描述
   * @returns 用户对象描述信息
   */
  async getUserDescription() {
    return this.request("GET", "/v1/data/app/userconfig/objects/User/description");
  }
  /**
   * 新建用户
   * @param userData 用户数据
   * @returns 用户code
   */
  async createUser(e) {
    return this.request("POST", "/v1/data/app/userconfig/objects/User", e);
  }
  /**
   * 修改用户数据
   * @param code 用户code
   * @param userData 用户数据
   * @returns 用户code
   */
  async updateUser(e, t) {
    return this.request("PATCH", `/v1/data/app/userconfig/objects/User/${e}`, t);
  }
  /**
   * 获取用户详情
   * @param code 用户code
   * @returns 用户详情
   */
  async getUserDetail(e) {
    return this.request("GET", `/v1/data/app/userconfig/objects/User/${e}`);
  }
  /**
   * 查询用户数据
   * @param options 查询选项
   * @returns 用户数据列表
   */
  async queryUsers(e) {
    const t = i("User", e, "/v1/data/app/userconfig/objects");
    return this.request("GET", t);
  }
  /**
   * 冻结用户
   * @param code 用户code
   * @returns 用户code
   */
  async freezeUser(e) {
    return this.request("POST", `/v1/data/app/userconfig/freeze/${e}`);
  }
  /**
   * 解冻用户
   * @param code 用户code
   * @returns 用户code
   */
  async unfreezeUser(e) {
    return this.request("POST", `/v1/data/app/userconfig/unfreeze/${e}`);
  }
  /**
   * 离职用户
   * @param code 用户code
   * @returns 用户code
   */
  async dimissionUser(e) {
    return this.request("POST", `/v1/data/app/userconfig/dimission/${e}`);
  }
  /**
   * 复职用户
   * @param code 用户code
   * @param dept 复职后部门
   * @param phone 绑定手机号
   * @returns 用户code
   */
  async resumeUser(e, t, r) {
    return this.request("POST", `/v1/data/app/userconfig/resume/${e}`, {
      dept: t,
      phone: r
    });
  }
  /**
   * 分配用户角色
   * @param code 用户code
   * @param roles 角色code集合
   * @returns 用户code
   */
  async assignRoles(e, t) {
    return this.request("POST", `/v1/data/app/userconfig/assignRoles/${e}`, {
      roles: t
    });
  }
  /**
   * 使用SQL查询用户数据
   * @param sql SQL查询语句
   * @returns 用户数据列表
   */
  async queryUsersBySQL(e) {
    const r = `/v1/data/app/userconfig/query?sql=${encodeURIComponent(e)}`;
    return this.request("GET", r);
  }
  /**
   * 调整部门
   * @param code 用户code
   * @param oldDeptCode 原部门code
   * @param newDeptCode 新部门code
   * @param transferData 是否转移部门下的数据
   * @returns 用户code
   */
  async transferUserDept(e, t, r, s) {
    return this.request("POST", `/v1/data/app/userconfig/transferUserDept/${e}`, {
      oldDeptCode: t,
      newDeptCode: r,
      transferData: s
    });
  }
}
class b {
  constructor(e) {
    this.authService = e;
  }
  async request(e, t, r) {
    return this.authService.request(e, t, r);
  }
  /**
   * 获取组织对象描述
   * @returns 组织对象描述信息
   */
  async getDeptDescription() {
    return this.request("GET", "/v1/data/app/orgconfig/objects/Org/description");
  }
  /**
   * 新建组织
   * @param deptData 组织数据
   * @returns 组织code
   */
  async createDept(e) {
    return this.request("POST", "/v1/data/app/orgconfig/objects/Org", e);
  }
  /**
   * 修改组织信息
   * @param code 组织code
   * @param deptData 组织数据
   * @returns 组织code
   */
  async updateDept(e, t) {
    return this.request("PATCH", `/v1/data/app/orgconfig/objects/Org/${e}`, t);
  }
  /**
   * 获取组织详情
   * @param code 组织code
   * @returns 组织详情
   */
  async getDeptDetail(e) {
    return this.request("GET", `/v1/data/app/orgconfig/objects/Org/${e}`);
  }
  /**
   * 查询组织数据
   * @param options 查询选项
   * @returns 组织数据列表
   */
  async queryDepts(e) {
    const t = i("Org", e, "/v1/data/app/orgconfig/objects");
    return this.request("GET", t);
  }
  /**
   * 使用SQL查询组织数据
   * @param sql SQL查询语句
   * @returns 组织数据列表
   */
  async queryDeptsBySQL(e) {
    const r = `/v1/data/app/orgconfig/query?sql=${encodeURIComponent(e)}`;
    return this.request("GET", r);
  }
  /**
   * 停用部门
   * @param code 部门code
   * @param moveToDeptCode 迁移部门code
   * @returns 部门code
   */
  async disableDept(e, t) {
    return this.request("PATCH", `/v1/data/app/orgconfig/objects/Org/disableOrg/${e}`, {
      moveToDeptCode: t
    });
  }
  /**
   * 启用部门
   * @param code 部门code
   * @returns 部门code
   */
  async enableDept(e) {
    return this.request("PATCH", `/v1/data/app/orgconfig/objects/Org/enableOrg/${e}`);
  }
  /**
   * 部门修改上级
   * @param code 部门code
   * @param dept 新上级部门code
   * @returns 修改后的部门code数组
   */
  async changeDeptParent(e, t) {
    return this.request("POST", `/v1/data/app/orgconfig/objects/Org/changeOrgDept/${e}`, {
      dept: t
    });
  }
}
class $ {
  constructor(e) {
    this.authService = e;
  }
  async request(e, t, r) {
    return this.authService.request(e, t, r);
  }
  /**
   * 获取角色对象描述
   * @returns 角色对象描述信息
   */
  async getRoleDescription() {
    return this.request("GET", "/v1/data/app/roleconfig/objects/Role/description");
  }
  /**
   * 新建角色
   * @param roleData 角色数据
   * @returns 角色code
   */
  async createRole(e) {
    return this.request("POST", "/v1/data/app/roleconfig/objects/Role", e);
  }
  /**
   * 修改角色信息
   * @param code 角色code
   * @param roleData 角色数据
   * @returns 角色code
   */
  async updateRole(e, t) {
    return this.request("PATCH", `/v1/data/app/roleconfig/objects/Role/${e}`, t);
  }
  /**
   * 获取角色详情
   * @param code 角色code
   * @returns 角色详情
   */
  async getRoleDetail(e) {
    return this.request("GET", `/v1/data/app/roleconfig/objects/Role/${e}`);
  }
  /**
   * 查询角色数据
   * @param options 查询选项
   * @returns 角色数据列表
   */
  async queryRoles(e) {
    const t = i("Role", e, "/v1/data/app/roleconfig/objects");
    return this.request("GET", t);
  }
  /**
   * 使用SQL查询角色数据
   * @param sql SQL查询语句
   * @returns 角色数据列表
   */
  async queryRolesBySQL(e) {
    const r = `/v1/data/app/roleconfig/query?sql=${encodeURIComponent(e)}`;
    return this.request("GET", r);
  }
}
class O {
  constructor(e) {
    this.authService = e;
  }
  async request(e, t, r) {
    return this.authService.request(e, t, r);
  }
  /**
   * 获取选项值集列表
   * @returns ConstantGroup[]
   */
  async getConstantGroups() {
    return this.request("GET", "/v1/data/constantgroups");
  }
  /**
   * 获取选项值集选项列表
   * @param groupName 选项值集名称
   * @returns ConstantOption[]
   */
  async getConstantOptions(e) {
    return this.request("GET", `/v1/data/constantgroups/${e}/constants`);
  }
  /**
   * 新增选项
   * @param groupName 选项值集名称
   * @param name 选项name
   * @param label 选项标签
   * @param parentName 上级选项name
   * @returns ConstantOption
   */
  async createConstantOption(e, t, r, s) {
    return this.request("POST", `/v1/data/constantgroups/${e}/constants`, {
      name: t,
      label: r,
      parentName: s
    });
  }
  /**
   * 修改选项
   * @param groupName 选项值集名称
   * @param optionName 选项name
   * @param label 选项标签
   * @returns ConstantOption
   */
  async updateConstantOption(e, t, r) {
    return this.request("PATCH", `/v1/data/constantgroups/${e}/constants/${t}`, {
      label: r
    });
  }
}
class m {
  constructor(e) {
    this.config = {
      pageSize: 10
    }, this.authService = new q(e), this.objectService = new D(this.authService), this.dataService = new f(this.authService), this.userService = new T(this.authService), this.deptService = new b(this.authService), this.roleService = new $(this.authService), this.constantGroupService = new O(this.authService);
  }
  /**
   * 获取业务对象列表
   * @returns ObjectMeta[]
   */
  async getObjects() {
    return this.objectService.getObjects();
  }
  /**
   * 获取业务对象描述
   * @param metaName 业务对象api名称
   * @returns ObjectMetaDetail
   */
  async getObjectDescription(e) {
    return this.objectService.getObjectDescription(e);
  }
  /**
   * 获取业务类型
   * @param metaName 业务对象api名称
   * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
   * @returns 创建的业务数据code
   */
  async createData(e, t) {
    return this.dataService.createData(e, t);
  }
  /**
   * 更新业务数据
   * @param metaName 业务对象api名称
   * @param code 业务数据code
   * @param data 字段数据 {fieldName: 'fieldValue'}
   * @returns 更新的业务数据code
   * @throws Error 更新业务数据失败
   */
  async updateData(e, t, r) {
    return this.dataService.updateData(e, t, r);
  }
  /**
   * 批量新增业务数据
   * @param metaName 业务对象api名称
   * @param records 业务数据数组，最多30条
   * @returns 创建的业务数据code数组
   */
  async batchCreateData(e, t) {
    return this.dataService.batchCreateData(e, t);
  }
  /**
   * 删除业务数据
   * @param metaName 业务对象api名称
   * @param code 业务数据code
   * @returns 删除的业务数据code
   */
  async deleteData(e, t) {
    return this.dataService.deleteData(e, t);
  }
  /**
   * 批量更新业务数据
   * @param metaName 业务对象api名称
   * @param records 业务数据数组，最多30条，每条必须包含code字段
   * @returns 更新的业务数据code数组
   */
  async batchUpdateData(e, t) {
    return this.dataService.batchUpdateData(e, t);
  }
  /**
   * 获取业务数据
   * @param metaName 业务对象api名称
   * @param code 业务数据code
   * @returns 业务数据
   */
  async getData(e, t) {
    return this.dataService.getData(e, t);
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
  async queryData(e, t) {
    return this.dataService.queryData(e, t);
  }
  /**
   * 查询业务数据
   * @param sql 查询语句，支持where、order by、limit、offset等
   * @returns 业务数据列表
   */
  async queryDataBySQL(e) {
    return this.dataService.queryDataBySQL(e);
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
  async queryAuxiliaryData(e, t) {
    return this.dataService.queryAuxiliaryData(e, t);
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
  async transferOwner(e, t, r, s, c) {
    return this.dataService.transferOwner(e, t, r, s, c);
  }
  /**
   * 获取用户对象描述
   * @returns 用户对象描述信息
   */
  async getUserDescription() {
    return this.userService.getUserDescription();
  }
  /**
   * 新建用户
   * @param userData 用户数据
   * @returns 用户code
   */
  async createUser(e) {
    return this.userService.createUser(e);
  }
  /**
   * 修改用户数据
   * @param code 用户code
   * @param userData 用户数据
   * @returns 用户code
   */
  async updateUser(e, t) {
    return this.userService.updateUser(e, t);
  }
  /**
   * 获取用户详情
   * @param code 用户code
   * @returns 用户详情
   */
  async getUserDetail(e) {
    return this.userService.getUserDetail(e);
  }
  /**
   * 获取组织对象描述
   * @returns 组织对象描述信息
   */
  async getDeptDescription() {
    return this.deptService.getDeptDescription();
  }
  /**
   * 新建组织
   * @param deptData 组织数据
   * @returns 组织code
   */
  async createDept(e) {
    return this.deptService.createDept(e);
  }
  /**
   * 修改组织信息
   * @param code 组织code
   * @param deptData 组织数据
   * @returns 组织code
   */
  async updateDept(e, t) {
    return this.deptService.updateDept(e, t);
  }
  /**
   * 获取组织详情
   * @param code 组织code
   * @returns 组织详情
   */
  async getDeptDetail(e) {
    return this.deptService.getDeptDetail(e);
  }
  /**
   * 查询组织数据
   * @param sql 查询SQL
   * @returns 组织数据列表
   */
  async queryDeptsBySQL(e) {
    return this.deptService.queryDeptsBySQL(e);
  }
  /**
   * 获取角色对象描述
   * @returns 角色对象描述信息
   */
  async getRoleDescription() {
    return this.roleService.getRoleDescription();
  }
  /**
   * 新建角色
   * @param roleData 角色数据
   * @returns 角色code
   */
  async createRole(e) {
    return this.roleService.createRole(e);
  }
  /**
   * 修改角色信息
   * @param code 角色code
   * @param roleData 角色数据
   * @returns 角色code
   */
  async updateRole(e, t) {
    return this.roleService.updateRole(e, t);
  }
  /**
   * 获取角色详情
   * @param code 角色code
   * @returns 角色详情
   */
  async getRoleDetail(e) {
    return this.roleService.getRoleDetail(e);
  }
  /**
   * 获取选项值集列表
   * @returns ConstantGroup[]
   */
  async getConstantGroups() {
    return this.constantGroupService.getConstantGroups();
  }
  /**
   * 获取选项值集选项列表
   * @param groupName 选项值集名称
   * @returns ConstantOption[]
   */
  async getConstantOptions(e) {
    return this.constantGroupService.getConstantOptions(e);
  }
  /**
   * 新增选项
   * @param groupName 选项值集名称
   * @param name 选项name
   * @param label 选项标签
   * @param parentName 上级选项name
   * @returns ConstantOption
   */
  async createConstantOption(e, t, r, s) {
    return this.constantGroupService.createConstantOption(e, t, r, s);
  }
  /**
   * 修改选项
   * @param groupName 选项值集名称
   * @param optionName 选项name
   * @param label 选项标签
   * @returns ConstantOption
   */
  async updateConstantOption(e, t, r) {
    return this.constantGroupService.updateConstantOption(e, t, r);
  }
}
export {
  S as BizHecomError,
  p as HecomError,
  v as NetHecomError,
  m as default
};
