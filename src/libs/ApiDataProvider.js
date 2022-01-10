import React, {useState, createContext, useContext, useEffect} from 'react';
import {requestData} from "../utils";

export const ApiDataContext = createContext({
    filmData: {dataArray: []},
    speciesList: {dataArray: []},
    starshipList: {dataArray: []},
    allCharactersData: {dataArray: []},
});

export function useApiDataContext() {
    return useContext(ApiDataContext);
}

export function ApiDataProvider({children}) {
    const [filmData, setFilmData] = useState({dataArray: []});
    const [speciesList, setSpeciesList] = useState({dataArray: []});
    const [starshipList, setStarshipList] = useState({dataArray: []});
    const [allCharactersData, setAllCharactersData] = useState({dataArray: []});
    useEffect(() => {
        requestData(setFilmData, 'films', 'title',)
        requestData(setAllCharactersData, 'people', 'name',)
        requestData(setSpeciesList, 'species', 'name')
        requestData(setStarshipList, 'starships', 'name',)
    }, []);
    const value = {filmData, speciesList, starshipList, allCharactersData};
    return (
        <ApiDataContext.Provider value={value}>
            {children}
        </ApiDataContext.Provider>
    );
}
