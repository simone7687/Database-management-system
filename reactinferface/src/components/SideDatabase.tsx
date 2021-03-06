import AddIcon from '@mui/icons-material/Add';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ConnectionModel } from 'model/ConnectionModels';
import { DataBaseService } from 'model/DataBaseService';
import { useState } from 'react';
import SideHost from './SideHost';

type ISideDatabaseProps<T extends ConnectionModel> = {
    connnectNewDB: () => void,
    databases: T[],
    setDatabases: (list: T[]) => void,
    name?: string,
    dataBaseService: DataBaseService<T>,
    maxWidth: number,
}

function SideDatabase<T extends ConnectionModel>(props: ISideDatabaseProps<T>) {
    const { connnectNewDB, databases, setDatabases, name, dataBaseService, maxWidth } = props;
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };

    const remove = (key: string) => {
        setDatabases(
            databases.filter((item: T) => {
                return item.key !== key
            })
        )
    }

    return (
        <>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: maxWidth, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton >
                    <ListItemIcon>
                        <BackupTableIcon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={connnectNewDB}>
                        <AddIcon />
                    </IconButton>
                    {databases.length > 0 &&
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    }
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {databases.map((item: T, index: number) => (
                        <ListItem key={item.key} disablePadding>
                            <SideHost<T> database={item} dataBaseService={dataBaseService} maxWidth={maxWidth}>
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => { remove(item.key) }}>
                                    <CloseIcon />
                                </IconButton>
                            </SideHost>
                        </ListItem>
                    ))}
                </Collapse>
            </List>
        </>
    );
}
export default SideDatabase;
