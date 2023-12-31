import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./MovieCard.scss";
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie, type})=> {
    const navigate = useNavigate()

    const imgUrl = type === 'person' ? movie?.profile_path : movie?.poster_path ;

    const handleNavigation = ()=> {

        navigate(`/${type}/${movie?.id}`);
    }

    return (
        <div className="movie-card">
            <div className="image-container">
                 <img 
                    loading="lazy"
                    onClick={handleNavigation}
                    className='poster'
                    src={process.env.REACT_APP_BASE_URL + 'w200' + imgUrl} 
                    alt={movie?.title}
                     />
                    {
                        type !== 'person' && 
                        <>
                            <div class="consensus">
                                <h3>
                                    {movie?.vote_average?.toFixed(1)?.toString()?.replace('.','')}*
                                </h3>
                            </div>
                            <span className="more-btn">
                                <MoreHorizIcon />
                            </span>
                        </>
                    }
                    
            </div>
            <div className="content">
                <h3 className="title" onClick={handleNavigation}>
                    {type === 'movie' ? movie?.title : movie?.name}
                </h3>
                {
                    type === 'movie' && 
                    <span className="time">
                        {movie?.release_date}
                    </span>
                }
            </div>
        </div>
    );
};

export default MovieCard;