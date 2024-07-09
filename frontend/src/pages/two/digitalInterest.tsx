import {useEffect, useState} from 'react'
import axios from 'axios'

const digitalInterest = () => {
  const [digitalInterest, setdigitalInterest] = useState<any[]>([]);
  useEffect(() => {
      axios.get(import.meta.env.VITE_APP_URL+'/segment/digitalInterest')
      .then((res)=>{
          setdigitalInterest(res.data);
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
                    <th className='border border-slate-600 rounded-md'>Digital Interest</th>
                    <th className='border border-slate-600 rounded-md'>Percentage</th>
                </tr>
            </thead>
            <tbody>
              {digitalInterest.map((data,idx) => 
              <tr key={idx} className='h-8'>
                  <td className='border border-slate-700 rounded-md text-center'>{data.interest}</td>
                  <td className='border border-slate-700 rounded-md text-center'>{data.percentage}</td>
              </tr>
              )}
            </tbody>
        </table>
    </div>
  )
}

export default digitalInterest