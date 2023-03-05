import React, { useEffect, useState } from "react";
import DataTodo from "./DataTodo";
import InputTodo from "./InputTodo";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import { TiTickOutline } from "react-icons/ti";

function Main() {
  const [todolist, settodolist] = useState([]);
  const [errmsg, seterrmsg] = useState("");
  const [sucmsg, setsucmsg] = useState({ status: false, msg: "" });
  const [fetchload, setfetchload] = useState(false);
  const [updateinp, setupdateinp] = useState({ status: false, id: "" });

  const [input, setinput] = useState("");

  const fetchAlldata = async () => {
    setfetchload(true);

    const apidata = await axios.get("http://localhost:9000/");
    settodolist(apidata.data.data);
    setfetchload(false);
  };

  useEffect(() => {
    fetchAlldata();
  }, []);

  const updatedata = async (updata) => {
    if (updata.length == 0) return seterrmsg("Field is Emty");

    let temdata = await axios.put(
      `http://localhost:9000/update/${updateinp.id}`,
      {
        listName: updata,
      }
    );
    setsucmsg({ status: true, msg: temdata.data.msg})
    settodolist(
      todolist.map((res) => {
        if (res._id == updateinp.id) {
          res.listName = updata;
          return res;
        } else {
          return res;
        }
      })
    );

    setupdateinp({ status: false, id: "" });
    setinput("");
  };

  const createlist = async (e) => {
    e.preventDefault();
    const data = e.target.listName.value;

    if (updateinp.status) return updatedata(data);

    if (data.length == 0) return seterrmsg("Field is Emty");
    setfetchload(true);

    const apival = await axios.post("http://localhost:9000/create", {
      listName: data,
      readed: false,
    });
    setfetchload(false);
    settodolist([...todolist, apival.data.result]);
    setinput("");
    setsucmsg({ status: true, msg: apival.data.msg });
  };

  if (sucmsg.status) {
    setTimeout(() => {
      setsucmsg({ status: false, msg: "" });
    }, 3000);
  }

  return (
    <>
      {sucmsg.status && (
        <div className="absolute top-0  w-full   z-20">
          <h3 className="bg-green-700 rounded p-2 text-white w-auto flex">
            {sucmsg.msg}
            <TiTickOutline className="text-white mt-1" color="white" />
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 container relative">
        <div
          className="w-5/6 lg:w-2/3 h-[50vh] mx-auto  m-20 "
          style={{ boxShadow: "0px 0px 11px 2px rgba(0,0,0,0.75)" }}
        >
          <InputTodo
            input={input}
            setinput={setinput}
            createlist={createlist}
            err={errmsg}
            seterr={seterrmsg}
            updateinp={updateinp}
          />
        </div>

        <div
          className="w-5/6 lg:w-2/3 rounded h-[70vh] mx-auto m-20 bg-slate-50 px-7 py-10 text-center"
          style={{ boxShadow: "0px 0px 11px 2px rgba(0,0,0,0.75)" }}
        >
          <h3 className="text-slate-700 text-3xl mb-3 font-semibold">
            My Tasks
          </h3>
          <div className=" grid place-items-center">
            {fetchload ? (
              <BiLoaderAlt className="text-2xl animate-spin " />
            ) : (
              <DataTodo
                data={todolist}
                setdata={settodolist}
                setsucmsg={setsucmsg}
                sucmsg={sucmsg}
                setupdateinp={setupdateinp}
                setinput={setinput}
              />
            )}
          </div>
          {/* {console.log(todolist)} */}
        </div>
      </div>
    </>
  );
}

export default Main;
