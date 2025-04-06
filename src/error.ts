export class HecomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'HecomError';
    }
}

export class NetHecomError extends HecomError {
    public statusCode: number;
    public url: string;

    constructor(message: string, statusCode: number, url: string) {
        super(message);
        this.name = 'NetHecomError';
        this.statusCode = statusCode;
        this.url = url;
    }
}

export class BizHecomError extends HecomError {
    public code: string;
    public data?: any;

    constructor(message: string, code: string, data?: any) {
        super(message);
        this.name = 'BizHecomError';
        this.code = code;
        this.data = data;
    }
}

export function isHecomError(error: Error): error is HecomError {
    return error instanceof HecomError;
}