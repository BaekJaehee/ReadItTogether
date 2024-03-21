import { useAuth } from './AuthContext';
import { useLocation, Navigate } from 'react-router-dom';

function useRequireAuth(redirectUrl = '/login') {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // 로그인하지 않은 상태에서 접근 시도 시, 로그인 페이지로 리다이렉트
    return <Navigate to={redirectUrl} state={{ from: location }} replace />;
  }

  return user;
}
