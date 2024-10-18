'use client'
import React, {useState, useRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Navbar = () => {

    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef(null);

    const handleButtonClick = () => {
        setIsInputFocused(true);
        inputRef.current.focus();
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };


    return ( 
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Dashboard</a></li>
        <li><a>Issues</a></li>
        <li><a>Feeds</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Dashboard</a></li>
      <li><a>Issues</a></li>
      {/* <li>
        <details>
          <summary>Issues</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li> */}
      <li><a>Feeds</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <div className="form-control">
        {isInputFocused ? (
            <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onBlur={handleBlur}
            />
        ) : (
            <button className="btn btn-ghost btn-circle" onClick={handleButtonClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            </button>
        )}
        </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image alt="Tailwind CSS Navbar component"
                // src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                width={40} height={40}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
     );
}
 
export default Navbar;