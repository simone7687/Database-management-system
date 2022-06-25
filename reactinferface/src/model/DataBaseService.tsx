import { IDBApi } from "./IDBApi"
import { IHttpResponse } from "./IHttpResponse"
import { InfoTabelleModel } from "./InfoTabelleModel"

export interface DataBaseService<T extends IDBApi> {
    connect: (conn: T, abortController: any) => Promise<IHttpResponse<any>>
    getTablesListName: (conn: T, abortController: any) => Promise<IHttpResponse<string[]>>
    getInfoTables: (conn: T, tableName: string, abortController: any) => Promise<IHttpResponse<InfoTabelleModel[]>>
}
