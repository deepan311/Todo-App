import React from "react";
import Main from "./Component/Main";
import bg from "./Assets/bg.svg";
function App() {
  return (
    <>
      <div
        className="w-full h-screen bg-slate-50 relative"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/547115/pexels-photo-547115.jpeg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full bg-black/50 absolute z-0 top-0">
          <Main />
        </div>
      </div>
    </>
  );
}

export default App;
