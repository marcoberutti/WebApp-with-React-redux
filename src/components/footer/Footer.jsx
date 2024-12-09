import style from './footer.module.css'
import { NavLink } from 'react-router';
import logo from '../../assets/logo.jpg'
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Footer(){
  return(
    <footer className={style.footerContainer}>
      <div>
        <img src={logo} alt=""/>
        <div>
          <p>My company LTD</p>
          <p>Tel: 0123456789</p>
          <p>21<sup>th</sup> street, Chicago</p>
        </div>
      </div>
      <div>
      <i className={`${style.socialIcon} bi bi-instagram`}></i>
      <i className={`${style.socialIcon} bi bi-linkedin`}></i>
      <i className={`${style.socialIcon} bi bi-youtube`}></i>
      <i className={`${style.socialIcon} bi bi-whatsapp`}></i>
      </div>
      <div>
        <NavLink>Join us</NavLink>
        <NavLink>Our blog</NavLink>
        <NavLink>Contact us</NavLink>
        <NavLink to='/map'>Where we are</NavLink>
      </div>
    </footer>
  )
}