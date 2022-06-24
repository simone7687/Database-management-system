import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { InfoTabelle } from 'model/InfoTabelle';

const columns = [
    {
        field: 'name',
        headerName: '',
        width: 20,
        renderCell: (params: any) => (
            <strong>
                {params?.value}
            </strong>
        )
    },
    {
        field: 'type',
        headerName: '',
        width: 20,
        renderCell: (params: any) => (
            <strong>
                {params?.value}
            </strong>
        ),
    },
    {
        field: 'nullable',
        headerName: 'Membership',
        flex: 1,
        minWidth: 50,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        ),
    },
    {
        field: 'primaryKey	',
        headerName: 'Month',
        flex: 1,
        maxWidth: 60,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        ),
    },
    {
        field: 'index',
        headerName: 'Year',
        maxWidth: 40,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        ),
    },
    {
        field: 'foreignKey',
        headerName: 'News',
        maxWidth: 20,
        renderCell: (params: any) => (
            <>
                {params.value &&
                    <CheckIcon sx={{ color: "springgreen" }} />
                }
                {!params.value &&
                    <CloseIcon sx={{ color: "red" }} />
                }
            </>
        )
    },
];

type InfoTabelleProps = {
    rowHeight: number,
    data: InfoTabelle[],
}

function InfoTabelle(props: InfoTabelleProps) {
    const { data, rowHeight = 75 } = props;

    try {
        return (
            <DataGrid
                rows={data}
                columns={columns}
                rowHeight={rowHeight}
            />
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>InfoTabelle error</div>
    }
}

export default InfoTabelle;