import Editor from '@monaco-editor/react';

type ICodeEditorProps = {
    defaultLanguage?: "sql" | undefined,
    height?: string | number | undefined,
    defaultValue?: string | undefined,
    handleEditorChange?: (value: string | undefined, event: any) => void,
}

function CodeEditor(props: ICodeEditorProps) {
    const { defaultLanguage = "sql", height = "90vh", defaultValue = undefined, handleEditorChange = undefined } = props;
    return (
        <Editor
            height={height}
            defaultLanguage={defaultLanguage}
            defaultValue={defaultValue}
            onChange={handleEditorChange}
        />
    );
}
export default CodeEditor;
