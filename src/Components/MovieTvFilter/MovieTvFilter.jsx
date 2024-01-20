
import Sort from "./Filters/Sort/Sort";
import WhereToWatch from "./WhereToWatch/WhereToWatch";
import Filters from "./Filters/Filters";
import { useParams } from "react-router-dom";


const MovieTvFilter = () => {

    const {filter} = useParams();


  return (
    <section className="filters">
        <h4 className="filt-title">
            {filter?.replace('_',' ')} Movies
        </h4>
        <Sort />
        <WhereToWatch />
        <Filters />
    </section>
  )
}

export default MovieTvFilter