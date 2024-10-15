
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

export default function Login() {

  const {register, handleSubmit} = useForm();

   async function Send(data) {
        await axios.post(`${import.meta.env.VITE_BACK_URI}/Account/Login`, data, {withCredentials: true}) 
        .then(() => {
            window.location.href = "/";
        })
        .catch(e => console.error("login error: ", e) )
      }

  return (
        <section className='login-register-sec'>
            <Link to={'/'} className='login-register__btns--btn'>
            <span className="material-symbols-outlined arrow-back">arrow_back</span>
            </Link>
            <label className='login-register-sec__lbl'>Login</label>
            <form className='login-register-sec__form' onSubmit={handleSubmit(Send)}>
                <div className='login-register-sec__form--inpts'>
                    <input placeholder='Email' type="email" name="Email"{...register("Email")}/>
                    <input placeholder='Password' type="password" name="Password" {...register("Password")}/>
                    <div className='login-register-sec__form--inpts__rm'>
                        <label style={{margin: '0 .3rem', fontSize: '1.1rem'}} htmlFor="">Remember me</label>
                        <input style={{margin: '0 .3rem', padding:'.5rem'}} type="checkbox" name="RememberMe" {...register("RememberMe")}/>
                    </div>
                </div>
                <button className='login-register-sec__form--submit' type="submit">Login</button>
            </form>
            <p>You are not registered? <Link to={`/Register`}>Register</Link></p>
        </section>  
  )
}
