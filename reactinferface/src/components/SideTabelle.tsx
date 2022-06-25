import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button, Collapse } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DataBaseService } from 'model/DataBaseService';
import { IDBApi } from 'model/IDBApi';
import { IHttpResponse } from 'model/IHttpResponse';
import { InfoTabelleModel } from 'model/InfoTabelleModel';
import { useEffect, useState } from 'react';
import InfoTabelle from './InfoTabelle';
import MyDialog from './MyDialog';

type ISideTabelleProps<T extends IDBApi> = {
    conn: T,
    dataBaseService: DataBaseService<T>,
}


function SideTabelle<T extends IDBApi>(props: ISideTabelleProps<T>) {
    const { dataBaseService, conn } = props;
    const [open, setOpen] = useState(false);
    const [infoTabel, setInfoTabel] = useState({ open: false, tabelName: "" });
    const [infoTabelData, setInfoTabelData] = useState<InfoTabelleModel[]>([]);
    const [tabelleList, setTabelleList] = useState<string[]>([])
    const handleClick = () => {
        setOpen(!open);
    };


    useEffect(() => {
        if (infoTabel.open) {
            const abortController = new AbortController();
            dataBaseService.getInfoTables(conn, infoTabel.tabelName, abortController).then((res: IHttpResponse<InfoTabelleModel[]>) => {
                if (abortController.signal.aborted) {
                    setInfoTabelData([])
                }
                else if (!res.isSuccessStatusCode) {
                    window.alert(res.messages);
                    setInfoTabelData([])
                }
                else if (res.content) {
                    setInfoTabelData(res.content)
                }
                else {
                    setInfoTabelData([])
                }
            }).catch((err: Error) => {
                console.log("getTabellePostgre", err)
                setInfoTabelData([])
            })
        }
    }, [infoTabel, dataBaseService, conn])

    useEffect(() => {
        if (open) {
            const abortController = new AbortController();
            dataBaseService.getTablesListName(conn, abortController).then((res: IHttpResponse<string[]>) => {
                if (abortController.signal.aborted) {
                    setTabelleList([])
                }
                else if (!res.isSuccessStatusCode) {
                    window.alert(res.messages);
                    setTabelleList([])
                }
                else if (res.content) {
                    setTabelleList(res.content)
                }
                else {
                    setTabelleList([])
                }
            }).catch((err: Error) => {
                console.log("getTabellePostgre", err)
                setTabelleList([])
            })
        }
    }, [dataBaseService, conn, open])

    return (
        <>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton sx={{ pl: 8 }}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tabelle" />
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {tabelleList.length > 0 && tabelleList.map((tabelName, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{ pl: 12 }}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
                                </ListItemIcon>
                                <ListItemText primary={tabelName} />
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    onClick={() => {
                                        setInfoTabel({ open: true, tabelName: tabelName })
                                    }}
                                >
                                    <InfoIcon />
                                </IconButton>
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {tabelleList.length === 0 &&
                        <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 12 }}>
                                <ListItemText primary={"Nesuna Tabella"} />
                            </ListItemButton>
                        </ListItem>
                    }
                </Collapse>
            </List>


            <MyDialog
                open={infoTabel.open}
                title={infoTabel.tabelName}
                maxWidth="md"
                actions={
                    <>
                        <Button
                            onClick={() => {
                                setInfoTabel({ open: false, tabelName: "" })
                            }}
                        >Chiudi</Button>
                    </>
                }
            >
                <InfoTabelle
                    data={infoTabelData}
                    height={750}
                    rowHeight={50}
                />
            </MyDialog>
        </>
    );
}
export default SideTabelle;
