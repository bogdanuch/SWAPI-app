import React from 'react';
import '../App.css';
import {Accordion, AccordionSummary} from "@mui/material";
import {useDrag} from 'react-dnd';
import AccordionDetail from "./AccordionDetail";

const accordionSummaryStyle = {borderBottom: '1px black solid'}

function CharacterBox({character}) {
    const [{opacity}, drag] = useDrag(() => ({
        type: 'box', item: {
            name: character.name,
            species: character.species,
            films: character.films,
            starships: character.starships,
            url: character.url
        }, collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    }), [character]);
    return (<Accordion className="list-item" ref={drag} style={{opacity}}>
            <AccordionSummary className="summary" sx={accordionSummaryStyle}>
                <h4>{character.name}</h4>
            </AccordionSummary>
            <AccordionDetail character={character}/>
        </Accordion>);
}

export default CharacterBox;