
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const { user} = useAuth();


  if ( user) return children;

  return <Navigate to="/log-in" state={location?.pathname} replace />;
};

export default PrivateRoute;