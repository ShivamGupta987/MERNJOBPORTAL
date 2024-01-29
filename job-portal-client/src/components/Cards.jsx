import React from 'react'
import { Link } from 'react-router-dom';
import {FiCalendar, FiClock, FiDollarSign, FiMapPin} from "react-icons/fi"

const Cards = ({data}) => {
    const {jobTitle,companyName,companyLogo,minPrice,maxPrice,salaryType,jobLocation,employmentType,description,postingDate} = data;
  return (
   <section className='card'>
        <Link to = {"/"} className='flex gap-4 flex-col sm:flex-row items-start'>
            <img src={companyLogo} alt="" />
            <div className='card-details'>
                <h4 className='text-[#141414] mb-1'>{companyName}</h4>
                <h3 className='text-lg font-semibold mb-2'>{jobTitle}</h3>

                <div className='text-[#141414]/70 text-base flex flex-wrap gap-2 mb-2' >
                    <span className='flex items-center gap-2'><FiMapPin/> { jobLocation}</span>
                    <span className='flex items-center gap-2'><FiClock/> { employmentType}</span>
                    <span className='flex items-center gap-2'><FiDollarSign/> { minPrice}-{maxPrice}k</span>
                    <span className='flex items-center gap-2'><FiCalendar/> { postingDate}</span>
                </div>
                <p className='text-base text-[#141414]/70'> {description}</p>
            </div>
        </Link>

   </section>
  )
}

export default Cards
