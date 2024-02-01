import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import parse from "html-react-parser";

const DisplayItem = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [data, setdata] = useState({});
  const [isBook, setBook] = useState(false);
  const [YesBook , setYesBook] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setBook(false)
    setYesBook(true)
  };
  const getShow = async () => {
    try {
      await axios.get(`https://api.tvmaze.com/shows/${id.id}`).then((res) => {
        if (res.data) {
          setdata(res.data);
          console.log(res.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getShow();
  }, []);
  return (
    <>
      <div className="flex justify-around md:justify-around items-center  w-[100%] text-white bg-red-500 p-4 ">
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <h1 className="text-xl md:text-3xl  cursor-pointer">FlickSeats</h1>
        </div>
      </div>

      {data && data.image && (
        <>
          <div className="p-6">
            <div className="flex md:flex-row flex-col gap-4 ">
              <div className="flex-[0.3]">
                <img src={data.image.medium} className="w-[70%]" />
              </div>
              <div className="flex flex-col gap-3 flex-[0.7]">
                <div>
                  <h1 className="text-3xl font-bold">{data.name}</h1>
                </div>
                <div>
                  <p className="text-lg">{parse(data.summary)}</p>
                </div>
                <div className="text-xl flex justify-between">
                  <div>Language - {data.language}</div>
                  <div>
                    {data.network.country.name} {data.network.country.code}
                  </div>
                </div>
                <div className="flex text-xl gap-2  text-[#EE9322]">
                  Rating -
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  <h1> {data.rating.average}</h1>
                </div>
                <div className="text-xl">
                  Runtime - {data.averageRuntime} min
                </div>
                <div className="text-xl pt-6">
                  <button
                    onClick={() => {
                      setBook(true);
                    }}
                    className="inline-flex items-center px-5 py-4 text-lg font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Book Show
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              isBook ? "fixed" : "hidden"
            } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
          >
            <div
              className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
            >
              <div
                onClick={() => {
                  setBook(false);
                }}
                className="ml-[200px] md:ml-[400px] cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center text-center pb-[10px]">
                <h1 className="m-0 font-bold md:text-2xl">{data.name}</h1>
                <div className="flex justify-center pt-3">
                <div className="flex text-lg gap-2  text-[#EE9322]">
                    Rating -
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    <h1> {data.rating.average}</h1>
                  </div>
                </div>
                  
              </div>
              <div className="container mx-auto mt-8">
                <form
                  onSubmit={handleSubmit}
                  className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md"
                >
                  <h2 className="text-xl  mb-4">
                    Contact Information
                  </h2>
                  <div className="mb-4">
                    <div className="flex justify-start">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Name
                      </label>
                    </div>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-start">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Phone Number
                      </label>
                    </div>

                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4 ">
                    <div className="flex justify-start">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-600"
                      >
                        Email
                      </label>
                    </div>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 p-2 w-full border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-5 py-4 text-lg font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>


          <div
          className={`${
            YesBook ? "fixed" : "hidden"
          } top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center`}
        >
          <div
            className={`relative flex flex-col gap-2 justify-center text-center bg-white rounded-[8px] w-[250px] md:w-[450px] p-4 `}
          >
            
            <div className="pb-[10px]">
              <h1 className="m-0 font-bold md:text-2xl">
               Thanks {formData.name} for booking the show !
              </h1>

              <h1 className="m-0  md:text-lg">
               your tickets will be sent on <span className="font-bold">{formData.email}</span> and <span className="font-bold">{formData.phoneNumber}</span>
              </h1>
            </div>
            <div>
              <button
              onClick={()=>{
                navigate('/')
              }}
                className="inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
};

export default DisplayItem;
