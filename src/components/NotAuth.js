//HIGHER ORDER COMPONENT IF USER LOGGED IN NOT ACCESS TO LOGIN AND REGISTER
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotAuth = (Component) => {
    return function AuthComponent(props) {
        const username = useSelector((data) => data.internalDataSlice.user);
        const router = useRouter();

        useEffect(() => {
            if (username) {
                router.push('/user/profile');
            }
        }, [username, router]);

        return <Component {...props} />;
    };
};

export default NotAuth;
