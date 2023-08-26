import DOMPurify from "isomorphic-dompurify";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import locationIcon from "../assets/img/location.svg";
import webIcon from "../assets/img/web.svg";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
function Detail() {
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get('token') === undefined || Cookies.get('token') === null || !Cookies.get('token')) {
      navigate("/login")
    }
    fetchJobs()
  }, [])


  const [jobItem, setJobItem] = useState([])
  const [isInit, setIsInit] = useState(true)
  const [image, setImage] = useState()

  let fetchJobs = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${Cookies.get('token') ?? ""}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/job/${id}`, requestOptions)
      .then(async (response) => {
        if (response.status === 401) {
          logoutHandler()
        }
        if (response.ok) {
          setIsInit(false)
          let result = await response.json();
          setJobItem(result?.data ?? [])
          checkImage(result?.data?.company_image)
        }
      })
      .catch(error => {
        setIsInit(false)
        console.error(error)
      });
  }

  let checkImage = (img) => {
    if (img) {
      fetch(img, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            setImage(img)
          }
        }).catch(err => console.log('Error:', err));
    }
  }

  let logoutHandler = () => {
    Cookies.remove('token')
    navigate("/login")
  }


  return (
    <div className="relative">
      <Navbar />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:flex-nowrap flex-wrap gap-3">
        <div className="bg-white px-8 py-6 shadow-md md:w-2/3 w-full rounded-[6px] mb-6 mt-10">
          <nav class="container mb-7">
            <ol class="list-reset rounded flex bg-grey-light text-grey">
              <li class="px-2"><p onClick={() => navigate("/")} class="cursor-pointer underline text-indigo font-proxima">Job List</p></li>
              <li>/</li>
              <li class="px-2"><p class="text-indigo font-proxbold">Job Detail</p></li>
            </ol>
          </nav>

          {isInit ? <div className="w-full"><Loading /></div> : ""}
          {jobItem ? (
            <div >
              <div className="flex transition-all duration-300 flex-col px-2 py-1.5 gap-2">
                <p className="font-proxbold text-2xl">{jobItem?.title ?? ""}</p>
                <p className="font-inter text-[14px]">{jobItem?.company ?? ""}</p>
                <div className="flex flex-row gap-3 items-center">
                  <p className="font-inter text-[13px] text-green-700">{jobItem?.type ? `~ ${jobItem?.type}` : ""}</p>
                  <div className="flex flex-row gap-1 items-center">
                    <img src={locationIcon} className="w-4 h-4" alt="location" />
                    <p className="font-inter text-[13px]">{jobItem?.location ?? ""}</p>
                  </div>
                  {jobItem?.company_url ? (<div className="flex flex-row gap-1 items-center">
                    <img src={webIcon} className="w-4 h-4" alt="web" />
                    <a target="_blank" rel="noreferrer" href={jobItem?.company_url} className="font-inter text-[13px] underline text-blue-700 cursor-pointer">{jobItem?.company_url ?? ""}</a>
                  </div>) : ""}
                </div>
              </div>
              <div className="h-[1px] w-full bg-[#dddddd] mt-2 mb-5"></div>

              {image ? <img src={image ?? ""} alt="company img" /> : ""}
              <div className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(jobItem?.description),
                }}
              ></div>
            </div>
          ) : (
            <p className="w-full text-center mt-4">{isInit ? "Loading.." : "No History data"}</p>
          )}
        </div>
        {jobItem ? (<div className=" md:w-1/3 w-full h-fit mb-6 md:mt-10 mt-0">
          <div className="bg-white px-5 py-5 shadow-md w-full rounded-[6px] ">
            <p className="font-proxbold text-lg">How To Apply</p>
            <div className="h-[1px] w-full bg-[#dddddd] mt-2 mb-5"></div>
            <p className="font-proxima text-sm">You can apply directly by clicking this Link : </p>
            <div className="mt-4 font-proxima text-sm cursor-pointer underline text-blue-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(jobItem?.how_to_apply),
              }}
            ></div>
          </div>
        </div>) : ""}

      </div>
    </div>
  );
}

export default Detail;
