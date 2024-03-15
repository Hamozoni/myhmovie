import { useContext, useEffect, useState } from "react";
import fetchData from "../../../utilities/fetchData";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

import "./LatestTrailer.scss";
import { globalContext } from "../../../GlobalStateContext/GlobalContext";
import { useNavigate } from "react-router-dom";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";


const LatestTrailer = () => {
    const {setIsTrailer,setMediaType,setMediaId} = useContext(globalContext);

    const [trailerData,setTrailerData] = useState([]);
    const [activeSection,setActiveSection] = useState('popular');
    const [backgroundImageIndex,setBackgroundImageIndex] = useState(0);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    const fecth = ()=> {
        setIsPending(true);
        setError(null);
        fetchData(`movie/popular?language=en-US&page=1`)
        .then((data)=> {
            setTrailerData(data?.results);
            setIsPending(false);
            console.log(data?.results);
        })
        .catch(error=> {
            setError(error);
            setIsPending(false);
        });
    }

    useEffect(()=>{
        fecth();
    },[]);

    const style = {
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL + 'original' + trailerData[backgroundImageIndex]?.backdrop_path})`,
        backgroundPosition: 'center',
        backgroundSize:'cover',
    };

    const handleTrailer = (mediaId)=>{

        setMediaType('movie');
        setMediaId(mediaId);
        setIsTrailer(true);

    }

  return (

    
    <section 
        className="latest-trailer" 
        style={style}
        >
            <div className="trailer-box-cotainer">
               <header className="trailer-header">
                <h3>latest trailer</h3>
                    <nav className="trailer-nav">
                        <ul className="trailer-ul">
                            <li className={activeSection === 'popular' && 'active'}>popular</li>
                            <li>streaming</li>
                            <li>on tv</li>
                            <li>for rent</li>
                            <li>in theatres</li>
                        </ul>
                    </nav>
                </header>
                <div className="trailer-content">
                    {
                        isPending ? <Loading width='100%' height='330px'/> : 
                        trailerData?.length ?
                        <div className="trailer-container">
                            {
                                trailerData?.map((media,i)=>(
                                    <div  
                                        onMouseEnter={()=> setBackgroundImageIndex(i)}
                                        key={media?.id} 
                                        className="trailer-media">
                                        <div 
                                            className="trailer-image" 
                                            onClick={()=> handleTrailer(media?.id)}
                                            >
                                            <img 
                                                loading="lazy"
                                                src={process.env.REACT_APP_BASE_URL + 'original' + media?.backdrop_path} 
                                                alt={media?.title} 
                                                />
                                            <div className="more-info">
                                            <MoreHorizRoundedIcon />
                                            </div>
                                            <span className="pay-trailer">
                                                <PlayArrowRoundedIcon />
                                            </span>
                                        </div>
                                        <div className="trailer-titles">
                                            <h3 className="name" onClick={()=> navigate(`/movie/${media.id}`)}>
                                                {media?.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        error && <Error error={error} height='330px' onClick={fecth} /> 
                    }
                </div>

            </div>
    </section>
  )
}

export default LatestTrailer