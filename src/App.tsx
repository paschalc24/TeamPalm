import { useState } from "react";
import reactLogo from "./assets/react.svg";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Grid from "./components/Grid";

//import './App.css'

function App() {
  return (
    <div>
      <NavBar />
      <body>
        <Grid />
      </body>
    </div>
  );
}

export default App;
