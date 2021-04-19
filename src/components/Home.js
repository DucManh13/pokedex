import axios from "axios";
import { useEffect, useState } from "react";
import Pkm from "./Pkm";

function Home() {
  const [list,setList]=useState();
  useEffect(()=>{
      axios.get('https://pokeapi.co/api/v2/pokemon?limit=250&offset=651') 
          .then(response => {
            setList(response.data);
          })
      .catch(err => console.log(err));
  },[]);
  return !list?null:(
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
          {list.results.map((item,index)=><Pkm key={index} url={item.url}/>)}
        </tbody>
      </table>    
    </div>
  );
}

export default Home;
