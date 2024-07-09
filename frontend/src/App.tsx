import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import UniqueUsersPerDay from './pages/one/uniqueUsersPerDay'
import UniqueUsersAll from './pages/one/uniqueUsersAll'
import NewAndReturningPerDay from './pages/one/newAndReturningPerDay'
import NewAndReturningTotal from './pages/one/newAndReturningTotal'
import BusiestDay from './pages/one/busiestDay'
import TotalData from './pages/one/totalData'
import AgePercentage from './pages/two/agePercentage'
import GenderPercentage from './pages/two/genderPercentage'

const App = () => {
  return (
    <Routes>
      {/* API 1 Routes */}
       <Route path='/' element={<Home/>} />
       <Route path='/summary/uniqueUsersPerDay' element={<UniqueUsersPerDay/>} />
       <Route path='/summary/uniqueUsersAll' element={<UniqueUsersAll/>} />
       <Route path='/summary/newAndReturningPerDay' element={<NewAndReturningPerDay/>} />
       <Route path='/summary/newAndReturningTotal' element={<NewAndReturningTotal/>} />
       <Route path='/summary/busiestDay' element={<BusiestDay/>} />
       <Route path='/summary/totalData' element={<TotalData/>} />
       <Route path='/summary/totalData' element={<TotalData/>} />
      {/* API 2 Routes */}
       <Route path='/segment/agePercentage' element={<AgePercentage/>} />
       <Route path='/segment/genderPercentage' element={<GenderPercentage/>} />
       <Route path='/summary/phoneBrand' element={<NewAndReturningPerDay/>} />
       <Route path='/summary/digitalInterest' element={<NewAndReturningTotal/>} />
    </Routes>
  )
}

export default App
