import React, { useEffect } from "react"
import { HomeContextProvider, useHomeContext } from '../../store/HomeContextState'
import HomeComp from '../component/Home'

const Home: React.FC  = () => {
  return (
    <HomeContextProvider>
      <HomeComp />
    </HomeContextProvider>
  )
}

export default Home