import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import NavBar from '../components/NavBar'

const API_URL = 'http://www.omdbapi.com/?apikey=f192e9eb&'

const MyFavoritePage = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]);

    const removeFavorite = (imdbID) => {
        setFavoriteMovies(prevMovies => prevMovies.filter(movie => movie.imdbID !== imdbID));
    }

    const searchMovie = async (title) => {
        try {
            const response = await fetch(`${API_URL}s=${title}`);
            const data = await response.json();
            if (data.Response === 'True') {
                setMovies(data.Search);
            } else {
                setMovies([]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavoriteMovies(favorites);
    }, []);
    
    return (
        <div className="favorite-page">
            <NavBar search={search} searchMovie={searchMovie} setSearch={setSearch} />
                {favoriteMovies.length > 0 ? (
                    <>
                        <h1>My Favorite</h1>
                        <div className="favorite-movies">
                            {favoriteMovies.map(movie => (<MovieCard key={movie.imdbID} movie={movie} removeFavorite={removeFavorite} />))}                    
                        </div>
                    </>
                ) : (
                    <p className='no-movie'>No favorite movies yet</p>
                )}
        </div>
    );
}

export default MyFavoritePage;