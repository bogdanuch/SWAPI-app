import React from 'react';
import '../App.css';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {useDrag} from 'react-dnd';
import ElementList from "./ElementList";
import {useApiDataContext} from "../libs/ApiDataProvider";

const accordionSummaryStyle = {borderBottom: '1px black solid'}

function CharacterBox({character}) {
    const {filmData, speciesList, starshipList} = useApiDataContext();
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
            <AccordionDetails className='accordion-details'>
                <div className='list-info'>
                    <h4 className='list-info-name'>Name:</h4>
                    <div className='list-info-description'>
                        {character.name ? character.name : 'Unknown'}
                    </div>
                </div>
                <div className='list-info'>
                    <h4 className='list-info-name'>Species:</h4>
                    <div className='list-info-description'>
                        {character.species[0] ? speciesList[character.species[0]] : 'Unknown'}
                    </div>
                </div>
                <div className='list-info'>
                    <h4 className='list-info-name'>Movies:</h4>
                    <ElementList
                        elements={character.films}
                        referenceData={filmData}
                        classname='list-info-description'/>
                </div>
                <div className='list-info'>
                    <h4 className='list-info-name'>Spaceships:</h4>
                    <ElementList
                        elements={character.starships}
                        referenceData={starshipList}
                        classname='list-info-description'/>
                </div>
            </AccordionDetails>
        </Accordion>);
}

export default CharacterBox;