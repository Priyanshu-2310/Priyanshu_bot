import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Sign from './components/Sign'
import Chatbot from './components/Chatbot'

const App = () => {
  const [user, setUser] = useState('');
  const handlename=(name)=>{
      setUser(name)
      console.log(user)
  }
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
           <Route index path='/' element={<Sign handlename={handlename}/>}/>
           <Route path='/chatbot' element={<Chatbot userName={user} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App