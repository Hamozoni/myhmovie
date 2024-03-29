import { useEffect, useState } from "react";
import { createContext } from "react"
import { useParams } from "react-router-dom";

export const mediaColorContext = createContext();



const MediaColorContext = ({children}) => {

    const [color,setColor] = useState({textColor: '',backColor:''})

    const {id} = useParams();

    useEffect(()=> {

        const rgbColor = {
            r: Math.floor(Math.random() * 55),
            g: Math.floor(Math.random() * 55),
            b: Math.floor(Math.random() * 55),
          };

          const textColor = `rgb(${rgbColor.r + 200} ${rgbColor.g + 200} ${rgbColor.b + 200})`
          
          const backColor = `rgb(${rgbColor.r} ${rgbColor.g} ${rgbColor.b})`

          setColor({textColor,backColor})
        
    },[id]);

  return (
    <mediaColorContext.Provider value={{color}}>
        {children}
    </mediaColorContext.Provider>
  )
}

export default MediaColorContext