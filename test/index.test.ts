import { describe, expect, test, vi } from 'vitest';
import HClient, { QueryOptions } from '../src/index';

describe('client', () => {
    const client = new HClient({
        clientId: 'hlhXFvf0n3JkMMBE',
        clientSecret: 'Qrwke0J1hzMrurGg72Dco7HLPA3iRE8p',
        username: '18519508327',
        apiHost: 'https://tc-dev.cloud.hecom.cn',
    });

    test('getObjects', async () => {
        const objs = await client.getObjects();
        console.log(objs.filter(o => o.label.length > 10));
        console.log(objs.length);
        expect(objs).toBeDefined();
    });

    test('getObjectDescription', async () => {
        const mockMetaName = 'PCLargeEquipmentACSTMDetailed';
        const description = await client.getObjectDescription(mockMetaName);
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
});
