import React from 'react';
import { useNavigate } from 'react-router-dom';

const Django = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(`https://recurring-manager-app.herokuapp.com${window.location.pathname}`);
  }, [navigate]);

  return null;
};

export default Django;
