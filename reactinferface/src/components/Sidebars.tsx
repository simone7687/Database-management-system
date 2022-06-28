import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { ReactNode } from 'react';


type ISidebarsProps = {
    children?: ReactNode,
    drawerWidth: number,
}

function Sidebars(props: ISidebarsProps) {
    const { children, drawerWidth } = props;
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            {children}
        </Drawer>
    );
}
export default Sidebars;
