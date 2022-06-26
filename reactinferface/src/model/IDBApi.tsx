
export type IDBApi = {
    key: string,
}

export interface IPostGressIDBApi extends IDBApi {
    host: string,
    user: string,
    dbName: string,
    password: string,
    port: string,
}

export interface IPostGressQuery extends IPostGressIDBApi {
    query?: string,
}
