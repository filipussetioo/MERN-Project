import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopUserDataByLocation = () => {
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_URL + '/user/top5Users')
      .then((res) => {
        setTopFive(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='flex justify-center gap-x-4'>
      <table className='w-full border-separate border-spacing-2'>
        <thead>
          <tr>
            <th className='border border-slate-600 rounded-md'>Location</th>
            <th className='border border-slate-600 rounded-md'>Top 5 Users</th>
          </tr>
        </thead>
        <tbody>
          {topFive.map((data, idx) => (
            <tr key={idx} className='h-8'>
              <td className='border border-slate-700 rounded-md text-center'>{data.location}</td>
              <td className='border border-slate-700 rounded-md'>
                <ul>
                  {data.top5Users.map((userdata, idxuser) => (
                    <li key={idxuser} className='mb-2'>
                      <p>Email: {userdata.userData.Email}</p>
                      <p>Name: {userdata.userData.Name}</p>
                      <p>No Telp: {userdata.userData.NoTelp}</p>
                      <p>Visit Count: {userdata.visitCount}</p>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopUserDataByLocation;