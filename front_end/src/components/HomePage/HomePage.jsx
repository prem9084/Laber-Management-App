import { useState } from "react";
import Layout from "../HeadSection/Layout";

const Home = () => {
  const [activeTab, setActiveTab] = useState("payroll");

  const services = [
    {
      id: "payroll",
      icon: "payonline-icon-dollar",
      title: "Payroll",
      description:
        "Save time and improve payroll accuracy with the latest in time and attendance software. However you prefer to track employee time, we have flexible options to fit your business.",
    },
    {
      id: "time",
      icon: "payonline-icon-clock",
      title: "Time & Attendance",
      description:
        "Save time and improve payroll accuracy with the latest in time and attendance software. However you prefer to track employee time, we have flexible options to fit your business.",
    },
    {
      id: "benefits",
      icon: "payonline-icon-checkmark-outlined-circular-button",
      title: "Benefits",
      description:
        "Save time and improve payroll accuracy with the latest in time and attendance software. However you prefer to track employee time, we have flexible options to fit your business.",
    },
    {
      id: "hr-management",
      icon: "payonline-icon-settings",
      title: "HR Management",
      description:
        "Save time and improve payroll accuracy with the latest in time and attendance software. However you prefer to track employee time, we have flexible options to fit your business.",
    },
    {
      id: "hiring",
      icon: "payonline-icon-users",
      title: "Hiring",
      description:
        "Save time and improve payroll accuracy with the latest in time and attendance software. However you prefer to track employee time, we have flexible options to fit your business.",
    },
  ];

  const solutions = [
    {
      id: 1,
      span: "Solutions for 1-9 employees",
      title:
        "Cut Through the red Tape with Payonline Solutions for Small Business",
      image: "assets/images/solution-1-1.png",
    },
    {
      id: 2,
      span: "Solutions for 10-19 employees",
      title:
        "Cut Through the red Tape with Payonline Solutions for Small Business",
      image: "assets/images/solution-1-2.png",
    },
    {
      id: 3,
      span: "Solutions for 20-49 employees",
      title:
        "Cut Through the red Tape with Payonline Solutions for Small Business",
      image: "assets/images/solution-1-3.png",
    },
    {
      id: 4,
      span: "Solutions for 50-100 employees",
      title:
        "Cut Through the red Tape with Payonline Solutions for Small Business",
      image: "assets/images/solution-1-4.png",
    },
  ];

  const steps = [
    {
      id: 1,
      icon: "payonline-icon-chat",
      title: "Request a Meeting",
      description:
        "We'll spend some time learning more about your business and your specific workforce challenges.",
      step: "01",
    },
    {
      id: 2,
      icon: "payonline-icon-appointment",
      title: "Receive a Custom Plan",
      description:
        "We'll spend some time learning more about your business and your specific workforce challenges.",
      step: "02",
    },
    {
      id: 3,
      icon: "payonline-icon-handshake",
      title: "Let's Make it Happen",
      description:
        "We'll spend some time learning more about your business and your specific workforce challenges.",
      step: "03",
    },
  ];

  const blogs = [
    {
      id: 1,
      title: "Is it Time to Audit your Employee Benefits Package?",
      date: "20 May, 2019",
      image: "assets/images/blog-1-1.jpg",
      slug: "audit-benefits",
    },
    {
      id: 2,
      title:
        "California Supreme Court Adopts Test Broadening Definition of Employee",
      date: "7 June, 2019",
      image: "assets/images/blog-1-2.jpg",
      slug: "california-employee-definition",
    },
    {
      id: 3,
      title: "Payonline Costs for Supplemental Payments to Employees",
      date: "20 May, 2019",
      image: "assets/images/blog-1-3.jpg",
      slug: "supplemental-payments",
    },
  ];

  const currentService = services.find((s) => s.id === activeTab);

  return (
    <Layout>
      {/* Banner Slider */}
      <section
        id="banner"
        className="carousel slide carousel-fade slider-content-style slider-home-one"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className="carousel-item active slide-1"
            style={{
              backgroundImage: "url('/assets/images/banner-1-1.jpg')",
              height: "100vh",
              minHeight: "650px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="carousel-caption">
              <div className="container">
                <div className="box valign-middle">
                  <div className="content text-left">
                    <h3 className="animated fadeInUp">
                      Payroll & <br /> HR Solutions
                    </h3>
                    <p className="animated fadeInDown">
                      to take your business further
                    </p>
                    <a
                      href="/login"
                      className="thm-btn animated fadeInDown"
                    >
                      LOGIN ACCOUNT
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="carousel-item slide-2"
            style={{
              backgroundImage: "url('/assets/images/banner-1-2.jpg')",
              height: "100vh",
              minHeight: "650px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="carousel-caption">
              <div className="container">
                <div className="box valign-middle">
                  <div className="content text-left">
                    <h3 className="animated fadeInUp">
                      Payroll & <br /> HR Solutions
                    </h3>
                    <p className="animated fadeInDown">
                      to take your business further
                    </p>
                    <a
                      href="/request-meeting"
                      className="thm-btn animated fadeInDown"
                    >
                      Request a meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="carousel-item slide-3"
            style={{
              backgroundImage: "url('/assets/images/banner-1-3.jpg')",
              height: "100vh",
              minHeight: "650px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="carousel-caption">
              <div className="container">
                <div className="box valign-middle">
                  <div className="content text-left">
                    <h3 className="animated fadeInUp">
                      Payroll & <br /> HR Solutions
                    </h3>
                    <p className="animated fadeInDown">
                      to take your business further
                    </p>
                    <a
                      href="/request-meeting"
                      className="thm-btn animated fadeInDown"
                    >
                      Request a meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a
          className="carousel-control-prev"
          href="#banner"
          role="button"
          data-slide="prev"
        >
          <i className="fa fa-arrow-left"></i>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#banner"
          role="button"
          data-slide="next"
        >
          <i className="fa fa-arrow-right"></i>
          <span className="sr-only">Next</span>
        </a>
      </section>

      {/* Services Section */}
      <section className="service-style-one sec-pad-top">
        <div className="container">
          <div className="sec-title text-center">
            <span>We do more for your world</span>
            <h2>
              All-in-one payroll and HR <br /> your business
            </h2>
          </div>

          <ul className="nav nav-tabs tab-title clearfix" role="tablist">
            {services.map((service) => (
              <li key={service.id} className="nav-item">
                <button
                  className={`nav-link ${activeTab === service.id ? "active" : ""}`}
                  onClick={() => setActiveTab(service.id)}
                  role="tab"
                >
                  <span className="icon-box">
                    <i className={service.icon}></i>
                  </span>
                  <h3>{service.title}</h3>
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {currentService && (
              <div className="tab-pane fade show active">
                <div className="single-tab-content">
                  <div className="icon-box">
                    <i className={currentService.icon}></i>
                  </div>
                  <div className="text-box">
                    <h3>{currentService.title}</h3>
                    <p>{currentService.description}</p>
                    <a href="#" className="read-more">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="solution-style-one sec-pad">
        <div className="container">
          <div className="sec-title text-center">
            <span>Solutions by Business Size</span>
            <h2>
              HR solutions that grow with <br /> your business
            </h2>
          </div>

          <div className="row">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              >
                <div className="single-solution-style-one hvr-bounce-to-bottom">
                  <div className="img-box">
                    <img src={solution.image} alt={solution.span} />
                  </div>
                  <div className="text-box">
                    <span>{solution.span}</span>
                    <h3>
                      <a href="#">{solution.title}</a>
                    </h3>
                    <a href="#" className="read-more">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Easy Steps Section */}
      <section className="easy-steps-style-one sec-pad">
        <div className="container">
          <div className="sec-title text-center light">
            <span>how solution works</span>
            <h2>
              Let's get started in 3 easy <br /> steps
            </h2>
          </div>

          <div className="row">
            {steps.map((step) => (
              <div
                key={step.id}
                className="col-lg-4 col-md-12 col-sm-12 col-xs-12"
              >
                <div className="single-easy-step-one">
                  <i className={step.icon}></i>
                  <h3>
                    <a href="#">{step.title}</a>
                  </h3>
                  <p>{step.description}</p>
                  <a href="#" className="read-more">
                    <i className="fa fa-arrow-right"></i>
                  </a>
                  <span className="step-count">{step.step} - Step</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="sec-pad blog-style-one">
        <div className="container">
          <div className="sec-title text-center">
            <span>Blog posts</span>
            <h2>
              Payonline latest articles <br /> for you
            </h2>
          </div>

          <div className="row">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="col-lg-4 col-md-12 col-sm-12 col-xs-12"
              >
                <div className="single-blog-style-one">
                  <div className="text-box hvr-sweep-to-bottom">
                    <div className="meta-info">
                      <a href="#">by admin</a>
                      <span className="sep">-</span>
                      <a href="#">{blog.date}</a>
                    </div>
                    <h3>
                      <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                    </h3>
                    <a href={`/blog/${blog.slug}`} className="read-more">
                      Read More
                    </a>
                  </div>
                  <div className="image-box">
                    <img src={blog.image} alt={blog.title} />
                    <div className="box">
                      <a href={`/blog/${blog.slug}`} className="more-btn">
                        <i className="fa fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-one sec-pad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7">
              <div className="cta-one-content">
                <div className="sec-title">
                  <span>Find Your Solution</span>
                  <h2>
                    Speak with a payonline <br /> representative today!
                  </h2>
                </div>

                <form className="cta-form">
                  <select className="form-select">
                    <option>Payroll services</option>
                    <option>HR services</option>
                    <option>Talent Acquisition</option>
                  </select>
                  <div className="btn-box">
                    <button type="submit" className="thm-btn">
                      Let's get started
                    </button>
                    <div className="btn-tag-line">
                      <i className="payonline-icon-share"></i>Are you ready?
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-md-5 text-right">
              <img src="assets/images/mockup-1-2.png" alt="Mockup" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
