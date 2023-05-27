import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const App = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await Axios.get('http://localhost:3305/all_users');
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>User Data:</h1>
      {data ? (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
