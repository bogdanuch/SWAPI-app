import React from 'react';
import '../App.css';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ElementList from "./ElementList";
import {useApiDataContext} from "../libs/ApiDataProvider";
import closeIcon from '../images/closeIcon.svg'

const accordionSummaryStyle = {borderBottom: '1px black solid'}

function FavoriteCharacterBox({character, closeFunction}) {
    const {filmData, speciesList, starshipList} = useApiDataContext();
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
            <AccordionDetails className='accordion-details'>
                <div className='list-info'>
                    <div className='favorite-list-info-name'>Name:</div>
                    <div className='list-info-description'>{character.name ? character.name : 'Unknown'}</div>
                </div>
                <div className='list-info'>
                    <div className='favorite-list-info-name'>Species:</div>
                    <div
                        className='list-info-description'>{character.species[0] ? speciesList[character.species[0]] : 'Unknown'}</div>
                </div>
                <div className='list-info'>
                    <div className='favorite-list-info-name'>Movies:</div>
                    <ElementList
                        elements={character.films}
                        referenceData={filmData}
                        classname='favorite-list-info-description'/>
                </div>
                <div className='list-info'>
                    <div className='favorite-list-info-name'>Spaceships:</div>
                    <ElementList
                        elements={character.starships}
                        referenceData={starshipList}
                        classname='favorite-list-info-description'/>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default FavoriteCharacterBox;