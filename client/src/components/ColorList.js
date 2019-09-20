import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth.js";
import { CombineLatestOperator } from "rxjs/internal/observable/combineLatest";

//this sets the initial color or the firt color in colors to edit to a blank color
//this is the same as writing: const [colorToEdit, setColorToEdit] = useState({color: "", code: {hex: ""}});
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {

  console.log("colors in color list", colors);

  const [editing, setEditing] = useState(false);
  

  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState( initialColor );

  
  const editColor = color => {
    
    setEditing(true);
    setColorToEdit(color);   
    
  };

  const addColor = color => {    
   
    setColorToAdd(color);   
    
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log("updated colors list", res.data)  

      updateColors(colors.map(color => (
        color.id === colorToEdit.id ? colorToEdit : color
      )));

      
    })
    .catch(err => {
      console.log(err)

    }); 


  };

  const saveAdd = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    
    axiosWithAuth().post("http://localhost:5000/api/colors/", colorToAdd)
    .then(res => {
      console.log("added colors list", res.data)  
      updateColors(res.data);
      setColorToAdd(initialColor);
           
    })
    .catch(err => {
      console.log(err)

    }); 


  };

  const deleteColor = (color) => {

    //The event.stopPropagation() method stops the bubbling of an event to parent elements, preventing any 
    //parent event handlers from being executed.
    

    // make a delete request to delete this color
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {

      console.log ("deleted color", res)
      updateColors(colors.filter (colorIn => {

        return colorIn.id !== color.id
      
      }))
      
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                X
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/*<div className="spacer" />*/}
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;