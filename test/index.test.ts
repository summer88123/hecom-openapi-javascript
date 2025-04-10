import { describe, expect, test } from 'vitest';
import HClient from '../src/index';

describe('client test', () => {
    test('base test', async () => {
        const client = new HClient({
            clientId: 'hlhXFvf0n3JkMMBE',
            clientSecret: 'Qrwke0J1hzMrurGg72Dco7HLPA3iRE8p',
            username: '18519508327',
            apiHost: 'https://tc-dev.cloud.hecom.cn',
        });
        const objs = await client.getObjects();
        console.log(objs.filter(o => o.label.length > 10).length);
        console.log(objs.length);
        expect(objs).toBeDefined();
    });
});
