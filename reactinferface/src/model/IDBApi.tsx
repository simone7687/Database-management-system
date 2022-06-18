
export type IDBApi = {
    key: string,
}

export interface PostGressIDBApi extends IDBApi {
    host: string;
}
