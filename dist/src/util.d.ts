import { QueryOptions } from './types';
export declare function buildQueryUrl(metaName: string, { selectFields, pageNo, pageSize, query }: QueryOptions, basePath?: string, defaultPageSize?: number): string;
