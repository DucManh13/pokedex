import axios from "axios";
import { useEffect, useState } from "react";

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
        <h5>{data.types.map((type)=><span className="badge mr-1" style={{backgroundColor:`${typeColor(type.type.name)}`}} key={type.slot}>{formatText(type.type.name)}</span>)}</h5>
      </td>
      <td className="align-middle text-center">{data.abilities.map((ability)=>(<span key={ability.slot}>{formatText(ability.ability.name)}<br/></span>))}</td>
      <td className="align-middle text-center">
        {data.stats.map((stat,index)=>(<span key={index}><div className="progress-bar mb-1" style={{width:`${stat.base_stat/2.5}%`,backgroundColor:`${statColor(index)}`}}>{stat.base_stat}</div></span>))}
      </td>
    </tr>
  );
}
const formatText=(text)=>{
  return text.split('-').map(word=>word.charAt(0).toUpperCase()+word.slice(1)).join(' ');
}
const typeColor=(index)=>{
  var color;
  switch (index) {
    case 'grass':color= "#78c850";
      break;
    case 'fire':color= "#f08030";
      break;
    case 'water':color= "#6890f0";
      break;
    case 'electric':color= "#f8d030";
      break;  
    case 'normal':color= "#a8a878";
      break;
    case 'bug':color= "#a8b820";
      break;     
    case 'poison':color= "#a040a0";
      break;
    case 'ground':color= "#e0c068";
      break;
    case 'rock':color= "#b8a038";
      break;
    case 'flying':color= "#a890f0";
      break;
    case 'fairy':color= "#ee99ac";
      break;
    case 'fighting':color= "#c03028";
      break;
    case 'psychic':color= "#f85888";
      break;
    case 'ghost':color= "#705898";
      break;  
    case 'steel':color= "#b8b8d0";
      break;
    case 'dark':color= "#705848";
      break;      
    case 'ice':color= "#98d8d8";
      break;
    case 'dragon':color= "#7038f8";
      break;
    default:
      break;
  }
  return color;
}
const statColor=(index)=>{
  var color;
  switch (index) {
    case 0:color= "#2fb6b6";
      break;
    case 1:color= "#ea1f1f";
        break;
    case 2:color= "#f8d030";
    break;
    case 3:color= "#1b9844";
    break;
    case 4:color= "#ff66b3";
    break;
    case 5:color= "#0840e7";
    break;
    default:
      break;
  }
  return color;
}
export default Pkm;
