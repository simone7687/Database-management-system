import { selectDBState } from 'atom/downloadNotificationAtom';
import { IHttpResponse } from 'model/IHttpResponse';
import { QueyData } from 'model/QueyData';
import { ReactNode, useEffect, useState } from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import { useRecoilValue } from 'recoil';

type IWindowsResultsProps = {
    codeText: string,
    executeQuery: boolean,
    setExecuteQuery: (value: boolean) => void,
    children?: ReactNode,
    height?: string | number | undefined,
}
function WindowsResults(props: IWindowsResultsProps) {
    const { codeText, setExecuteQuery, executeQuery, children, height } = props;
    const [results, setResults] = useState<QueyData[]>([]);
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
        }
        if (executeQuery) {
            setExecuteQuery(false)
        }
    }, [selectDB, codeText, executeQuery, setExecuteQuery])
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
                        size={0}
                    >
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
