import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [passengers, setPassengers] = useState([]);
  const [newPassenger, setNewPassenger] =useState({name:'',age:'', hometown:'',dreamvacation:''});
  const [updatingPassenger, setUpdatingPassenger] = useState({});
  const [update, setUpdate] = useState({});
  const [hidden, setHidden] = useState(true);

  useEffect(() =>{
    console.log('using this effect')
    getInformation()
  }, [])

  function getInformation(){
    fetch('http://localhost:3030/boardingPass')
    .then(res => res.json())
    .then(res => console.log(...res))
  }

  function deletePassenger(id){
    fetch(`http://localhost:3030/passnger/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(() => getInformation())
  }

  function addItem(){
    fetch(`http://localhost:3030/passengers`, {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(newPassenger),
    })
    .then(res => res.json())
    .then(() => {getInformation(); setNewPassenger({name:'', age:'', hometown:'',dreamvacation:''});
  })
  setHidden(!hidden)
  }

  function completeUpdate(){
    fetch(`http://localhost:3030/passengers`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatingPassenger),
    })
    .then(res => res.json())
    .then(() => getInformation())
  }

  function updatePassenger(id){
    const newUpdate = {...update};
  
    for(let passenger in passengers){
      newUpdate[passengers[passenger].id] = false;
    }
    setUpdate(newUpdate);
    setUpdate({...newUpdate,[id]: !update[id]});
  }

  function updatePassengerInformation(passenger,e){
    setUpdatingPassenger({...passenger,
    [e.target.getAttribute('field')]:e.target.value});
  }

  return (
    <div className="App">
      <div className="boarding-pass">
        {passengers.map(passenger => {
          return(
            <div className='information-container' key={passenger.id}>
            <h1>{passenger.id}</h1>
            <h1>{passenger.name}</h1>
            <h2>{passenger.age}</h2>
            <h1>{passenger.hometown}</h1>
            <h1>{passenger.dreamvacation}</h1>
            <div className='buttons'></div>
            </div>
          )
        })}
    </div>
  </div>
  );
}

export default App;
