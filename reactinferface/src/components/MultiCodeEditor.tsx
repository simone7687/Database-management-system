import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import CodeEditor from "./CodeEditor";

type ICodeEditorProps = {
    defaultLanguage?: "sql" | undefined,
    height?: string | number | undefined,
    defaultValue?: string | undefined,
    handleEditorChange?: (value: string | undefined, event: any) => void,
}
type ITabs = {
    codeText: string,
}

function MultiCodeEditor(props: ICodeEditorProps) {
    const { defaultLanguage = "sql", height = "90vh", defaultValue = undefined, handleEditorChange = undefined } = props;
    const [value, setValue] = React.useState('1');
    const [tabs, setTabs] = React.useState<ITabs[]>([{ codeText: defaultValue ? defaultValue : "" }]);
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
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item xs={10}>
                    <TabList
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {tabs.map((element, index) => (
                            <Tab label={"Query " + index} value={index.toString()} />
                        ))}
                    </TabList>
                </Grid>
                <Grid item xs={2}>
                    <IconButton color="primary" aria-label="upload picture" component="span"
                        onClick={() => {
                            let array = tabs;
                            array.push({ codeText: defaultValue ? defaultValue : "" });
                            setTabs(array);
                            handleChange({}, (array.length - 1).toString())
                        }}
                    >
                        <PhotoCamera />
                    </IconButton>
                </Grid>
            </Grid>
            {tabs.map((element, index) => {
                return <TabPanel value={index.toString()}>
                    <CodeEditor
                        defaultLanguage={defaultLanguage}
                        height={height}
                        defaultValue={element.codeText}
                        handleEditorChange={(value: string | undefined, event: any) => { handleEditorChangeItems(value, index, event) }}
                    />
                </TabPanel>
            })}
        </TabContext>
    );
}
export default MultiCodeEditor;
