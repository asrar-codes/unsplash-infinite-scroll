import React, { useEffect, useRef } from "react";
import Photo from "./Photo";

const PhotoContainer = ({ setPage, images }) => {
  const imagesArr = Array.from(images.values());
  // console.log(imagesArr);
  const photoRef = useRef(null);
  const handleScroll = () => {
    // if (scrollY > photoRef.current.getBoundingClientRect().bottom + 100) {
    //   console.log(photoRef.current.getBoundingClientRect());
    //   photoRef.current.style.border = "2px solid red";
    // }
    // console.log(scrollY);

    if (window.innerHeight + window.screenY >= document.body.scrollHeight - 2) {
      setPage((page) => page + 1);
      return;
    }

    // console.log(window.innerHeight);
    // console.log(window.scrollY);
    // console.log(photoRef.current.getBoundingClientRect().bottom);

    console.log(document.body.offsetHeight);
  };
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <section className="photo" ref={photoRef}>
      {imagesArr.map((item) => {
        {
          /* console.log(item); */
        }
        return <Photo key={item.id} {...item} />;
      })}
    </section>
  );
};

export default PhotoContainer;
