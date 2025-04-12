# hecom-openapi-javascript

红圈CRM+ OpenAPI SDK for JavaScript/TypeScript

## 安装

```bash
npm install hecom-openapi-javascript
```

## 快速开始

```typescript
import HClient from 'hecom-openapi-javascript';

// 创建客户端实例
const client = new HClient({
    clientId: 'your-client-id',        // 必填，客户端ID
    clientSecret: 'your-client-secret', // 必填，客户端密钥
    username: 'your-username',          // 必填，用户名
    apiHost: 'https://tc.cloud.hecom.cn' // 可选，API主机地址，默认为 https://tc.cloud.hecom.cn
});
```

## API 文档

### 业务对象相关接口

| 方法名               | 说明             | 参数             | 返回值                      |
| -------------------- | ---------------- | ---------------- | --------------------------- |
| getObjects           | 获取业务对象列表 | -                | `Promise<ObjectMeta[]>`     |
| getObjectDescription | 获取业务对象描述 | metaName: string | `Promise<ObjectMetaDetail>` |

### 业务数据操作接口

| 方法名             | 说明               | 参数                                                                                            | 返回值                 |
| ------------------ | ------------------ | ----------------------------------------------------------------------------------------------- | ---------------------- |
| createData         | 创建业务数据       | metaName: string, data: BizRecord                                                               | `Promise<string>`      |
| updateData         | 更新业务数据       | metaName: string, code: string, data: BizRecord                                                 | `Promise<string>`      |
| batchCreateData    | 批量创建业务数据   | metaName: string, records: BizRecord[]                                                          | `Promise<string[]>`    |
| deleteData         | 删除业务数据       | metaName: string, code: string                                                                  | `Promise<string>`      |
| batchUpdateData    | 批量更新业务数据   | metaName: string, records: BizRecord[]                                                          | `Promise<string[]>`    |
| getData            | 获取业务数据详情   | metaName: string, code: string                                                                  | `Promise<BizRecord>`   |
| queryData          | 查询业务数据       | metaName: string, options: QueryOptions                                                         | `Promise<QueryResult>` |
| queryDataBySQL     | SQL查询业务数据    | sql: string                                                                                     | `Promise<QueryResult>` |
| queryAuxiliaryData | 查询辅助对象数据   | metaName: string, options: QueryOptions                                                         | `Promise<QueryResult>` |
| transferOwner      | 业务数据转移负责人 | metaName: string, code: string, newOwner: string, addTeam: boolean, deptFollowNewOwner: boolean | `Promise<string>`      |

### 用户管理接口

| 方法名             | 说明             | 参数                              | 返回值                      |
| ------------------ | ---------------- | --------------------------------- | --------------------------- |
| getUserDescription | 获取用户对象描述 | -                                 | `Promise<ObjectMetaDetail>` |
| createUser         | 创建用户         | userData: BizRecord               | `Promise<string>`           |
| updateUser         | 更新用户信息     | code: string, userData: BizRecord | `Promise<string>`           |
| getUserDetail      | 获取用户详情     | code: string                      | `Promise<BizRecord>`        |

### 部门管理接口

| 方法名             | 说明             | 参数                              | 返回值                      |
| ------------------ | ---------------- | --------------------------------- | --------------------------- |
| getDeptDescription | 获取部门对象描述 | -                                 | `Promise<ObjectMetaDetail>` |
| createDept         | 创建部门         | deptData: BizRecord               | `Promise<string>`           |
| updateDept         | 更新部门信息     | code: string, deptData: BizRecord | `Promise<string>`           |
| getDeptDetail      | 获取部门详情     | code: string                      | `Promise<BizRecord>`        |

### 角色管理接口

| 方法名             | 说明             | 参数                              | 返回值                      |
| ------------------ | ---------------- | --------------------------------- | --------------------------- |
| getRoleDescription | 获取角色对象描述 | -                                 | `Promise<ObjectMetaDetail>` |
| createRole         | 创建角色         | roleData: BizRecord               | `Promise<string>`           |
| updateRole         | 更新角色信息     | code: string, roleData: BizRecord | `Promise<string>`           |
| getRoleDetail      | 获取角色详情     | code: string                      | `Promise<BizRecord>`        |

### 选项值集接口

| 方法名               | 说明             | 参数                                                                | 返回值                      |
| -------------------- | ---------------- | ------------------------------------------------------------------- | --------------------------- |
| getConstantGroups    | 获取选项值集列表 | -                                                                   | `Promise<ConstantGroup[]>`  |
| getConstantOptions   | 获取选项值集选项 | groupName: string                                                   | `Promise<ConstantOption[]>` |
| createConstantOption | 创建选项值       | groupName: string, name: string, label: string, parentName?: string | `Promise<ConstantOption>`   |
| updateConstantOption | 更新选项值       | groupName: string, optionName: string, label: string                | `Promise<ConstantOption>`   |

## 类型定义

### QueryOptions
```typescript
interface QueryOptions {
    selectFields: string[];    // 查询字段列表
    pageNo: number;           // 页码，从1开始
    pageSize: number;         // 每页记录数
    query: Record<string, string | number>; // 查询条件
}
```

### BizRecord
```typescript
interface BizRecord {
    id: number;              // 记录ID
    code: string;            // 记录编码
    name: string;            // 记录名称
    entCode: string;         // 企业编码
    metaName: string;        // 对象API名称
    status: number;          // 状态
    createdOn: number;       // 创建时间
    updatedOn: number;       // 更新时间
    [key: string]: unknown;  // 其他业务字段
}
```

## 异常处理

SDK 提供了三种异常类型：

- HecomError: 基础错误类
- NetHecomError: 网络相关错误
- BizHecomError: 业务逻辑错误

```typescript
try {
    await client.createData('objectName', data);
} catch (error) {
    if (error instanceof BizHecomError) {
        // 处理业务错误
    } else if (error instanceof NetHecomError) {
        // 处理网络错误
    }
}
```

## 许可证

查看 [LICENSE.md](./LICENSE.md) 文件了解详情。
