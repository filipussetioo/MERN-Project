import { useEffect, useState } from 'react';
import axios from 'axios';

const UniqueUsersAll = () => {
  const [uniqueAll, setUniqueAll] = useState<any[]>([]);
  const [uniqueUserCount, setUniqueUserCount] = useState<number | null>(null);

  useEffect(() => {
    axios.get(import.meta.env.VITE_APP_URL + '/summary/uniqueUsersAll')
      .then((res) => {
        setUniqueAll(res.data);
        if (res.data.length > 0) {
          setUniqueUserCount(res.data[0].jumlahUniqueUser);
        }
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
            <th className='border border-slate-600 rounded-md'>Unique Users Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {uniqueAll !== null ? uniqueUserCount : ''}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UniqueUsersAll;