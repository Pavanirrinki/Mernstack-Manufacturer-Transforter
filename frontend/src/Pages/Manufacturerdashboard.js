import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'

function Manufacturerdashboard() {
  const usersrole = JSON.parse(localStorage.getItem("usersinformation"))
  const response = usersrole?.existingUser._id;
  const [allorders,setAllorders] = useState(null)
  useEffect(()=>{
  axios.get(`http://localhost:5600/all-orders-of-manufacturer/${response}`).then(res=>setAllorders(res.data)).catch(e=>console.log(e))
  },[])
  console.log(allorders)
  return (
    <section class="vh-100" style={{backgroundColor:"#eee"}}>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-12 col-xl-10">
  
          <div class="card">
            <div class="card-header p-3">
              <h5 class="mb-0"><i class="fas fa-tasks me-2"></i>Orders List</h5>
            </div>
            <div class="card-body" data-mdb-perfect-scrollbar="true" style={{position:"relative"}}>
  
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">OrderId</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">price</th>
                  </tr>
                </thead>
                {allorders && allorders?.allordersofmanufacturer?.map((item)=>(
                <tbody>
                  <tr class="fw-normal">
                    <th>
                     
                      <span class="ms-2">{item.orderId}</span>
                    </th>
                    <td class="align-middle">
                      <span>{item.where}</span>
                    </td>
                    <td class="align-middle">
                      <h6 class="mb-0"><span >{item.destination}</span></h6>
                    </td>
                    <td class="align-middle">
                    <span>{item.quantity}</span>
                    </td>
                    <td class="align-middle">
                      {item.price <=0 ?
                      <h6 class="mb-0"><span class="badge bg-danger">Pending</span></h6>:
                       <h6 class="mb-0"><span class="badge bg-success">Accepted</span></h6>}
                    </td>
                    <td class="align-middle">
                    <span className='fw-bold'>Rs.{item.price}</span>
                    </td>
                  </tr>
                 
                </tbody>))}
              </table>
  
            </div>
            <Link to='/add-order'>
            <div class="card-footer text-end p-3">
           <button class="btn btn-primary">Add Order</button>
         
            </div>
            </Link>
          </div>
  
        </div>
      </div>
    </div>
  </section>
  )
}

export default Manufacturerdashboard
