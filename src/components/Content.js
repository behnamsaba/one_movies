const Content = ({ title, items, Component }) => {
    return (
        <>
            <h1>{title}</h1>
            {items.map((item) => (
                <Component
                    key={item.id}
                    {...item}
                />
            ))}
        </>
    );
};

export default Content;
