import { DataBaseService } from "model/DataBaseService";
import { IPostGressIDBApi } from "model/IDBApi";
import { generalIHttpResponseLog, IHttpResponse } from "model/IHttpResponse";
import { InfoTabelleModel } from "model/InfoTabelleModel";
import RequestsService from "./RequestsService";

class DataBasePostgreSQLService implements DataBaseService<IPostGressIDBApi> {
    url = "https://localhost:7119/PostgreSQL/";

    authService = new RequestsService();

    async connect(conn: IPostGressIDBApi, abortController: any) {
        var raw = JSON.stringify(conn);

        var requestOptions = {
            method: 'PUT',
            body: raw,
        };

        return this.authService.fetch(this.url + `Connect`, requestOptions, null, "", { signal: abortController.signal })
            .then((response: IHttpResponse<any>) => {
                if (response) {
                    generalIHttpResponseLog(response)
                }
                return response;
            })
            .catch((res) => {
                window.alert("Unmanaged error");
                throw Object.assign(
                    new Error(res.toString()),
                );
            });
    }

    async getTablesListName(conn: IPostGressIDBApi, abortController: any) {
        var raw = JSON.stringify(conn);

        var requestOptions = {
            method: 'POST',
            body: raw,
        };

        return this.authService.fetch(this.url + `GetTablesListName`, requestOptions, null, "", { signal: abortController.signal })
            .then((response: IHttpResponse<string[]>) => {
                if (response) {
                    generalIHttpResponseLog(response)
                }
                return response;
            })
            .catch((res) => {
                window.alert("Unmanaged error");
                throw Object.assign(
                    new Error(res.toString()),
                );
            });
    }

    async getInfoTables(conn: IPostGressIDBApi, tableName: string, abortController: any) {
        var raw = JSON.stringify(conn);

        var requestOptions = {
            method: 'POST',
            body: raw,
        };

        return this.authService.fetch(this.url + "GetInfoTables?tableName=" + tableName, requestOptions, null, "", { signal: abortController.signal })
            .then((response: IHttpResponse<InfoTabelleModel[]>) => {
                if (response) {
                    generalIHttpResponseLog(response)
                }
                return response;
            })
            .catch((res) => {
                window.alert("Unmanaged error");
                throw Object.assign(
                    new Error(res.toString()),
                );
            });
    }
}
export default DataBasePostgreSQLService;
