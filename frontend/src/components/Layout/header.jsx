import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmToast, toast } from "../../utils/constant";
import img from "../../assets/logo-jd2.png";

function HeaderComponent(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("token");
  const loginUser = JSON.parse(localStorage.getItem("userDetails"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    if (isLogin) {
      const msg = await confirmToast("You won't be able to Logout this!"); // msg
      if (msg) {
        localStorage.removeItem("token");
        localStorage.removeItem("userDetails");
        navigate("/");
        toast('Logout successfully!: ', "success");
      }
    }
  };

  const drawer = (
    <div className="text-center">
      <div className="py-2 bg-primary d-flex justify-content-between align-items-center">
        <img src={img} alt="Logo" width={50} className="ms-2" onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <i className="bi bi-x text-white me-2" style={{ fontSize: "2rem", cursor: "pointer" }} onClick={handleDrawerToggle} />
      </div>
      <hr />
      <ul className="list-unstyled">
        <li className="p-2 bg-info text-center" style={{ borderBottom: "1px solid white" }}>
          <button className="btn btn-link text-white text-decoration-none" onClick={() => navigate("/")}>
            Home
          </button>
        </li>
        <li className="p-2 bg-info text-center" style={{ borderBottom: "1px solid white" }}>
          <button className="btn btn-link text-white text-decoration-none" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="d-flex">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary w-100">
        <div className="container-fluid flex-nowrap">
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleDrawerToggle}
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-brand d-none d-sm-block">
            <img src={img} alt="Logo" width={70} onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
          </div>
          <div className="d-flex w-100 justify-content-between align-items-center d-sm-none">
            <div className="navbar-brand">
              <img src={img} alt="Logo" width={70} onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
            </div>
              <strong className="text-white">Welcome {loginUser?.username}</strong>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto d-none d-sm-block">
              <strong className="text-white">Welcome {loginUser?.username}</strong>
              <button className="btn btn-outline-light ms-2" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <nav>
        <div
          className={`offcanvas offcanvas-start ${mobileOpen ? "show" : ""}`}
          style={{ visibility: mobileOpen ? "visible" : "hidden" }}
          tabIndex="-1"
        >
          <div className="offcanvas-body">
            {drawer}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HeaderComponent;
