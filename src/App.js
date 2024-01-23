import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

export default function App() {
const [popularMovies, setPopularMovies] = useState([])

useEffect(()=> {
  getMovieList().then((results)=>{
    setPopularMovies(results)
  });
}, [])

const imageUrl = process.env.REACT_APP_BASEIMGURL

const PopularMovieList = ()=>{
  return popularMovies.map((movie, i )=>{
    console.log(movie)
    return(
      <div className="wrapper" key={i}> 
        <img className="movie-image" src={`${imageUrl}${movie.poster_path}`} alt='img-movie' width={250}/>
        <div className="movie-title">{movie.title}</div>
        <div className="movie-date">Tanggal Rilis : {movie.release_date}</div>
        <div className="movie-rating">Rating : {movie.vote_average} ⭐</div>
      </div>
    )
  })
}

const search = async(n) =>{
  if(n.length >3){
    const query = await searchMovie(n)
    setPopularMovies(query.results)
}
}

return (
<div className="App">
  <header className="App-header">
    <input type="text" placeholder='Cari Film...' className='movie-search' onChange={({target})=> search(target.value)}
    />
    <div className="container">
      <PopularMovieList />
    </div>
  </header>
</div>
);
}