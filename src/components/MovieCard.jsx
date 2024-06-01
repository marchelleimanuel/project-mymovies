import { useEffect, useState } from 'react'
import heart from '../components/icons/heart.svg'
import filledHeart from '../components/icons/solid-heart.svg'

const MovieCard = ({ movie: { imdbID, Year, Poster, Title }, removeFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(prev => !prev);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const updateFavorites = isFavorite 
        ? favorites.filter(favorite => favorite.imdbID !== imdbID) 
        : [...favorites, {isFavorite, imdbID, Year, Poster, Title}];
        localStorage.setItem('favorites', JSON.stringify(updateFavorites));

        if (isFavorite) {
            removeFavorite(imdbID);
        }
    }

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(favorite => favorite.imdbID === imdbID));
    }, [imdbID]);

    return(
        <div className='movie-card' key={imdbID}>
            <img src={Poster !== 'N/A' ? Poster : "https://via.placeholder.com/400"} alt={Title}/>
            <div className='movie-text'>
                <h4 className='movie-title'>{Title}</h4>
                <p className='movie-year'>{Year}</p>
            </div>
            <img src={isFavorite ? filledHeart : heart} className='heart' onClick={toggleFavorite} alt='heart-icon'/>
            <div className="overlay"></div>

        </div>
    )
}

export default MovieCard;