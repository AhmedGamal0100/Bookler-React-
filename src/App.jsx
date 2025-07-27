import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Notfound from './pages/Notfound/Notfound'
import Landing from './pages/Landing/Landing'
import './App.css';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import ProtectedRoute from './routes/ProtectedRoute';
const Login = lazy(() => import('./Pages/Login/Login'));
const Register = lazy(() => import('./Pages/Register/Register'));
const Hotels = lazy(() => import('./Pages/Hotels/Hotels'));
const Search = lazy(() => import('./pages/Search/Search'))
const Details = lazy(() => import('./pages/Details/Details'))
const Bookings = lazy(() => import('./pages/Bookings/Bookings'))
const MyBookings = lazy(() => import('./pages/MyBooking/MyBooking'))
function App() {

  return (
    <>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path='' element={<MainLayout />}>
              <Route path='' element={<Landing />} />
              <Route path='/hotels' element={<Hotels />} />
              <Route path='/search' element={<Search />} />
              <Route path='/details/:id' element={<Details />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/booking/:id' element={<Bookings />} />
                <Route path='/mybooking' element={<MyBookings />} />
              </Route>
            </Route>

            <Route element={<AuthLayout />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>

            <Route path='*' element={<Notfound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
