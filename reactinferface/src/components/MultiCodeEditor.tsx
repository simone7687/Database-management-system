import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import { QueyData } from 'model/QueyData';
import { useState } from 'react';
import 'react-reflex/styles.css';
import CodeEditor from "./CodeEditor";
import WindowsResults from './WindowsResults';

type ICodeEditorProps = {
    defaultLanguage?: "sql" | undefined,
    height?: string | number | undefined,
    defaultValue?: string | undefined,
    handleEditorChange?: (value: string | undefined, event: any) => void,
}
type ITabs = {
    codeText: string,
    results: QueyData[],
}

function MultiCodeEditor(props: ICodeEditorProps) {
    const { defaultLanguage = "sql", height = "78vh", defaultValue = undefined, handleEditorChange = undefined } = props;
    const [value, setValue] = useState('0');
    const [executeQuery, setExecuteQuery] = useState(false);
    const [tabs, setTabs] = useState<ITabs[]>([{ codeText: defaultValue ? defaultValue : "", results: [] }]);
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    }
    const handleResults = (newValue: QueyData[], index: number) => {
        let temp = tabs
        temp[index].results = newValue
        setTabs(temp);
    }

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
                                icon={
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        onClick={() => {
                                            let a = tabs.filter((a: any, i: number) => { return index !== i })
                                            setTabs(a);
                                        }}>
                                        <CloseIcon fontSize="small" />
                                    </IconButton>


                                } iconPosition="end"
                            />
                        ))}
                    </TabList>
                </Grid>
                <Grid item xs={2}>
                    <IconButton color="primary" aria-label="Aggiungi Tab" component="span"
                        onClick={() => {
                            let array = tabs;
                            array.push({ codeText: defaultValue ? defaultValue : "", results: [] });
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
                    <WindowsResults
                        key={index}
                        codeText={element.codeText}
                        executeQuery={executeQuery}
                        setExecuteQuery={setExecuteQuery}
                        height={height}
                        setResults={(value: QueyData[]) => { handleResults(value, index) }}
                        results={element.results}
                    >
                        <CodeEditor
                            key={index}
                            defaultLanguage={defaultLanguage}
                            height={height}
                            defaultValue={element.codeText}
                            handleEditorChange={(value: string | undefined, event: any) => { handleEditorChangeItems(value, index, event) }}
                        />
                    </WindowsResults>
                </TabPanel>
            })}
        </TabContext>
    );
}
export default MultiCodeEditor;
