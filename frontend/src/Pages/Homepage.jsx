import { Navbar } from "../components/Navbar"

export const Homepage=()=>{
    const email = localStorage.getItem("email")
    return(<>
        <Navbar/>
        <div style={{marginTop:"20px",padding:"10px"}}>
            e-mail: {email}
        </div>
    </>
    )
}