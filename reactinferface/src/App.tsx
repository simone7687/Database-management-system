// import your route components too

import { AppBar, Box, Button, CircularProgress, CssBaseline, DialogContentText, Grid, Toolbar, Typography } from "@mui/material";
import { selectDBState } from "atom/selectDBAtom";
import MultiCodeEditor from "components/MultiCodeEditor";
import MyAutocomplete from "components/MyAutocomplete";
import MyDialog from "components/MyDialog";
import MyTextField from "components/MyTextField";
import MyTextFieldControlled from "components/MyTextFieldControlled";
import Sidebars from "components/Sidebars";
import SideDatabase from "components/SideDatabase";
import { PostgreSQLConnectionModel, SQLiteConnectionModel } from "model/ConnectionModels";
import { IHttpResponse } from "model/IHttpResponse";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRecoilState } from "recoil";
import DataBasePostgreSQLService from "services/DataBasePostgreSQLService";
import DataBaseSQLiteService from "services/DataBaseSQLLiteService";

const drawerWidth = 400;
const postgreSQLService = new DataBasePostgreSQLService();
const SQLiteService = new DataBaseSQLiteService();

function App() {
    // PostgreSQL
    const [dbPostgreSQLList, setDBPostgreSQLListState] = useState<PostgreSQLConnectionModel[]>(JSON.parse(localStorage.getItem('dbPostgreSQLList') || "null") || [])
    const [openPostgreSQLDialog, setOpenPostgreSQLDialog] = useState(false)
    const [openErrorPostgreSQLDialog, setOpenErrorPostgreSQLDialog] = useState(false)
    const [itemToEditPostgreSQL, setItemToEditPostgreSQL] = useState<PostgreSQLConnectionModel>()
    const [errorFieldsPostgreSQL, setErrorFieldsPostgreSQL] = useState<string[]>([])
    // SQLite
    const [dbSQLiteList, setDBSQLiteListState] = useState<SQLiteConnectionModel[]>(JSON.parse(localStorage.getItem('dbSQLiteList') || "null") || [])
    const [openSQLiteDialog, setOpenSQLiteDialog] = useState(false)
    const [openErrorSQLiteDialog, setOpenErrorSQLiteDialog] = useState(false)
    const [itemToEditSQLite, setItemToEditSQLite] = useState<SQLiteConnectionModel>()
    const [errorFieldsSQLite, setErrorFieldsSQLite] = useState<string[]>([])
    //Olther
    const [listDBToSelect, setListDBToSelect] = useState<string[]>([])
    const [selectDB, setSelectDB] = useRecoilState(selectDBState)
    const [openProgressBarDialog, setOpenProgressBarDialog] = useState(false)

    function handleInputChangeGeneric(event: any, itemToEdit: any, setItemToEdit: any, id?: string, newVal?: any) {
        const target = event.target;
        var value = target.value;
        if (newVal) {
            value = newVal;
        }
        var idModel = id ? id : event.currentTarget.id

        setItemToEdit({
            ...itemToEdit,
            [idModel]: value
        })
    }

    function handleInputSelectBD(value?: string | null) {
        if (!value || value === "") {
            setSelectDB({ id: undefined, conn: undefined })
            return
        }
        try {
            console.log(selectDB)
            let a = value.split(" - ")
            if (a[1] === "PostgreSQL") {
                let c = dbPostgreSQLList.find((item: PostgreSQLConnectionModel) => {
                    return item.key === a[0]
                })
                setSelectDB({ id: a[0], conn: c, dataBaseService: postgreSQLService })
            }
            else if (a[1] === "SQLite") {
                let c = dbSQLiteList.find((item: SQLiteConnectionModel) => {
                    return item.key === a[0]
                })
                setSelectDB({ id: a[0], conn: c, dataBaseService: SQLiteService })
            }
        }
        catch (er: any) {
            setSelectDB({ id: undefined, conn: undefined, dataBaseService: undefined })
        }
    }

    useEffect(() => {
        var dbPostgreSQLListName = dbPostgreSQLList.map((item) => {
            return (item.key + " - PostgreSQL")
        })
        var dbSQLiteListName = dbSQLiteList.map((item) => {
            return (item.key + " - SQLite")
        })
        setListDBToSelect([...dbPostgreSQLListName, ...dbSQLiteListName])
    }, [dbPostgreSQLList, dbSQLiteList])

    const setDBPostgreSQLList = (list: PostgreSQLConnectionModel[]) => {
        setDBPostgreSQLListState(list)
        localStorage.setItem('dbPostgreSQLList', JSON.stringify(list));
    }

    const addDBPostgreSQL = () => {
        setOpenPostgreSQLDialog(true);
    }

    const setDBSQLiteList = (list: SQLiteConnectionModel[]) => {
        setDBSQLiteListState(list)
        localStorage.setItem('dbSQLiteList', JSON.stringify(list));
    }

    const addDBSQLite = () => {
        setOpenSQLiteDialog(true);
    }

    const handleCloseDialogs = () => {
        setOpenPostgreSQLDialog(false);
        setOpenSQLiteDialog(false);
        setOpenProgressBarDialog(false);
        setOpenErrorSQLiteDialog(false);
    };

    const handleSendPostgreSQL = (item: PostgreSQLConnectionModel) => {
        setErrorFieldsPostgreSQL([])
        var er = []
        if (!item.key || item.key === "") {
            er.push("key")
        }
        if (!item.dbName || item.dbName === "") {
            er.push("dbName")
        }
        if (!item.host || item.host === "") {
            er.push("host")
        }
        if (!item.password || item.password === "") {
            er.push("password")
        }
        if (!item.port || item.port === "") {
            er.push("port")
        }
        if (!item.user || item.user === "") {
            er.push("user")
        }
        setErrorFieldsPostgreSQL(er)
        if (er.length > 0) {
            return
        }

        setOpenPostgreSQLDialog(false);
        setOpenErrorPostgreSQLDialog(false);
        setOpenProgressBarDialog(true);

        const abortController = new AbortController();
        postgreSQLService.connect(item, abortController).then((res: IHttpResponse<string>) => {
            if (abortController.signal.aborted) {
                return;
            }
            if (res.isSuccessStatusCode && itemToEditPostgreSQL) {
                let list = dbPostgreSQLList

                let b = listDBToSelect
                b.push(itemToEditPostgreSQL.key + " - PostgreSQL")
                setListDBToSelect(b)

                list.push(itemToEditPostgreSQL)
                setDBPostgreSQLList(list)
                setItemToEditPostgreSQL(undefined)
                setOpenProgressBarDialog(false);
            }
            else {
                setOpenProgressBarDialog(false);
                setOpenPostgreSQLDialog(true);
                // TODO cambiare ErrorDialog
                setOpenErrorPostgreSQLDialog(true);
            }
        }).catch((err: Error) => {
            console.log("handleSend", err)
            setOpenProgressBarDialog(false);
            setOpenErrorPostgreSQLDialog(true);
        })

        return function cleanUp() {
            abortController.abort();
        }
    }


    const handleSendSQLite = (item: SQLiteConnectionModel) => {
        setErrorFieldsSQLite([])
        var er = []
        if (!item.key || item.key === "") {
            er.push("key")
        }
        if (!item.path || item.path === "") {
            er.push("path")
        }
        setErrorFieldsSQLite(er)
        if (er.length > 0) {
            return
        }

        setOpenSQLiteDialog(false);
        setOpenErrorSQLiteDialog(false);
        setOpenProgressBarDialog(true);

        const abortController = new AbortController();
        SQLiteService.connect(item, abortController).then((res: IHttpResponse<string>) => {
            if (abortController.signal.aborted) {
                return;
            }
            if (res.isSuccessStatusCode && itemToEditSQLite) {
                let list = dbSQLiteList

                let b = listDBToSelect
                b.push(itemToEditSQLite.key + " - SQLite")
                setListDBToSelect(b)

                list.push(itemToEditSQLite)
                setDBSQLiteList(list)
                setItemToEditSQLite(undefined)
                setOpenProgressBarDialog(false);
            }
            else {
                setOpenProgressBarDialog(false);
                setOpenSQLiteDialog(true);
                // TODO cambiare ErrorDialog
                setOpenErrorSQLiteDialog(true);
            }
        }).catch((err: Error) => {
            console.log("handleSend", err)
            setOpenProgressBarDialog(false);
            setOpenErrorSQLiteDialog(true);
        })

        return function cleanUp() {
            abortController.abort();
        }
    }

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                    <Toolbar>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Grid item xs={3}>
                                <Typography variant="h6" noWrap component="div">
                                    Database management system
                                </Typography>
                            </Grid>
                            <Grid item xs={0} sm={2} md={4} lg={6} />
                            <Grid item xs={3}>
                                <MyAutocomplete
                                    id="id"
                                    label="Selezione un database"
                                    defaultValue={listDBToSelect[0] ? listDBToSelect[0] : undefined}
                                    onChange={(event, newVal) => handleInputSelectBD(newVal)}
                                    options={listDBToSelect}
                                    sx={{
                                        backgroundColor: "white",
                                        width: 300,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Sidebars drawerWidth={drawerWidth} >
                    <SideDatabase<SQLiteConnectionModel>
                        maxWidth={drawerWidth}
                        databases={dbSQLiteList}
                        name="SQLite"
                        connnectNewDB={addDBSQLite}
                        setDatabases={setDBSQLiteList}
                        dataBaseService={SQLiteService}
                    />
                    <SideDatabase<PostgreSQLConnectionModel>
                        maxWidth={drawerWidth}
                        databases={dbPostgreSQLList}
                        name="PostgreSQL"
                        connnectNewDB={addDBPostgreSQL}
                        setDatabases={setDBPostgreSQLList}
                        dataBaseService={postgreSQLService}
                    />
                </Sidebars>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <MultiCodeEditor
                        defaultValue="-- Per eseguire più statement suddividere le query con: ';'
-- Per le select in postgres: nel from bisogna inserire nome_schema.nome_tabella
-- Es: SELECT * FROM myschema.mytable;
"
                    />
                </Grid>
            </Box>

            {/* PostgreSQL Dialog */}
            <MyDialog
                open={openPostgreSQLDialog}
                title="Parametri di connessione"
                maxWidth="sm"
                actions={
                    <>
                        <Button onClick={handleCloseDialogs}>Annulla</Button>
                        <Button
                            disabled={!itemToEditPostgreSQL}
                            onClick={() => {
                                if (itemToEditPostgreSQL) {
                                    handleSendPostgreSQL(itemToEditPostgreSQL)
                                }
                            }}
                        >Connettiti</Button>
                    </>
                }
            >
                <DialogContentText>
                    PostgreSQL parametri di connessione.
                </DialogContentText>
                <MyTextField
                    id="key"
                    label="Nome"
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditPostgreSQL, setItemToEditPostgreSQL)}
                    defaultValue={itemToEditPostgreSQL?.key || ""}
                    error={errorFieldsPostgreSQL.includes("key")}
                />
                <MyTextField
                    id="dbName"
                    label="Nome del DataBase"
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditPostgreSQL, setItemToEditPostgreSQL)}
                    defaultValue={itemToEditPostgreSQL?.dbName || ""}
                    error={errorFieldsPostgreSQL.includes("dbName")}
                />
                <MyTextField
                    id="host"
                    label="Host"
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditPostgreSQL, setItemToEditPostgreSQL)}
                    defaultValue={itemToEditPostgreSQL?.host || ""}
                    error={errorFieldsPostgreSQL.includes("host")}
                />
                <MyTextField
                    id="port"
                    label="Port"
                    type="number"
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditPostgreSQL, setItemToEditPostgreSQL)}
                    defaultValue={itemToEditPostgreSQL?.port || ""}
                    error={errorFieldsPostgreSQL.includes("port")}
                />
                <MyTextField
                    id="user"
                    label="User"
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditPostgreSQL, setItemToEditPostgreSQL)}
                    defaultValue={itemToEditPostgreSQL?.user || ""}
                    error={errorFieldsPostgreSQL.includes("user")}
                />
                <MyTextField
                    id="password"
                    label="Password"
                    type="password"
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditPostgreSQL, setItemToEditPostgreSQL)}
                    defaultValue={itemToEditPostgreSQL?.password || ""}
                    error={errorFieldsPostgreSQL.includes("password")}
                />
            </MyDialog>


            {/* SQLite Dialog */}
            <MyDialog
                open={openSQLiteDialog}
                title="Parametri di connessione"
                maxWidth="sm"
                actions={
                    <>
                        <Button onClick={handleCloseDialogs}>Annulla</Button>
                        <Button
                            disabled={!itemToEditSQLite}
                            onClick={() => {
                                if (itemToEditSQLite) {
                                    handleSendSQLite(itemToEditSQLite)
                                }
                            }}
                        >Connettiti</Button>
                    </>
                }
            >
                <DialogContentText>
                    SQLite parametri di connessione.
                </DialogContentText>
                <MyTextField
                    id="key"
                    label="Nome"
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditSQLite, setItemToEditSQLite)}
                    defaultValue={itemToEditSQLite?.key || ""}
                    error={errorFieldsSQLite.includes("key")}
                />

                <MyTextFieldControlled
                    id="path"
                    label="Percorso File"
                    // disabled
                    onChange={(event: any) => handleInputChangeGeneric(event, itemToEditSQLite, setItemToEditSQLite)}
                    defaultValue={itemToEditSQLite?.path || ""}
                    error={errorFieldsSQLite.includes("path")}
                />
                <Button
                    variant="contained"
                    component="label"
                >
                    Seleziona il file
                    <input
                        type="file"
                        hidden
                        onChange={(event: any) => handleInputChangeGeneric(event, itemToEditSQLite, setItemToEditSQLite, "path", event.target?.value)}
                    />
                </Button>
            </MyDialog>

            {/* Progress Bar */}
            <MyDialog
                open={openProgressBarDialog}
                title="Progress Bar"
                maxWidth="sm"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    <DialogContentText>
                        Connesione in corso...
                    </DialogContentText>
                </Grid>
            </MyDialog>
            {/* Error PostgreSQL */}
            <MyDialog
                open={openErrorPostgreSQLDialog}
                title="Error"
                maxWidth="sm"
                actions={
                    <>
                        <Button onClick={handleCloseDialogs}>Annulla</Button>
                        <Button
                            disabled={!itemToEditPostgreSQL}
                            onClick={() => {
                                if (itemToEditPostgreSQL) {
                                    handleSendPostgreSQL(itemToEditPostgreSQL)
                                }
                            }}
                        >Riprova</Button>
                    </>
                }
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <DialogContentText>
                        Non è stato possibile connetersi al database, perfavore riprova.
                    </DialogContentText>
                </Grid>
            </MyDialog>
            {/* Error SQLite */}
            <MyDialog
                open={openErrorSQLiteDialog}
                title="Error"
                maxWidth="sm"
                actions={
                    <>
                        <Button onClick={handleCloseDialogs}>Annulla</Button>
                        <Button
                            disabled={!itemToEditSQLite}
                            onClick={() => {
                                if (itemToEditSQLite) {
                                    handleSendSQLite(itemToEditSQLite)
                                }
                            }}
                        >Riprova</Button>
                    </>
                }
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <DialogContentText>
                        Non è stato possibile connetersi al database, perfavore riprova.
                    </DialogContentText>
                </Grid>
            </MyDialog>
        </BrowserRouter>
    );
}
export default App;
