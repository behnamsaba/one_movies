//HIGHER ORDER COMPONENT FOR CLIENT SIDE, IF USER NOT LOGGED IN REDIRECT TO LOGIN PAGE
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = (Component) => {
  return function AuthComponent(props) {
    const { user: username, hydrated } = useSelector((data) => data.internalDataSlice);
    const router = useRouter();

    useEffect(() => {
      if (hydrated && !username) {
        router.push('/login');
      }
    }, [hydrated, username, router]);

    if (!hydrated) return null;
    return <Component {...props} />;
  };
}

export default Auth
