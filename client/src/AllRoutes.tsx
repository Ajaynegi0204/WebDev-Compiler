
import { lazy, Suspense } from 'react'
import {Route, Routes} from 'react-router-dom'
import Loading from './components/Loader/Loading';


const Home = lazy(()=> import("./pages/Home"));
const Login = lazy(()=> import("./pages/Login"));
const Signup = lazy(()=> import("./pages/Signup"));
const Compiler = lazy(()=> import("./pages/Compiler"));
const NotFound = lazy(()=> import("./pages/NotFound"));
const MyCodes = lazy(()=> import("./pages/MyCodes"))
const AllCodes = lazy(()=> import("./pages/AllCodes"))
function AllRoutes() {
  return (
    <Suspense fallback={<div className='w-full h-[calc(100dvh-60px)] flex items-center justify-center'><Loading /></div>}>
    <Routes>
        <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/compiler/:urlId?' element={<Compiler />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/all-codes' element={<AllCodes />} />
      <Route path='/my-codes' element={<MyCodes />} />

    </Routes>
    </Suspense>
  )
}

export default AllRoutes