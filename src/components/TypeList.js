import axios from 'axios';
import { useEffect, useState } from 'react';
import TypeBar from './TypeBar';

function TypeList() {
  const [data, setData] = useState();
  useEffect(() => {
    let mounted = true;
    axios
      .get('https://pokeapi.co/api/v2/type/')
      .then((response) => {
        if (mounted) setData(response.data);
      })
      .catch((err) => console.log(err));

    return () => {
      mounted = false;
    };
  }, []);

  return !data ? null : (
    <div className="container-fluid bg-dark text-white p-3">
      <h1>Type List</h1>
      <hr />
      <div className="container py-4 ">
        <div className="row row-cols-lg-3 row-cols-md-2 row-cols-1 text-center w-50 mx-auto">
          {data.results.map((type, index) =>
            index > 17 ? (
              ''
            ) : (
              <h2 key={index}>
                <TypeBar name={type.name} url={type.url} width="w-120" />
              </h2>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

export default TypeList;
