import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { formatText } from '../App'
import Pkm from "./Pkm";

function Ability(props) {
  const mounted = useRef(true);
  const [data,setData]=useState();
  let { abiId } = useParams();
  useEffect(()=>{
    axios.get('https://pokeapi.co/api/v2/ability/'+abiId) 
        .then(response => {
          if (mounted.current) setData(response.data);
        })
    .catch(err => console.log(err));

    return ()=>{mounted.current = false;}
  },[abiId,data]);
  
  return !data?null:(
    <div className="container-fluid">
      <h2 className="py-3">Ability: {formatText(data.name)}</h2>
      <h4 className="pb-4 font-weight-normal">Description: {data.effect_entries.map((entry)=>entry.language.name==="en"?entry.effect:"")}</h4>
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
          {data.pokemon.map((item,index)=><Pkm key={index} url={item.pokemon.url}/>)}
        </tbody>
      </table>    
    </div>
  );
}
export default Ability;
