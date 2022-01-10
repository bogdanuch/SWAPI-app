import React, {useState, useEffect} from 'react';
import '../App.css';
import {useDrop} from 'react-dnd';
import FavoriteCharacterBox from "./FavoriteCharacterBox";

function Favorites() {
    const [favoriteCharacters, setFavoriteCharacters] = useState({data: []});
    const deleteFavorite = (characterIndex) => {
        let firstHalf = []
        if (characterIndex !== 0) {
            firstHalf = favoriteCharacters.data.slice(0, characterIndex);
        }
        const secondHalf = favoriteCharacters.data.slice(characterIndex + 1, favoriteCharacters.data.length);
        const newState = {
            ...favoriteCharacters,
            data: [...firstHalf, ...secondHalf],
            [favoriteCharacters.data[characterIndex].url]: undefined
        }
        setFavoriteCharacters(newState);
        localStorage.setItem("StarWarsCharaters", JSON.stringify(newState))
    }
    const [{canDrop, isOver}, drop] = useDrop(() => ({
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
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), []);
    useEffect(() => {
        const storageState = JSON.parse(localStorage.getItem("StarWarsCharaters"));
        if (storageState?.data?.length) {
            setFavoriteCharacters(storageState)
        }
    }, [])
    const isActive = canDrop && isOver;

    return (
        <div className="favorite-page" ref={drop}>
            <h1>Your Favorites List</h1>
            <div>
                <br/>
                {isActive && <div style={{
                    width: '18vw',
                    height: '85vh',
                    border: '3px dashed white',
                    position: 'absolute',
                    zIndex: -1,
                    marginLeft: '1vw'
                }}/>}
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