import { Autocomplete, TextField } from '@mui/material';

type IMyAutocompleteProps = {
    id: string,
    label: string,
    defaultValue: string | undefined,
    onChange: (event: any, newVal: string | null) => void,
    options: string[],
    sx?: any
}

function MyAutocomplete(props: IMyAutocompleteProps) {
    const { id, label, defaultValue, onChange, options, sx } = props

    try {
        return (
            <Autocomplete
                id={id}
                value={defaultValue}
                onChange={onChange}
                options={options}
                sx={sx ? sx : { width: 300 }}
                renderInput={(params) => <TextField
                    label={label}
                    {...params}
                />
                }
            />
        )
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>MyAutocomplete error</div>
    }
}

export default MyAutocomplete   