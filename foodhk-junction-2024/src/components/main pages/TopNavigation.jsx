import React from 'react';
import { FaMoon, FaSun, FaUpload, FaHome } from 'react-icons/fa';
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import RealTimeClock from '../helper/Clock';


function TopNavigation({ darkTheme, handleMode, title }) {
  return (
    <div className="absolute top-6 flex gap-5 right-20">
      <h1 className = "text-4xl mr-4"> {title} </h1>
      <RealTimeClock/>
      <button
        onClick={() => (window.location.href = '/monitor')}
      >
        <MdOutlineScreenshotMonitor size="2.1em" className="top-navigation-icon text-slate-400" />
      </button>
      <button
        onClick={() => (window.location.href = '/')}
      >
        <FaHome size="2.1em" className="top-navigation-icon text-slate-400" />
      </button>
      <button
        onClick={() => (window.location.href = '/product-form')}
      >
        <FaUpload size="2.1em" className="top-navigation-icon text-slate-400" />
      </button>
      <button
        onClick={() => (window.location.href = '/communication-channel')}
      >
        <IoMdChatbubbles size="2.1em" className="top-navigation-icon text-slate-400" />
      </button>
      <label>
        <span
          onClick={handleMode}
          className={`transition-transform transform ${darkTheme ? 'rotate-0' : 'rotate-180'}`}
        >
          {darkTheme ? (
            <FaMoon size="2.1em" className="top-navigation-icon text-slate-400" />
          ) : (
            <FaSun size="2.1em" className="top-navigation-icon text-slate-400" />
          )}
        </span>
      </label>
    </div>
  );
}

export default TopNavigation;
