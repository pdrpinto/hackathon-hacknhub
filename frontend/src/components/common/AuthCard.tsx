import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import './AuthCard.css';

interface AuthCardProps {
  children: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={cardRef} className="auth-wrapper">
      {children}
      
      {/* Corner lines decorativas */}
      <svg className="auth-corner-lines" width="100%" height="80" style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <line x1="20" y1="60" x2="100" y2="60" stroke="rgba(248, 213, 72, 0.3)" strokeWidth="1" />
        <line x1="30" y1="70" x2="90" y2="70" stroke="rgba(248, 213, 72, 0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
};

export default AuthCard;
