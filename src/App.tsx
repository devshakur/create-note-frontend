import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layouts/layout'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
