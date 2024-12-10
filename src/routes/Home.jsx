import ProductCardsHome from "components/productsCardsHome/ProductCardsHome"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './home.module.css'
import { NavLink } from "react-router";
import Slider from "react-slick";
import mainPic from '../assets/mainPic.jpg'
import mainPic2 from '../assets/mainPic2.jpg'
import mainPic3 from '../assets/mainPic3.jpg'
import mainPic4 from '../assets/mainPic4.jpg'

export default function Home(){
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} customArrow`}
        style={{ ...style, display: "block", background: "", right: "15px", zIndex: 10 }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} customArrow`}
        style={{ ...style, display: "block", background: "", left: "15px", zIndex: 10 }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }

  return(
    <>
    <div>
      {/* <Slider {...settings}>
        <div  className={style.header}>
          <div className={style.headerTitle}>
            <h1>Welcome to our shop</h1>
            <h3>The best products of our lands</h3>
            <h4>Contact us</h4>
          </div>
          <img src={mainPic} className={style.mainPic} alt=""/>
        </div>
        <div  className={style.header}>
          <div className={style.headerTitle}>
            <h1>Welcome to our shop</h1>
            <h3>The best products of our lands</h3>
            <h4>Contact us</h4>
          </div>
        <img src={mainPic2} className={style.mainPic} alt=""/>
        </div>
        <div  className={style.header}>
          <div className={style.headerTitle}>
            <h1>Welcome to our shop</h1>
            <h3>The best products of our lands</h3>
            <h4>Contact us</h4>
          </div>
        <img src={mainPic3} className={style.mainPic} alt=""/>
        </div>
        <div  className={style.header}>
          <div className={style.headerTitle}>
            <h1>Welcome to our shop</h1>
            <h3>The best products of our lands</h3>
            <h4>Contact us</h4>
          </div>
        <img src={mainPic4} className={style.mainPic} alt=""/>
        </div>
      </Slider> */}
    </div>
    <div className={style.cartLinkContainer}>
      <div>
        <h1 className={style.mainTitle}>Our shop</h1>
        <h3>Here our products:</h3>
      </div>
      <NavLink className={style.cartLink} to='/cart'>My cart</NavLink>
    </div>
    <div className={style.productsContainer}>
    <ProductCardsHome/>
    </div>
    </>
  )
}