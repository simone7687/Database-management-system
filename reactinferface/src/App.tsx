// import your route components too

import Sidebars from "components/Sidebars";
import ErrorBoundary from "errer_check/ErrorBoundary";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <Sidebars />
            </BrowserRouter>
        </ErrorBoundary>
    );
}
export default App;
