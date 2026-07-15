import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layouts/layout'
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicOnlyRoute from './routes/PublicOnlyRoute'

function App() {
  return (
    <Routes>
      {/* Public routes — redirect to dashboard if already logged in */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        {/* Register UI currently lives inside Login; keep path for future split */}
        <Route path="/register" element={<Login />} />
      </Route>

      {/* Protected routes — Layout only renders when authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
      </Route>

      {/* Default entry */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
