import React from 'react';
import { useNavigate } from 'react-router-dom';

const Django = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/admin');
  }, [navigate]);

  return null;
};

export default Django;
