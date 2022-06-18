
export type IDBApi = {
    key: string,
}

export interface PostGressIDBApi extends IDBApi {
    host: string,
    user: string,
    dbName: string,
    password: string,
    port: string,
}
