import React, { useEffect,useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

const Energidata = () => {

  const PriceAreaARR = [{value:"dk1",desc:"vest for storebælt"},{value:"dk2",desc:"øst for storebælt"}]

  const { data, isLoading, error, makeRequest } = useRequestData()

  const [startDate, setStartDate] = useState("2023-06-22")
  const [endDate, setEndDate] = useState("2023-06-23")
  const [priceArea, setPriceArea] = useState("dk1")

  useEffect(() => {
    makeRequest("https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start="+startDate+"T00:00&end="+endDate+"T00:00&filter=%7B%22PriceArea%22:[%22"+priceArea+"%22]%7D&sort=HourUTC%20DESC&timezone=dk")

  }, [endDate, startDate,priceArea])


  return (
    <div>
      {data &&
        <p>{data.total} timer vist</p>
      }

      {data &&
        <h1>{data.dataset}</h1>

      }

      {isLoading && <Loader />}

      {error && <Error />}

      <form onChange={(e)=>{e.preventDefault(); setStartDate(e.target)}}>
      <input type="date" />
      </form>
      <form onChange={(e)=>{e.preventDefault(); setEndDate(e.target)}}>
      <input type="date" />
      </form>

      <select name="priceArea" id="priceArea" onChange={(e) => { setPriceArea(e.target.value) }}>
      {
        data && PriceAreaARR.map((p,i)=>
          <option key={i} value={p.value}>{p.desc}</option>
        )
      }
      </select>
      <section className='dataContainer'>

      {
        data && data.records.map((p, i) => 
        <article key={i}>
            <p className='energidataTime'>{p.HourDK}</p>
            <p className='energidataPrice'>{Math.round(p.SpotPriceDKK)}kr</p>
          </article>  
        )
        
      }
      </section>
      
    </div>
  )
}

export default Energidata