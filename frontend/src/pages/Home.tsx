import React from 'react'
import { Link, useAsyncError } from 'react-router-dom'

const Home = () => {
  return (
    
    <div className=''>
        <div className="bg-[#182b50] p-8 font-[sans-serif]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 md:!leading-[55px]">API's</h2>
          <p className="text-lg lg:text-xl text-white">API 1</p>
          <div className='flex flex-row'>
            <Link to={`summary/uniqueUsersPerDay`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Unique User Per Day
                </a>
            </Link>
            <Link to={`summary/uniqueUsersAll`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Total of Unique User Total
                </a>
            </Link>
            <Link to={`summary/newAndReturningPerDay`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    New and Returning User Per Day
                </a>
            </Link>
            <Link to={`summary/newAndReturningTotal`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Total of New and Returning user
                </a>
            </Link>
            <Link to={`summary/busiestDay`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Busiest Day
                </a>
            </Link>
            <Link to={`summary/totalData`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Total Data All
                </a>
            </Link>
          </div>
          <p className="text-lg lg:text-xl text-white mb-8">API 2</p>
          <div className='flex flex-row'>
            <Link to={`segment/agePercentage`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Age Group Segmentation
                </a>
            </Link>
            <Link to={`segment/genderPercentage`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Gender Segmentation
                </a>
            </Link>
            <Link to={`segment/phoneBrand`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Phone Brand Segmentation
                </a>
            </Link>
            <Link to={`segment/digitalInterest`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Digital Interest Segementation
                </a>
            </Link>
          </div>
          
          <p className="text-lg lg:text-xl text-white mb-8">API 3</p>
          <div className='flex flex-row'>
            <Link to={`user/top5Users`}>
                <a className="bg-[#a91079] hover:bg-opacity-80 text-white m-2 p-4 rounded-xl text-sm font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl inline-block text-center">
                    Top 5 Users By Location
                </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home