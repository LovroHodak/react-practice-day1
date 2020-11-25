import React, {useState} from 'react'
import MovieCard from './MovieCard'

export default function SearchMovies() {

    //states - input query, movies
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault()

        const url = `https://api.themoviedb.org/3/search/movie?api_key=c7eed4912b889e36c9ff91ca9fe5b3c3&language=en-US&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data.results)
            setMovies(data.results)
        } catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <form className='form' onSubmit={searchMovies} >
                <label className='label' htmlFor='query' >Movie name</label>
                <input className='input' type='text' name='query' 
                placeholder='i.e. Titanic'
                value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button className='button' type='submit' >Search</button>
            </form>
            <div className='card-list' >
                {
                    movies && movies.filter(movie => movie.poster_path).map(movie => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))
                }
            </div>
        </div>
    )
}
