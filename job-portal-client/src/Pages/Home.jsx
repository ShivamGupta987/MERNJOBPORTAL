import React, { useEffect, useState } from "react";
import Bannner from "../components/Bannner";
import Cards from "../components/Cards";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [curreentPage, setCurreentPage] = useState(1);

  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);
    // fetch("jobs.json") through file
    fetch("http://localhost:5000/all-jobs ")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setJobs(data);
        setLoading(false);
      });
  }, []);
  // console.log(jobs)

  // handle input change

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    // console.log(event.target.value)
  };

  // filter jobs by title

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  // console.log(filteredItems)

  //------- Radio base button filtering ----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  
  };

  // ---- button base filtering --------

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  // calculate the index range

  const calculatePageRange = () => {
    const startIndex = (curreentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // function for next page
  const nextPage = () => {
    if (curreentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurreentPage(curreentPage + 1); // Change setCurreentPage to setCurrentPage
    }
  };

  //function for the previous page

  const prevPage = () => {
    if (curreentPage > 1) {
      setCurreentPage(curreentPage - 1);
    }
  };

  // -----------main function -------

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    // filter input items
    if (query) {
      filteredJobs = filteredItems;
    }

    // filter category basis
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          salaryType,
          maxPrice,
          experienceLevel,
          employmentType,
          postingDate,
        }) =>
      // postingDate >= selected 
      // for date posting isliye selecteed likhe wrna rok nhi krega
      jobLocation.toLowerCase() === selected.toLowerCase() ||
      parseInt(maxPrice) <= parseInt(selected) || 
      postingDate >= selected ||
      salaryType.toLowerCase() === selected.toLowerCase() ||
      experienceLevel.toLowerCase() === selected.toLowerCase() ||

      employmentType.toLowerCase() === selected.toLowerCase()
      
      );
      console.log(filteredJobs);
    }

    // slice the data based on current pagew

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Cards key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Bannner query={query} handleInputChange={handleInputChange} />
      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left side */}

        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job cards */}

        <div className="col-span-2 bg-white p-4 rounded-sm">
          {/*   // is loading ternary operator is loading true show loading else show jobs  */}
          {loading ? (
            <p className="font-medium">Loading....</p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
              <p>No Data Found!</p>
            </>
          )}

          {/* pagination here */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage}
               disabled={
                curreentPage === 1
              }
              className="hover : underline"
              >Previous</button>
              <span className="mx-2">
                Page {curreentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  curreentPage ===
                  Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover : underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* right side */}
        <div className="bg-white p-4 rounded"><NewsLetter/></div>
      </div>
    </div>
  );
};

export default Home;
