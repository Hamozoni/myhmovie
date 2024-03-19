import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "../../sharedComponents/mainMediaNav/MainmediaNav.scss";
import { Link, useParams} from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import fetchData from '../../../utilities/fetchData';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useState } from 'react';
import fetchData from '../../../utilities/fetchData';

const SeasonMainNav = () => {

    const {seasonNumber,id} = useParams();
    const [videos,setVideos] = useState({});
    const [mediaData,setMediaData] = useState({});

    const fetchVideos = ()=> {
        fetchData(`tv/${id}/season/${seasonNumber}/images`)
        .then((data)=>{
            setMediaData(data?.posters);
        }) 
        fetchData(`tv/${id}/season/${seasonNumber}/videos?language=en-US`)
        .then((data)=>{
            setVideos(Object.groupBy(data?.results,e=> e.type))
        })
    }

    useEffect(fetchVideos,[id,seasonNumber])

  return (
        <nav className='media-header'>
            <div className='media-nav'>
                <div className='med-title'>
                    <span>overview</span>
                    <span><ArrowDropDownIcon /></span>
                    <ul className='links-list'>
                        <li 
                            className='nav-btn' 
                            >
                                <Link to={`/tv/${id}/season/${seasonNumber}`}>main</Link>
                        </li>
                        <li 
                            className='nav-btn' >
                                <Link to={`/tv/${id}/season/${seasonNumber}/cast`}>cast & crew</Link>
                        </li>
                        <li className='nav-btn'>
                            <Link to={`/tv/${id}/season/${seasonNumber}/translations`}>
                                translations
                            </Link>
                        </li>
                        <li className='nav-btn'>
                            <Link to={``}>
                                changes
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className='med-title'>
                    <span>media</span>
                    <span><ArrowDropDownIcon /></span>
                    <ul className='links-list'>
                        <li className='nav-btn'>
                            <Link to={`/tv/${id}/season/${seasonNumber}/posters`} >
                                posters
                                <span>{mediaData?.length}</span>
                        </Link>
                        </li >
                        <li className='nav-btn videos'>
                            <Link to={''}>videos </Link>
                            <span><ArrowRightIcon/></span>
                            <ul className="videos-ul">
                                {
                                    Object.keys(videos)?.map(video=> (
                                        <li 
                                            className='nav-btn'
                                            key={video}>
                                                <Link to={`/tv/${id}/season/${seasonNumber}/videos?type=${video}`}>
                                                    {video} 
                                                    <span>{videos[video]?.length}</span>
                                                </Link>
                                            </li>
                                    ))
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className='med-title'>
                    <span> fandom</span>
                    <span><ArrowDropDownIcon /></span>
                    <ul className='links-list'>
                        <li className='nav-btn'><Link>discussions</Link></li>
                    </ul>
                </div>
                <div className='med-title'>
                    <span> share</span>
                    <span><ArrowDropDownIcon /></span>
                    <ul className='links-list'>
                        <li className='nav-btn'><Link>share link</Link></li>
                        <li className='nav-btn'><Link>facebook</Link></li>
                        <li className='nav-btn'><Link>tweet</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default SeasonMainNav