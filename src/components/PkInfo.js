import axios from "axios";
import { Link } from 'react-router-dom';
import { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { formatText } from '../App';
import Evolution from "./Evolution";
import TypeBar from "./TypeBar";

function PkInfo(props) {
  const [data,setData]=useState();
  const [species,setSpecies]=useState();
  let { pkId } = useParams();
  useEffect(()=>{
    let mounted=true;
    axios.get('https://pokeapi.co/api/v2/pokemon/'+pkId) 
        .then(response => {
          if (mounted) setData(response.data);
        })
    .catch(err => console.log(err));

    axios.get('https://pokeapi.co/api/v2/pokemon-species/'+pkId) 
        .then(response => {
          if (mounted) setSpecies(response.data);
        })
    .catch(err => console.log(err));
    return ()=>{mounted = false;}
  },[pkId]);
  
  return !(data&&species)?null:(
    <div className="container bg-dark text-white font-weight-normal p-3">      
      <table className="table table-dark text-center table-bordered mb-0">
        <thead>
          <tr>
            <th style={{width: "5%"}}>No.</th>
            <th style={{width: "20%"}}>Artwork</th>
            <th>Name</th>
            <th style={{width: "25%"}}>Type</th>
            <th style={{width: "25%"}}>Ability</th>
          </tr>          
        </thead>
        <tbody>
          <tr >
            <td className="align-middle text-center">{data.id}</td>
            <td className="align-middle text-center">
              <Link to={`/pokemon/${data.id}`}>
                <img src={data.sprites.other['official-artwork'].front_default} className="img-fluid" alt={data.name}/>
              </Link>
            </td>      
            <td className="align-middle text-center">
              <Link to={`/pokemon/${data.id}`}>
                {formatText(data.name)}
              </Link>  
            </td>
            <td className="align-middle text-center">
              <h5 className="mb-0">{data.types.map((type)=>(
                <TypeBar key={type.slot} name={type.type.name} url={type.type.url}/>))}</h5>
            </td>
            <td className="align-middle text-center">
              {data.abilities.map((ability)=>(
                <Link to={`/ability/${ability.ability.url.slice(34)}`} key={ability.slot}>
                  <span>{formatText(ability.ability.name)}<br/></span>
                </Link>))}
            </td>   
          </tr>
        </tbody>
      </table>

      <table className="table table-dark text-center table-bordered mb-0">
        <thead>
          <tr>
            <th style={{width: "25%"}}>Species</th>
            <th style={{width: "25%"}}>JP Name</th>
            <th style={{width: "25%"}}>Height</th>
            <th style={{width: "25%"}}>Weight</th>
          </tr>          
        </thead>
        <tbody>
          <tr>
            <td className="align-middle text-center">
              {species.genera.map(item=>item.language.name==="en"?item.genus:null)}
            </td>
            <td className="align-middle text-center">
              {species.names.map((name,index)=>name.language.name==="roomaji"||name.language.name==="ja"?
                  (<span key={index}>{name.name}<br/></span>):null)}
            </td>
            <td className="align-middle text-center">
              {data.height/10} m
            </td>
            <td className="align-middle text-center">
              {data.weight/10} kg
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table table-dark text-center table-bordered mb-0">
        <thead>
          <tr>
            <th style={{width: "25%"}}>Gender ratio</th>
            <th style={{width: "25%"}}>Color</th>
            <th style={{width: "25%"}}>Growth rate</th>
            <th style={{width: "25%"}}>Egg group</th>
          </tr>          
        </thead>
        <tbody>
          <tr >
            <td className="align-middle text-center">
              {species.gender_rate===-1?"Genderless":
                species.gender_rate===0?"100% M":
                species.gender_rate===8?"100% F":
                `${(1-species.gender_rate/8)*100}% M - ${species.gender_rate/8*100}% F`}
            </td>
            <td className="align-middle text-center">
              {formatText(species.color.name)}
            </td>      
            <td className="align-middle text-center">
              {formatText(species.growth_rate.name)}
            </td>
            <td className="align-middle text-center">
              {species.egg_groups.map(group=>formatText(group.name)).join(', ')}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="table table-dark text-center table-bordered mb-0">
        <thead>
          <tr>
            <th style={{width: "25%"}}>Base experience yield</th>
            <th style={{width: "25%"}}>Capture rate</th>
            <th style={{width: "25%"}}>Base happiness</th>
            <th style={{width: "25%"}}>Hatch steps</th>
          </tr>          
        </thead>
        <tbody>
          <tr >
            <td className="align-middle text-center">
              {data.base_experience}
            </td>
            <td className="align-middle text-center">
              {species.capture_rate}
            </td>      
            <td className="align-middle text-center">
              {species.base_happiness}
            </td>
            <td className="align-middle text-center">
              {species.hatch_counter*256}
            </td>
          </tr>
        </tbody>
      </table>
      
      <Evolution url={species.evolution_chain.url}/>
      <div className="container font-weight-bold px-0">
        Stats 
        {data.stats.map((stat,index)=>(<span key={index} className="d-flex"><div className={`progress-bar mt-1 ${stat.stat.name}`} style={{width:`${stat.base_stat/2.5}%`}}>{stat.base_stat}</div>{stat.base_stat===1?<div className="ml-1">1</div>:null}</span>))}
      </div>
      
      <button type="button" className="btn btn-danger my-3" data-toggle="collapse" data-target="#dex">Dex Entries</button>
      <div id="dex" className="collapse">
      {species.flavor_text_entries.map((entry,index)=>
        entry.language.name!=="en"?null:(
          <p key={index}>{formatText(entry.version.name)} : {entry.flavor_text.replace(""," ").replace("POKéMON","Pokémon")} </p>
        ))}
      </div>
      <table className="table table-dark table-bordered text-center">
        <thead>
          <tr>
            <th>Sprites</th>
            <th>Front</th>
            <th>Back</th>
            <th>Shiny Front</th>
            <th>Shiny Back</th>
          </tr>          
        </thead>
        <tbody>
          <tr>
            <td className="align-middle">
              Default
            </td>
            <td>
              <img src={data.sprites.front_default} className="img-fluid" alt=""/>
            </td>
            <td>
              <img src={data.sprites.back_default} className="img-fluid" alt=""/>
            </td>
            <td>
              <img src={data.sprites.front_shiny} className="img-fluid" alt=""/>
            </td>
            <td>
              <img src={data.sprites.back_shiny} className="img-fluid" alt=""/>
            </td>
          </tr>
          {!species.has_gender_differences?null:
          <tr>
            <td className="align-middle">
              Female
            </td>
            <td>
              <img src={data.sprites.front_female} className="img-fluid" alt=""/>
            </td>
            <td>
              <img src={data.sprites.back_female} className="img-fluid" alt=""/>
            </td>
            <td>
              <img src={data.sprites.front_shiny_female} className="img-fluid" alt=""/>
            </td>
            <td>
              <img src={data.sprites.back_shiny_female} className="img-fluid" alt=""/>
            </td>
          </tr>}
        </tbody>
      </table>
      <img width='200' height='200' src={data.sprites.other.dream_world.front_default} className="img-fluid" alt=""/>
    </div>
  );
}
export default PkInfo;
