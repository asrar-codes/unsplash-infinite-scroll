const Form = ({ handleSearch, searchRef }) => {
  return (
    <form className="flex justify-center p-4">
      <div className="form-control">
        <label
          htmlFor="search"
          className=" capitalize mx-2  text-purple-600 text-2xl"
        >
          search images
        </label>
        <input
          type="text"
          name="search"
          id="search"
          className=" text-xl outline-none  p-1 rounded-md border-2 border-fuchsia-200"
          ref={searchRef}
          placeholder="night sky"
        />
        <button
          className="p-1 mx-3 from-neutral-700 text-lg capitalize border-2 rounded-lg bg-purple-300"
          type="submit"
          onClick={handleSearch}
        >
          search
        </button>
        <hr className="my-6 p-2" />
      </div>
    </form>
  );
};

export default Form;
