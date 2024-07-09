import {useEffect, useState} from 'react'
import axios from 'axios'

const busiestDay = () => {
    const [sumBusy, setSumBusy] = useState<{ totalLogins: number; date: String } | null>(null);
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_URL+'/summary/busiestDay')
        .then((res)=>{
            setSumBusy(res.data);
            console.log(import.meta.env.VITE_APP_URL);
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
                    <th className='border border-slate-600 rounded-md'>Total Logins</th>
                    <th className='border border-slate-600 rounded-md'>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{sumBusy != null ? sumBusy.totalLogins : ''}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{sumBusy != null ?sumBusy.date : ''}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default busiestDay