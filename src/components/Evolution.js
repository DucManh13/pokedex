import axios from "axios";
import { useEffect, useState} from "react";
import { formatText } from '../App'

function Evolution(props) {
  const [data,setData]=useState();
  useEffect(()=>{
    let mounted=true;
    axios.get(props.url) 
        .then(response => {
          if (mounted) setData(response.data);
        })
    .catch(err => console.log(err));
    
    return ()=>{mounted= false;}
  },[props.url]);
  
  return !data?null:(
    <div className="container my-2">
      <div className="font-weight-bold">
        Evolution chain: 
      </div>
      <div className="row text-center my-2 w-50 mx-auto">
        <div className="col-4">
          {formatText(data.chain.species.name)}
        </div>
        <div className="col-8">
        {data.chain.evolves_to.map((stage1,index)=>(
          <div className="row" key={index}>
            <div className="col-6">
              {"=> "+formatText(stage1.species.name)} 
            </div>
            <div className="col-6">
              {stage1.evolves_to.map((stage2,index)=>(
                <div className="row" key={index}>
                  <div className="col-12">
                    {"=> "+formatText(stage2.species.name)} 
                  </div>
                </div>))}
            </div>
          </div>))}
        </div>
      </div>
    </div>
  );
}

export default Evolution;
