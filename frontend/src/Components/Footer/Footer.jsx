import React, {useEffect} from 'react'
import './footer.css'
//import video2 from '../../Assest/v3.mp4'
import milkbk from '../../Assest/milk-background.jpg' 
import { FiSend } from "react-icons/fi";
import { GiCow } from "react-icons/gi";
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaTripadvisor } from 'react-icons/fa';
import { FiChevronRight } from "react-icons/fi";
import Aos from 'aos'
import 'aos/dist/aos.css'


const Footer = () => {

  useEffect(()=>{
    Aos.init({duration:2000})
  },[])

  return (
    <section className='footer'>
      <div className='videoDiv'>
        {/* <video src={video2} loop autoPlay muted type='video/mp4'></video> */}
        {/* <image src={milkbk} type='image/jpg'></image> */}
        <img src={milkbk} alt="Milk Background" style={{ width: '100%', height: '575px', objectFit: 'cover' }} />
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div data-aos='fade-up' className="text">
            <small>KEEP IN TOUCH</small>
            <h2>MilkTrack With us</h2>
          </div>

          <div className="inputDiv flex">
            <input data-aos='fade-up'  type="text" placeholder='Enter Email Address' />
            <button  data-aos='fade-up' className='btn flex' type='submit'>
              SEND <FiSend className='icon' />
            </button>
          </div>

        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div  data-aos='fade-up'  className="logoDiv">
              <a href='#' className='logo flex'>
              <GiCow className='icon' /> MilkTrack.
              </a>
            </div>

            <div  data-aos='fade-up' className="footerParagraph">
            Our system simplifies cow milk management by tracking daily yield and earnings effortlessly. Monitor production, manage cow data, and generate insightful reports to optimize performance and efficiency.
            </div>
            <div data-aos='fade-up'  className="footerSocials">
            <AiOutlineTwitter className='icon' />
            <AiFillYoutube className='icon' />
            <AiFillInstagram className='icon' />
            <FaTripadvisor className='icon' />
            </div>
          </div>

          <div className="footerLinks grid">
            {/* Group One */}
            <div data-aos='fade-up'  className="linkGroup">
              <span className="groupTitle">
                OUR SYSTEM
              </span>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Daily Yield
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Earnings
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              About Us
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Reports
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Dashboard
              </li>

            </div>

           {/* group 2  */}
            <div data-aos='fade-up'  className="linkGroup">
              <span className="groupTitle">
              SUPPORT
              </span>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              FAQ
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              User Guide
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Contact Us
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Feedback
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Tutorials
              </li>

            </div>

            {/*Group 3*/}
            <div data-aos='fade-up'  className="linkGroup">
              <span className="groupTitle">
              RESOURCES
              </span>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              About Us
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Blog
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Privacy Policy
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Conditions
              </li>

              <li className="footerList flex">
              <FiChevronRight className='icon' />
              Updates
              </li>

            </div>

          </div>

          <div className="footerDiv flex">
            <small>BEST MILKTRACK WEBSITE  </small>
            <small>COPYRIGHTS RESERVED - 2024</small>

          </div>

        </div>
      </div>

    </section>
  )
}

export default Footer