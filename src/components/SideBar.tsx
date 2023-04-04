import { AiFillHome } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import React, { useState } from "react";
import { PRIMARY_COLOR } from "../configs/colors";
import CourseIcon from './CourseIcon'


function SideBar() {

  const [touched, setTouched] = useState(false);
  const className = touched ? { touchedButton } : { dynamicButton };

  const toggleTouched = () => {
    setTouched((prevState) => !prevState.touched);
    className = { touchedButton };
  };

  const handleMouseUp = () => {
    // Handle smooth animation when clicking without holding
    setTimeout(() => {
      setTouched(false);
      className = { dynamicButton };
    }, 150);
  };
  const homeClick = () => {
    setShowHome(true);
    return (
      <div className="App" style={{ backgroundColor: "blue", display: "flex" }}>
        {/* {showCreateEvent ? (
          <CreateEventScreen toggleCreateEvent={toggleCreateEvent} />
        ) : (
          <>
            {" "}
            <CreateButton handleClick={toggleCreateEvent} />{" "}
          </>
        )} */}
        <SideBar rsoData={rsoData} />
        {showHome ? <Home/> : <OneRSO currCard={currCard} setCard={setCard} />}
      </div>
    );
  };

  return (
    <div style={sidebarStyle}>
      <button style={homeButton} onClick={homeClick}>
        <AiFillHome style={iconStyle} />
      </button>

      {/* <button
        onClick = {homeClick}
        style = {className}
        onMouseDown={toggleTouched}
        onMouseUp={handleMouseUp}
        >
        <AiFillHome style = {iconStyle}/>     
      </button> */}

      <hr
        style={{
          background: "white",
          color: "white",
          borderColor: "white",
          height: "3px",
          width: "10vw",
          transparency: "0",
        }}
      />
      {rsoData.map((rso) => (
        <div style={{ marginBottom: "10px" }}>
          <CourseIcon img={rso.img} handleClick={props.showRSO} />
        </div>
      ))}
      {/* <RSOIcon img = {msa}/> */}
      <AiFillBell style={bellStyle}></AiFillBell>
    </div>
  );
};

const sidebarStyle = {
  display: "flex",
  height: "100vh",
  width: "15vw",
  background: PRIMARY_COLOR,
  flexDirection: "column",
  alignItems: "center",
};

const iconStyle = {
  height: "4vh",
  width: "11vw",
  color: "white",
};

const bellStyle = {
  height: "4vh",
  width: "11vw",
  color: "white",
  flex: 1,
  flexDirection: "column",
  justifyContent: "bottom",
  marginBottom: "-50vh",
};

const homeButton = {
  marginTop: "1vh",
  height: "6vh",
  width: "15vw",
  color: "white",
  backgroundColor: PRIMARY_COLOR,
  borderColor: "transparent",
};

const dynamicButton = {
  height: "6vh",
  width: "15vw",
  marginTop: "100vh",
  borderColor: "transparent",
  background: PRIMARY_COLOR,
  cursor: "pointer",
  color: "white",
  iconColor: "white",

  opacity: "1",
  transition: "opacity 300ms ease",
};

const touchedButton = {
  marginTop: "100vh",
  background: PRIMARY_COLOR,
  cursor: "pointer",
  height: "6vh",
  width: "15vw",
  color: "white",

  opacity: "0.5",
};

export default SideBar