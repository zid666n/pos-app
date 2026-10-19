import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import AppLayout from './components/layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import UserPage from './pages/UserPage'
import CategoryPage from './pages/CategoryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/users' element={<UserPage/>} />
          <Route path='/categories' element={<CategoryPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
