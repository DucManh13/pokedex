import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { formatText } from '../App'
function Pkm(props) {
  const [data,setData]=useState();
  useEffect(()=>{
      axios.get(props.url) 
        .then(response => {
          setData(response.data);
        })
        .catch(err => console.log(err));
  },[props.url]);
  
  return !data?null:(
    <tr >
      <td className="align-middle text-center">{data.id}</td>
      <td className="align-middle text-center"><img src={data.sprites.other['official-artwork'].front_default} className="img-fluid" alt={data.name}/></td>      
      <td className="align-middle text-center">{formatText(data.name)}</td>
      <td className="align-middle text-center">
        <h5>{data.types.map((type)=>
          <Link to={`/type/${type.type.url.slice(31)}`} className="" key={type.slot}>
            <span className={`badge mr-1 ${type.type.name}`} >{formatText(type.type.name)}</span>
          </Link>)}</h5>
      </td>
      <td className="align-middle text-center">{data.abilities.map((ability)=>(<span key={ability.slot}>{formatText(ability.ability.name)}<br/></span>))}</td>
      <td className="align-middle text-center">
        {data.stats.map((stat,index)=>(<span key={index}><div className={`progress-bar mb-1 ${stat.stat.name}`} style={{width:`${stat.base_stat/2.5}%`}}>{stat.base_stat}</div></span>))}
      </td>
    </tr>
  );
}


export default Pkm;
