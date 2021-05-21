import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { formatText } from '../App'
import Pkm from "./Pkm";

function Ability(props) {
  const [data,setData]=useState();
  let { abiId } = useParams();
  useEffect(()=>{
    let mounted=true;
    axios.get('https://pokeapi.co/api/v2/ability/'+abiId) 
        .then(response => {
          if (mounted) setData(response.data);
        })
    .catch(err => console.log(err));

    return ()=>{mounted = false;}
  },[abiId]);
  
  return !data?null:(
    <div className="container-fluid">
      <h2 className="pt-3">Ability: {formatText(data.name)}</h2>
      <hr/>
      <h5 className="pb-4 font-weight-normal">Description: {data.effect_entries.map((entry)=>entry.language.name==="en"?entry.effect:"")}</h5>
      <table className="table table-hover table-dark text-center mt-4">
        <thead>
          <tr>
            <th>No.</th>
            <th style={{width: "15%"}}>Artwork</th>
            <th>Name</th>
            <th>Type</th>
            <th>Ability</th>
            <th style={{width: "30%"}}>Stat</th>
          </tr>          
        </thead>
        <tbody>
          {data.pokemon.map((item,index)=><Pkm key={index} url={item.pokemon.url}/>)}
        </tbody>
      </table>    
    </div>
  );
}
export default Ability;
