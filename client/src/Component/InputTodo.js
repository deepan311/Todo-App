import React, { useState } from "react";

function InputTodo(props) {
  const { input, setinput, err, seterr, createlist, updateinp } = props;

  return (
    <div className="bg-slate-50 w-full p-2 h-[50vh] px-10 py-10 text-center shadow-lg rounded-sm text-white">
      <h3 className="text-slate-600 text-3xl my-2 mb-5 font-semibold ">
        Input Task
      </h3>

      <form action="" onSubmit={createlist}>
        <input
          name="listName"
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
            seterr("");
          }}
          placeholder="Add Task"
          type="text"
          className="border bg-gray-200 text-black px-3 w-full h-10 outline-none rounded-sm"
        />
        <h3 className="text-red-700 mt-5 font-">{err}</h3>
        <button
          type="submit"
          className="w-full  bg-gray-800 p-2 my-4 rounded-md outline-none"
        >
          {updateinp.status ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
}

export default InputTodo;
