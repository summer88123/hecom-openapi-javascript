import { QueryOptions } from './types';

export function buildQueryUrl(
    metaName: string,
    { selectFields, pageNo, pageSize, query }: QueryOptions,
    basePath: string = '/v1/data/objects',
    defaultPageSize: number = 10
): string {
    const queryStr = query
        ? Object.keys(query).reduce((pre, cur) => {
              return `&${pre}${cur}=${query[cur]}`;
          }, '')
        : '';
    const selectFieldsStr =
        Array.isArray(selectFields) && selectFields.length > 0 ? selectFields.join(',') : 'code,name';
    const pageNoStr = pageNo ? pageNo : 1;
    const pageSizeStr = pageSize ? pageSize : defaultPageSize;
    return `${basePath}/${metaName}?selectFields=${selectFieldsStr}&pageNo=${pageNoStr}&pageSize=${pageSizeStr}${queryStr}`;
}
