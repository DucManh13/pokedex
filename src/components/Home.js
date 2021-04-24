import axios from "axios";
import { useEffect, useState } from "react";
import Pkm from "./Pkm";

function Home() {
  const [list,setList]=useState();
  const [gen,setGen]=useState(1);
  
  useEffect(()=>{
    var lim,off;
    switch(gen){
      case 0:lim=898;off=0;break;
      case 1:lim=151;off=0;break;
      case 2:lim=100;off=151;break;
      case 3:lim=135;off=251;break;
      case 4:lim=107;off=386;break;
      case 5:lim=156;off=493;break;
      case 6:lim=72;off=649;break;
      case 7:lim=88;off=721;break;
      case 8:lim=89;off=809;break;
      default:break;
    }
      
    axios.get('https://pokeapi.co/api/v2/pokemon?limit='+lim+'&offset='+off) 
        .then(response => {
          setList(response.data);
        })
    .catch(err => console.log(err));
  },[gen,list]);

  return !list?null:(
    <div className="container-fluid">
      <div class="form-group mt-3 w-25">
        <select className="form-control" name="sltGen" value={gen} onChange={(e)=>setGen(parseInt(e.target.value))}>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
          <option value="5">V</option>
          <option value="6">VI</option>
          <option value="7">VII</option>
          <option value="8">VIII</option>
          <option value="0">All</option>
        </select>
      </div>
      <table className="table table-hover table-dark text-center">
        <thead>
          <tr>
          <th>No.</th>
          <th style={{width: "15%"}}>Sprite</th>
          <th>Name</th>
          <th>Type</th>
          <th>Ability</th>
          <th style={{width: "30%"}}>Stat</th>
          </tr>          
        </thead>
        <tbody>
          {list.results.map((item,index)=><Pkm key={index} url={item.url}/>)}
        </tbody>
      </table>    
    </div>
  );
}

export default Home;
