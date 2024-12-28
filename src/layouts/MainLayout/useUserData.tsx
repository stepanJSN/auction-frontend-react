import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../../services/authService';
import { signinSuccess } from '../../features/auth/authSlice';
import { Role } from '../../enums/role.enum';
import { getUser } from '../../features/users/userSlice';

export default function useUserData() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = authService.getUserId();
    const userRole = authService.getUserRole() as Role;
    if (userId && userRole) {
      dispatch(signinSuccess({ id: userId, role: userRole }));
      dispatch(getUser(userId));
    }
  }, [dispatch]);
}
