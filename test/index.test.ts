import { describe, expect, test, vi, beforeAll } from 'vitest';
import HClient, { QueryOptions } from '../src/index';
import { testConfig, validateConfig } from './env';

describe('client', () => {
    beforeAll(() => {
        // 确保环境变量已正确配置
        validateConfig();
    });
    console.log('testConfig', testConfig);
    const client = new HClient(testConfig);

    test('getObjects', async () => {
        const objs = await client.getObjects();
        console.log(objs.filter(o => o.label.length > 10));
        console.log(objs.length);
        expect(objs).toBeDefined();
    });

    test('getObjectDescription', async () => {
        const mockMetaName = 'project3X';
        const description = await client.getObjectDescription(mockMetaName);
        console.log(JSON.stringify(description, null, 2));
        expect(description).toBeDefined();
    });

    test('getUserDescription', async () => {
        const description = await client.getUserDescription();
        expect(description).toBeDefined();
    });

    test('getConstantGroups', async () => {
        const groups = await client.getConstantGroups();
        expect(groups).toBeDefined();
    });

    test('queryData', async () => {
        const queryOptions: QueryOptions = {
            selectFields: ['id', 'name', 'entCode'],
            pageNo: 1,
            pageSize: 10,
            query: { code: '1' },
        };
        const result = await client.queryData('PCLargeEquipmentACSTMDetailed', queryOptions);
        console.log(result);
        expect(result).toBeDefined();
    });

    test('queryDataBySQL', async () => {
        const sql = SQL_LIST[0];
        const result = await client.queryDataBySQL(sql);
        console.log(result);
        expect(result).toBeDefined();
    });
});
const SQL_LIST = [
    `SELECT name, signingDate, contractAmount FROM conContract3X WHERE businessType = 'o1' AND signingDate >= '2025-01-01' AND signingDate < '2026-01-01'`,
    `SELECT PCAmount, signDate, name FROM PCSTSupply LIMIT 10`,
    `SELECT SUM(PCAmount) AS 本月商砼合同总价格 FROM PCSTSupply WHERE YEAR(signDate) = 2025 AND MONTH(signDate) = 4 AND approvalStatus = 'approved'`,
];
