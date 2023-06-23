import React, { useEffect, useState } from 'react'
import Error from '../../components/Error'
import Loader from '../../components/Loader'

/* import useRequestData */
import useRequestData from '../../hooks/useRequestData'


const Nyheder = () => {

  const categoryARR = ["business", "entertainment", "general", "health", "science", "sports", "technology"]

  const languageshortArr = ["", "ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]

  const sortbyARR = ["publishedAt","relevancy","popularity"]


  const { data, isLoading, error, makeRequest } = useRequestData()

  const [news, setNews] = useState("");
  const [category, setCategory] = useState("business");
  const [country, setCountry] = useState("dk");
  const [sortby, setSortby] = useState("publishedAt")


  useEffect(() => {
    makeRequest("https://newsapi.org/v2/top-headlines?q="+news+"&sortBy="+sortby+"&category=" + category + "&apikey=" + process.env.REACT_APP_NEWSAPIKEY)

  }, [news, category, country])
  

  const handleSubmit = (e)=>{
    e.preventDefault();
    setNews(e.target[0].value)
  }


  return (
    <div>

      {isLoading && <Loader />}

      {error && <Error />}

      <form onSubmit={handleSubmit}>
        <input type="text" />
      </form>

      <select name="category" id="category" onChange={(e) => { setCategory(e.target.value) }}>

        {
          data && categoryARR.map((c) =>
            <option value={c} >{c}</option>
          )
        }
      </select>

      <select name="sortBy" id="sortBy">
        {
          data && sortbyARR.map((s)=>
          <option value={s}>{s}</option>)
        }
      </select>

      {/* <select name="language" id="language" onChange={(e) => { setCountry(e.target.value) }}>
        {
          data && languageshortArr.map((l) =>
            <option value={l} >{l}</option>
          )
        }
      </select> */}{/* den sagde at language ikke er supported på everything tagged */}
      {
        data && data.articles.map((n) =>
          <article>
            <h2>{n.title}</h2>
            <p>{n.description}...<a href={n.url} target="_blank">Læs mere</a></p>
            {
              n.urlToImage ? <img src={n.urlToImage} alt="Foto" width={700} /> : null
            }
            <p>{new Date(n.publishedAt).toLocaleDateString("da-dk", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" })}</p>


          </article>
        )
      }
    </div>
  )
}

export default Nyheder