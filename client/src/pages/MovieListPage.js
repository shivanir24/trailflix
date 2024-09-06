import React from 'react'
import MovieListTable from '../components/MovieListTable'
import Navbar from '../components/Navbar'

export const MovieListPage = () => {
  return (
    <div>
      
      {/* <div style={{ backgroundColor: 'lightblue', padding: '20px' }}></div> */}
      <div><Navbar/></div>
        <MovieListTable/>
    </div>
  )
}
