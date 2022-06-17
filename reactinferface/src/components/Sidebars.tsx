import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SideDatabase from './SideDatabase';

const drawerWidth = 240;

function Sidebars() {
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
            <SideDatabase />
            <SideDatabase />
        </Drawer>
    );
}
export default Sidebars;
