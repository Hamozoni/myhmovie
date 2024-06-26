
import { useContext} from "react";

import MovieTvCover from "../../Components/movieComponents/movieTvCover/MovieTvCover"
import MediaInlineCard from "../../Components/sharedComponents/mediaInlineCard/MediaInlineCard";

import "./collection.scss";
import { collectionContext } from "../../Layouts/CollectionLayout";

const Collection = () => {

    const {details} = useContext(collectionContext);

  return (
    <div className="collection-main">
            <div className="coll-container">
                <MovieTvCover details={details} mediaType='collection' />
                <div className="collection-movie">
                     <header className="coll-header">
                        <h4>{details?.parts?.length} movies </h4>
                     </header>
                     <div className="coll-movie-box">
                        {
                           details?.parts?.map((movie)=> (
                             <MediaInlineCard movie={movie} type={movie?.media_type}/>
                           )) 
                        }
                     </div>
                </div>
            </div>
    </div>
  )
}

export default Collection