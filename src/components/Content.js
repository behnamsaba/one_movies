const Content = ({ title, items, Component }) => {
    return (
        <>
            <h1 className='text-3xl font-bold underline text-center py-3'>{title}</h1>
            <div className='cards'>
                {items.map((item) => (
                    <Component
                        key={item.id}
                        {...item}
                    />
                ))}
            </div>
        </>
    );
};

export default Content;
