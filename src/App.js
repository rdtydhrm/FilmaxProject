import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      const rateClass =
        movie.vote_average < 5
          ? "low"
          : movie.vote_average < 7.5
          ? "medium"
          : "high";

      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
            alt="Cannot Load Picture"
          />
          <div className="Movie-date">Release: {movie.release_date}</div>
          <div className={`Movie-rate ${rateClass}`}>
            Rate: {movie.vote_average}
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 1) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-title">
          <h1>FILMAX!</h1>
          <p>by rdtydhrm</p>
        </div>
        <input
          placeholder="Search movie..."
          className="Movie-search"
          onChange={({ target }) => search(target.value)}
        />
        <div className="Movie-container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
