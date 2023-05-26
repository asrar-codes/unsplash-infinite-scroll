import { useState, useEffect } from "react";
import Photo from "./Photo";
import PhotoContainer from "./PhotoContainer";
function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setIsError] = useState(false);

  const [page, setPage] = useState(1);
  const url = ` https://api.unsplash.com/photos/?client_id=${
    import.meta.env.VITE_API_KEY
  }`;

  const fetchData = async (pageNo) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}&page=${pageNo}`);
      const data = await response.json();
      const newImages = [...images.values(), ...data];
      setImages(new Map(newImages.map((item) => [item.id, item])));
      // console.log(newImages);
      setLoading(false);
      setIsError(false);
      // console.log(images);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData(page);
    console.log(images);
  }, [page]);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  if (loading) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </section>
    );
  }
  if (error) {
    return <h2>There was an error...</h2>;
  }

  return (
    <main>
      <h4>unsplash api infinite scroll</h4>
      <PhotoContainer page={page} setPage={setPage} images={images} />
    </main>
  );
}

export default App;
