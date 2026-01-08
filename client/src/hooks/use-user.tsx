import { useAuth } from './use-auth';

export function useUser() {
  const { user } = useAuth();
  
  return {
    user,
    loading: false, // Since useAuth doesn't expose loading, we'll set it to false
  };
}