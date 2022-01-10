import React, {useState} from 'react';
import Select from 'react-select'
import {Stack, Switch} from '@mui/material';
import '../App.css';
import useFilter from "../hooks/useFilter";
import CharacterBox from "./CharacterBox";
import {useApiDataContext} from "../libs/ApiDataProvider";

const ageList = [
    {value: {lessThan: -30, moreThan: -1000}, label: '<30BBY'},
    {value: {lessThan: -20, moreThan: -30}, label: '>30BBY && <20BBY'},
    {value: {lessThan: -10, moreThan: -20}, label: '>20BBY && <10BBY'},
    {value: {lessThan: 10, moreThan: -10}, label: '>10BBY && <10ABY'},
    {value: {lessThan: 20, moreThan: 10}, label: '>10ABY && <20ABY'},
    {value: {lessThan: 1000, moreThan: 20}, label: '>20ABY'},
]
const filterNoneOption = {label: '——', value: '', url: ''};

function Homepage() {
    const {filmData, speciesList, allCharactersData} = useApiDataContext()
    const [filterOptions, setFilterOptions] = useState({film: '', species: '', age: ''});
    const [isFilterOperatorAnd, setIsFilterOperatorAnd] = useState(true);
    const showedCharacters = useFilter(filterOptions, isFilterOperatorAnd, allCharactersData.dataArray);

    const handleFilter = (selectedOption, type) => {
        setFilterOptions({...filterOptions, [type]: selectedOption})
    }

    return (
        <div className="homepage">
            <h1 className='homepage-header'>Star Wars characters list</h1>
            <div className="filters">
                <div className="filter">
                    <h1>Films</h1>
                    <Select
                        defaultValue={filterNoneOption}
                        options={[filterNoneOption, ...filmData.dataArray]}
                        onChange={(film) => handleFilter(film.url, 'film')}/>
                </div>
                <div className="filter">
                    <h1>Species</h1>
                    <Select
                        defaultValue={filterNoneOption}
                        options={[filterNoneOption, ...speciesList.dataArray]}
                        onChange={(species) => handleFilter(species.url, 'species')}/>
                </div>
                <div className="filter">
                    <h1>Age</h1>
                    <Select
                        defaultValue={filterNoneOption}
                        options={[filterNoneOption, ...ageList]}
                        onChange={(age) => handleFilter(age.value, 'age')}
                    />
                </div>
            </div>
            <Stack className='switch-class' direction="row" spacing={1} alignItems="center">
                <h3>0R</h3>
                <Switch
                    checked={isFilterOperatorAnd}
                    onChange={() => setIsFilterOperatorAnd(!isFilterOperatorAnd)}
                />
                <h3>AND</h3>
            </Stack>
            <div className="list-wrapper">
                {showedCharacters && showedCharacters.map((item) => (
                    <div key={item.url}>
                        <CharacterBox character={item}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;