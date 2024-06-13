import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    fetch("http://localhost:5000/post-job", {
      method: 'POST', // Specify the method.
      headers: {
          'Content-Type': 'application/json', // Specify the content type.
      },
      body: JSON.stringify(data) // Convert the data to a JSON string.
  })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.acknowledged === true ){
          alert("Job Posted Succesfully!")

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
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                placeholder="Ex:Microsoft"
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
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="$100k"
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
                <option value="">Choose Your Salary</option>
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
                <option value="">Choose Your Experience</option>
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
              defaultValue={selectedOption}
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
                <option value="">Select your job type</option>

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
                "Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."
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
              className="create-job-input"
            />
          </div>

          <button
          className="w-full block py-2 pl-3 border focus:outline-none bg-blue-500 rounded-sm text-white cursor-pointer font-semibold transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
          type="submit"
        >
          Submit
        </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
