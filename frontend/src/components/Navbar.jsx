import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let logoutHandler = () => {
    let text = "Are you sure you want to exit ?";
    if (window.confirm(text) === true) {
      Cookies.remove('token')
      navigate("/login")
    }
  }
  return (
    <div>
      <nav
        className={
          (location.pathname === "/" ? "bg-[#212121]" : "bg-[#212121]") +
          " w-full px-4 py-3 z-[9999] shadow-lg"
        }
      >
        <div className="flex flex-col sm:flex-row  justify-between items-center">
          <div className="flex flex-row items-center mb-3 mt-3 sm:mb-0 sm:mt-0 gap-3">
            <div className="mx-2 ml-4 pt-1">
              <p onClick={() => navigate("/")} className="cursor-pointer font-proxbold text-white text-2xl underline">InstaJobs</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="text-center xs:mb-0">
              <div
                onClick={logoutHandler}
                className="p-2 xs:px-4 mb-2 sm:mb-1 cursor-pointer md:mb-0 font-proxima text-white font-bold text-sm mx-1"
              >
                Logout
              </div>

            </div>
            <div className="flex flex-row items-center"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
