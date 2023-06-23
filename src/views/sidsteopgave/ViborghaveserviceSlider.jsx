import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";

import sliderbg from "../../assets/udtalelser-bg.jpg"


const ViborghaveserviceSlider = () => {

  const { data, isLoading, error, makeRequest } = useRequestData();

  const [currentindex, setCurrentIndex] = useState(0)

  useEffect(() => {
    makeRequest("http://localhost:5023/reviews");
  }, []);

  useEffect(()=>{
    
    

  },[])


  const handleSubmit = (i)=>{

    //setCurrentIndex(i)
  }


  return (
    <>
      {isLoading && <Loader />}

      {error && <Error />}

      {data &&
        <>
          <h2>Kundeudtalelser</h2>

          {data &&
            <div className="sliderBg" style={{backgroundImage:sliderbg}}>
              <div className="overlay">
               
               <p>{data[currentindex].content}</p>
               <p>{data[currentindex].author}</p>

               { 
                data.map((x,i)=>
                  <div onClick={handleSubmit(i)}>{i}</div>
                )
               }

               
              </div>
            </div>
          }


        </>
      }
    </>
  )
}

export default ViborghaveserviceSlider