import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Collapse } from '@mui/material';
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
import { useEffect, useState } from 'react';

type ISideTabelleProps<T extends IDBApi> = {
    conn: T,
    dataBaseService: DataBaseService<T>,
}


function SideTabelle<T extends IDBApi>(props: ISideTabelleProps<T>) {
    const { dataBaseService, conn } = props;
    const [open, setOpen] = useState(false);
    const [tabelleList, settabelleList] = useState<string[]>([])
    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (open) {
            const abortController = new AbortController();
            dataBaseService.getTableListName(conn, abortController).then((res: IHttpResponse<string[]>) => {
                if (abortController.signal.aborted) {
                    settabelleList([])
                }
                else if (res.content) {
                    settabelleList(res.content)
                }
                else {
                    settabelleList([])
                }
            }).catch((err: Error) => {
                console.log("getTabellePostgre", err)
                settabelleList([])
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
                <ListItemButton onClick={handleClick} sx={{ pl: 8 }}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {tabelleList.length > 0 && tabelleList.map((text, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton sx={{ pl: 12 }}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <InboxIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
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
        </>
    );
}
export default SideTabelle;
