import { useState, useEffect } from "react";
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

  if (error) {
    return <h2>There was an error...</h2>;
  }

  return (
    <main>
      <h2 className="text-3xl capitalize text-center bg-fuchsia-300 p-6 font-semibold font-mono">
        unsplash api infinite scroll
      </h2>
      <PhotoContainer setPage={setPage} loading={loading} images={images} />
      {loading && (
        <h2 className="text-center text-lg font-semibold">Loading...</h2>
      )}
    </main>
  );
}

export default App;
