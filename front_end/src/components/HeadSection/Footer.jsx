const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="upper-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 d-flex">
              <div className="footer-widget my-auto">
                <a href="/">
                  <img src="/assets/images/logo-1-1.png" alt="Payonline Logo" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 d-flex">
              <div className="footer-widget links-widget my-auto links-widget-one">
                <div className="title-box">
                  <h3>Services</h3>
                </div>
                <ul className="link-lists">
                  <li>
                    <a href="/solutions">Talent Acquisition</a>
                  </li>
                  <li>
                    <a href="/solutions">Time and Labor Management</a>
                  </li>
                  <li>
                    <a href="/solutions">Payroll</a>
                  </li>
                  <li>
                    <a href="/solutions">Talent Management</a>
                  </li>
                  <li>
                    <a href="/solutions">HR Management</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-12 col-xs-12 d-flex">
              <div className="footer-widget links-widget my-auto">
                <div className="title-box">
                  <h3>Explore</h3>
                </div>
                <ul className="link-lists">
                  <li>
                    <a href="/careers">Careers</a>
                  </li>
                  <li>
                    <a href="/location">Locations</a>
                  </li>
                  <li>
                    <a href="/investors">Investors</a>
                  </li>
                  <li>
                    <a href="/">Press Room</a>
                  </li>
                  <li>
                    <a href="/contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-12 col-xs-12 d-flex">
              <div className="footer-widget my-auto">
                <div className="btn-box">
                  <a href="/request-meeting" className="thm-btn">
                    Request a meeting
                  </a>
                  <span className="btn-tag-line">
                    Try a better way <i className="payonline-icon-share"></i>
                  </span>
                </div>
                <div className="social">
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-footer">
        <div className="container">
          <p>
            &copy; Copyright {currentYear} by{" "}
            <a href="https://themeforest.net" target="_blank" rel="noopener noreferrer">
              PayOnline
            </a>
          </p>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;