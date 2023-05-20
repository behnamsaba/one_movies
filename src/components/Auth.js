//HIGHER ORDER COMPONENT FOR CLIENT SIDE, IF USER NOT LOGGED IN REDIRECT TO LOGIN PAGE
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Auth = (Component) => {
  return function AuthComponent(props) {
    const username = useSelector((data) => data.internalDataSlice.user);
    const router = useRouter();

    useEffect(() => {
      if (!username) {
        router.push('/login');
      }
    }, [username, router]);

    return <Component {...props} />;
  };
}

export default Auth