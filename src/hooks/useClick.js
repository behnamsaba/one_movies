import { useState } from 'react';

const useClick = () => {
    const [value, setValue] = useState(true);
    const toggle = () => {
        setValue((oldValue) => !oldValue);
    };

    return [value, toggle];
};

export default useClick;
