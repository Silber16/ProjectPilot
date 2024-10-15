
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';

export default function Register({className}) {

  const {register, handleSubmit} = useForm();

   async function Send(data) {
    console.log(data)
        await axios.post(`${import.meta.env.VITE_BACK_URI}/Account/Register`, data) 
        console.log("register ok")
  }

  return (
        <section className={`login-register-sec ${className}`}>
            <Link to={'/'} className='login-register__btns--btn'>
            <span className="material-symbols-outlined arrow-back">arrow_back</span>
            </Link>
            <label className='login-register-sec__lbl'>Register</label>
            <form className='login-register-sec__form' onSubmit={handleSubmit(Send)}>
                <div className='login-register-sec__form--inpts'>
                    <input placeholder='Email' type="email" name="" id="" {...register("Email")}/>
                    <input placeholder='Password' type="password" name="" id="" {...register("Password")}/>
                    <input placeholder='Confirm password' type="password" name="" id="" {...register("ConfirmPassword")}/>
                </div>
                <button className='login-register-sec__form--submit' type="submit">Register</button>
            </form>
            <p>You already registered? <Link to={`/Login`}>Login</Link></p>
        </section>  
  )
}
