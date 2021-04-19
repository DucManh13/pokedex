import axios from "axios";
import { useEffect, useState } from "react";

function Type(props) {
  const [data,setData]=useState();
  useEffect(()=>{
      axios.get(props.url) 
          .then(response => {
            setData(response.data);
          })
      .catch(err => console.log(err));
  },[props.url]);
  
  return !data?null:(
    <div className="container-fluid">
      <table className="table table-hover table-dark ">
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
