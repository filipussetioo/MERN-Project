import {useEffect, useState} from 'react'
import axios from 'axios'

const uniqueUsersPerDay = () => {
  const [uniquePerDay, setUniquePerDay] = useState<any[]>([]);
  useEffect(() => {
      axios.get(import.meta.env.VITE_APP_URL+'/summary/uniqueUsersPerDay')
      .then((res)=>{
          setUniquePerDay(res.data);
          console.log(res.data);
      })
      .catch((err) => {
          console.log(err);
      })
  }, []);
  return (
    <div className='flex justify-center gap-x-4'>
        <table className='w-full border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='border border-slate-600 rounded-md'>No</th>
                    <th className='border border-slate-600 rounded-md'>Unique Users</th>
                    <th className='border border-slate-600 rounded-md'>Date</th>
                </tr>
            </thead>
            <tbody>
              {uniquePerDay.map((data,idx)=>
              <tr key={idx} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{idx+1}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{data.jumlahUniqueUser}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{data.date}</td>
              </tr>
              )}
            </tbody>
        </table>
    </div>
  )
}

export default uniqueUsersPerDay