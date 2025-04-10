import { AuthService } from './auth';
import { ConstantGroup, ConstantOption } from './types';
export declare class ConstantGroupService {
    private authService;
    constructor(authService: AuthService);
    private request;
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
