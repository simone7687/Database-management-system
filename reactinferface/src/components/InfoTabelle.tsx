import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import { InfoTabelleModel } from 'model/InfoTabelleModel';

const columns = [
    {
        field: 'name',
        headerName: 'Nome',
        minWidth: 200,
        renderCell: (params: any) => (
            <strong>
                {params?.value}
            </strong>
        )
    },
    {
        field: 'tableName',
        headerName: 'Nome Tabella',
        minWidth: 200,
        renderCell: (params: any) => (
            <strong>
                {params?.value}
            </strong>
        )
    },
    {
        field: 'type',
        headerName: 'Tipo',
        minWidth: 200,
        renderCell: (params: any) => (
            <strong>
                {params?.value}
            </strong>
        ),
    },
    {
        field: 'nullable',
        headerName: 'Nullable',
        maxWidth: 80,
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
        field: 'primaryKey',
        headerName: 'Primary Key',
        maxWidth: 100,
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
        headerName: 'Index',
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
        field: 'foreignKey',
        headerName: 'Foreign Key',
        maxWidth: 100,
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
    {
        field: 'foreignTable',
        headerName: 'Tabella Foreign',
        minWidth: 200,
        renderCell: (params: any) => (
            <strong>
                {params?.value}
            </strong>
        )
    },
    {
        field: 'foreignColumn',
        headerName: 'Column Foreign',
        minWidth: 200,
        renderCell: (params: any) => (
            <strong>
                {params?.value}
            </strong>
        )
    },
];

type InfoTabelleProps = {
    rowHeight?: number,
    height?: number,
    data: InfoTabelleModel[],
}

function InfoTabelle(props: InfoTabelleProps) {
    const { data, rowHeight = 75, height = 350 } = props;

    try {
        return (
            <div style={{ height: height, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    rowHeight={rowHeight}
                />
            </div>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>InfoTabelle error</div>
    }
}

export default InfoTabelle;