var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("src/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/error", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BizHecomError = exports.NetHecomError = exports.HecomError = void 0;
    exports.isHecomError = isHecomError;
    var HecomError = /** @class */ (function (_super) {
        __extends(HecomError, _super);
        function HecomError(message) {
            var _this = _super.call(this, message) || this;
            _this.name = 'HecomError';
            return _this;
        }
        return HecomError;
    }(Error));
    exports.HecomError = HecomError;
    var NetHecomError = /** @class */ (function (_super) {
        __extends(NetHecomError, _super);
        function NetHecomError(message, statusCode, url) {
            var _this = _super.call(this, message) || this;
            _this.name = 'NetHecomError';
            _this.statusCode = statusCode;
            _this.url = url;
            return _this;
        }
        return NetHecomError;
    }(HecomError));
    exports.NetHecomError = NetHecomError;
    var BizHecomError = /** @class */ (function (_super) {
        __extends(BizHecomError, _super);
        function BizHecomError(message, code, data) {
            var _this = _super.call(this, message) || this;
            _this.name = 'BizHecomError';
            _this.code = code;
            _this.data = data;
            return _this;
        }
        return BizHecomError;
    }(HecomError));
    exports.BizHecomError = BizHecomError;
    function isHecomError(error) {
        return error instanceof HecomError;
    }
});
define("src/auth", ["require", "exports", "axios", "base-64", "src/error"], function (require, exports, axios_1, base_64_1, error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthService = void 0;
    axios_1 = __importDefault(axios_1);
    base_64_1 = __importDefault(base_64_1);
    var AuthService = /** @class */ (function () {
        function AuthService(config) {
            this.refreshToken = null;
            this.expiresIn = 0;
            this.verifyConfig(config);
            this.authConfig = config;
        }
        AuthService.prototype.verifyConfig = function (config) {
            if (!config) {
                throw new Error('配置不能为空');
            }
            if (!config.clientId || !config.clientSecret) {
                throw new Error('clientId和clientSecret不能为空');
            }
            if (!config.username) {
                throw new Error('username不能为空');
            }
            if (!config.apiHost) {
                config.apiHost = 'tc.cloud.hecom.cn';
            }
        };
        AuthService.prototype.getAccessToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var authUrl, authHeader, data, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.accessToken && Date.now() < this.expiresIn) {
                                return [2 /*return*/, this.accessToken];
                            }
                            authUrl = "".concat(this.authConfig.apiHost, "/hecom-tenancy/oauth/token");
                            authHeader = "Basic ".concat(base_64_1.default.encode("".concat(this.authConfig.clientId, ":").concat(this.authConfig.clientSecret)));
                            data = this.accessToken
                                ? {
                                    grant_type: 'refresh_token',
                                    refresh_token: this.refreshToken || this.accessToken,
                                }
                                : {
                                    grant_type: 'client_credentials',
                                    username: this.authConfig.username,
                                };
                            return [4 /*yield*/, axios_1.default.post(authUrl, data, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: authHeader,
                                    },
                                })];
                        case 1:
                            response = _a.sent();
                            this.accessToken = response.data.access_token;
                            this.refreshToken = response.data.refresh_token;
                            this.expiresIn = Date.now() + response.data.expires_in * 1000;
                            this.endPoint = response.data.endPoint;
                            return [2 /*return*/, this.accessToken || ''];
                    }
                });
            });
        };
        AuthService.prototype.getEndPoint = function () {
            return this.endPoint;
        };
        AuthService.prototype.request = function (method, url, param) {
            return __awaiter(this, void 0, void 0, function () {
                var token, headers, data, error_2, err;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getAccessToken()];
                        case 1:
                            token = _a.sent();
                            headers = {
                                Authorization: "Bearer ".concat(token),
                                'Content-Type': 'application/json',
                            };
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, axios_1.default.request({
                                    method: method,
                                    url: url,
                                    data: param,
                                    headers: headers,
                                    baseURL: this.getEndPoint(),
                                })];
                        case 3:
                            data = (_a.sent()).data;
                            if (data.result === '0') {
                                return [2 /*return*/, data.data];
                            }
                            else {
                                throw new error_1.BizHecomError(data.desc, data);
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            if (axios_1.default.isAxiosError(error_2)) {
                                err = error_2;
                                throw new error_1.NetHecomError(err.response.data.desc, err.response.data.code, url);
                            }
                            else {
                                throw error_2;
                            }
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return AuthService;
    }());
    exports.AuthService = AuthService;
});
define("src/constantgroup", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConstantGroupService = void 0;
    var ConstantGroupService = /** @class */ (function () {
        function ConstantGroupService(authService) {
            this.authService = authService;
        }
        ConstantGroupService.prototype.request = function (method, url, param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.request(method, url, param)];
                });
            });
        };
        /**
         * 获取选项值集列表
         * @returns ConstantGroup[]
         */
        ConstantGroupService.prototype.getConstantGroups = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', '/v1/data/constantgroups')];
                });
            });
        };
        /**
         * 获取选项值集选项列表
         * @param groupName 选项值集名称
         * @returns ConstantOption[]
         */
        ConstantGroupService.prototype.getConstantOptions = function (groupName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', "/v1/data/constantgroups/".concat(groupName, "/constants"))];
                });
            });
        };
        /**
         * 新增选项
         * @param groupName 选项值集名称
         * @param name 选项name
         * @param label 选项标签
         * @param parentName 上级选项name
         * @returns ConstantOption
         */
        ConstantGroupService.prototype.createConstantOption = function (groupName, name, label, parentName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/constantgroups/".concat(groupName, "/constants"), {
                            name: name,
                            label: label,
                            parentName: parentName,
                        })];
                });
            });
        };
        /**
         * 修改选项
         * @param groupName 选项值集名称
         * @param optionName 选项name
         * @param label 选项标签
         * @returns ConstantOption
         */
        ConstantGroupService.prototype.updateConstantOption = function (groupName, optionName, label) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('PATCH', "/v1/data/constantgroups/".concat(groupName, "/constants/").concat(optionName), {
                            label: label,
                        })];
                });
            });
        };
        return ConstantGroupService;
    }());
    exports.ConstantGroupService = ConstantGroupService;
});
define("src/util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildQueryUrl = buildQueryUrl;
    function buildQueryUrl(metaName, _a, basePath, defaultPageSize) {
        var selectFields = _a.selectFields, pageNo = _a.pageNo, pageSize = _a.pageSize, query = _a.query;
        if (basePath === void 0) { basePath = '/v1/data/objects'; }
        if (defaultPageSize === void 0) { defaultPageSize = 10; }
        var queryStr = query
            ? Object.keys(query).reduce(function (pre, cur) {
                return "&".concat(pre).concat(cur, "=").concat(query[cur]);
            }, '')
            : '';
        var selectFieldsStr = Array.isArray(selectFields) && selectFields.length > 0 ? selectFields.join(',') : 'code,name';
        var pageNoStr = pageNo ? pageNo : 1;
        var pageSizeStr = pageSize ? pageSize : defaultPageSize;
        return "".concat(basePath, "/").concat(metaName, "?selectFields=").concat(selectFieldsStr, "&pageNo=").concat(pageNoStr, "&pageSize=").concat(pageSizeStr).concat(queryStr);
    }
});
define("src/data", ["require", "exports", "src/util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataService = void 0;
    var DataService = /** @class */ (function () {
        function DataService(authService) {
            this.authService = authService;
        }
        DataService.prototype.request = function (method, url, param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.request(method, url, param)];
                });
            });
        };
        /**
         * 获取业务类型
         * @param metaName 业务对象api名称
         * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
         * @returns 创建的业务数据code
         */
        DataService.prototype.createData = function (metaName, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/objects/".concat(metaName), data)];
                });
            });
        };
        /**
         * 更新业务数据
         * @param metaName 业务对象api名称
         * @param code 业务数据code
         * @param data 字段数据 {fieldName: 'fieldValue'}
         * @returns 更新的业务数据code
         * @throws Error 更新业务数据失败
         */
        DataService.prototype.updateData = function (metaName, code, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('PATCH', "/v1/data/objects/".concat(metaName, "/").concat(code), data)];
                });
            });
        };
        /**
         * 批量新增业务数据
         * @param metaName 业务对象api名称
         * @param records 业务数据数组，最多30条
         * @returns 创建的业务数据code数组
         */
        DataService.prototype.batchCreateData = function (metaName, records) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (records.length > 30) {
                        throw new Error('批量新增业务数据最多30条');
                    }
                    if (records.length === 0) {
                        throw new Error('批量新增业务数据不能为空');
                    }
                    return [2 /*return*/, this.request('POST', "/oapi/v1/data/objects/".concat(metaName, "/batch"), { records: records })];
                });
            });
        };
        /**
         * 删除业务数据
         * @param metaName 业务对象api名称
         * @param code 业务数据code
         * @returns 删除的业务数据code
         */
        DataService.prototype.deleteData = function (metaName, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('DELETE', "/v1/data/objects/".concat(metaName, "/").concat(code))];
                });
            });
        };
        /**
         * 批量更新业务数据
         * @param metaName 业务对象api名称
         * @param records 业务数据数组，最多30条，每条必须包含code字段
         * @returns 更新的业务数据code数组
         */
        DataService.prototype.batchUpdateData = function (metaName, records) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (records.length > 30) {
                        throw new Error('批量更新业务数据最多30条');
                    }
                    if (records.length === 0) {
                        throw new Error('批量更新业务数据不能为空');
                    }
                    if (records.some(function (record) { return !record.code; })) {
                        throw new Error('批量更新业务数据必须包含code字段');
                    }
                    return [2 /*return*/, this.request('PATCH', "/oapi/v1/data/objects/".concat(metaName, "/batch"), { records: records })];
                });
            });
        };
        /**
         * 获取业务数据
         * @param metaName 业务对象api名称
         * @param code 业务数据code
         * @returns 业务数据
         */
        DataService.prototype.getData = function (metaName, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', "/v1/data/objects/".concat(metaName, "/").concat(code))];
                });
            });
        };
        /**
         * 查询业务数据
         * @param metaName 业务对象api名称
         * @param options 查询选项
         * @returns 业务数据列表
         */
        DataService.prototype.queryData = function (metaName, options) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = (0, util_1.buildQueryUrl)(metaName, options);
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 查询业务数据
         * @param sql 查询语句，支持where、order by、limit、offset等
         * @returns 业务数据列表
         */
        DataService.prototype.queryDataBySQL = function (sql) {
            return __awaiter(this, void 0, void 0, function () {
                var encodedSql, url;
                return __generator(this, function (_a) {
                    encodedSql = encodeURIComponent(sql);
                    url = "/v1/data/query?sql=".concat(encodedSql);
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 查询辅助或内置对象业务数据
         * @param metaName 业务对象api名称
         * @param options 查询选项
         * @returns 业务数据列表
         */
        DataService.prototype.queryAuxiliaryData = function (metaName, options) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = (0, util_1.buildQueryUrl)(metaName, options, '/v1/data/objects/listAuxiliaryBizData');
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 业务数据转移负责人
         * @param metaName 业务对象的metaName
         * @param code 数据code
         * @param newOwner 新负责人code
         * @param addTeam 是否添加当前负责人为跟进人 (0 否 1 是)
         * @param deptFollowNewOwner 所属部门是否和新负责人保持一致 (0 否 1 是)
         * @returns 转移后的业务数据code
         */
        DataService.prototype.transferOwner = function (metaName, code, newOwner, addTeam, deptFollowNewOwner) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!code) {
                        throw new Error('数据code不能为空');
                    }
                    if (!newOwner) {
                        throw new Error('新负责人code不能为空');
                    }
                    return [2 /*return*/, this.request('PATCH', "/oapi/v1/data/".concat(metaName, "/").concat(code, "/tansferOwner"), {
                            newOwner: newOwner,
                            addTeam: addTeam ? 1 : 0,
                            deptFollowNewOwner: deptFollowNewOwner ? 1 : 0,
                        })];
                });
            });
        };
        return DataService;
    }());
    exports.DataService = DataService;
});
define("src/dept", ["require", "exports", "src/util"], function (require, exports, util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DeptService = void 0;
    var DeptService = /** @class */ (function () {
        function DeptService(authService) {
            this.authService = authService;
        }
        DeptService.prototype.request = function (method, url, param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.request(method, url, param)];
                });
            });
        };
        /**
         * 获取组织对象描述
         * @returns 组织对象描述信息
         */
        DeptService.prototype.getDeptDescription = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', '/v1/data/app/orgconfig/objects/Org/description')];
                });
            });
        };
        /**
         * 新建组织
         * @param deptData 组织数据
         * @returns 组织code
         */
        DeptService.prototype.createDept = function (deptData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', '/v1/data/app/orgconfig/objects/Org', deptData)];
                });
            });
        };
        /**
         * 修改组织信息
         * @param code 组织code
         * @param deptData 组织数据
         * @returns 组织code
         */
        DeptService.prototype.updateDept = function (code, deptData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('PATCH', "/v1/data/app/orgconfig/objects/Org/".concat(code), deptData)];
                });
            });
        };
        /**
         * 获取组织详情
         * @param code 组织code
         * @returns 组织详情
         */
        DeptService.prototype.getDeptDetail = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', "/v1/data/app/orgconfig/objects/Org/".concat(code))];
                });
            });
        };
        /**
         * 查询组织数据
         * @param options 查询选项
         * @returns 组织数据列表
         */
        DeptService.prototype.queryDepts = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = (0, util_2.buildQueryUrl)('Org', options, '/v1/data/app/orgconfig/objects');
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 使用SQL查询组织数据
         * @param sql SQL查询语句
         * @returns 组织数据列表
         */
        DeptService.prototype.queryDeptsBySQL = function (sql) {
            return __awaiter(this, void 0, void 0, function () {
                var encodedSql, url;
                return __generator(this, function (_a) {
                    encodedSql = encodeURIComponent(sql);
                    url = "/v1/data/app/orgconfig/query?sql=".concat(encodedSql);
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 停用部门
         * @param code 部门code
         * @param moveToDeptCode 迁移部门code
         * @returns 部门code
         */
        DeptService.prototype.disableDept = function (code, moveToDeptCode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('PATCH', "/v1/data/app/orgconfig/objects/Org/disableOrg/".concat(code), {
                            moveToDeptCode: moveToDeptCode,
                        })];
                });
            });
        };
        /**
         * 启用部门
         * @param code 部门code
         * @returns 部门code
         */
        DeptService.prototype.enableDept = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('PATCH', "/v1/data/app/orgconfig/objects/Org/enableOrg/".concat(code))];
                });
            });
        };
        /**
         * 部门修改上级
         * @param code 部门code
         * @param dept 新上级部门code
         * @returns 修改后的部门code数组
         */
        DeptService.prototype.changeDeptParent = function (code, dept) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/app/orgconfig/objects/Org/changeOrgDept/".concat(code), {
                            dept: dept,
                        })];
                });
            });
        };
        return DeptService;
    }());
    exports.DeptService = DeptService;
});
define("src/object", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObjectService = void 0;
    var ObjectService = /** @class */ (function () {
        function ObjectService(authService) {
            this.authService = authService;
        }
        ObjectService.prototype.request = function (method, url, param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.request(method, url, param)];
                });
            });
        };
        /**
         * 获取业务对象列表
         * @returns ObjectMeta[]
         */
        ObjectService.prototype.getObjects = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', "/v1/data/objects")];
                });
            });
        };
        /**
         * 获取业务对象描述
         * @param metaName 业务对象api名称
         * @returns ObjectMetaDetail
         */
        ObjectService.prototype.getObjectDescription = function (metaName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', "/oapi/v1/data/objects/".concat(metaName, "/description"))];
                });
            });
        };
        return ObjectService;
    }());
    exports.ObjectService = ObjectService;
});
define("src/user", ["require", "exports", "src/util"], function (require, exports, util_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserService = void 0;
    var UserService = /** @class */ (function () {
        function UserService(authService) {
            this.authService = authService;
        }
        UserService.prototype.request = function (method, url, param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.request(method, url, param)];
                });
            });
        };
        /**
         * 获取用户对象描述
         * @returns 用户对象描述信息
         */
        UserService.prototype.getUserDescription = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', '/v1/data/app/userconfig/objects/User/description')];
                });
            });
        };
        /**
         * 新建用户
         * @param userData 用户数据
         * @returns 用户code
         */
        UserService.prototype.createUser = function (userData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', '/v1/data/app/userconfig/objects/User', userData)];
                });
            });
        };
        /**
         * 修改用户数据
         * @param code 用户code
         * @param userData 用户数据
         * @returns 用户code
         */
        UserService.prototype.updateUser = function (code, userData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('PATCH', "/v1/data/app/userconfig/objects/User/".concat(code), userData)];
                });
            });
        };
        /**
         * 获取用户详情
         * @param code 用户code
         * @returns 用户详情
         */
        UserService.prototype.getUserDetail = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', "/v1/data/app/userconfig/objects/User/".concat(code))];
                });
            });
        };
        /**
         * 查询用户数据
         * @param options 查询选项
         * @returns 用户数据列表
         */
        UserService.prototype.queryUsers = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = (0, util_3.buildQueryUrl)('User', options, '/v1/data/app/userconfig/objects');
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 冻结用户
         * @param code 用户code
         * @returns 用户code
         */
        UserService.prototype.freezeUser = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/app/userconfig/freeze/".concat(code))];
                });
            });
        };
        /**
         * 解冻用户
         * @param code 用户code
         * @returns 用户code
         */
        UserService.prototype.unfreezeUser = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/app/userconfig/unfreeze/".concat(code))];
                });
            });
        };
        /**
         * 离职用户
         * @param code 用户code
         * @returns 用户code
         */
        UserService.prototype.dimissionUser = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/app/userconfig/dimission/".concat(code))];
                });
            });
        };
        /**
         * 复职用户
         * @param code 用户code
         * @param dept 复职后部门
         * @param phone 绑定手机号
         * @returns 用户code
         */
        UserService.prototype.resumeUser = function (code, dept, phone) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/app/userconfig/resume/".concat(code), {
                            dept: dept,
                            phone: phone,
                        })];
                });
            });
        };
        /**
         * 分配用户角色
         * @param code 用户code
         * @param roles 角色code集合
         * @returns 用户code
         */
        UserService.prototype.assignRoles = function (code, roles) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/app/userconfig/assignRoles/".concat(code), {
                            roles: roles,
                        })];
                });
            });
        };
        /**
         * 使用SQL查询用户数据
         * @param sql SQL查询语句
         * @returns 用户数据列表
         */
        UserService.prototype.queryUsersBySQL = function (sql) {
            return __awaiter(this, void 0, void 0, function () {
                var encodedSql, url;
                return __generator(this, function (_a) {
                    encodedSql = encodeURIComponent(sql);
                    url = "/v1/data/app/userconfig/query?sql=".concat(encodedSql);
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 调整部门
         * @param code 用户code
         * @param oldDeptCode 原部门code
         * @param newDeptCode 新部门code
         * @param transferData 是否转移部门下的数据
         * @returns 用户code
         */
        UserService.prototype.transferUserDept = function (code, oldDeptCode, newDeptCode, transferData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', "/v1/data/app/userconfig/transferUserDept/".concat(code), {
                            oldDeptCode: oldDeptCode,
                            newDeptCode: newDeptCode,
                            transferData: transferData,
                        })];
                });
            });
        };
        return UserService;
    }());
    exports.UserService = UserService;
});
define("src/role", ["require", "exports", "src/util"], function (require, exports, util_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RoleService = void 0;
    var RoleService = /** @class */ (function () {
        function RoleService(authService) {
            this.authService = authService;
        }
        RoleService.prototype.request = function (method, url, param) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.request(method, url, param)];
                });
            });
        };
        /**
         * 获取角色对象描述
         * @returns 角色对象描述信息
         */
        RoleService.prototype.getRoleDescription = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', '/v1/data/app/roleconfig/objects/Role/description')];
                });
            });
        };
        /**
         * 新建角色
         * @param roleData 角色数据
         * @returns 角色code
         */
        RoleService.prototype.createRole = function (roleData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('POST', '/v1/data/app/roleconfig/objects/Role', roleData)];
                });
            });
        };
        /**
         * 修改角色信息
         * @param code 角色code
         * @param roleData 角色数据
         * @returns 角色code
         */
        RoleService.prototype.updateRole = function (code, roleData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('PATCH', "/v1/data/app/roleconfig/objects/Role/".concat(code), roleData)];
                });
            });
        };
        /**
         * 获取角色详情
         * @param code 角色code
         * @returns 角色详情
         */
        RoleService.prototype.getRoleDetail = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.request('GET', "/v1/data/app/roleconfig/objects/Role/".concat(code))];
                });
            });
        };
        /**
         * 查询角色数据
         * @param options 查询选项
         * @returns 角色数据列表
         */
        RoleService.prototype.queryRoles = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_a) {
                    url = (0, util_4.buildQueryUrl)('Role', options, '/v1/data/app/roleconfig/objects');
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        /**
         * 使用SQL查询角色数据
         * @param sql SQL查询语句
         * @returns 角色数据列表
         */
        RoleService.prototype.queryRolesBySQL = function (sql) {
            return __awaiter(this, void 0, void 0, function () {
                var encodedSql, url;
                return __generator(this, function (_a) {
                    encodedSql = encodeURIComponent(sql);
                    url = "/v1/data/app/roleconfig/query?sql=".concat(encodedSql);
                    return [2 /*return*/, this.request('GET', url)];
                });
            });
        };
        return RoleService;
    }());
    exports.RoleService = RoleService;
});
define("src/index", ["require", "exports", "src/error", "src/auth", "src/object", "src/data", "src/user", "src/dept", "src/role", "src/constantgroup"], function (require, exports, error_3, auth_1, object_1, data_1, user_1, dept_1, role_1, constantgroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BizHecomError = exports.NetHecomError = exports.HecomError = void 0;
    Object.defineProperty(exports, "HecomError", { enumerable: true, get: function () { return error_3.HecomError; } });
    Object.defineProperty(exports, "NetHecomError", { enumerable: true, get: function () { return error_3.NetHecomError; } });
    Object.defineProperty(exports, "BizHecomError", { enumerable: true, get: function () { return error_3.BizHecomError; } });
    var HClient = /** @class */ (function () {
        function HClient(config) {
            this.config = {
                pageSize: 10,
            };
            this.authService = new auth_1.AuthService(config);
            this.objectService = new object_1.ObjectService(this.authService);
            this.dataService = new data_1.DataService(this.authService);
            this.userService = new user_1.UserService(this.authService);
            this.deptService = new dept_1.DeptService(this.authService);
            this.roleService = new role_1.RoleService(this.authService);
            this.constantGroupService = new constantgroup_1.ConstantGroupService(this.authService);
        }
        /**
         * 获取业务对象列表
         * @returns ObjectMeta[]
         */
        HClient.prototype.getObjects = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.objectService.getObjects()];
                });
            });
        };
        /**
         * 获取业务对象描述
         * @param metaName 业务对象api名称
         * @returns ObjectMetaDetail
         */
        HClient.prototype.getObjectDescription = function (metaName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.objectService.getObjectDescription(metaName)];
                });
            });
        };
        /**
         * 获取业务类型
         * @param metaName 业务对象api名称
         * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
         * @returns 创建的业务数据code
         */
        HClient.prototype.createData = function (metaName, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.createData(metaName, data)];
                });
            });
        };
        /**
         * 更新业务数据
         * @param metaName 业务对象api名称
         * @param code 业务数据code
         * @param data 字段数据 {fieldName: 'fieldValue'}
         * @returns 更新的业务数据code
         * @throws Error 更新业务数据失败
         */
        HClient.prototype.updateData = function (metaName, code, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.updateData(metaName, code, data)];
                });
            });
        };
        /**
         * 批量新增业务数据
         * @param metaName 业务对象api名称
         * @param records 业务数据数组，最多30条
         * @returns 创建的业务数据code数组
         */
        HClient.prototype.batchCreateData = function (metaName, records) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.batchCreateData(metaName, records)];
                });
            });
        };
        /**
         * 删除业务数据
         * @param metaName 业务对象api名称
         * @param code 业务数据code
         * @returns 删除的业务数据code
         */
        HClient.prototype.deleteData = function (metaName, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.deleteData(metaName, code)];
                });
            });
        };
        /**
         * 批量更新业务数据
         * @param metaName 业务对象api名称
         * @param records 业务数据数组，最多30条，每条必须包含code字段
         * @returns 更新的业务数据code数组
         */
        HClient.prototype.batchUpdateData = function (metaName, records) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.batchUpdateData(metaName, records)];
                });
            });
        };
        /**
         * 获取业务数据
         * @param metaName 业务对象api名称
         * @param code 业务数据code
         * @returns 业务数据
         */
        HClient.prototype.getData = function (metaName, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.getData(metaName, code)];
                });
            });
        };
        /**
         * 查询业务数据
         * @param metaName 业务对象api名称
         * @param selectFields 要查询的字段列表
         * @param pageNo 页码，从1开始，不传则默认为1
         * @param pageSize 每页大小，不传则默认为10
         * @param query 查询条件，格式为 {fieldName: value}
         * @returns 业务数据列表
         */
        HClient.prototype.queryData = function (metaName, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.queryData(metaName, options)];
                });
            });
        };
        /**
         * 查询业务数据
         * @param sql 查询语句，支持where、order by、limit、offset等
         * @returns 业务数据列表
         */
        HClient.prototype.queryDataBySQL = function (sql) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.queryDataBySQL(sql)];
                });
            });
        };
        /**
         * 查询辅助或内置对象业务数据
         * @param metaName 业务对象api名称
         * @param selectFields 要查询的字段列表
         * @param pageNo 页码，从1开始，不传则默认为1
         * @param pageSize 每页大小，不传则默认为10
         * @param query 查询条件，格式为 {fieldName: value}
         * @returns 业务数据列表
         */
        HClient.prototype.queryAuxiliaryData = function (metaName, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.queryAuxiliaryData(metaName, options)];
                });
            });
        };
        /**
         * 业务数据转移负责人
         * @param metaName 业务对象的metaName
         * @param code 数据code
         * @param newOwner 新负责人code
         * @param addTeam 是否添加当前负责人为跟进人 (0 否 1 是)
         * @param deptFollowNewOwner 所属部门是否和新负责人保持一致 (0 否 1 是)
         * @returns 转移后的业务数据code
         */
        HClient.prototype.transferOwner = function (metaName, code, newOwner, addTeam, deptFollowNewOwner) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.dataService.transferOwner(metaName, code, newOwner, addTeam, deptFollowNewOwner)];
                });
            });
        };
        /**
         * 获取用户对象描述
         * @returns 用户对象描述信息
         */
        HClient.prototype.getUserDescription = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userService.getUserDescription()];
                });
            });
        };
        /**
         * 新建用户
         * @param userData 用户数据
         * @returns 用户code
         */
        HClient.prototype.createUser = function (userData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userService.createUser(userData)];
                });
            });
        };
        /**
         * 修改用户数据
         * @param code 用户code
         * @param userData 用户数据
         * @returns 用户code
         */
        HClient.prototype.updateUser = function (code, userData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userService.updateUser(code, userData)];
                });
            });
        };
        /**
         * 获取用户详情
         * @param code 用户code
         * @returns 用户详情
         */
        HClient.prototype.getUserDetail = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userService.getUserDetail(code)];
                });
            });
        };
        /**
         * 获取组织对象描述
         * @returns 组织对象描述信息
         */
        HClient.prototype.getDeptDescription = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.deptService.getDeptDescription()];
                });
            });
        };
        /**
         * 新建组织
         * @param deptData 组织数据
         * @returns 组织code
         */
        HClient.prototype.createDept = function (deptData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.deptService.createDept(deptData)];
                });
            });
        };
        /**
         * 修改组织信息
         * @param code 组织code
         * @param deptData 组织数据
         * @returns 组织code
         */
        HClient.prototype.updateDept = function (code, deptData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.deptService.updateDept(code, deptData)];
                });
            });
        };
        /**
         * 获取组织详情
         * @param code 组织code
         * @returns 组织详情
         */
        HClient.prototype.getDeptDetail = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.deptService.getDeptDetail(code)];
                });
            });
        };
        /**
         * 获取角色对象描述
         * @returns 角色对象描述信息
         */
        HClient.prototype.getRoleDescription = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roleService.getRoleDescription()];
                });
            });
        };
        /**
         * 新建角色
         * @param roleData 角色数据
         * @returns 角色code
         */
        HClient.prototype.createRole = function (roleData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roleService.createRole(roleData)];
                });
            });
        };
        /**
         * 修改角色信息
         * @param code 角色code
         * @param roleData 角色数据
         * @returns 角色code
         */
        HClient.prototype.updateRole = function (code, roleData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roleService.updateRole(code, roleData)];
                });
            });
        };
        /**
         * 获取角色详情
         * @param code 角色code
         * @returns 角色详情
         */
        HClient.prototype.getRoleDetail = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.roleService.getRoleDetail(code)];
                });
            });
        };
        /**
         * 获取选项值集列表
         * @returns ConstantGroup[]
         */
        HClient.prototype.getConstantGroups = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.constantGroupService.getConstantGroups()];
                });
            });
        };
        /**
         * 获取选项值集选项列表
         * @param groupName 选项值集名称
         * @returns ConstantOption[]
         */
        HClient.prototype.getConstantOptions = function (groupName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.constantGroupService.getConstantOptions(groupName)];
                });
            });
        };
        /**
         * 新增选项
         * @param groupName 选项值集名称
         * @param name 选项name
         * @param label 选项标签
         * @param parentName 上级选项name
         * @returns ConstantOption
         */
        HClient.prototype.createConstantOption = function (groupName, name, label, parentName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.constantGroupService.createConstantOption(groupName, name, label, parentName)];
                });
            });
        };
        /**
         * 修改选项
         * @param groupName 选项值集名称
         * @param optionName 选项name
         * @param label 选项标签
         * @returns ConstantOption
         */
        HClient.prototype.updateConstantOption = function (groupName, optionName, label) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.constantGroupService.updateConstantOption(groupName, optionName, label)];
                });
            });
        };
        return HClient;
    }());
    exports.default = HClient;
});
