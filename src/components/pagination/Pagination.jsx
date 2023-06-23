import React from 'react'

/* css */
import "./pagination.scss"

const Pagination = ({currentPage, setCurrentPage, itemsPerPage, itemsTotal}) => {

  /* beregn og rund op */
  let total = Math.ceil(itemsTotal/itemsPerPage)

  return (
    <div className='pagination-container'>
    <button onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage<1}>&lt;&lt;Tilbage</button>
    {
      [...Array(total)].map((x,index)=>
        <button key={index} onClick={()=>setCurrentPage(index)} className={index===currentPage ? "active": null}>{index+1}</button>
      )
    }

    <button onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage>=total-1}>Frem&gt;&gt;</button>
    </div>

  )
}

export default Pagination