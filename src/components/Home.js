import axios from 'axios';
import { useEffect, useState } from 'react';
import Pkm from './Pkm';

function Home() {
  const [list, setList] = useState();
  const [gen, setGen] = useState(1);

  useEffect(() => {
    let mounted = true;

    const genData = [
      { off: 0, lim: 1025 }, // all
      { off: 0, lim: 151 }, // gen 1
      { off: 151, lim: 100 }, // gen 2
      { off: 251, lim: 135 }, // gen 3
      { off: 386, lim: 107 }, // gen 4
      { off: 493, lim: 156 }, // gen 5
      { off: 649, lim: 72 }, // gen 6
      { off: 721, lim: 88 }, // gen 7
      { off: 809, lim: 96 }, // gen 8
      { off: 905, lim: 120 }, // gen 9
    ];

    let lim = 0;
    let off = 0;

    if (gen === -1) {
      off = 1025;
      lim = 300;
    } else if (gen >= 0 && gen < genData.length) {
      ({ off, lim } = genData[gen]);
    }

    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=' + lim + '&offset=' + off)
      .then((response) => {
        if (mounted) setList(response.data);
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
  }, [gen]);

  return !list ? null : (
    <div className="container-fluid">
      <div className="form-group mt-3 w-25">
        <select
          className="form-control"
          name="sltGen"
          value={gen}
          onChange={(e) => setGen(+e.target.value)}
        >
          <option value="1">Gen I</option>
          <option value="2">Gen II</option>
          <option value="3">Gen III</option>
          <option value="4">Gen IV</option>
          <option value="5">Gen V</option>
          <option value="6">Gen VI</option>
          <option value="7">Gen VII</option>
          <option value="8">Gen VIII</option>
          <option value="9">Gen IX</option>
          <option value="0">All</option>
          <option value="-1">Forms</option>
        </select>
      </div>
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
          {list.results.map((item, index) => (
            <Pkm key={index} url={item.url} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
