import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from './pages/components/Header';
import PageRoutes from './Routes';

function App() {

  return (
    <div>
      <ToastContainer></ToastContainer>
      <PageRoutes />
    </div>
  );
}

export default App;
