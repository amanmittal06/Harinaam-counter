import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  // const [data, setData]  = useState([]);

  const loadData = async () =>{
    try{
      const res =  await axios.get('https://actiplan.vercel.app/chantingCounts/achyuta');
      console.log(res.data);

    }
    catch(err){
      console.log(err);
    }
   }

  const [count, setCount] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  
  function increseCount(){
    setCount(count+1);
  }

  function reset() {
    setCount(0);
    setTotalRounds(0);
    localStorage.setItem('count', 0);
    localStorage.setItem('totalRounds', 0);
  }

  useEffect(() => {
    loadData();
    const savedCount = localStorage.getItem('count');
    const savedTotalRounds = localStorage.getItem('totalRounds');
    if (savedCount) {
      setCount(Number(savedCount));
    }
    if (savedTotalRounds) {
      setTotalRounds(Number(savedTotalRounds));
    }
  }, []);


  useEffect(()=>{
    localStorage.setItem('count', count);
    if(count===108){
      setCount(0);
      setTotalRounds(totalRounds+1);
    }
  }, [count])

  
  useEffect(()=>{
    localStorage.setItem('totalRounds', totalRounds);
  }, [totalRounds])


  return (




    <center className='container'>
      <div className='mantra' >हरे कृष्ण हरे कृष्ण<br/>कृष्ण कृष्ण हरे हरे<br/>हरे राम हरे राम<br/>राम राम हरे हरे</div>
      <center className='box'>
         
         <div className='count'>
          <button disabled className='countButton'>-</button>
          <div>{count}</div>
          <button className='countButton' onClick={()=>increseCount()}>+</button>
         </div>
         <div>Total rounds: {totalRounds}</div>
         <button className='resetButton' onClick={()=>reset()}>Reset</button>
      </center>
    </center>
  )
}

export default App
