//HIGHER ORDER COMPONENT IF USER LOGGED IN NOT ACCESS TO LOGIN AND REGISTER
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NotAuth = (Component) => {
    return function AuthComponent(props) {
        const { user: username, hydrated } = useSelector((data) => data.internalDataSlice);
        const router = useRouter();

        useEffect(() => {
            if (hydrated && username) {
                router.push('/user/profile');
            }
        }, [hydrated, username, router]);

        if (!hydrated) return null;
        return <Component {...props} />;
    };
};

export default NotAuth;
