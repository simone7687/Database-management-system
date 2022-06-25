import { DataBaseService } from 'model/DataBaseService';
import { IDBApi } from 'model/IDBApi';
import { IHttpResponse } from 'model/IHttpResponse';
import { QueyData } from 'model/QueyData';
import { useEffect, useState } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';

type IWindowsResultsProps<T extends IDBApi> = {
    codeText: string,
    executeQuery: boolean,
    setExecuteQuery: (value: boolean) => void,
    dataBaseService: DataBaseService<T> | undefined,
    conn: T | undefined,
}
function WindowsResults<T extends IDBApi>(props: IWindowsResultsProps<T>) {
    const { conn, codeText, dataBaseService, setExecuteQuery, executeQuery } = props;
    const [results, setResults] = useState<QueyData[]>([]);

    useEffect(() => {
        if (executeQuery && dataBaseService && conn) {
            const abortController = new AbortController();
            dataBaseService.executeQueries(conn, codeText, abortController).then((res: IHttpResponse<QueyData[]>) => {
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
    }, [dataBaseService, conn, codeText, executeQuery, setResults, setExecuteQuery])

    return (
        <>
            {results.length > 0 &&
                <>
                    <ReflexSplitter />
                    <ReflexContainer
                        orientation="vertical"
                    >
                        <ReflexSplitter />
                        <ReflexElement
                            className="right-pane"
                            minSize={20}
                            size={60}
                        >
                            <ReflexContainer orientation="vertical">
                                <ReflexSplitter />
                                {results.map((element, index) => (
                                    <>
                                        key={index}
                                        <ReflexElement
                                            key={index}
                                            minSize={5}
                                        >
                                        </ReflexElement>
                                        <ReflexSplitter />
                                    </>
                                ))}
                            </ReflexContainer>
                        </ReflexElement>
                    </ReflexContainer>
                </>
            }
        </>
    );
}
export default WindowsResults;
