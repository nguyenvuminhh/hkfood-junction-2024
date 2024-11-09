import React from 'react';
import { FaMoon, FaSun, FaUpload, FaHome } from 'react-icons/fa';

function TopNavigation({ darkTheme, handleMode }) {
  return (
    <div className="absolute top-10 flex gap-5 right-20">
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
