import { Provider } from 'react-redux';
import store from '../store';
import GlobalActions from '@/components/GlobalActions';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
