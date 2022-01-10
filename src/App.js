import React from 'react';

import CharacterList from './components/CharacterList';
import ScreensWrapper from './components/ScreensWrapper';
import {ApiDataProvider} from "./libs/ApiDataProvider";

const App = () => {
    return (
        <ApiDataProvider>
            <ScreensWrapper>
                <CharacterList/>
            </ScreensWrapper>
        </ApiDataProvider>
    );
}

export default App