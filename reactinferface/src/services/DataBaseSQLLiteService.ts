import { SQLiteConnectionModel, SQLiteQueryModel } from "model/ConnectionModels";
import { DataBaseService } from "model/DataBaseService";
import { generalIHttpResponseLog, IHttpResponse } from "model/IHttpResponse";
import { InfoTabelleModel } from "model/InfoTabelleModel";
import { QueyData } from "model/QueyData";
import RequestsService from "./RequestsService";

class DataBaseSQLiteService implements DataBaseService<SQLiteConnectionModel> {
    url = process.env.REACT_APP_API_URL + "/SQLite/";

    authService = new RequestsService();

    async connect(conn: SQLiteConnectionModel, abortController: any) {
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

    async getTablesListName(conn: SQLiteConnectionModel, abortController: any) {
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

    async getInfoTables(conn: SQLiteConnectionModel, tableName: string, abortController: any) {
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

    async executeQueries(conn: SQLiteConnectionModel, queryText: string, abortController: any) {
        if (queryText === '') {
            queryText = "--"
        }
        let querybody: SQLiteQueryModel = { ...conn, query: queryText };

        var raw = JSON.stringify(querybody);

        var requestOptions = {
            method: 'POST',
            body: raw,
        };

        return this.authService.fetch(this.url + "ExecuteQueries", requestOptions, null, "", { signal: abortController.signal })
            .then((response: IHttpResponse<QueyData[]>) => {
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
export default DataBaseSQLiteService;
