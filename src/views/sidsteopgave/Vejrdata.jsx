import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

import LeafletMap from "../../components/leaflet/LeafletMap";

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'

const Vejrdata = () => {

  const { data, isLoading, error, makeRequest } = useRequestData()
  const {
    data: dataDawa,
    isLoading: loadingDawa,
    error: errorDawa,
    makeRequest: makeRequestDawa,
  } = useRequestData();

  const [zipcode, setZipcode] = useState(8000)

  useEffect(() => {
    if (zipcode.length === 4 && !isNaN(zipcode)) {

      makeRequest("https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + ",dk&appid="+process.env.REACT_APP_OPENWEATHER)
    } else {
      makeRequestDawa(
        "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zipcode
      );
    }
  }, [zipcode])

  return (
    <div>

      <h1>CurrentWeather</h1>

      {isLoading && <Loader />}

      {error && <Error />}

      <p>postnummer</p>
      <form onChange={(e) => setZipcode(e.target.value)}>
        <input
          list="zipcodeinputs"
          type="text"
          placeholder="1234"
          autoComplete="off"
        />
        <datalist id="zipcodeinputs">
          {dataDawa &&
            dataDawa.map((a) => (
              <option key={a.postnummer.nr} value={a.postnummer.nr}>{a.tekst}</option>
            ))}
        </datalist>
      </form>

      {
        data && <LeafletMap coords={[data.city.coord.lat, data.city.coord.lon]}/>
      }

      {
        //slice gør at man kan vælge hvilken data der skal være
        data && <article>
          <h2>{data.city.name}</h2>
          <ul>
            <li>solopgang {new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.</li>
            <li>solnedgang {new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.</li>
          </ul>
          {
            data.list.map((v) =>
              <ul key={v.dt}>
                <li>tempratur {Math.round(v.main.temp-272,15)}&deg;C</li>
                <li>luftfugtighed {Math.round(v.main.humidity)}g/m³</li>
                <li>lufttryk {Math.round(v.main.pressure)}hPa</li>
                <li>description: {v.weather[0].description}</li>
              </ul>
            )
          }



        </article>




      }
    </div>

  )
}

export default Vejrdata