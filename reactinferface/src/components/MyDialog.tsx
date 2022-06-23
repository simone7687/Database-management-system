import { Breakpoint, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

type IMyDialogProps = {
    open: boolean,
    maxWidth?: false | Breakpoint | undefined,
    title: string,
    children?: ReactNode,
    actions?: ReactNode,
}

function MyDialog(props: IMyDialogProps) {
    const { open = false, maxWidth = false, title, children, actions } = props;

    try {
        return (
            <Dialog
                open={open}
                maxWidth={maxWidth}
                fullWidth
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    {actions}
                </DialogActions>
            </Dialog>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRDialog error</div>
    }
}

export default MyDialog;