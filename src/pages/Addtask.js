import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Addtask() {
  let id;
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState({});
  const navigate = useNavigate();
  const [disc, setDisc] = useState("");
  const [allFavourite, setAllfavourite] = useState(
    JSON.parse(localStorage.getItem("favourite")) || []
  );

  const handleClick = () => {
    selectedValue.package.name;
    setAllfavourite([
      ...allFavourite,
      {
        id: allFavourite.length + 1,
        name: selectedValue.package.name,
        discription: disc
      }
    ]);

    localStorage.setItem(
      "favourite",
      JSON.stringify([
        ...allFavourite,
        {
          id: allFavourite.length + 1,
          name: selectedValue.package.name,
          discription: disc
        }
      ])
    );

    navigate("/list");
  };

  const handlediscChange = (e) => {
    setDisc(e.target.value);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    clearTimeout(id);
    id = setTimeout(() => {
      fetch(`https://api.npms.io/v2/search?q=${value}`)
        .then((res) => res.json())
        .then((res) => setData(res.results));
    }, 1000);
  };
  const handleChangeRadio = (item) => {
    setSelectedValue(item);
  };
  const containerStyle = {
    width: "50rem",
    height: "30vh",
    margin: "auto",
    padding: "30px 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  };
  return (
    <div style={containerStyle}>
      <h1 style={{ color: "blue", width: "80%", margin: "auto" }}>
        Choose your npm package
      </h1>
      <button
        style={{
          color: "white",
          backgroundColor: "black",
          padding: "1rem 50px",
          cursor: "pointer",
          border: "none",
          borderRadius: "10px",
          marginBottom: "2rem",
          marginLeft: "15rem",
          marginTop: "2rem"
        }}
        onClick={() => navigate("/list")}
      >
        See Details
      </button>
      <br />

      <input
        style={{
          width: "15rem",
          marginLeft: "11rem",
          height: "3rem",
          paddingLeft: "1rem",
          outline: "none",
          borderRadius: "1rem"
        }}
        type="text"
        placeholder="Enter Npm package"
        onChange={handleChange}
      />
      <div
        style={{
          border: "1px solid black",
          marginTop: "16rem",
          maxHeight: "27.8rem",
          overflowY: "auto",
          position: "absolute",
          left: "2rem",
          width: "25rem",
          borderRadius: "20px"
        }}
      >
        {data &&
          data.map((item, index) => {
            return (
              <div style={{ display: "flex" }} key={index}>
                <input
                  type="radio"
                  name="radio"
                  onChange={() => handleChangeRadio(item)}
                />
                <h1>{item.package.name}</h1>
              </div>
            );
          })}
      </div>
      {selectedValue?.package?.name && (
        <div style={{ position: "absolute", right: "34rem", bottom: "10rem" }}>
          <textarea
            placeholder="Enter Discription"
            name=""
            id=""
            cols="50"
            rows="10"
            onChange={handlediscChange}
          ></textarea>
          <br />
          <button
            style={{
              marginLeft: "9rem",
              marginTop: "20px",
              padding: "10px 40px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "20px"
            }}
            disabled={disc.length == 0}
            onClick={handleClick}
          >
            Submit description
          </button>
        </div>
      )}
    </div>
  );
}

export default Addtask;
