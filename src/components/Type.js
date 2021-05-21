import axios from "axios";
import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { formatText } from '../App'
import Pkm from "./Pkm";
import TypeBar from "./TypeBar";

function Type(props) {
  const [data,setData]=useState();
  let { typeId } = useParams();
  useEffect(()=>{
    let mounted=true;
    axios.get('https://pokeapi.co/api/v2/type/'+typeId) 
        .then(response => {
          if (mounted) setData(response.data);
        })
    .catch(err => console.log(err));
    
    return ()=>{mounted= false;}
  },[typeId]);
  
  return !data?null:(
    <div className="container-fluid">
      <h2><span className={`badge ${data.name} my-3 text-white`}>{formatText(data.name)}</span></h2>
      <table className="table table-bordered table-dark text-center mb-0">
        <thead>
          <tr>
          <th className="w-50">x2 to</th>
          <th className="w-50">x2 from</th>
          </tr>          
        </thead>
        <tbody>
          <tr>
            <td>{data.damage_relations.double_damage_to.map((type,index)=>(
              <h5 key={index}><TypeBar name={type.name} url={type.url}/></h5>))}
            </td>
            <td>{data.damage_relations.double_damage_from.map((type,index)=>(
              <h5 key={index}><TypeBar name={type.name} url={type.url}/></h5>))}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered table-dark text-center mb-0">
        <thead>
          <tr>
          <th className="w-50">x0.5 to</th>
          <th className="w-50">x0.5 from</th>
          </tr>          
        </thead>
        <tbody>
          <tr>
            <td>{data.damage_relations.half_damage_to.map((type,index)=>(
              <h5 key={index}><TypeBar name={type.name} url={type.url}/></h5>))}
            </td>
            <td>{data.damage_relations.half_damage_from.map((type,index)=>(
              <h5 key={index}><TypeBar name={type.name} url={type.url}/></h5>))}
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered table-dark text-center">
        <thead>
          <tr>
          <th className="w-50">x0 to</th>
          <th className="w-50">x0 from</th>
          </tr>          
        </thead>
        <tbody>
          <tr>
            <td>{data.damage_relations.no_damage_to.map((type,index)=>(
              <h5 key={index}><TypeBar name={type.name} url={type.url}/></h5>))}
            </td>
            <td>{data.damage_relations.no_damage_from.map((type,index)=>(
              <h5 key={index}><TypeBar name={type.name} url={type.url}/></h5>))}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table table-hover table-dark text-center">
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
export default Type;
