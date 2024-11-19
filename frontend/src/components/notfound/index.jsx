import React from 'react';
import errorimg from '../../assets/errorimg.svg';
import { Link as RouterLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <img
              src={errorimg}
              alt="Page Not Found"
              style={{ maxWidth: '100%', height: 'auto', width: '400px' }}
            />
            <h3 className="fw-bold my-3">Opps!!!</h3>
            <h5 className="fw-bold my-3">
              The page you are looking for could not be found.
            </h5>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">
                Go Back to Home
              </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
