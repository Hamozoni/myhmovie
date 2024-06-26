import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import fetchData from '../../../utilities/fetchData';
import Loading from '../../../Components/loading/Loading';
import Error from '../../../Components/error/Error';
import { mediaColorContext } from '../../../GlobalStateContext/MediaColorContext';
import { globalContext } from '../../../GlobalStateContext/GlobalContext';
import { languages } from '../../../utilities/languages';

const AlternativeTitles = ({mediaType}) => {

    const {color} = useContext(mediaColorContext);
    const {countries,lang,theme} = useContext(globalContext);

    const {id} = useParams();
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    const [titles,setTiltes] = useState(null);

    const [titlesCount,setTiltesCount] = useState(0);

    const results = mediaType === 'tv' ? 'results' : 'titles';

    const fetchTitles = ()=> {

        setIsPending(true);
        setError(null);

        fetchData(`${mediaType}/${id}/alternative_titles`)
        .then(titles=>{
            console.log(titles[results]);
            setTiltes(titles[results]);
            setTiltesCount(titles[results]?.length); 
        })
        .catch(error=> {
            setError(error);
        }).finally(()=> {
            setIsPending(false)
        })
    };

    useEffect(fetchTitles,[id,mediaType,results]);

    const TitlesTabel = ({title,country})=> {
        return (
            <tabel 
                id={title?.iso_3166_1}
                className="titles-card card"
                >
                <thead className={`back-color-${theme}-1 t-h`}>
                <tr>
                    <div className="count-name">
                            <span className="count-imge">
                                <img src={`https://flagsapi.com/${title?.iso_3166_1}/shiny/64.png`} alt='flag'/>
                            </span>
                            <h3 className={`t-color-${theme}-1`}> 
                                {country}
                            </h3>
        
                    </div>
                </tr>
                </thead>
                <tbody className='tbody'>
                    <tr className={`t-color-${theme}-1 tr tr`} >
                    <td >title</td>
                    <td>type</td>
                    </tr>
                    <tr className={`t-color-${theme}-1 tr`}>
                        <td>{title?.title}</td>
                        <td >{title?.type}</td>
                    </tr>
                </tbody>
         </tabel>
        )
    }

  return (
    <main className="alt-titles">
        {
            isPending ? <Loading width='100%' height='300px' /> : 
            titles ?
            <div className="alt-content">
                <section className={`back-color-${theme}-1 alt-cout-list`}>
                    <header 
                        className='cout-header' 
                        style={{backgroundColor : color.backColor,color: color.textColor}}
                        >
                            <h3 style={{color :color.textColor}}>
                                {languages[lang].titles}
                            </h3>
                            <p style={{color : color.textColor}}>{titlesCount}</p>
                    </header>
                    <ul className="cout-list">     
                        {
                            titles?.map((title)=>(   
                                <li 
                                    key={title?.iso_3166_1} 
                                    className={`t-color-${theme}-1 nav-btn`}
                                    >
                                    <a href={`#${title?.iso_3166_1}`} className={`t-color-${theme}-1`}>

                                        {countries?.find(e=> e.iso_3166_1 === title?.iso_3166_1)?.native_name}
                                        <span>1</span>
                                    </a>
                                </li> 
                            ))
                        }
                                
                    </ul>
                </section>
                <section className='alt-t-tabels'>
                    {
                        titles?.map((title)=>(
                            <TitlesTabel 
                                key={title?.title} 
                                title={title} 
                                country={countries?.find(e=> e.iso_3166_1 === title?.iso_3166_1)?.native_name}/>
                        ))
                    }
                </section>
            </div>
            : error && <Error error={error} height='300px' onClick={fetchTitles} />
        }
    </main>
  )
}

export default AlternativeTitles