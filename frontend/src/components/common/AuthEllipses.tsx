import React from 'react';
import './AuthEllipses.css';

const AuthEllipses: React.FC = () => {
  return (
    <div className="auth-ellipses">
      {/* Elipses azuis */}
      <div className="ellipse blue-1"></div>
      <div className="ellipse blue-2"></div>
      <div className="ellipse blue-3"></div>
      <div className="ellipse blue-4"></div>
      
      {/* Elipses amarelas */}
      <div className="ellipse yellow-1"></div>
      <div className="ellipse yellow-2"></div>
      <div className="ellipse yellow-3"></div>
      <div className="ellipse yellow-4"></div>
    </div>
  );
};

export default AuthEllipses;
