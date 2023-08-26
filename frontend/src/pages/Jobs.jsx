import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
function Jobs() {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get('token') === undefined || Cookies.get('token') === null || !Cookies.get('token')) {
      navigate("/login")
    }
    fetchJobs()
  }, [])


  const [cannotLoadMore, setCannotLoadMore] = useState(false)
  const [jobList, setJobList] = useState([])
  const [page, setPage] = useState(1)
  const [description, setDescription] = useState();
  const [location, setLocation] = useState()
  const [fullTime, setFullTime] = useState(false)
  const [isInit, setIsInit] = useState(true)

  let fetchJobs = async (loadMore = false, isSearch = false) => {
    if (loadMore) {
      toast.loading("Fetching jobs...");
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token') ?? ""}`);
    let payload = {
      page: loadMore ? page + 1 : 1
    };
    if (description) {
      payload.description = description
    }
    if (location) {
      payload.location = location
    }
    if (fullTime) {
      payload.isFullTime = true
    }
    var raw = JSON.stringify(payload);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/jobs`, requestOptions)
      .then(async (response) => {
        setIsInit(false)
        if (loadMore) {
          setPage(page + 1)
          toast.dismiss();
        }
        if (response.status === 401) {
          logoutHandler()
        }
        if (response.ok) {
          let result = await response.json();
          if (isSearch) {
            setJobList(result?.data ?? [])
          } else {
            setJobList(jobList.length > 0 ? jobList.concat(result?.data ?? []) : result?.data ?? []);
          }

          handleScrollPosition()
          if (loadMore && result.data.length === 0) {
            setCannotLoadMore(true)
          }
        } else {
          if (loadMore) {
            setCannotLoadMore(true)
          }
        }
      })
      .catch(error => {
        setIsInit(false)
        if (loadMore) {
          toast.dismiss();
        }
        console.error(error)
      });
  }

  let handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  };

  let logoutHandler = () => {
    Cookies.remove('token')
    navigate("/login")
  }

  const handleChangeCheckbox = (e) => {
    setFullTime(e.target.checked)
  }

  const loadMore = async (event) => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
    await fetchJobs(true)
  };

  const search = async () => {
    await fetchJobs(false, true)
  };
  const reset = async () => {
    setDescription("")
    setLocation("")
    setFullTime(false)
    await fetchJobs(false,true)
  };
  return (
    <div className="relative">
      <Navbar />

      <div>
        <div className={`bg-white px-8 py-5 mt-10 shadow-md max-w-4xl mx-auto rounded-[6px] mb-3 ${isInit ? 'hidden' : 'visible'}`}>
          <div className={`flex md:flex-row flex-col mb-6 flex-wrap`}>
            <div className="md:w-1/2 px-2 w-full">
              <label className="block text-sm mb-1 text-left font-proxbold">Description</label>
              <input onChange={e => setDescription(e.target.value)} value={description} className="placeholder:font-proxima placeholder:text-slate-500 w-full border rounded p-2 outline-none focus:shadow-outline" type="text" placeholder="Filter by title, benefits, companies, or expertise" />
            </div>
            <div className="md:w-1/2 px-2 w-full">
              <label className="block text-sm mb-1 text-left font-proxbold">Location</label>
              <input onChange={e => setLocation(e.target.value)} value={location} className="placeholder:font-proxima placeholder:text-slate-500 w-full border rounded p-2 outline-none focus:shadow-outline" type="text" placeholder="Filter by city, state, zip code, or country" />
            </div>
            <div className="md:w-1/2 px-2 w-full mt-5">
              <div className="flex flex-row gap-2 justify-start items-center">
                <input onChange={handleChangeCheckbox} checked={fullTime} className="placeholder:font-proxima placeholder:text-slate-500 border rounded p-2 outline-none focus:shadow-outline" type="checkbox" />
                <p className="font-proxima text-base text-black w-fit">Fulltime only</p>
              </div>
            </div>
            <div className="md:w-1/2 px-2 w-full mt-5">
              <div className="flex flex-row gap-2 justify-start items-center">
                <button type="button" className="py-2 bg-blue-800 font-proxbold w-full md:w-fit px-4 text-white shadow-md rounded-sm" onClick={search}>Search</button>
                <button type="button" className="py-2 bg-gray-500 font-proxbold w-full md:w-fit px-4 text-white shadow-md rounded-sm" onClick={reset}>Reset</button>

              </div>
            </div>

          </div>
        </div>
        <div className="bg-white px-8 py-5 shadow-md max-w-4xl mx-auto rounded-[6px] mb-6">
          {isInit ? <div className="w-full"><Loading /></div> : ""}
          {jobList && jobList.length > 0 ? (
            <div >
              {jobList.map((historyItem, index) => {
                if (historyItem) {
                  return (<div onClick={() => navigate(`/job/${historyItem.id}`)} className="flex hover:bg-[#e5e5e5] cursor-pointer transition-all duration-300 flex-col px-2 py-1.5 gap-2" key={index}>
                    <p className="font-proxbold text-lg">{historyItem?.title ?? ""}</p>
                    <div className="flex flex-row gap-3">
                      <p className="font-inter text-[13px]">{historyItem?.company ?? ""}</p>
                      <p className="font-inter text-[13px] text-green-700">{historyItem?.type ? `~ ${historyItem?.type}` : ""}</p>
                    </div>
                    <div className="h-[1px] w-full bg-[#dddddd]"></div>
                  </div>)
                }
              })}
              <button type="button" hidden={cannotLoadMore} className="py-2 bg-blue-800 font-proxbold w-full text-white shadow-md mt-2 rounded-sm" onClick={loadMore}>Load More Jobs</button>
            </div>
          ) : (
            <p className="w-full text-center mt-4">{isInit ? "Loading.." : "No History data"}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
