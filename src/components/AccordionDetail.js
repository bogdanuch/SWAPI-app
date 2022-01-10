import ElementList from "./ElementList";
import {AccordionDetails} from "@mui/material";
import React from "react";
import {useApiDataContext} from "../libs/ApiDataProvider";

function AccordionDetail({character, isFavoritePage=false}){
    const {filmData, speciesList, starshipList} = useApiDataContext();
    return(
        <AccordionDetails className='accordion-details'>
            <div className='list-info'>
                <h4 className={isFavoritePage ? 'favorite-list-info-name' : 'list-info-name'}>Name:</h4>
                <div className='list-info-description'>
                    {character.name ? character.name : 'Unknown'}
                </div>
            </div>
            <div className='list-info'>
                <h4 className={isFavoritePage ? 'favorite-list-info-name' : 'list-info-name'}>Species:</h4>
                <div className='list-info-description'>
                    {character.species.length ? speciesList[character.species[0]] : 'Unknown'}
                </div>
            </div>
            <div className='list-info'>
                <h4 className={isFavoritePage ? 'favorite-list-info-name' : 'list-info-name'}>Movies:</h4>
                <ElementList
                    elements={character.films}
                    referenceData={filmData}
                    classname='list-info-description'/>
            </div>
            <div className='list-info'>
                <h4 className={isFavoritePage ? 'favorite-list-info-name' : 'list-info-name'}>Spaceships:</h4>
                <ElementList
                    elements={character.starships}
                    referenceData={starshipList}
                    classname='list-info-description'/>
            </div>
        </AccordionDetails>
    )
}
export default AccordionDetail;