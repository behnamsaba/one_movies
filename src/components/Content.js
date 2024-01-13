const Content = ({ title, items, Component }) => {
    if (!items || !Array.isArray(items)) {
      //handle error on vercel on deployment
      return null;
    }
  
    return (
      <section className='px-5 py-10'>
        <h1 className='text-3xl font-bold underline text-center py-3 mb-8'>{title}</h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-6 m-2'>
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
  
// designed to display a list of items within a grid layout (for make our responsive too all screens), it accepts 3 props
//title and items came from TMDB API and component can be movie or series
//The main use-case for this component is to create a uniform and responsive presentation of lists in a grid format with a specified title.