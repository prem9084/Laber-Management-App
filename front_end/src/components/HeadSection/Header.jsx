 import { useEffect } from "react";
import { Link } from "react-router-dom";
const Header = () => {
const user = JSON.parse(localStorage.getItem("user"));
const profilePath =
  user?.role === "1" ? "/thekedar/profile" : "/laber/profile";
useEffect(() => {
  const script = document.createElement("script");
  script.src = "/assets/js/theme.js";
  script.async = true;
  document.body.appendChild(script);
}, []);



  return (
    <>
<header className="site-header">
  {/* <div className="top-bar">
    <div className="container-fluid clearfix">
      <div className="left-content float-left">
        <p><i className="fa fa-flag" />Looking for your W2, 1095-C or 1099? <a href="#">Click Here</a></p>
      </div>
      <div className="right-content float-right">
        <ul>
          <li>Need Help? Talk to an Expert  <span>2800 666 999</span></li>
          <li><a href="#test-search" className="popup-with-zoom-anim"><i className="fa fa-search" /></a></li>
          <li><a className="side-nav-opener" href="#"><i className="fa fa-bars" /></a></li>
        </ul>
      </div>
    </div>
  </div> */}
  <nav className="navbar navbar-expand-lg navbar-light header-navigation stricky header-style-two">
    <div className="container clearfix">
      {/* Brand and toggle get grouped for better mobile display */}
      <div className="logo-box clearfix">
        <a className="navbar-brand" href="/">
          <img src="/assets/images/logo-1-1.png" alt="Awesome Image" />
        </a>
        <button className="menu-toggler" data-target="#main-nav-bar">
          <span className="fa fa-bars" />
        </button>
      </div>{/* /.logo-box */}
      {/* Collect the nav links, forms, and other content for toggling */}
      <div className="main-navigation" id="main-nav-bar">
        <ul className="navigation-box">
          <li className=" current">
            <Link to="/">Home</Link>
            {/* <ul className="sub-menu">
              <li><a href="index-2.html">Home One</a></li>
              <li><a href="index2.html">Home Two</a></li>
              <li><a href="index3.html">Home Three</a></li>
              <li><a href="index4.html">Home Four</a></li>
              <li><a href="index5.html">Home Five</a></li>
              <li><a href="index6.html">Home Six</a></li>
              <li>
                <a href="index6.html">Header Styles</a>
                <ul className="sub-menu">
                  <li><a href="index-2.html">Header Style 01</a></li>
                  <li><a href="index2.html">Header Style 02</a></li>
                  <li><a href="index3.html">Header Style 03</a></li>
                  <li><a href="index4.html">Header Style 04</a></li>
                  <li><a href="index5.html">Header Style 05</a></li>
                  <li><a href="index6.html">Header Style 06</a></li>
                </ul>
              </li>
            </ul> */}
          </li>
          <li>
            <Link to="/">Our Solution</Link>
            {/* <ul className="sub-menu">
              <li><a href="solutions.html">All Solutions</a></li>
              <li><a href="solutions-details.html">Solution Details</a></li>
            </ul> */}
          </li>
          <li>
            <Link to="/">About</Link>
            {/* <ul className="sub-menu">
              <li><a href="about-1.html">About One</a></li>
              <li><a href="about-2.html">About Two</a></li>
              <li><a href="company-overview.html">Company Overview</a></li>
              <li><a href="company-history.html">Company History</a></li>
              <li><a href="team.html">Our Team</a></li>
              <li><a href="partners.html">Partners</a></li>
              <li><a href="careers.html">Careers</a></li>
              <li><a href="job-details.html">Job Details</a></li>
              <li><a href="investors.html">Investors</a></li>
            </ul> */}
          </li>
          <li>
            <Link to="/">How We Works</Link>
            {/* <ul className="sub-menu">
              <li><a href="how-work.html">How Solutions Works</a></li>
              <li>
                <a href="solution-industry.html">Solutions by</a>
                <ul className="sub-menu right-align">
                  <li><a href="solution-industry.html">Solution by Industry</a></li>
                  <li><a href="solution-role.html">Solution by Role</a></li>
                  <li><a href="solution-size.html">Solution by Size</a></li>
                </ul>
              </li>
            </ul> */}
          </li>
          <li>
            <Link to="/">Pages</Link>
            {/* <ul className="sub-menu">
              <li><a href="testimonials.html">Testimonials</a></li>
              <li><a href="location.html">Locations</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="404.html">404 Page</a></li>
              <li><a href="request-metting.html">Request Meeting</a></li>
              <li><a href="signin.html">Sign In</a></li>
            </ul> */}
          </li>
          <li>
            <Link to="/">Resources</Link>
            {/* <ul className="sub-menu">
              <li><a href="news.html">News</a></li>
              <li><a href="news-details.html">Single News</a></li>
              <li><a href="news-sidebar.html">News Sidebar</a></li>
              <li><a href="news-details-sidebar.html">Single News Sidebar</a></li>
              <li><a href="white-papers.html">White Pagers</a></li>
            </ul> */}
          </li>
        </ul>
      </div>
      <div className="right-side-box">
        {user ? (
  <Link to={profilePath} className="signin-btn">
    {user.name}
  </Link>
) : (
  <Link to="/login" className="signin-btn">
    Sign in
  </Link>
)}
      </div>
      {/* /.right-side-box */}
    </div>
    {/* /.container */}
  </nav>
</header>


   <div>
  <section className="hidden-sidebar side-navigation">
    <span className="close-button side-navigation-close-btn fa fa-close" />{/* /.close-button */}
    <div className="sidebar-content">
      <img src="assets/images/hidden-bar-image-1-1.jpg" alt="Awesome Image" />
      <p>Prefer speaking with a human to filling out a form? Call our corporate office and we will connect you with a team member <br /> who can help.</p>
      <p className="contact-info"><i className="fa fa-phone" />2800 666 999</p>{/* /.contact-info */}
      <a href="#" className="download-btn one"><i className="fa fa-file-pdf-o" /> Looking for your W-2?</a>
      <a href="#" className="download-btn two"><i className="fa fa-building-o" /> Payonline Sales Offices</a>
    </div>
  </section>
  <div className="search_area zoom-anim-dialog mfp-hide" id="test-search">
    <div className="search_box_inner">
      <div className="input-box">
        <input type="text" className="form-control" placeholder="Search for..." />
        <span className="input-box-btn"> <button className="btn btn-default" type="button"><i className="fa fa-search" /></button> </span>
      </div>
    </div>
  </div>
</div>



<a href="#" data-target="html" className="scroll-to-target scroll-to-top"><i className="fa fa-long-arrow-up" /></a>



    </>
  );
};

export default Header;