import { useState, useEffect, useRef } from "react";
import PhotoContainer from "./PhotoContainer";
import Form from "./Form";
function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setIsError] = useState(false);
  const searchRef = useRef(null);
  const [searchStr, setSearchStr] = useState("");

  const [page, setPage] = useState(1);
  let url;

  if (searchStr) {
    url = ` https://api.unsplash.com/search/photos/?client_id=${
      import.meta.env.VITE_API_KEY
    }&page=${page}&query=${searchStr}`;
  } else {
    url = ` https://api.unsplash.com/photos/?client_id=${
      import.meta.env.VITE_API_KEY
    }&page=${page}`;
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}`);
      const data = await response.json();
      // console.log(data);

      setImages((oldImages) => {
        if (searchStr && page === 1) {
          return new Map(data.results.map((item) => [item.id, item]));
        } else if (searchStr) {
          const newImages = [...images.values(), ...data.results];
          return new Map(newImages.map((item) => [item.id, item]));
        }
        const newImages = [...images.values(), ...data];
        return new Map(newImages.map((item) => [item.id, item]));
      });

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchRef.current.value) return;
    setPage(1);
    setSearchStr(searchRef.current.value);
  };

  useEffect(() => {
    fetchData();
  }, [page, searchStr]);

  return (
    <main>
      <h2 className="text-3xl capitalize text-center bg-fuchsia-300 p-6 font-semibold font-mono">
        unsplash api infinite scroll
      </h2>
      <Form handleSearch={handleSearch} searchRef={searchRef} />
      <PhotoContainer setPage={setPage} loading={loading} images={images} />
      {error && <h2>There was an error...</h2>}
      {loading && (
        <h1 className="text-center text-2xl font-semibold">Loading...</h1>
      )}
    </main>
  );
}

export default App;
