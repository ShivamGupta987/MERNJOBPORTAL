import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import PageHeader from "../components/PageHeader";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
<<<<<<< HEAD
  }, [id]); // Add `id` as a dependency to re-fetch if the id changes
=======
  }, [id]);

>>>>>>> 12fcbfaf9a4eeb2be681046ed835147d82af8df2
  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };
  return (
    <div className="max-w-screen-2xl container mx-auto  xl:px-24">
      <PageHeader title={"Single Job Page"} path={'single Job'}/>
      <h2>Job Details : {id}</h2>
      <h1>{job.jobTitle}</h1>
      <button
        className="bg-blue-600 px-8 py-2 text-white "
        onClick={handleApply}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
