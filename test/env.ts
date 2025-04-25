import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 加载环境变量
dotenv.config({ path: resolve(__dirname, '../.env') });

/**
 * 测试环境配置
 */
export const testConfig = {
    clientId: process.env.HECOM_CLIENT_ID || '',
    clientSecret: process.env.HECOM_CLIENT_SECRET || '',
    username: process.env.HECOM_USERNAME || '',
    apiHost: process.env.HECOM_API_HOST || '',
};

/**
 * 验证配置是否完整
 */
export function validateConfig() {
    const missingVars = Object.entries(testConfig)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missingVars.length > 0) {
        throw new Error(`缺少必要的环境变量: ${missingVars.join(', ')}。请确保 .env 文件已正确配置。`);
    }
}
