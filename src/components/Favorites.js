import React, {useState, useEffect} from 'react';
import '../App.css';
import {useDrop} from 'react-dnd';
import FavoriteCharacterBox from "./FavoriteCharacterBox";
import {deleteCharacterElement} from "../utils";

function Favorites() {
    const [favoriteCharacters, setFavoriteCharacters] = useState({data: []});
    const deleteFavorite = (characterIndex) => {
        const newState = deleteCharacterElement(favoriteCharacters, characterIndex)
        setFavoriteCharacters(newState);
        localStorage.setItem("StarWarsCharaters", JSON.stringify(newState))
    }
    const [{canDrop}, drop] = useDrop(() => ({
        accept: 'box',
        drop: (item) => {
            setFavoriteCharacters((favoritesState) => {
                if (!favoritesState[item.url]) {
                    const favorites = {
                        ...favoritesState,
                        [item.url]: item.name,
                        data: [...new Set([...favoritesState.data, item])]
                    }
                    localStorage.setItem("StarWarsCharaters", JSON.stringify(favorites))
                    return favorites
                }
                return favoritesState
            })
            return {
                name: `Favorites`,
                allowedDropEffect: "any",
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }), []);
    useEffect(() => {
        const storageState = JSON.parse(localStorage.getItem("StarWarsCharaters"));
        if (storageState?.data?.length) {
            setFavoriteCharacters(storageState)
        }
    }, [])

    return (
        <div className="favorite-page" ref={drop}>
            <h1>Your Favorites List</h1>
            <div>
                <br/>
                {canDrop && <div className='dragndrop-zone'/>}
            </div>
            <div className="list-wrapper">
                {favoriteCharacters.data && favoriteCharacters.data.map((character, index) => (
                        <FavoriteCharacterBox
                            character={character}
                            closeFunction={() => deleteFavorite(index)}
                            key={`favorite${character.url}`}/>
                    )
                )}
            </div>
        </div>
    );
}

export default Favorites;