import { useEffect, useState } from "react"
import fetchData from "../../Utilities/fetchData";
import PersonCard from "../../Components/PersonCard/PersonCard";


const PopularPresons = () => {

    const [page,setPage] = useState(1);
    const [persons,setPersons] = useState([]);

    useEffect(()=>{
        fetchData(`person/popular?language=en-US&page=${page}`)
        .then((data)=> {
            setPersons(data?.results)
            console.log(data?.results)
        })
    },[page]);

  return (
    <section className="popular-people">
        <h4>popular people</h4>
        <div className="persons-cards">

            {
                persons?.map((person)=> (
                    <PersonCard key={person?.id} person={person}/>
                ))
            }
        </div>
    </section>
  )
}

export default PopularPresons