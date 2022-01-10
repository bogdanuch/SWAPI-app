import React from 'react';
import '../App.css';
import {Accordion, AccordionSummary} from "@mui/material";
import closeIcon from '../images/closeIcon.svg'
import AccordionDetail from "./AccordionDetail";

const accordionSummaryStyle = {borderBottom: '1px black solid'}

function FavoriteCharacterBox({character, closeFunction}) {
    return (
        <Accordion className="favorite-item">
            <AccordionSummary className="summary" sx={accordionSummaryStyle}>
                <h4>{character.name}</h4>
                <img
                    src={closeIcon}
                    style={{position: "absolute", right: 3, top: 0, height: '20px'}}
                    onClick={closeFunction}
                    alt='closeIcon'
                />
            </AccordionSummary>
            <AccordionDetail character={character} isFavoritePage={true}/>
        </Accordion>
    );
}

export default FavoriteCharacterBox;