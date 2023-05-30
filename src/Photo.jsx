const Photo = ({ urls: { full }, user: { name }, alt_description, likes }) => {
  // console.log(full);
  // console.log(name);
  // console.log(alt_description);
  // console.log(likes);

  return (
    <section className="w-11/12  mx-auto  p-8 -my-4 relative ">
      <img
        src={full}
        alt={alt_description}
        className="img object-cover w-full max-h-screen block"
      />
      <div className="image-desc absolute top-full left-14 bg-black bg-opacity-10 -my-28 text-white rounded-lg ">
        <p>Image by: {name}</p>
        <p> {likes} Likes </p>
      </div>
    </section>
  );
};

export default Photo;
