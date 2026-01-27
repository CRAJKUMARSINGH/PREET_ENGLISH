import { useAuth } from './use-auth';
export function useUser() {
    var user = useAuth().user;
    return {
        user: user,
        loading: false, // Since useAuth doesn't expose loading, we'll set it to false
    };
}
