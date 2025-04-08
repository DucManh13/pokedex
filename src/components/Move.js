import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatText } from '../App';
import Pkm from './Pkm';
import TypeBar from './TypeBar';

function Ability() {
  const [data, setData] = useState();
  let { moveId } = useParams();
  useEffect(() => {
    let mounted = true;
    axios
      .get('https://pokeapi.co/api/v2/move/' + moveId)
      .then((response) => {
        if (mounted) setData(response.data);
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
  }, [moveId]);

  return !data ? null : (
    <div className="container-fluid">
      <h2 className="pt-3">Move: {formatText(data.name)}</h2>
      <hr />
      <h5 className="pb-4 font-weight-normal">
        Description:{' '}
        {data.effect_entries[0].effect.replace(
          '$effect_chance',
          data.effect_chance,
        )}
        <br />
        Power: {data.power | 0}
        <br />
        PP: {data.pp}
        <br />
        Accuracy: {data.accuracy}
        <br />
        Priority: {data.priority}
        <br />
        Category: {formatText(data.damage_class.name)}
        <br />
        Type: <TypeBar name={data.type.name} url={data.type.url} />
      </h5>
      <table className="table table-hover table-dark text-center">
        <thead>
          <tr>
            <th>No.</th>
            <th style={{ width: '15%' }}>Artwork</th>
            <th>Name</th>
            <th>Type</th>
            <th>Ability</th>
            <th style={{ width: '30%' }}>Stat</th>
          </tr>
        </thead>
        <tbody>
          {data.learned_by_pokemon.map((item, index) => (
            <Pkm key={index} url={item.url} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Ability;
