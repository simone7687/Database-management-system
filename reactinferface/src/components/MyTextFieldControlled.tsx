import TextField from '@mui/material/TextField';

type IMyTextFieldControlledProps = {
    id: string,
    onChange: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    defaultValue: string,
    disabled?: boolean,
    type?: React.InputHTMLAttributes<unknown>['type'],
    variant?: "standard" | "filled" | "outlined" | undefined,
    label: string,
    fieldName?: string,
    fullWidth?: boolean,
    error?: boolean | undefined,
    helperText?: string,
    rest?: AnalyserNode,
}

function MyTextFieldControlled(props: IMyTextFieldControlledProps) {
    const { id, onChange, defaultValue, disabled, error, type = "string", variant = "standard", label, fieldName, fullWidth, helperText, ...rest } = props;

    try {
        return (<TextField id={id} label={(label || id.toLowerCase())}
            fullWidth={fullWidth === false ? false : true}
            type={type}
            variant={variant}
            disabled={disabled}
            aria-describedby={id}
            error={error}
            value={defaultValue}
            name={fieldName || id}
            onChange={onChange}
            helperText={helperText || ""}
            {...rest} //passo al textfield gli altri attributi che mi arrivano dal padre e non ho gestito   
        />);
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>MyTextFieldControlled error</div>
    }
}
MyTextFieldControlled.displayName = "MyTextFieldControlled"
export default MyTextFieldControlled;