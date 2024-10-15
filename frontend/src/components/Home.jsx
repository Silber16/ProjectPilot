import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Projects from "./Projects"
import axios from "axios"
import AppDesc from './AppDesc'
import Register from "./Register"


export default function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACK_URI}/Account/CheckAuth`, {withCredentials:true})
            .then(res => {
                setIsLoggedIn(res.data.isAuthenticated)
            })
            .catch(() => {
                setIsLoggedIn(false)
                
            })
    }, [])
    
  return (
    <>
        <section className="home-sec">
       {isLoggedIn ? 
       (
            <>
                <header className="home-sec__header">
                    <h1 className="home-sec__header--title"><a href="#">ProjectPilot</a></h1>
                    <Link to={'/UserData'} className="home-sec__header--user" ><span className="material-symbols-outlined">account_circle</span></Link>
                </header>
                <Projects />
            </>
       ) 
       : 
       (
            <>
                <header className="home-sec__header">
                    <h1 className="home-sec__header--title"><a href="#">ProjectPilot</a></h1>
                </header>
                <div className="home-sec__landing">
                    <p className="home-sec__landing--phrase">
                        Manage your projects <br /> in the simplest way. 
                        <br /><span style={{color: 'var(--o-color)', fontWeight: '600'}}>100% free.</span>
                    </p>
                    <Link to={'/Register'} className="home-sec__landing--registerBtn">Register/Login</Link>
                    <Register className="home-sec__landing--registerComp" />
                </div>
                <span style={{position: 'absolute', bottom: '1rem', fontSize: '2.5rem', color: 'var(--b-color)'}} className="material-symbols-outlined">keyboard_arrow_down</span>
            </>
       )
       }
       </section>
       {isLoggedIn == false && <AppDesc />}
    </>
  )
}
