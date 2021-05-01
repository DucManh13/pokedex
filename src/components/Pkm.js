import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { formatText } from '../App'
function Pkm(props) {
  const mounted = useRef(true);
  const [data,setData]=useState();
  useEffect(()=>{
    axios.get(props.url) 
      .then(response => {
        if (mounted.current) setData(response.data);
      })
      .catch(err => console.log(err));
    
    return ()=>{mounted.current = false;}
  },[props.url]);
  
  return !data?null:(
    <tr >
      <td className="align-middle text-center">{data.id}</td>
      <td className="align-middle text-center">
        <img src={data.sprites.other['official-artwork'].front_default} className="img-fluid" alt={data.name}/>
      </td>      
      <td className="align-middle text-center">{formatText(data.name)}</td>
      <td className="align-middle text-center">
        <h5>{data.types.map((type)=>(
          <Link to={`/type/${type.type.url.slice(31)}`} key={type.slot}>
            <span className={`badge mr-1 ${type.type.name}`} >{formatText(type.type.name)}</span>
          </Link>))}</h5>
      </td>
      <td className="align-middle text-center">
        {data.abilities.map((ability)=>(
          <Link to={`/ability/${ability.ability.url.slice(34)}`} key={ability.slot}>
            <span>{formatText(ability.ability.name)}<br/></span>
          </Link>))}
      </td>
      <td className="align-middle text-center">
        {data.stats.map((stat,index)=>(<span key={index}><div className={`progress-bar mb-1 ${stat.stat.name}`} style={{width:`${stat.base_stat/2.5}%`}}>{stat.base_stat}</div></span>))}
      </td>
    </tr>
  );
}


export default Pkm;
