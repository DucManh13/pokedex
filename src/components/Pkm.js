import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatText } from '../App';
import TypeBar from './TypeBar';
import PropTypes from 'prop-types';

function Pkm(props) {
  const [data, setData] = useState();
  useEffect(() => {
    let mounted = true;
    axios
      .get(props.url)
      .then((response) => {
        if (mounted) setData(response.data);
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
  }, [props.url]);

  return !data ? null : (
    <tr>
      <td className="align-middle text-center">{data.id}</td>
      <td className="align-middle text-center">
        <Link to={`/pokemon/${data.id}`}>
          <img
            src={data.sprites.other['official-artwork'].front_default}
            className="img-fluid"
            alt={data.name}
          />
        </Link>
      </td>
      <td className="align-middle text-center">
        <Link to={`/pokemon/${data.id}`}>{formatText(data.name)}</Link>
      </td>
      <td className="align-middle text-center">
        <h5 className="mb-0">
          {data.types.map((type) => (
            <TypeBar
              key={type.slot}
              name={type.type.name}
              url={type.type.url}
            />
          ))}
        </h5>
      </td>
      <td className="align-middle text-center">
        {data.abilities.map((ability) => (
          <Link
            to={`/ability/${ability.ability.url.slice(34)}`}
            key={ability.slot}
          >
            <span>
              {formatText(ability.ability.name)}
              <br />
            </span>
          </Link>
        ))}
      </td>
      <td className="align-middle text-center">
        {data.stats.map((stat, index) => (
          <span key={index} className="d-flex">
            <div
              className={`progress-bar mb-1 ${stat.stat.name}`}
              style={{ width: `${stat.base_stat / 2.5}%` }}
            >
              {stat.base_stat}
            </div>
            {stat.base_stat === 1 ? <div className="ml-1">1</div> : null}
          </span>
        ))}
      </td>
    </tr>
  );
}

Pkm.propTypes = {
  url: PropTypes.string,
};

export default Pkm;
