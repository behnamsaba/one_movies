const Content = ({ title, items, Component }) => {
    return (
        <>
            <h1 className="text-3xl font-bold underline">{title}</h1>
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
