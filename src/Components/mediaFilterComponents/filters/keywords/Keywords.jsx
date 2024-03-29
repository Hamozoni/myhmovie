import { useContext, useState } from "react"
import { mediaFilter } from "../../../../Pages/filteredMediaList/FilteredMediaList";
import fetchData from "../../../../utilities/fetchData";

import ClearIcon from '@mui/icons-material/Clear';

import "./Keywords.scss";

const Keywords = () => {

    const {mediaFiltering,setMediaFiltering} = useContext(mediaFilter);
    const [keys,setKeys] = useState([]);
    const [isAutoCompList,setIsAutoCompList] = useState(false);

    const fetchKeysData = (query) => {
        if(query.length > 1){
            fetchData(`search/keyword?query=${query}&page=1`)
            .then((data)=> {
                setKeys(data?.results)
            })
        }
    };

    const handleKeysContext = (key)=> {
        setMediaFiltering(prev=> {
            return {
                ...prev,
                with_keywords: prev.with_keywords?.includes(key) ? prev.with_keywords.filter(el=> el !== key) : [...prev.with_keywords,key]
            }
        });
        setIsAutoCompList(false);
    }

  return (
    <div className="keywords-filter">
        <h5 className="c-ti">
           Keywords
        </h5>
        <div className={`${isAutoCompList} key-box`}>
            <ul className="keys">
                {
                    mediaFiltering?.with_keywords?.map((key)=>(
                        <li key={key} >
                            {key}
                            <ClearIcon onClick={()=> handleKeysContext(key)}  />
                        </li>
                    ))
                }
            </ul>
            <input 
                className="keys-input"
                type="search" 
                onChange={(e)=> fetchKeysData(e.target.value)} 
                onFocus={()=> setIsAutoCompList(true)}
                onBlur={(e)=> {setTimeout(()=> {
                    setIsAutoCompList(false);
                    e.target.value = '';
                    setKeys([])
                },500)}}
                placeholder="filter by keywords"
                />
        </div>
        {
            isAutoCompList &&
            <div className="auto-fill">
                <ul className="keys-ul">
                    {
                        keys?.map((key)=>(
                            <li 
                                className={mediaFiltering?.with_keywords?.includes(key?.name) && "active"}
                                key={key?.id} 
                                onClick={()=> handleKeysContext(key?.name)}
                                >
                                {key?.name}
                            </li>
                        ))
                    }

                </ul>
            </div>
        }
    </div>
  )
}

export default Keywords