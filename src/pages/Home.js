import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard.jsx'
import NavBar from '../components/NavBar.jsx'
import '../App.css'

const API_URL = 'http://www.omdbapi.com/?apikey=f192e9eb&'

const Home = () => {
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
        searchMovie('batman');
    }, []);

    return(
        <div className="app">
            <NavBar search={search} searchMovie={searchMovie} setSearch={setSearch} />

            {movies.length > 0 ? (
                <div className="container">
                    {movies.map(movie => {
                        return <MovieCard key={movie.imdbID} movie = {movie} removeFavorite={removeFavorite}/>
                    })}
                </div>
            ) : (
                <div>
                    <h2 className='no-movie'>No Movies Found</h2>
                </div>
            )}  
        </div>
    )
}


export default Home;