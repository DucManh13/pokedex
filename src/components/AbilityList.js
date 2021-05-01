import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { formatText } from '../App'

function AbilityList() {
  const [data,setData]=useState();
  useEffect(()=>{
    let mounted=true;
    axios.get('https://pokeapi.co/api/v2/ability?limit=267') 
        .then(response => {
          if (mounted) setData(response.data);
        })
    .catch(err => console.log(err));
    
    return ()=>{mounted= false;}
  },[data]);
  
  return !data?null:(
    <div className="container-fluid bg-dark text-white p-3">
      <h1>Ability List</h1>
      <hr/>
      <div className="row row-cols-sm-4 ml-5">
        {data.results.map((ability,index)=>(
          <div key={index} className="col-sm-3 mb-1">
            <Link to={`/ability/${ability.url.slice(34)}`}>
              <h5>{formatText(ability.name)}</h5>
            </Link>
          </div>))}
      </div>         
    </div>
  );
}

export default AbilityList;
