import {JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState} from 'react'
import axios from 'axios'


const genderPercentage = () => {
    const [genderPercentage, setgenderPercentage] = useState<any[]>([]);;
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_URL+'/segment/genderPercentage')
        .then((res)=>{
            setgenderPercentage(res.data);
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
                      <th className='border border-slate-600 rounded-md'>Gender</th>
                      <th className='border border-slate-600 rounded-md'>Percentage</th>
                  </tr>
              </thead>
              <tbody>
                {genderPercentage.map((data: { gender: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; percentage: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; },idx: Key | null | undefined) => 
                <tr key={idx} className='h-8'>
                    <td className='border border-slate-700 rounded-md text-center'>{data.gender}</td>
                    <td className='border border-slate-700 rounded-md text-center'>{data.percentage}</td>
                </tr>
                )}
              </tbody>
          </table>
      </div>
    )
}

export default genderPercentage