import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TableViewIcon from '@mui/icons-material/TableView';
import { Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ConnectionModel } from 'model/ConnectionModels';
import { DataBaseService } from 'model/DataBaseService';
import { ReactNode, useState } from 'react';
import SideTabelle from './SideTabelle';

type ISideHostProps<T extends ConnectionModel> = {
    database: T,
    children?: ReactNode,
    dataBaseService: DataBaseService<T>,
    maxWidth: number,
}

function SideHost<T extends ConnectionModel>(props: ISideHostProps<T>) {
    const { database, children, dataBaseService, maxWidth } = props;
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: maxWidth, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton onClick={handleClick} sx={{ pl: 4 }}>
                <ListItemIcon>
                    <TableViewIcon />
                </ListItemIcon>
                <ListItemText primary={database.key} />
                {children}
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <SideTabelle dataBaseService={dataBaseService} conn={database} maxWidth={maxWidth} />
                {/* <SideStoreProcedure /> */}
            </Collapse>
        </List>
    );
}
export default SideHost;
