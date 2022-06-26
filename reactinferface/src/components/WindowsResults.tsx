import { Typography } from '@mui/material';
import { selectDBState } from 'atom/selectDBAtom';
import { IHttpResponse } from 'model/IHttpResponse';
import { QueyData } from 'model/QueyData';
import { ReactNode, useEffect } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import { useRecoilValue } from 'recoil';
import QueryTabelle from './QueryTabelle';

type IWindowsResultsProps = {
    codeText: string,
    executeQuery: boolean,
    setExecuteQuery: (value: boolean) => void,
    children?: ReactNode,
    height?: string | number | undefined,
    results: QueyData[],
    setResults: (value: QueyData[]) => void
}
function WindowsResults(props: IWindowsResultsProps) {
    const { codeText, setExecuteQuery, executeQuery, children, height, results, setResults } = props;
    const selectDB = useRecoilValue(selectDBState);

    useEffect(() => {
        if (executeQuery && selectDB.dataBaseService && selectDB.conn) {
            const abortController = new AbortController();
            selectDB.dataBaseService.executeQueries(selectDB.conn, codeText, abortController).then((res: IHttpResponse<QueyData[]>) => {
                if (abortController.signal.aborted) {
                    setResults([])
                }
                else if (!res.isSuccessStatusCode) {
                    window.alert(res.messages);
                    setResults([])
                }
                else if (res.content) {
                    setResults(res.content)
                }
                else {
                    setResults([])
                }
            }).catch((err: Error) => {
                console.log("getTabellePostgre", err)
                setResults([])
            })
            setExecuteQuery(false)
        }
        else if (executeQuery) {
            window.alert("Devi selezionare un DataBase");
            setExecuteQuery(false)
        }
    }, [selectDB, codeText, executeQuery, setExecuteQuery, setResults])
    if (results.length > 0) {
        return (
            <div
                style={{ height: height, width: '100%' }}
            >
                <ReflexContainer
                    orientation="horizontal"
                >
                    <ReflexElement className="left-pane">
                        {children}
                    </ReflexElement>

                    <ReflexSplitter />

                    <ReflexElement
                        size={200}
                        minSize={5}
                    >
                        {results.map((item: QueyData, index: number) => {
                            if (item.isSuccessStatusCode) {
                                if (item.data && item.data.length > 0) {
                                    return <>
                                        <QueryTabelle
                                            data={item.data}
                                            height={400}
                                            rowHeight={50}
                                        />
                                    </>
                                } else {
                                    return <>
                                        <Typography mt={2} color="blue">{item.message}</Typography>
                                    </>
                                }
                            }
                            else {
                                return <>
                                    <Typography mt={2} color="red">{item.message} - Query: {index + 1}</Typography>
                                </>
                            }
                        })}
                    </ReflexElement>
                </ReflexContainer>
            </div>
        );
    }
    else {
        return (<>{children}</>)
    }
}
export default WindowsResults;
