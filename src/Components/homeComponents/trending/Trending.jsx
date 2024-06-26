import { useContext, useEffect, useState } from "react";

import fetchData from "../../../utilities/fetchData";

import { languages } from "../../../utilities/languages";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";

import "./Trending.scss";

import MovieCard from "../../movieComponents/movieCard/MovieCard";
import Error from "../../error/Error";
import Loading from "../../loading/Loading";

const Trending = ({type})=> {

    const {lang,theme} = useContext(globalContext);

    const [movies,setMovies] = useState([]);
    const [filter,setFilter] = useState('day');
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const fetch = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`trending/${type}/${filter}?language=${lang}&page=1`)
        .then((data)=>{
            setMovies(data?.results);
        })
        .catch(error=> {
            setError(error);
        })
        .finally(()=>{
            setIsPending(false);

        })
    }
    useEffect(fetch,[lang,filter,type]);

    return (
        <section className={`${type} trending`}>
            <div className="trending-container">
                <header className="trend-header">
                    <h3 className={`trend-title t-color-${theme}`}>
                        {languages[lang].trending + " "}  
                        {type === 'movie' ? languages[lang].movies : type === 'tv'  ? languages[lang].tvShows :languages[lang].people }
                    </h3>
                    <nav className="trend-nav">
                        <ul>
                            <li 
                                className={`${filter === 'day' && 'active'} t-color-${theme}`}
                                onClick={()=> setFilter('day')}
                                >
                                {languages[lang].today}
                           </li>
                            <li 
                                  className={`${filter === 'week' && 'active'} t-color-${theme}`}
                                onClick={()=> setFilter('week')}
                                >
                                {languages[lang].thisWeek}
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className="movies">
                     {
                        isPending ? <Loading width='100%' height='350px' />  
                       : movies?.length ?
                        movies?.map((movie)=>(
                            <MovieCard key={movie.id} movie={movie} type={type} />
                        ))
                        :  error && <Error error={error}  height='350px' onClick={fetch}/> 
                     }
                </div>
            </div>  
        </section>
    );
};

export default Trending;