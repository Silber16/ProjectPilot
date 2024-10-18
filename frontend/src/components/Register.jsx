
import axios from 'axios'
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import { Link } from 'react-router-dom';

export default function Register({className}) {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const [loading, setLoading] = useState(false);

  console.log(errors)
   async function Send(data) {
        setLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_BACK_URI}/Account/Register`, data) 
            window.location.href = "/Login"; 
        } catch (e) {
            console.error("register error ", e);
        } finally {
            setLoading(false); 
        }
        
  }

  return (
        <section className={`login-register-sec ${className}`}>
            <Link to={'/'} className='login-register__btns--btn'>
            <span className="material-symbols-outlined arrow-back">arrow_back</span>
            </Link>
            <label className='login-register-sec__lbl'>Register</label>
            <form className='login-register-sec__form' onSubmit={handleSubmit(Send)}>
                <div className='login-register-sec__form--inpts'>
                    <input placeholder='Email' type="email" name="" id="" {...register("Email", {
                        required: {
                            value: true,
                            message: "Email is required."
                        } 
                        })}/>
                    {errors.Email && <span className='error-message'>{errors.Email.message}</span>}
                    <input  placeholder='Password' type="password" name="" id="" {...register("Password", { 
                        required: {
                            value: true,
                            message: "Password is required."
                        },
                        minLength: {
                            value: 8,
                            message: "Min length: 8."
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/,
                            message: "Password must contain at least one uppercase letter, one number, and one special character"
                          }
                    })}/>
                    {errors.Password && <span className='error-message'>{errors.Password.message}</span>}
                    <input placeholder='Confirm password' type="password" name="" id="" {...register("ConfirmPassword", {
                        required: {
                            value: true,
                            message: "Password is required."
                        },
                        minLength: {
                            value: 8,
                            message: "Min length: 8."
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).+$/,
                            message: "Password must contain at least one uppercase letter, one number, and one special character"
                          }
                    })}/>
                    {errors.ConfirmPassword && <span className='error-message'>{errors.ConfirmPassword.message}</span>}
                </div>
                {loading 
                    ? (<p>Loading...</p>)
                    : (<button className='login-register-sec__form--submit' type="submit">Register</button>)
                }
            </form>
            <p>You already registered? <Link to={`/Login`}>Login</Link></p>
        </section>  
  )
}
