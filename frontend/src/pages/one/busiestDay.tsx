import React, {useEffect, useState} from 'react'
import axios from 'axios'

const busiestDay = () => {
    const [sumBusy, setSumBusy] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/summary/busiestDay')
        .then((res)=>{
            setSumBusy(res.data);
            setLoading(false);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
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
                    <td className='border border-slate-700 rounded-md text-center'>{sumBusy.totalLogins}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{sumBusy.date}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default busiestDay