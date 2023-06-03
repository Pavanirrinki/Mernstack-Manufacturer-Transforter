import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Transporterdashboard() {
  const usersrole = JSON.parse(localStorage.getItem("usersinformation"))
  const responsedata = usersrole?.existingUser
  let priceValue = 0;
  const [orders, setOrders] = useState([]);
  const [prices, setPrices] = useState([]);

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = value;
    setPrices(updatedPrices);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5600/profile/${responsedata?._id}`)
      .then(res => {
        const response = res.data;
        if (response?.orders) {
          const orderIds = response.orders.map(id => `orderId=${id}`).join('&');
          axios
            .get(`http://localhost:5600/Transporter-orders?${orderIds}`)
            .then(res => setOrders(res.data))
            .catch(error => {
              console.log({ error });
            });
        }
      })
      .catch(error => {
        console.log({ error });
      });
  }, []);

  const pricesubmit = (id, index, e) => {
    e?.preventDefault();
    priceValue = prices[index];

    axios
      .put('http://localhost:5600/update-price', {
        id,
        price: priceValue,
      })
      .then(res => {
        alert(JSON.stringify(res.data.message));
        window.location.reload();
      })
      .catch(error => alert('Something went wrong'));
  };

  console.log(orders);

  return (
    <div className='container'>
      <div className='row'>
        {orders &&
          orders?.allOrders?.map((item, index) => (
            <div
              className='card mt-5 col-md-4'
              style={{ width: '18rem', marginLeft: '10px', marginRight: '50px' }}
              key={index}
            >
              <div className='card-header'>Featured</div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  <div className='d-flex'>
                    <h6 className='fw-bold'>orderId:</h6>
                    <span>{item.orderId}</span>
                  </div>
                </li>
                <li className='list-group-item'>
                  <div className='d-flex '>
                    <h6 className='fw-bold'>From:</h6>
                    <span style={{ margin: '0 auto' }}>{item.where}</span>
                  </div>
                </li>
                <li className='list-group-item'>
                  <div className='d-flex'>
                    <h6 className='fw-bold'>To:</h6>
                    <span style={{ margin: '0 auto' }}>{item.destination}</span>
                  </div>
                </li>
                <li className='list-group-item'>
                  <div className='d-flex'>
                    <h6 className='fw-bold'>Quantity:</h6>
                    <span style={{ margin: '0 auto' }}>{item.quantity}</span>
                  </div>
                </li>
                <input
                  type='number'
                  className='mb-3 rounded'
                  placeholder='Enter price........'
                  value={prices[index] || (item.price <= 0 ? '' : item.price)}
                  onChange={e => handlePriceChange(index, e.target.value)}
                />

                <span>
                  <button
                    className='btn btn-primary rounded-pill'
                    onClick={e => pricesubmit(item._id, index, e)}
                    disabled={item.price > 0}
                  >
                    Reply
                  </button>
                </span>
              </ul>
            </div>
          ))}
          {orders?.allOrders?.length <=0 && <h1>NO ORDERS FOR YOU</h1>}
      </div>
    </div>
  );
}

export default Transporterdashboard;
