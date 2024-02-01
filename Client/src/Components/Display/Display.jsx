import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
// import Loader from "../Loader/Loader";

const Display = () => {
  const [load, setload] = useState(false);
  const [data, setdata] = useState([]);
  const [mainQuery, SetmainQuery] = useState("all");
  const MakeYear = (date) => {
    const data = new Date(date);
    const currentDate = new Date();
    return currentDate.getFullYear() - data.getFullYear();
  };

  const [PageCount, SetPageCount] = useState(0);
  const [ActivePage, SetActivePage] = useState(0);

  const Getdata = async () => {
    setload(true);
    try {
      await axios
        .get("https://api.tvmaze.com/shows", {
          params: {
            page: ActivePage,
          },
        })
        .then((res) => {
          console.log(res.data);
          setdata(res.data.splice(0, 20));
          setload(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    Getdata();
  }, [ActivePage]);

  const PageChanged = ({ selected }) => {
    SetActivePage(parseInt(selected) + 1);
  };

  const handleChange = (e) => {
    SetmainQuery(e.target.value);
  };
  const GetQuerydata = async () => {
    setload(true);
    try {
      await axios
        .get("https://api.tvmaze.com/search/shows", {
          params: {
            q: mainQuery,
          },
        })
        .then((res) => {
          console.log(
            res.data.map((main) => {
              return main.show;
            })
          );
          setdata(
            res.data.map((main) => {
              return main.show;
            })
          );
          setload(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const SearchFunc = () => {
    GetQuerydata();
  };

  return (
    <>
      {/* {load && <Loader/>} */}
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
        <div className="flex gap-1 px-1 w-[50%] text-sm justify-center md:hidden">
          <div className="md:hidden flex  justify-center rounded-2xl bg-white ">
            <input
              type="text"
              className="text-black text-xl rounded-2xl w-[35vw] outline-none  font-semibold p-3"
              placeholder="search"
            />
            <div className="text-center flex justify-center items-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="hidden md:flex p-2 justify-center rounded-2xl bg-white ">
          <input
            onChange={handleChange}
            type="text"
            className="text-black text-xl rounded-2xl w-[65vw] outline-none  font-semibold p-3"
            placeholder="Search Anything here ..."
          />
          <div
            onClick={SearchFunc}
            className="text-center flex justify-center rounded-full border cursor-pointer hover:bg-red-500 hover:text-white text-red-500 border-red-500 items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

      </div>
      <div className="p-2  md:p-5 flex flex-col md:grid grid-cols-5 gap-4">
        {data &&
          data.map((main) => {
            return (
              <>
                <div className="block rounded-lg bg-[#030637] w-[170.25px] dark:bg-neutral-700 shadow-lg">
                  <a href="">
                    <img
                      className="rounded-t-lg"
                      src={main.image.medium}
                      alt=""
                    />
                  </a>
                  <div className="p-6">
                    <Link to={`/shows/${main.id}`}>
                    <h5 className="mb-2 text-lg text-white font-medium leading-tight hover:underline cursor-pointer dark:text-neutral-50">
                      {main.name}
                    </h5>
                    </Link>
                    
                  </div>
                  <div className="flex gap-2 justify-center p-4 text-[#EE9322]">
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
                    <h1>{main.rating.average}</h1>
                  </div>
                </div>
              </>
            );
          })}
      </div>
      <div className="pb-5">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={20}
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          onPageChange={PageChanged}
          pageLinkClassName="p-[5px]   md:p-2 border-[1.9px] border-red-500 rounded-xl text-red-500 hover:text-white hover:bg-red-500"
          containerClassName="flex justify-center gap-2 md:text-lg text-red-500 text-sm"
          previousLinkClassName="p-[4px] md:p-2 border-red-500 border-[1.9px] rounded-xl text-red-500 hover:bg-red-500 hover:text-white"
          nextLinkClassName="p-[4px] md:p-2 border-red-500 border-[1.9px] rounded-xl text-red-500 hover:bg-red-500 hover:text-white"
          activeClassName="text-white"
        />
      </div>
    </>
  );
};

export default Display;
