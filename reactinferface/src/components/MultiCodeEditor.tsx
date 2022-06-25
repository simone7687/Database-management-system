import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import { DataBaseService } from 'model/DataBaseService';
import { IDBApi } from 'model/IDBApi';
import { QueyData } from 'model/QueyData';
import * as React from 'react';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import 'react-reflex/styles.css';
import CodeEditor from "./CodeEditor";
import WindowsResults from './WindowsResults';

type ICodeEditorProps<T extends IDBApi> = {
    defaultLanguage?: "sql" | undefined,
    height?: string | number | undefined,
    defaultValue?: string | undefined,
    handleEditorChange?: (value: string | undefined, event: any) => void,
    dataBaseService: DataBaseService<T> | undefined,
    conn: T | undefined,
}
type ITabs = {
    codeText: string,
    results: QueyData[]
}

function MultiCodeEditor<T extends IDBApi>(props: ICodeEditorProps<T>) {
    const { defaultLanguage = "sql", height = "78vh", defaultValue = undefined, handleEditorChange = undefined, conn, dataBaseService } = props;
    const [value, setValue] = React.useState('0');
    const [executeQuery, setExecuteQuery] = React.useState(false);
    const [tabs, setTabs] = React.useState<ITabs[]>([{ results: [], codeText: defaultValue ? defaultValue : "" }]);
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    };
    const setResults = (value: QueyData[], index: number) => {
        let array = tabs;
        if (value) {
            array[index].results = value
            setTabs(array);
        }
        else {
            array[index].results = []
            setTabs(array);
        }
    };

    function handleEditorChangeItems(value: string | undefined, index: number, event: any) {
        if (handleEditorChange) {
            handleEditorChange(value, event)
        }
        let array = tabs;
        if (value) {
            array[index].codeText = value
            setTabs(array);
        }
        else {
            array[index].codeText = ""
            setTabs(array);
        }
    }

    return (
        <TabContext value={value}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <TabList
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {tabs.map((element, index) => (
                            <Tab
                                label={"Query " + index}
                                value={index.toString()}
                                key={index}
                            />
                        ))}
                    </TabList>
                </Grid>
                <Grid item xs={2}>
                    <IconButton color="primary" aria-label="Aggiungi Tab" component="span"
                        onClick={() => {
                            let array = tabs;
                            array.push({ results: [], codeText: defaultValue ? defaultValue : "" });
                            setTabs(array);
                            handleChange({}, (array.length - 1).toString())
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="Esegui Query" component="span"
                        onClick={() => {
                            setExecuteQuery(true)
                        }}
                    >
                        <PlayArrowIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {tabs.map((element, index) => {
                return <TabPanel
                    value={index.toString()}
                    key={index}
                >
                    <div style={{ height: height, width: '100%' }}>
                        <ReflexContainer orientation="horizontal">
                            <ReflexElement className="left-pane">
                                <CodeEditor
                                    key={index}
                                    defaultLanguage={defaultLanguage}
                                    height={height}
                                    defaultValue={element.codeText}
                                    handleEditorChange={(value: string | undefined, event: any) => { handleEditorChangeItems(value, index, event) }}
                                />
                            </ReflexElement>
                            <WindowsResults
                                conn={conn}
                                dataBaseService={dataBaseService}
                                results={element.results}
                                codeText={element.codeText}
                                executeQuery={executeQuery}
                                setExecuteQuery={setExecuteQuery}
                                setResults={(value: QueyData[]) => { setResults(value, index) }}
                            />
                        </ReflexContainer>
                    </div>
                </TabPanel>
            })}
        </TabContext>
    );
}
export default MultiCodeEditor;
