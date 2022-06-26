import { DataBaseService } from "model/DataBaseService";
import { atom } from "recoil";

type IsetListDB = {
    id?: string,
    conn?: any,
    dataBaseService?: DataBaseService<any> | undefined,
}

export const selectDBState = atom<IsetListDB>({
    key: "selectDB",
    default: { id: undefined, conn: undefined, dataBaseService: undefined },
});
