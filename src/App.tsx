import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicOnlyRoute from './routes/PublicOnlyRoute'

const Layout = lazy(() => import('./layouts/layout'))
const Home = lazy(() => import('./pages/Home'))
const SearchNote = lazy(() => import('./pages/SearchNote'))
const Archives = lazy(() => import('./pages/Archives'))
const Settings = lazy(() => import('./pages/Settings'))

const RouteFallback = () => (
  <div className="flex min-h-svh items-center justify-center bg-[#f3f3f3]">
    <p className="text-sm text-neutral-500">Loading...</p>
  </div>
)

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/search" element={<SearchNote />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
