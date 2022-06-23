import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from '../../components/Calendar';
import Navbar from '../../components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('usr_id');
  const userName = localStorage.getItem('usr_name');
  const userEmail = localStorage.getItem('usr_email');

  useEffect(() => {
    if (!userId || !userName || !userEmail) navigate('/signin');
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Calendar />
      </main>
    </div>
  );
};

export default Home;
