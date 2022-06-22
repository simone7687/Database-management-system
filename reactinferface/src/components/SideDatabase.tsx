import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Collapse } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IDBApi } from 'model/IDBApi';
import { useState } from 'react';
import SideHost from './SideHost';

type ISideDatabaseProps = {
    connnectNewDB: () => void,
    databases: IDBApi[],
    name?: string,
}

function SideDatabase(props: ISideDatabaseProps) {
    const { connnectNewDB, databases, name } = props;
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={connnectNewDB}>
                        <AddIcon />
                    </IconButton>
                    {databases.length > 0 &&
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {databases.map((item: IDBApi, index: number) => (
                        <ListItem key={item.key} disablePadding>
                            <SideHost database={item} />
                        </ListItem>
                    ))}
                </Collapse>
            </List>
        </>
    );
}
export default SideDatabase;
