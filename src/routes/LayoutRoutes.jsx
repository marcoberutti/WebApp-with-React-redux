import { Outlet } from "react-router"
import style from './layoutRoutes.module.css'
import Navbar from "components/navbar/Navbar"
import Footer from "components/footer/Footer"

export default function LayoutRoutes(){
  return(
    <>
      <main className={style.main}>
        <Navbar/>
        <div className={style.outlet}>
          <Outlet/>
        </div>
        <Footer/>
      </main>
    </>
  )
}