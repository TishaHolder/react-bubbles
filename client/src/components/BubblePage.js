import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth.js";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";




const BubblePage = (props) => {

  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property


  //THE AXIOS CALL IN THIS useEffect populates the empty array here: const [colorList, setColorList] = useState([]);
  useEffect( () => {

    {/*GOT THIS ERROR: TypeError: _axiosWithAuth_js__WEBPACK_IMPORTED_MODULE_3__.axiosWithAuth.get is not a function
    FIXED IT BY ADDING PARENTHESES AFTER axiosWithAuth(). Before I had axiosWwithAuth.get */}

    axiosWithAuth().get("http://localhost:5000/api/colors")
    .then(res => {
      console.log("get color data", res.data);
      setColorList(res.data);
    })
    .catch(err => {
      console.log(err.response);
    })

  }, []);   

  
  return (
    <>
      
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;