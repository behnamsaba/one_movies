import Auth from '@/components/Auth';
import { useSelector } from 'react-redux';
import MediaList from '@/components/MediaList';
import Content from '@/components/Content';

const WatchList = () => {
    const proileData = useSelector((data) => data.internalDataSlice.user);
    console.log('kkkkk', proileData);
    return (
        <div>
            <Content
                title='WATCH LIST'
                items={proileData.watchlist}
                Component={MediaList}
            />
        </div>
    );
};
export default Auth(WatchList);
