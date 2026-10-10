import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

export default function Welcome() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(3);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (data && data.total_users) {
          setTotalUsers(data.total_users);
        }
      })
      .catch(() => {});
  }, []);

  const handleLaunchDashboard = () => {
    const user = localStorage.getItem('fm_current');
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleNavigateTab = (tab) => {
    sessionStorage.setItem('fm_initial_tab', tab);
    const user = localStorage.getItem('fm_current');
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <LandingPage
      totalUsers={totalUsers}
      onLaunchDashboard={handleLaunchDashboard}
      onNavigateTab={handleNavigateTab}
    />
  );
}
