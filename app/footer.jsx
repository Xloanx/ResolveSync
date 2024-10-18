import React from 'react'
import { FaBugs } from "react-icons/fa6";
import Link from 'next/link';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    // <footer className="footer items-center p-4 bg-neutral text-neutral-content">
    //     <aside className="items-center grid-flow-col"> 
    //         <FaBugs size={50}/>
    //         <p>Built by <Link href="https://ama-page.vercel.app" passHref legacyBehavior>
    //           <a target="_blank"> 
    //             Xloanx 
    //           </a>
    //         </Link> - All rights reserved</p>
    //     </aside> 
    //     <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    //         <Link href="https://github.com/xloanx" passHref legacyBehavior>
    //           <a target="_blank">
    //             <FaGithub size={25}/>
    //           </a> 
    //         </Link>

    //         <Link href="https://x.com/AOdukaye76472" passHref legacyBehavior>
    //           <a target="_blank"> 
    //             <FaXTwitter  size={25}/> 
    //           </a>
    //         </Link>

    //         <Link href="https://www.linkedin.com/in/abiodun-odukaye-847100164/" passHref legacyBehavior>
    //           <a target="_blank"> 
    //             <FaLinkedin  size={25}/> 
    //           </a>
    //         </Link> 
    //     </nav>
    // </footer>

    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <aside className="items-center grid-flow-col">
        <FaBugs size={50} />
        <p>Built by <Link href="https://ama-page.vercel.app" passHref legacyBehavior>
          <a target="_blank"> 
            Xloanx 
          </a>
        </Link> - All rights reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link href="https://github.com/xloanx" passHref legacyBehavior>
          <a target="_blank">
            <FaGithub size={25} />
          </a>
        </Link>
        <Link href="https://x.com/AOdukaye76472" passHref legacyBehavior>
          <a target="_blank"> 
            <FaXTwitter size={25} /> 
          </a>
        </Link>
        <Link href="https://www.linkedin.com/in/abiodun-odukaye-847100164/" passHref legacyBehavior>
          <a target="_blank"> 
            <FaLinkedin size={25} /> 
          </a>
        </Link>
      </nav>
    </footer>
  )
}

export default Footer