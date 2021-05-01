import axios from "axios";
import { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import { formatText } from '../App'

function MoveList() {
  const [data,setData]=useState();
  useEffect(()=>{
    let mounted=true;
    axios.get('https://pokeapi.co/api/v2/move?limit=825') 
        .then(response => {
          if (mounted) setData(response.data);
        })
    .catch(err => console.log(err));
    
    return ()=>{mounted= false;}
  },[data]);
  
  return !data?null:(
    <div className="container-fluid bg-dark text-white p-3">
      <h1>Move List</h1>
      <hr/>
      <div className="row row-cols-sm-4 ml-5">
        {data.results.map((move,index)=>(
          <div key={index} className="col-sm-3 mb-1">
            <Link to={`/move/${move.url.slice(31)}`}>
              <h5>{formatText(move.name)}</h5>
            </Link>
          </div>))}
      </div>         
    </div>
  );
}

export default MoveList;
