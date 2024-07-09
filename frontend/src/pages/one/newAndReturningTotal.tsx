import {useEffect, useState} from 'react'
import axios from 'axios'

const newAndReturningTotal = () => {
  const [newAndReturningTotal, setNewAndReturning] = useState<{ newUsers: number; returningUsers: number } | null>(null);
  useEffect(() => {
      axios.get(import.meta.env.VITE_APP_URL+'/summary/newAndReturningTotal')
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
                    <th className='border border-slate-600 rounded-md'>New Users</th>
                    <th className='border border-slate-600 rounded-md'>Returning Users</th>
                </tr>
            </thead>
            <tbody>
              <tr className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{newAndReturningTotal != null ? newAndReturningTotal.newUsers : ''}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{newAndReturningTotal != null ? newAndReturningTotal.returningUsers : ''}</td>
              </tr>
            </tbody>
        </table>
    </div>
  )
}

export default newAndReturningTotal