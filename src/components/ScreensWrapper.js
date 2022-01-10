import React from 'react';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import Favorites from "./Favorites";

import '../App.css';

function ScreensWrapper({children}) {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <div className="screen-wrapper-divider">
                    <Favorites/>
                    <div>
                        {children}
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}

export default ScreensWrapper;