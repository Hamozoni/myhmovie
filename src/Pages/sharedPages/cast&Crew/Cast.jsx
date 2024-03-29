import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import "./Cast.scss";
import fetchData from '../../../utilities/fetchData';
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';
import CrewCard from '../../../Components/sharedComponents/crewCard/CrewCard';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';

const Cast = () => {

    const [cast,setCast] = useState(null);
    const [crew,setCrew] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const pathName = useLocation().pathname;

    const {lang,theme} = useContext(globalContext)


    const fetchCast = ()=>{
        setIsPending(true);
        setError(null);
       fetchData(`${pathName.replace('castCrew','credits')}?language=${lang}`)
       .then((data)=>{
          setCast(data);
          setCrew(Object.groupBy(data?.crew, ({ department}) => department));
       })
       .catch(error=> {
           setError(error);
       })
       .finally(()=> {
        setIsPending(false);
       })
    }

    useEffect(fetchCast,[pathName,lang]);

  return (
    <div className='cast'>
        <div className="cast-container">
            <section className='cast-part'>
                <h5 className={`main-t t-color-${theme}`}>
                    {lang === 'ar' ?  'الممثلين' : 'cast'}
                    <span className={`t-color-${theme}-4`}>
                        {cast?.cast?.length}
                    </span>
                </h5>
                <div className="cast-content">
                    {
                        isPending ? <Loading width='100%' height='400px'/> :
                        cast ? 
                        cast?.cast?.map((person)=>(
                            <CrewCard key={person?.id} person={person}/>
                        ))
                        : error && <Error error={error} height='400px' onClick={fetchCast}/> 
                    }
                </div>
            </section>
            <section className='cast-part'>
                <h5 className={`main-t t-color-${theme}`}>
                    {lang === 'ar' ?  'طاقم العمل' : 'crew'}
                    <span className={`t-color-${theme}-4`}>
                        {cast?.crew?.length}
                    </span>
                </h5> 
                <div className="cast-content">
                    {
                        isPending ? <Loading width='100%' height='400px'/> :
                        crew ?
                        
                        Object.entries(crew)?.map((p)=>(
                            <>
                            <h5 className={`main-t t-color-${theme}`}>{p[0]}</h5>
                            {
                                p[1]?.map((person)=>(

                                    <CrewCard key={person?.id} person={person}/>
                                ))
                            }
                            </>
                        ))
                        : error && <Error error={error} height='400px' onClick={fetchCast}/>
                        
                    }
                </div>
            </section>

        </div>
    </div>
  )
}

export default Cast