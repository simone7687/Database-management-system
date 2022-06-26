import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

type QueryTabelleProps = {
    rowHeight?: number,
    height?: number,
    data: any[],
}

function QueryTabelle(props: QueryTabelleProps) {
    const { data, rowHeight = 75, height = 350 } = props
    const [columns, setColumns] = useState<any[]>([])
    const [c] = useState<any[]>([])
    const [temporaneyData, steTemporaneyData] = useState<any[]>([])

    useEffect(() => {
        if (data.length >= 0) {
            let iscontainid = false
            let a = c
            a = []
            Object.entries(data[0]).forEach(entry => {
                const [key] = entry;
                a.push({
                    field: key,
                    headerName: key,
                    minWidth: 100,
                    renderCell: (params: any) => (
                        <strong>
                            {params?.value.toString()}
                        </strong>
                    )
                })
                if (key === "id") {
                    iscontainid = true
                }
            });
            setColumns(a)
            if (!iscontainid) {
                let b = data
                b.forEach((item, index) => {
                    b[index]["id"] = index
                })
                steTemporaneyData(b)
            }
        }
    }, [data, c])

    try {
        return (
            <div style={{ height: height, width: '80%' }}>
                {columns.length > 0 && temporaneyData &&
                    <DataGrid
                        rows={temporaneyData}
                        columns={columns}
                        rowHeight={rowHeight}
                    />
                }
            </div>
        );
    } catch (error) {
        console.error(error)
        return <div style={{ color: "red" }}>QueryTabelle error</div>
    }
}

export default QueryTabelle;