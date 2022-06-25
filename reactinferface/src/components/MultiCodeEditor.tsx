import AddIcon from '@mui/icons-material/Add';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import { QueyData } from 'model/QueyData';
import * as React from 'react';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import CodeEditor from "./CodeEditor";

type ICodeEditorProps = {
    defaultLanguage?: "sql" | undefined,
    height?: string | number | undefined,
    defaultValue?: string | undefined,
    handleEditorChange?: (value: string | undefined, event: any) => void,
}
type ITabs = {
    codeText: string,
    resuls: QueyData[]
}

function MultiCodeEditor(props: ICodeEditorProps) {
    const { defaultLanguage = "sql", height = "78vh", defaultValue = undefined, handleEditorChange = undefined } = props;
    const [value, setValue] = React.useState('0');
    const [tabs, setTabs] = React.useState<ITabs[]>([{ resuls: [], codeText: defaultValue ? defaultValue : "" }]);
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
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
                    <IconButton color="primary" aria-label="upload picture" component="span"
                        onClick={() => {
                            let array = tabs;
                            array.push({ resuls: [], codeText: defaultValue ? defaultValue : "" });
                            setTabs(array);
                            handleChange({}, (array.length - 1).toString())
                        }}
                    >
                        <AddIcon />
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
                            {element.resuls.length > 0 &&
                                <>
                                    <ReflexSplitter />
                                    <ReflexElement
                                        className="right-pane"
                                        minSize={20}
                                        size={60}
                                    >
                                        <ReflexContainer orientation="vertical">
                                            <ReflexSplitter />
                                            {element.resuls.map((element, index) => (
                                                <>
                                                    key={index}
                                                    <ReflexElement
                                                        minSize={5}
                                                    >
                                                    </ReflexElement>
                                                    <ReflexSplitter />
                                                </>
                                            ))}
                                        </ReflexContainer>
                                    </ReflexElement>
                                </>
                            }
                        </ReflexContainer>
                    </div>


                </TabPanel>
            })}
        </TabContext>
    );
}
export default MultiCodeEditor;
