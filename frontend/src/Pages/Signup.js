import React,{useState} from 'react'
import "./Landingpage.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const navigate = useNavigate()
const [selectedOption, setSelectedOption] = useState('');
const [firstname,setFirstname] = useState('')
const [lastname,setLastname] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [address,setAddress] = useState('')
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
const formsubmit =async (e) =>{
    e.preventDefault();
    console.log(address)
   await axios.post("http://localhost:5600/signup",{firstname,
    lastname,
    email,
    password,
    Role:selectedOption,
    Address:address}).then(res=>navigate('/')).catch(error=>console.log(error.response))
}
  return (
    <section class="gradient-custom">
    <div class="container py-5 h-100">
      <div class="row justify-content-center align-items-center h-100">
        <div class="col-12 col-lg-9 col-xl-7">
          <div class="card shadow-2-strong card-registration" style={{borderRadius:"15px"}}>
            <div class="card-body p-4 p-md-5">
              <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
              <form onSubmit={formsubmit}>
  
                <div class="row">
                  <div class="col-md-6 mb-4">
  
                    <div class="form-outline">
                    <label class="form-label" for="firstName">First Name</label>
                      <input type="text" id="firstName" class="form-control form-control-lg" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                     
                    </div>
  
                  </div>
                  <div class="col-md-6 mb-4">
  
                    <div class="form-outline">
                    <label class="form-label" for="lastName">Last Name</label>
                      <input type="text" id="lastName" class="form-control form-control-lg" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                 
                    </div>
  
                  </div>
                </div>
  
                <div class="row">
              
                  <div class="col-md-12 mb-4">
  
                    <h6 class="mb-2 pb-1">Role: </h6>
  
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="Manufacturer"
                        value="Manufacturer"   checked={selectedOption === 'Manufacturer'}
                        onChange={handleOptionChange}/>
                      <label class="form-check-label" for="Manufacturer" >Manufacturer</label>
                    </div>
  
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="Transporter"
                        value="Transporter"  checked={selectedOption === 'Transporter'}
                        onChange={handleOptionChange}/>
                      <label class="form-check-label" for="Transporter">Transporter</label>
                    </div>
  
                   
  
                  </div>
                </div>
  
                <div class="row">
                  <div class="col-md-6 mb-4 pb-2">
  
                    <div class="form-outline">
                    <label class="form-label" for="emailAddress">Email</label>
                      <input type="email"  class="form-control form-control-lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                   
                    </div>
  
                  </div>
                  <div class="col-md-6 mb-4 pb-2">
  
                    <div class="form-outline">
                    <label class="form-label" for="phoneNumber">Password</label>
                      <input type="password"  class="form-control form-control-lg" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    
                    </div>
  
                  </div>
                </div>
  
                <div class="row">
                  <div class="col-12">
                  <label class="form-label" for="phoneNumber">Address</label>
                      <input type="text"  class="form-control form-control-lg" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                  </div>
                </div>
  
                <div class="mt-4 pt-2">
                  <input class="btn btn-primary btn-lg" type="submit" value="Submit" />
                </div>
  
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Signup
