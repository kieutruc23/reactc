import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'



const LayoutSite = () => {
  return (
    <div className='relative'>
        <Header/>
        <main>
            <Outlet/>
        </main>
          <Footer/>
    </div>
  )
}

export default LayoutSite