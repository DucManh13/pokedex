import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { formatText } from '../App'
import Pkm from "./Pkm";

function Type(props) {
  const [data,setData]=useState();
  let { typeId } = useParams();
  useEffect(()=>{
    axios.get('https://pokeapi.co/api/v2/type/'+typeId) 
        .then(response => {
          setData(response.data);
        })
    .catch(err => console.log(err));
  },[typeId,data]);
  
  return !data?null:(
    <div className="container-fluid">
      <h2><span className={`badge ${data.name} my-3 text-white`}>{formatText(data.name)}</span></h2>
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
export default Type;
