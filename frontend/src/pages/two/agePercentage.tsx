import React, {useEffect, useState} from 'react'
import axios from 'axios'

const agePercentage = () => {
    const [agePercentage, setagePercentage] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/segment/agePercentage')
        .then((res)=>{
            setagePercentage(res.data);
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
                      <th className='border border-slate-600 rounded-md'>U18</th>
                      <th className='border border-slate-600 rounded-md'>18 - 24</th>
                      <th className='border border-slate-600 rounded-md'>25 - 34</th>
                      <th className='border border-slate-600 rounded-md'>35 - 44</th>
                      <th className='border border-slate-600 rounded-md'>45 - 64</th>
                      <th className='border border-slate-600 rounded-md'>64+</th>
                  </tr>
              </thead>
              <tbody>
                <tr className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{agePercentage.under18}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{agePercentage['18-24']}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{agePercentage['25-34']}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{agePercentage['35-44']}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{agePercentage['45-64']}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{agePercentage.over64}</td>
                </tr>
              </tbody>
          </table>
      </div>
    )
}

export default agePercentage