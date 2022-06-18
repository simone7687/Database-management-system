import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

function Sidebars(props: any) {
    const { children } = props;
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
