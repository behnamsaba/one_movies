const Content = ({ title, items, Component }) => {
    return (
        <section className='px-5 py-10'>
            <h1 className='text-3xl font-bold underline text-center py-3 mb-8'>{title}</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {items.map((item) => (
                    <Component
                        key={item.id}
                        {...item}
                    />
                ))}
            </div>
        </section>
    );
};

export default Content;
