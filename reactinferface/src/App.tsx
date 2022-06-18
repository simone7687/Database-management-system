// import your route components too

import { AppBar, Box, CssBaseline, Grid, Toolbar, Typography } from "@mui/material";
import MultiCodeEditor from "components/MultiCodeEditor";
import Sidebars from "components/Sidebars";
import ErrorBoundary from "errer_check/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";

const drawerWidth = 240;

function App() {
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
                                Permanent drawer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Sidebars />
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                    >
                        <Toolbar />
                        <MultiCodeEditor />
                    </Grid>
                </Box>
            </BrowserRouter>
        </ErrorBoundary>
    );
}
export default App;
