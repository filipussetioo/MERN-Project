import React, {useEffect, useState} from 'react'
import axios from 'axios'

const phoneBrand = () => {
    const [phoneBrand, setPhoneBrand] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(import.meta.env.VITE_APP_URL+'/segment/phoneBrand')
        .then((res)=>{
            setPhoneBrand(res.data);
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
                      <th className='border border-slate-600 rounded-md'>Phone Brand</th>
                      <th className='border border-slate-600 rounded-md'>Percentage</th>
                  </tr>
              </thead>
              <tbody>
                {phoneBrand.map((data,idx) => 
                <tr key={idx} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{data.brand}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{data.percentage}</td>
                </tr>
                )}
              </tbody>
          </table>
      </div>
    )
}

export default phoneBrand