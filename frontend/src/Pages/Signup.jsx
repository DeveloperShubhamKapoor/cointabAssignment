import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import styles from "../styles/signup.module.css"

const initUserInfo = {
    email:"",
    password:""
}

export const Signup =()=>{
    const [userSignup,setUserSignup] = useState(initUserInfo)
    const [isSignupSuccess,setIsSignupSuccess] = useState({message:"",signedUp:false})
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name,value} = e.target
        setUserSignup({
            ...userSignup,
            [name]:value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(userSignup.email =="" || userSignup.password==""){
            alert("Enter complete info")
        }
        else{
            setLoading(true)
            fetch("https://cointab-backend.up.railway.app/usersignup",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userSignup)
            })
            .then((res)=>res.json())
            .then((res)=>setIsSignupSuccess(res))
            .finally(()=>setLoading(false))
        }   
    }
    useEffect(()=>{
        if(isSignupSuccess.signedUp){
            alert("Signup successfull")
            navigate("/login")
        }
        if(isSignupSuccess.signedUp==false && isSignupSuccess.message!=""){
            alert(isSignupSuccess.message)
        }
    },[isSignupSuccess])

    return(
    <>
        <Navbar/>
        <form className={styles.signup_form_container} action="" onSubmit={handleSubmit}>
            <input onChange={handleChange} type="text" name="email" value={userSignup.email} placeholder="Enter e-mail" />
            <br />
            <input onChange={handleChange} type="password" name="password" value={userSignup.password} placeholder="Enter password" />
            <br />
            {loading?<button>Signing up...</button>:<button type="submit">Signup</button>}
            
        </form>
    </>
    )
}