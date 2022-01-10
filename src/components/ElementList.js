import React from 'react';

import '../App.css';

function ElementList({elements, referenceData, classname}) {
    return (
        <div className={classname}>
            {elements[0] ?
                (elements.map((element) => (
                    <div key={element}>
                        {referenceData[element]},
                    </div>
                )))
                :
                'None'}
        </div>
    );
}

export default ElementList;