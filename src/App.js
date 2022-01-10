import React from 'react';

import Homepage from './components/Homepage';
import ScreensWrapper from './components/ScreensWrapper';
import {ApiDataProvider} from "./libs/ApiDataProvider";

const App = () => {
    return (
        <ApiDataProvider>
            <ScreensWrapper>
                <Homepage/>
            </ScreensWrapper>
        </ApiDataProvider>
    );
}

export default App