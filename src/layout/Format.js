import GlobalActions from '@/components/GlobalActions';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
const Format = ({ children }) => {
    return (
        <>
            <Head>
                <title>One Movies</title>
            </Head>
            <GlobalActions />
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Format;
