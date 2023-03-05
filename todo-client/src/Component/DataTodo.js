import axios from "axios";
import React from "react";
import { FaDotCircle, FaEdit } from "react-icons/fa";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { IoIosListBox } from "react-icons/io";
import { GrCompliance } from "react-icons/gr";

function DataTodo(props) {
  const { data, setsucmsg, sucmsg, setdata, setupdateinp, setinput } = props;

  const deleteData = async (id) => {
    const temdata = await axios.delete(
      `http://localhost:9000/deleteData/${id}`
    );

    temdata.data.status && setsucmsg({ status: true, msg: temdata.data.msg });

    setdata(data.filter((res) => res._id !== id));
  };

  const readedEnable = async (id, current_state) => {
    let updata = await axios.put(`http://localhost:9000/update/${id}`, {
      readed: !current_state,
    });

    console.log(updata.data.result)
    // setdata(data.map(res=>res._id==id ? updata.data.result : res))

    // updata.data.status && setsucmsg({ status: true, msg: updata.data.msg });

    setdata(
      data.map((res) => {
        if (res._id == id) {
          res.readed = !current_state;
          return res;
        } else {
          return res;
        }
      })
    );
  };

  return (
    <div className="w-full p-2 overflow-auto h-[50vh] mt-3 text-center rounded-sm text-white ">
      {data.length == 0 ? (
        <div className="w-full h-full grid place-items-center ">
          <IoIosListBox className="text-slate-800 text-7xl" />
          <h4 className="text-slate-800 font-semibold">List is Empty</h4>
        </div>
      ) : (
        data
          .slice()
          .reverse()
          .map((res) => {
            return (
              <div
                key={res._id}
                className="flex w-full justify-between text-slate-800 border-y py-2"
              >
                <div className="flex align-baseline">
                  <FaDotCircle className="my-1 mx-2" />
                  <h2 className={`mx-2 ${res.readed && "line-through"}`}>
                    {res.listName }
                  </h2>
                  {res.readed&& <h5 className='italic text-sm text-black/50'>--completed</h5>}
                </div>

                <div className="flex">
                  <button
                    onClick={() => {
                      readedEnable(res._id, res.readed);
                    }}
                  >
                    <GrCompliance className="mx-2" />
                  </button>
                  <button
                    onClick={() => {
                      setupdateinp({ status: true, id: res._id });
                      setinput(res.listName);
                    }}
                  >
                    <FaEdit className="mx-2" />
                  </button>
                  <button
                    onClick={() => {
                      deleteData(res._id);
                    }}
                  >
                    <RiDeleteBin4Fill className="mx-2" />
                  </button>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
}

export default DataTodo;
