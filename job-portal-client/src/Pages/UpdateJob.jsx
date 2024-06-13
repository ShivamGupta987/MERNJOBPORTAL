import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import JobPostingData from '../sidebar/JobPostingData';




const UpdateJob = () => {

const {id} = useParams();
// console.log(id)
const {_id,jobTitle,companyName,minPrice,maxPrice,salaryType,jobLocation,postingDate,experienceLevel,companyLogo,employmentType,description,postedBy,skills} = useLoaderData()
const [selectedOption, setSelectedOption] = useState(null);
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();

const onSubmit = (data) => {

  fetch(`http://localhost:5000/update-job/${id}`, {
    method: 'PATCH', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data) 
})
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if(result.acknowledged === true ){
        alert("Job Updated Succesfully!")

      }
      reset();
    });
};
// for selecting
const options = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "c++", label: "c++" },
  { value: "Html", label: "Html" },
  { value: "CSS", label: "CSS" },
  { value: "REACT", label: "REACT" },
  { value: "NODE", label: "NODE" },
  { value: "MONGODB", label: "MONGODB" },
  { value: "REDUX", label: "REDUX" },
];
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 ">
    {/* form */}
    <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Ist row */}
        <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">job Title</label>
            <input
              type="text"
              defaultValue={jobTitle}
              {...register("jobTitle")}
              className="create-job-input"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Company Name</label>
            <input
              type="text"
              placeholder="Ex:Microsoft"
              defaultValue={companyName}

              {...register("companyName")}
              className="create-job-input"
            />
          </div>
        </div>
        {/* 2nd row */}
        <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Minimum Salary</label>
            <input
              type="text"
              placeholder="$20k"
              defaultValue={minPrice}
              
              {...register("minPrice")}
              className="create-job-input"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Maximum Salary</label>
            <input
              type="text"
              placeholder="$100k"
              defaultValue={maxPrice}


              {...register("maxPrice")}
              className="create-job-input"
            />
          </div>
        </div>
        {/* 3rd row */}
        <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Salary Type</label>
            <select {...register("salaryType")} className="create-job-input">
              <option value={salaryType}> {salaryType}</option>
              <option value="Hourly">Hourly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Job Location</label>
            <input
              type="text"
              placeholder="Ex: New York"
              defaultValue={jobLocation}

              {...register("jobLocation")}
              className="create-job-input"
            />
          </div>
        </div>

        {/* 4th row */}
        <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Job Posting Date</label>
            <input
              type="date"
              placeholder=" Ex- 2024 - 01 - 28"
              defaultValue={JobPostingData}

              {...register("postingDate")}
              className="create-job-input"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Experience Level</label>
            <select
              {...register("experienceLevel")}
         


              className="create-job-input"
            >
              <option value={experienceLevel}>{experienceLevel}</option>
              <option value="">No experience</option>
              <option value="Work remotely">Work remotely</option>
              <option value="Intership">Intership</option>
              <option value="Full-time">Full-time</option>
            </select>
          </div>
        </div>

        {/* 5th row */}
        <div>
          <label className="block mb-2 text-lg">Required Skill Sets:</label>
          <CreatableSelect
            defaultValue={skills}
            onChange={setSelectedOption}
            options={options}
            isMulti
            className="crete-job-input"
          />
        </div>

        {/* 6th row */}
        <div className="create-job-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Company Logo</label>
            <input
              type="url"
              placeholder="paste your image image URL: https://weshare.com/img1.jpg"
              defaultValue={companyLogo}
              {...register("companyLogo")}
              className="create-job-input"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Employment Type</label>
            <select
              {...register("employmentType")}
              className="create-job-input"
            >
              <option value={employmentType}>{employmentType}</option>

              <option value="Temporary">Temporary</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
            </select>
          </div>
        </div>

        {/* 7th row */}
        <div className="w-full">
          <label className="block mb-2 text-lg">Jobs Description</label>

          <textarea
            className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-500"
            rows={6}
            defaultValue={
                 description
            }
            placeholder="Job description"
            {...register("description")}
          />
        </div>

        {/* last row */}

        <div className="w-full">
          <label className="block mb-2 text-lg">Job Posted By</label>
          <input
            type="email"
            placeholder="your email"
            {...register("postedBy")}
            defaultValue={postedBy}
            className="create-job-input"
          />
        </div>

        <input
          type="submit"
          className="block mt-12 bg-blue-500text-white font-semibold rounded-sm cursor-pointer"
        />
      </form>
    </div>
  </div>
  )
}

export default UpdateJob
