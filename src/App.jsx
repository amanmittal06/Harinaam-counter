import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  const [data, setData]  = useState({});
  const [rounds, setRounds] = useState(undefined);

  const loadData = async () =>{
    try{
      const res =  await axios.get('https://gyf-backend.vercel.app/chantingCounts/byUsername/achyuta');
      setData(res.data[0]);

    }
    catch(err){
      console.log(err);
    }
  }

  const updateData = async () =>{
    let input =  prompt(`You are adding ${rounds}?\nWrite 'yes' to confirm.`)

    if(input=='yes' || input=='Yes' || input=='YES'){
      let newData = {...data, roundsChanted: data.roundsChanted + Number(rounds), roundsRemaining: data.roundsRemaining - Number(rounds)}
      try{
        await axios.patch(`https://gyf-backend.vercel.app/chantingCounts/${data._id}`, newData);
        setRounds(undefined);
        loadData();
      }
      catch(err){
        console.log(err);
      }
    }
    else{
      console.log('No rounds added')
    }
  }

  useEffect(()=>{
    loadData();
  }, [])

  return (




    <center className='container'>
      <div className='mantra' >हरे कृष्ण हरे कृष्ण<br/>कृष्ण कृष्ण हरे हरे<br/>हरे राम हरे राम<br/>राम राम हरे हरे</div>
      <center className='box'>
         
         <div className='elements'><div>Rounds chanted:</div> {data.roundsChanted}</div>
         <div className='elements'><div>Remaing rounds:</div> {data.roundsRemaining}</div>
         <div className='elements'>
          <input className='inputBox' type="number" value={rounds || ''} placeholder={`Enter today's rounds`} onChange={(event)=>{setRounds(event.target.value)}}/>
          <button className='resetButton' onClick={()=>updateData()}>Add</button>
         </div>
      </center>
    </center>
  )
}

export default App
