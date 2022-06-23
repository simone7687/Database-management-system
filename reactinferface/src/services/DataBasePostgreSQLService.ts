import { IPostGressIDBApi } from "model/IDBApi.js";
import { generalIHttpResponseLog, IHttpResponse } from "model/IHttpResponse";
import RequestsService from "./RequestsService";

class DataBasePostgreSQLService {
    url = "https://localhost:7119/PostgreSQL/";

    authService = new RequestsService();

    async connect(conn: IPostGressIDBApi, abortController: any) {
        var raw = JSON.stringify(conn);

        var requestOptions = {
            method: 'PUT',
            body: raw,
        };

        return this.authService.fetch(this.url + `Connect`, requestOptions, null, "", { signal: abortController.signal })
            .then((response: IHttpResponse) => {
                if (response && !response?.isSuccessStatusCode) {
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
