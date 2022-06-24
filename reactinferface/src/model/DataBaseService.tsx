import { IDBApi } from "./IDBApi"
import { IHttpResponse } from "./IHttpResponse"

export interface DataBaseService<T extends IDBApi> {
    connect: (conn: T, abortController: any) => Promise<IHttpResponse<any>>
    getTableListName: (conn: T, abortController: any) => Promise<IHttpResponse<string[]>>
}
