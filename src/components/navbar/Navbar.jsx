import { NavLink, useNavigate } from "react-router"
import style from './navbar.module.css'
import { useDispatch, useSelector } from "react-redux"
import { logout, resetMessage } from "features/usersSlice";
import { useEffect, useState } from "react";

export default function Navbar(){
  let message = useSelector((state) => state.users.message)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem('userToken')

  const [isUserToken, setIsUserToken] = useState(false) 
  const [isVisibleMenu, setIsVisibleMenu] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576); 
    };
    window.addEventListener('resize', handleResize); 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])
  useEffect(() => {
    setIsVisibleMenu('')
  }, [isMobile]);
  useEffect(()=>{
    if(userToken){
      setIsUserToken(true)
    } else {
      setIsUserToken(false)
    }
  },[userToken])
  useEffect(()=>{
    if(message){
      setTimeout(()=>{
        dispatch(resetMessage())
      },3000)
    }
  },[message, dispatch])
  function handleLogout(){
    dispatch(logout())
    navigate('/home')
  }

  return (
    <nav className={`
      ${isVisibleMenu === '' && ''} 
      ${isVisibleMenu === true && style.navBarLong} 
      ${isVisibleMenu === false && style.navBarShort}`}>
      <ul className={isVisibleMenu ? style.ulFlex : style.ulNormal}>
      { isMobile &&
        <NavLink 
          className={`${style.hamburgerMenu} ${isVisibleMenu && style.hamburgerAnimated}`}
          onClick={()=> setIsVisibleMenu(!isVisibleMenu)}>
          <div>
            <span className={isVisibleMenu && style.spanTransformedA}>|</span>
            <span className={isVisibleMenu && style.spanTransformedB}>|</span>
            <span className={isVisibleMenu && style.spanTransformedC}>|</span>
          </div>
        </NavLink>
      }
        <div className={`${style.menuContainer} ${isVisibleMenu ? style.visible : ''}`}>
          <NavLink className={style.navLink} to='/home'>Home</NavLink>
          <NavLink className={style.navLink} to='/about'>About</NavLink>
          <NavLink className={style.navLink} to='/cart'>Cart</NavLink>
          {
            isUserToken ?
            <>
              <NavLink className={style.navLink} to='/products'>Products</NavLink>
              <NavLink 
                onClick={()=>handleLogout()}
                className={style.navLink} 
                to='/home'>
              Logout
              </NavLink>
            </>
            :
            <NavLink className={style.navLink} to='/login'>Login</NavLink>
          }
        </div>
      </ul>
      {message && 
      <div className={style.messageDiv}>{message}</div>
      }
    </nav>
  )
}