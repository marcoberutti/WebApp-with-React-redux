import style from './button.module.css'

export default function Button ({children, handleClick, disabled, addRemove}) {
  return (
    <button 
      className={`${disabled ? style.disabled : style.myBtn} ${addRemove && style.addRemove}`}
      onClick={handleClick}
      disabled={disabled && true}
    >{children}</button>
  )
}