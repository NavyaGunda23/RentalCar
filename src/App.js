import {useEffect, useRef, useState} from 'react';
import carIcon from './car.svg';
import './App.css';


function App() {

  const amnt_val = useRef(null)
  const name_val = useRef(null)
  const email_val = useRef(null)
  const phone_val = useRef(null)

  const [ card, setCard] = useState( 
    [
    {
      "id": 1,
      "name": "Mruti Swft 2050",
      "price": 5.20,
      "available": false,
      "rental_price": 5000,
      "type": "Hatchback"
    },
    {
      "id": 2,
      "name": "Rnault Kger",
      "price": 5.20,
      "available": true,
      "rental_price": 3000,
      "type": "SUV"
    },
    {
      "id": 3,
      "name": "Adi x-ton",
      "price": 5.20,
      "available": false,
      "rental_price": 5000,
      "type": "SUV"
    },
    {
      "id": 4,
      "name": "And over ange over port",
      "price": 209,
      "available": false,
      "rental_price": 100000,
      "type": "Luxury"
    },
    {
      "id": 5,
      "name": "Aton rtin BS",
      "price": 500,
      "available": true,
      "rental_price": 500000,
      "type": "Luxury"
    },
    {
      "id": 6,
      "name": "Ercedes-Enz A",
      "price": 35,
      "available": false,
      "rental_price": 50000,
      "type": "Sedan"
    },
    {
      "id": 7,
      "name": "MW 2 Series",
      "price": 32,
      "available": false,
      "rental_price": 50000,
      "type": "Hatchback"
    },
  ])

  const [ action, setAction] = useState({
    modal_visiblity:false,
    clicked_id:0,
    rental:0
  })

  const bookNow = (e, id,rent) => {
    action.modal_visiblity = true
    action.clicked_id = id
    action.rental = rent
    setAction({...action})
  }

  const cancel_action = () => {
    action.modal_visiblity = false
    setAction({...action})
  }

  const calculate_amount = (e) => {
    action.rental = card[action.clicked_id-1].rental_price
    if(e.target.value == "1 Month"){
      action.rental =  action.rental
    }else if(e.target.value == "3 Month"){
      action.rental =  action.rental * 3 
    }else if(e.target.value == "6 Month"){
      action.rental =  action.rental * 6 
    }else{
      action.rental =  action.rental * 12 
    }
   
    setAction({...action})
  }
  const Submit_Booking = () => {
      if(!(name_val.current.value == "" && email_val.current.value == "" && phone_val.current.value == "")){
        window.alert = () => {"Success !"}
         
          action.modal_visiblity = false
          setAction({...action})
      }

     
  }

  return (
    <div className="">

      <h1 className="heading">Online Car Rental Service</h1>
      <div className="container">
        {card.map(x => (
          <div className="card" data-testid={"car_"+x.id} key = {x.id}  onClick={e => bookNow(e,x.id,x.rental_price)}>
                <img className="car" />
                <h1>{x.name}</h1>
                <p>{x.price}</p>
                <p className="rental-price">{x.rental_price} INR/MONTH</p>
                <p className="vehicle-type">{x.type}</p>
            </div>
        ))}
      </div>

        {action.modal_visiblity && 

               <div className="request-form" >
                 {card.filter(x => x.id ==  action.clicked_id).map(x => (
                     <div className="content">
                     <h1>Book Now</h1>
                     <hr />
                     <div>
                         <label>Model</label>
                         <h2 className="model-name" >{x.name}</h2>
                     </div>
                     <div>
                       <label>Duration</label>
                       <div><input type="radio"  name="duration" data-testid="duration_1" value="1 Month"  onChange={e => calculate_amount(e)}/> 1 Month</div>
                       <div><input type="radio" name="duration" data-testid="duration_3"  value="3 Month" onChange={e => calculate_amount(e)}/> 3 Month</div>
                       <div><input type="radio" name="duration" data-testid="duration_6"  value="6 Month" onChange={e => calculate_amount(e)}/> 6 Month</div>
                       <div><input type="radio" name="duration" data-testid="duration_12" value="1 Year" onChange={e => calculate_amount(e)}/> 1 Year</div>
                     </div>
                     <p>Rental Price: <span ref={amnt_val}>{x.rental_price} /Month</span></p>
                     <p className="amount-payable" data-testid="amount-payable"><span>Payable Amount : ₹ {action.rental}</span> </p>
                     <hr />
                     <div>
                       <h1>Your Details</h1>
                       <label>Full Name</label>
                       <input ref={name_val} type="text" data-testid="name"/>
                       <label>Mail ID</label>
                       <input ref={email_val} type="text"  data-testid="email" />
                       <label>Number</label>
                       <input ref={phone_val} type="text" data-testid="mobile"/>
       
                     </div>
                     <div className="frm-action-btn">
                       <button onClick={e => Submit_Booking(e)} data-testid="submitbtn">Submit</button>
                       <button onClick={cancel_action}>Cancel</button>
                     </div>
                    
                 </div>
                 ))}
              
           </div>
          
        }
   
    </div>
  );
}

export default App;
