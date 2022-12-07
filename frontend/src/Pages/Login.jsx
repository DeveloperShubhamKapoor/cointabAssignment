import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import styles from "../styles/signup.module.css"

const initUserInfo = {
    email:"",
    password:""
}
export const Login = ()=>{
    const [userLogin,setUserLogin] = useState(initUserInfo)
    const [isLoginSuccess,setIsLoginSuccess] = useState({message:"",token:null,loggedIn:false,email:""})
    console.log(isLoginSuccess)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name,value} = e.target
        setUserLogin({
            ...userLogin,
            [name]:value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(userLogin.email=="" || userLogin.password==""){
            alert("Enter complete info")
        }
        else{
            setLoading(true)
            fetch("https://cointab-backend.up.railway.app/userlogin",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(userLogin)
            })
            .then((res)=>res.json())
            .then((res)=>setIsLoginSuccess(res))
            .finally(()=>setLoading(false))
        }
    }

    useEffect(()=>{
        if(isLoginSuccess.loggedIn){
            localStorage.setItem("coinTab_login_token",isLoginSuccess.token)
            localStorage.setItem("email",isLoginSuccess.email)
            alert("Login success")
            navigate("/homepage")
        }
        if(isLoginSuccess.loggedIn== false && isLoginSuccess.message!=""){
            alert(isLoginSuccess.message)
        }
    },[isLoginSuccess])
    return(
    <>
        <Navbar/>
        <form className={styles.signup_form_container} action="" onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" name="email" value={userLogin.email} placeholder="Enter e-mail" />
            <br />
            <input onChange={handleChange} type="password" name="password" value={userLogin.password} placeholder="Enter password" />
            <br />
            {loading ? <button type="submit">Logging in...</button>:<button type="submit">Login</button>}
        </form>
    </>
    )
}