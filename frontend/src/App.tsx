import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from './pages/LoginPage'
import AppLayout from './components/layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import UserPage from './pages/UserPage'
import CategoryPage from './pages/CategoryPage'
import TransactionPage from './pages/TransactionPage'
import FormTransactionPage from './pages/FormTransactionPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/users' element={<UserPage/>} />
          <Route path='/categories' element={<CategoryPage/>} />
          <Route path='/products' element={<ProductPage/>} />
          <Route path='/transactions' element={<TransactionPage/>} />
          <Route path='/transactions/create' element={<FormTransactionPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
