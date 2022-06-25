// import your route components too

import { AppBar, Box, Button, CircularProgress, CssBaseline, DialogContentText, Grid, Toolbar, Typography } from "@mui/material";
import MultiCodeEditor from "components/MultiCodeEditor";
import MyDialog from "components/MyDialog";
import MyTextField from "components/MyTextField";
import Sidebars from "components/Sidebars";
import SideDatabase from "components/SideDatabase";
import { IPostGressIDBApi } from "model/IDBApi";
import { IHttpResponse } from "model/IHttpResponse";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import DataBasePostgreSQLService from "services/DataBasePostgreSQLService";
import ErrorBoundary from "utility/ErrorBoundary";

const drawerWidth = 240;
const postgreSQLService = new DataBasePostgreSQLService();

function App() {
    const [dbPostgreSQLList, setDBPostgreSQLListState] = useState<IPostGressIDBApi[]>(JSON.parse(localStorage.getItem('dbPostgreSQLList') || "null") || []);
    const [openBugDialog, setOpenBugDialog] = useState(false)
    const [openProgressBarDialog, setOpenProgressBarDialog] = useState(false)
    const [openErrorDialog, setOpenErrorDialog] = useState(false)
    const [itemToEdit, setItemToEdit] = useState<IPostGressIDBApi>()
    const [errorFields, setErrorFields] = useState<string[]>([])

    function handleInputChangeGeneric(event: any, itemToEdit: any, setItemToEdit: any) {
        const target = event.target;
        var value = target.value;
        var idModel = event.currentTarget.id

        setItemToEdit({
            ...itemToEdit,
            [idModel]: value
        })
    }

    const setDBPostgreSQLList = (list: IPostGressIDBApi[]) => {
        setDBPostgreSQLListState(list)
        localStorage.setItem('dbPostgreSQLList', JSON.stringify(list));
    }

    const addDBPostgreSQL = () => {
        setOpenBugDialog(true);
    }

    const handleClose = () => {
        setOpenBugDialog(false);
        setOpenProgressBarDialog(false);
        setOpenErrorDialog(false);
    };

    const handleSend = (item: IPostGressIDBApi) => {
        setErrorFields([])
        var er = []
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
        setErrorFields(er)
        if (er.length > 0) {
            return
        }

        setOpenBugDialog(false);
        setOpenErrorDialog(false);
        setOpenProgressBarDialog(true);

        const abortController = new AbortController();
        postgreSQLService.connect(item, abortController).then((res: IHttpResponse<string>) => {
            if (abortController.signal.aborted) {
                return;
            }
            if (res.isSuccessStatusCode && itemToEdit) {
                let list = dbPostgreSQLList
                list.push(itemToEdit)
                setDBPostgreSQLList(list)
                setItemToEdit(undefined)
                setOpenProgressBarDialog(false);
            }
            else {
                setOpenProgressBarDialog(false);
                setOpenBugDialog(true);
                // TODO cambiare ErrorDialog
                setOpenErrorDialog(true);
            }
        }).catch((err: Error) => {
            console.log("handleSend", err)
            setOpenProgressBarDialog(false);
            setOpenErrorDialog(true);
        })

        return function cleanUp() {
            abortController.abort();
        }
    }

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                    >
                        <Toolbar>
                            <Typography variant="h6" noWrap component="div">
                                Database management system
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Sidebars >
                        <SideDatabase<IPostGressIDBApi>
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
                            dataBaseService={undefined}
                            conn={undefined}
                        />
                    </Grid>
                </Box>

                {/* Progress Dialog */}
                <MyDialog
                    open={openBugDialog}
                    title="Parametri di connessione"
                    maxWidth="sm"
                    actions={
                        <>
                            <Button onClick={handleClose}>Annulla</Button>
                            <Button
                                disabled={!itemToEdit}
                                onClick={() => {
                                    if (itemToEdit) {
                                        handleSend(itemToEdit)
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
                        onChange={(event: any) => handleInputChangeGeneric(event, itemToEdit, setItemToEdit)}
                        defaultValue={itemToEdit?.key || ""}
                        error={errorFields.includes("key")}
                    />
                    <MyTextField
                        id="dbName"
                        label="Nome del DataBase"
                        onChange={(event: any) => handleInputChangeGeneric(event, itemToEdit, setItemToEdit)}
                        defaultValue={itemToEdit?.dbName || ""}
                        error={errorFields.includes("dbName")}
                    />
                    <MyTextField
                        id="host"
                        label="Host"
                        onChange={(event: any) => handleInputChangeGeneric(event, itemToEdit, setItemToEdit)}
                        defaultValue={itemToEdit?.host || ""}
                        error={errorFields.includes("host")}
                    />
                    <MyTextField
                        id="port"
                        label="Port"
                        type="number"
                        onChange={(event: any) => handleInputChangeGeneric(event, itemToEdit, setItemToEdit)}
                        defaultValue={itemToEdit?.port || ""}
                        error={errorFields.includes("port")}
                    />
                    <MyTextField
                        id="user"
                        label="User"
                        onChange={(event: any) => handleInputChangeGeneric(event, itemToEdit, setItemToEdit)}
                        defaultValue={itemToEdit?.user || ""}
                        error={errorFields.includes("user")}
                    />
                    <MyTextField
                        id="password"
                        label="Password"
                        type="password"
                        onChange={(event: any) => handleInputChangeGeneric(event, itemToEdit, setItemToEdit)}
                        defaultValue={itemToEdit?.password || ""}
                        error={errorFields.includes("password")}
                    />
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
                {/* Error */}
                <MyDialog
                    open={openErrorDialog}
                    title="Error"
                    maxWidth="sm"
                    actions={
                        <>
                            <Button onClick={handleClose}>Annulla</Button>
                            <Button
                                disabled={!itemToEdit}
                                onClick={() => {
                                    if (itemToEdit) {
                                        handleSend(itemToEdit)
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
        </ErrorBoundary>
    );
}
export default App;
