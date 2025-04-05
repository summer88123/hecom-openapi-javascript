import { AuthService } from './auth';
import { ConstantGroup, ConstantOption } from './types';

export class ConstantGroupService {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    private async request<R, P = void>(method: string, url: string, param?: P): Promise<R> {
        return this.authService.request(method, url, param);
    }

    /**
     * 获取选项值集列表
     * @returns ConstantGroup[]
     */
    public async getConstantGroups(): Promise<ConstantGroup[]> {
        return this.request('GET', '/v1/data/constantgroups');
    }

    /**
     * 获取选项值集选项列表
     * @param groupName 选项值集名称
     * @returns ConstantOption[]
     */
    public async getConstantOptions(groupName: string): Promise<ConstantOption[]> {
        return this.request('GET', `/v1/data/constantgroups/${groupName}/constants`);
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
        return this.request('POST', `/v1/data/constantgroups/${groupName}/constants`, {
            name,
            label,
            parentName,
        });
    }

    /**
     * 修改选项
     * @param groupName 选项值集名称
     * @param optionName 选项name
     * @param label 选项标签
     * @returns ConstantOption
     */
    public async updateConstantOption(groupName: string, optionName: string, label: string): Promise<ConstantOption> {
        return this.request('PATCH', `/v1/data/constantgroups/${groupName}/constants/${optionName}`, {
            label,
        });
    }
}
