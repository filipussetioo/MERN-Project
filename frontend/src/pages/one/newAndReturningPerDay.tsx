import {useEffect, useState} from 'react'
import axios from 'axios'

const newAndReturningPerDay = () => {
  const [newAndReturning, setNewAndReturning] = useState<any[]>([]);
  useEffect(() => {
      axios.get(import.meta.env.VITE_APP_URL+'/summary/newAndReturningPerDay')
      .then((res)=>{
          setNewAndReturning(res.data);
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
                    <th className='border border-slate-600 rounded-md'>Date</th>
                    <th className='border border-slate-600 rounded-md'>New Users</th>
                    <th className='border border-slate-600 rounded-md'>Returning Users</th>
                </tr>
            </thead>
            <tbody>
              {newAndReturning.map((data,idx)=>
              <tr key={idx} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{idx+1}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{data.date}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{data.newUsers}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{data.returningUsers}</td>
              </tr>
              )}
            </tbody>
        </table>
    </div>
  )
}

export default newAndReturningPerDay