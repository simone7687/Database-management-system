import { QueyData } from 'model/QueyData';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';

type IWindowsResultsProps = {
    results: QueyData[]
}
function WindowsResults(props: IWindowsResultsProps) {
    const { results = [] } = props;

    return (
        <ReflexContainer orientation="vertical">
            <ReflexSplitter />
            {results.length > 0 &&
                <>
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
    );
}
export default WindowsResults;
