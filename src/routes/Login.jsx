import Button from "components/Button";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { login, signin } from "features/usersSlice";
import style from './login.module.css'
import { useNavigate } from "react-router";

export default function Login (){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginSignIn, setLoginSignIn] = useState(false);
  const [loginState, setLoginState] = useState('')
  const [animationClass, setAnimationClass] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (loginState === 'toggled') {
      setAnimationClass(style.toggled)
    } else if(loginState === 'untoggled'){
      setAnimationClass(style.untoggled)
    }
  }, [loginState]);

  useEffect(()=>{
    usernameRef.current.focus();
  },[])
  function handleLogin(e){
    e.preventDefault()
    if(username !== '' && password !== ''){
      dispatch(login( {
        username,
        password
      }))
      setUsername('')
      setPassword('')
      setTimeout(() => {
        navigate('/products')
      }, 1000);
    }
  }
  function handleSignIn(e){
    e.preventDefault()
    if(username !== '' && password !== ''){
      dispatch(signin({
        username,
        password
      }))
      setUsername('')
      setPassword('')
    }
  }
  function handleUsernameChange(e){
    setUsername(e.target.value)
  }
  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  return(
    <>
      <h1 className={style.title}>{loginState === 'toggled' ? 'Login' : 'Sign in' } in form</h1>
      <div className={style.mainLoginContainer}>
        <form action="" className={style.formContainer}>
          <label>
            Username (email)
            <input 
            onChange={(e)=>handleUsernameChange(e)}
            ref={usernameRef}
            value={username}
            type="email"/>
          </label>
          <label>
            Password
            <input 
            onChange={(e)=>handlePasswordChange(e)}
            ref={passwordRef}
            value={password}
            type="password"/>
          </label>
          <div className={style.toggleContainer}>
            <button 
              onClick={(e)=>{
                e.preventDefault()
                setLoginSignIn(!loginSignIn)
                setLoginState(loginSignIn ? 'untoggled' : 'toggled')
                }}
              className={style.switch}>
              <span 
                className={animationClass}></span>
            </button>
            {
              loginSignIn ?
              <>
                <Button

                  handleClick={(e)=>handleLogin(e)}
                >Login</Button>
              </>
              :
              <>
                <Button
                  handleClick={(e)=>handleSignIn(e)}
                >Sign in</Button>
              </>
            }
          </div>
        </form>
      </div>
    </>
  )
}