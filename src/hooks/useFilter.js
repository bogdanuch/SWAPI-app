import React, {useEffect, useState} from 'react';

import {parseBirthDate} from '../utils';

function useFilter(filterOptions, isfilterOperatorAnd, allCharactersData) {
    const [showedCharacters, setShowedCharacters] = useState([]);
    const speciesCheck = (item) => !(filterOptions.species && filterOptions.species !== item.species[0]);
    const filmCheck = (item) => !(filterOptions.film && !item.films.includes(filterOptions.film));
    const birthdateCheck = (item) => !(filterOptions.age && (
        item.birth_year === 'unknown'
        || parseBirthDate(item.birth_year) > filterOptions.age.lessThan
        || parseBirthDate(item.birth_year) < filterOptions.age.moreThan));

    useEffect(() => {
        const characters = isfilterOperatorAnd ?
            allCharactersData.filter(item => speciesCheck(item) && filmCheck(item) && birthdateCheck(item)) :
            allCharactersData.filter(item => speciesCheck(item) || filmCheck(item) || birthdateCheck(item));

        setShowedCharacters(characters);
    }, [filterOptions, allCharactersData, isfilterOperatorAnd])
    return showedCharacters
}


export default useFilter;