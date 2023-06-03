import React,{useState}from 'react'
import { Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import "./Landingpage.css"

function Landingpage() {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    function loginform(e){
        e.preventDefault()
        if(JSON.parse(localStorage.getItem("usersinformation"))){
            localStorage.removeItem("usersinformation")
        }
        axios.post("http://localhost:5600/login",{email,password}).
        then(res=>{
            (localStorage.setItem("usersinformation",JSON.stringify(res.data)));
    navigate("/dashboard")}).catch(e=>console.log({error:e}))
    }
    return (

        <section style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>

            <div class="px-4 py-5 px-md-5 text-center text-lg-start">
                <div class="container">
                    <div class="row gx-lg-5 align-items-center">
                        <div class="col-lg-6 mb-5 mb-lg-0">
                            <h1 class="my-5 display-3 fw-bold ls-tight">
                                The best platform <br />
                                <span class="text-primary">for your business</span>
                            </h1>
                            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                                quibusdam tempora at cupiditate quis eum maiores libero
                                veritatis? Dicta facilis sint aliquid ipsum atque?
                            </p>
                        </div>

                        <div class="col-lg-6 mb-5 mb-lg-0">
                            <div class="card">
                                <div class="card-body py-5 px-md-5">
                                    <form onSubmit={loginform}>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example3">Email address</label>
                                            <input type="email"  class="form-control form-control-lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>

                                        </div>
                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example4">Password</label>
                                            <input type="password"  class="form-control form-control-lg" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                                        </div>
                                        <button type="submit" class="btn btn-primary btn-block mb-4 w-100">
                                            Login
                                        </button>
                                        </form>
                                        <h6 style={{textAlign:"end"}}>Don't have an account?<Link to='/Registration-form'>
                                        <span style={{marginLeft:"20px"}}>Sign up</span></Link></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>


    )
}

export default Landingpage
