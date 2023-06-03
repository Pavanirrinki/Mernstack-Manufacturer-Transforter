import React, { useEffect, useState } from 'react'
import "./Addorder.css";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Addorder() {
  const navigate = useNavigate()
  const usersrole = JSON.parse(localStorage.getItem("usersinformation"))
  const response = usersrole?.existingUser._id;
 const Address = usersrole?.existingUser.Address;
    const quantitydata =["1","2","3","4","5","6","7","8"]
    const [transporters,setTransporters] = useState([])
    const [where,setWhere] = useState('')
    const [orderId,setOrderId] = useState('')
    const [destination,setDestination] = useState('')
   
    const [selectedQuantity, setSelectedQuantity] = useState('');
    const [transporter,setTransporter] = useState("")
 
    useEffect(()=>{
axios.get("http://localhost:5600/transporter-profiles").then(res=>setTransporters(res.data));
const id = uuidv4();
setOrderId(id)
    },[])
    function submitorder(e){
      e.preventDefault()
      if (orderId === '' || where === "" || destination === '' || Address === '' || selectedQuantity === '' || transporter === '') {
        alert("Please fill all fields");
      } else {
        axios
          .post("http://localhost:5600/manufacturer-order", {
            orderId,
            where,
            destination,
            Address,
            quantity: selectedQuantity,
            Transporter: transporter,
            createdBy: response
          }).then(res=>navigate('/dashboard'))
          .catch(error => {
            console.log(error);
            alert(JSON.stringify(error.response.data));
          });
      }
      
}   
  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };
  return (
    <div className='bodyof'>
    <div class="container contact-form">
            <div class="contact-image">
                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
            </div>
            <form onSubmit={submitorder}>
                <h3>Drop Us a Message</h3>
               <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="form-group">
                            <input type="text" name="txtName" class="form-control mb-3" placeholder="OrderId" value={orderId} disabled />
                        </div>
                        <div class="form-group">
                            <input type="text" name="txtEmail" class="form-control mb-3" placeholder="From" value={where} onChange={(e)=>setWhere(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="text" name="txtPhone" class="form-control  mb-3"  placeholder="To" value={destination} onChange={(e)=>setDestination(e.target.value)}/>
                        </div>
                        <div class="form-group">
                            <input type="text" name="txtPhone" class="form-control  mb-3"  placeholder="Address" value={usersrole.existingUser.Address} disabled/>
                        </div>
                        
                        <div className="form-group">

  <select name="txtPhone" id="txtPhone" className="form-control mb-3" value={transporter} onChange={(e)=>setTransporter(e.target.value)}>
  <option value="">Choose Transporter...</option>
    {transporters && transporters?.profiles?.map((element) => (
      <option key={element._id} value={element._id}>{element.firstname}     {element.lastname}</option>
    ))}
  </select>
</div>
<div className="form-group">

      <select
        name="txtPhone"
        id="txtPhone"
        className="form-control mb-3"
        value={selectedQuantity}
        onChange={handleQuantityChange}
      >
          <option value="">Choose Quantity...</option>
        {quantitydata.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
 <div class="form-group">
                            <input type="submit" name="btnSubmit" class="btnContact" value="Send Message" />
                        </div>
                    </div>
                    
                </div>
            </form>
</div>
</div>
  )
}

export default Addorder
