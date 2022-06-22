import { TextField } from '@mui/material';

type IMyTextFieldProps = {
    id: string,
    onChange: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    defaultValue: string,
    disabled?: boolean,
    type?: React.InputHTMLAttributes<unknown>['type'],
    variant?: "standard" | "filled" | "outlined" | undefined,
    rows?: number,
    multiline?: boolean,
    errorMessage?: boolean,
    label: string,
    fieldName?: string,
    fullWidth?: boolean,
    error?: boolean | undefined,
    helperText?: string,
    rest?: AnalyserNode,
}

function MyTextField(props: IMyTextFieldProps) {
    const { id, onChange, defaultValue, disabled, type = "string", variant = "standard", rows = 1, multiline = (rows > 1), errorMessage, label, fieldName, fullWidth, error, helperText, ...rest } = props;

    try {
        return (
            <TextField
                id={id}
                label={label || id?.toLowerCase()}
                fullWidth={fullWidth === false ? false : true}
                type={type}
                error={error}
                variant={variant}
                disabled={disabled}
                aria-describedby={id}
                defaultValue={defaultValue}
                name={fieldName || id}
                onBlur={onChange}
                helperText={helperText || ""}
                rows={rows}
                multiline={multiline}
                {...rest}
            />);
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>DRTextField error</div>
    }
}

export default MyTextField;