export declare class HecomError extends Error {
    constructor(message: string);
}
export declare class NetHecomError extends HecomError {
    statusCode: number;
    url: string;
    constructor(message: string, statusCode: number, url: string);
}
export declare class BizHecomError extends HecomError {
    code: string;
    data?: any;
    constructor(message: string, code: string, data?: any);
}
export declare function isHecomError(error: Error): error is HecomError;
