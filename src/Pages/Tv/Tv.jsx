import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData from '../../Utilities/fetchData';
import { globalContext } from '../../GlobalStateContext/GlobalContext';
import MovieTvCover from '../../Components/MovieTvCover/MovieTvCover';
import TopBilledCast from '../../Components/TopBilledCast/TopBilledCast';
import MovieSocial from '../../Components/MovieSocial/MovieSocial';
import MovieMedia from '../../Components/MovieMedia/MovieMedia';
import Recommendations from '../../Components/Recommendations/Recommendations';

const Tv = () => {
    const {id} = useParams();
    const {lang} = useContext(globalContext);

    const [details,setDetails] = useState({});

    useEffect(()=>{
        fetchData(`tv/${id}?language=${lang}`)
        .then(data => {
            setDetails(data);
            console.log(data)
        })
    },[id.lang])

  return (
    <main className="tv">
        <div className="tv-container">
            <MovieTvCover details={details}/>
            <section className='tv-content'>
                 <section className='cast'>
                    <TopBilledCast type='tv' id={id} title='Series Cast'/>
                    <MovieSocial id={id} section='reviews' mediaType='tv'/>
                    <MovieMedia id={id} mediaType='tv' />
                    <Recommendations id={id} mediaType='tv'/>

                 </section>
            </section>

        </div>

    </main>
  )
}

export default Tv