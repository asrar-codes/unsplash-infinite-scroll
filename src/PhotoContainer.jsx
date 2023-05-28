import { useState, useEffect } from "react";
import Photo from "./Photo";

const PhotoContainer = ({ setPage, loading, images }) => {
  const [fetchingImages, setIsFetchingImages] = useState(false);

  const imagesArr = Array.from(images.values());
  // console.log(imagesArr);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setIsFetchingImages(true);
      return;
    }
    setIsFetchingImages(false);
    return;
  };
  useEffect(() => {
    if (!fetchingImages) return;
    if (loading) return;
    setPage((page) => page + 1);
  }, [fetchingImages]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="photo">
      {imagesArr.map((item) => {
        return <Photo key={item.id} {...item} />;
      })}
    </section>
  );
};

export default PhotoContainer;
