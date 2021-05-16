import axios from "axios";
import { useEffect, useState} from "react";
import Pkm from "./Pkm";

function Home() {
  const [list,setList]=useState();
  const [gen,setGen]=useState(1);
  
  useEffect(()=>{
    let mounted=true;
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
      case 9:lim=250;off=898;break;
      default:break;
    }
      
    axios.get('https://pokeapi.co/api/v2/pokemon?limit='+lim+'&offset='+off) 
        .then(response => {
          if (mounted) setList(response.data);
        })
    .catch(err => console.log(err));
    
    return ()=>{mounted = false;}
  },[gen]);

  return !list?null:(
    <div className="container-fluid">
      <div className="form-group mt-3 w-25">
        <select className="form-control" name="sltGen" value={gen} onChange={(e)=>setGen(+e.target.value)}>
          <option value="1">Gen I</option>
          <option value="2">Gen II</option>
          <option value="3">Gen III</option>
          <option value="4">Gen IV</option>
          <option value="5">Gen V</option>
          <option value="6">Gen VI</option>
          <option value="7">Gen VII</option>
          <option value="8">Gen VIII</option>
          <option value="0">All</option>
          <option value="9">Forms</option>
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
