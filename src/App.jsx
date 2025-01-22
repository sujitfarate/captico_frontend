import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login'
import Course from './components/Course'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
<Router>
      <Routes>
        
        <Route path="/" index element={<Login/>} />
        
      
        <Route path="/login" element={<Login />} />
       
        <Route path="/course" element={<Course />} />
     
      </Routes>
    </Router>
    </>
  )
}

export default App
