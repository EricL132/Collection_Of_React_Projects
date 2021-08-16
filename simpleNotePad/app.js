import { useState } from "react";
import "./app.css";

export default function SimpleNotePad() {
  const [text] = useState(getFromLocal());
  const [showColorBox, setShowColorBox] = useState(false);
  const [textColor] = useState(localStorage.getItem("simplepad_color"));
  function changeTextColor(e) {
    localStorage.setItem("simplepad_color", e.target.value);
    document.getElementsByClassName("text_area")[0].style.color =
      e.target.value;
    setShowColorBox(false);
  }
  function getFromLocal() {
    return localStorage.getItem("text");
  }
  function saveToLocal(e) {
    localStorage.setItem("text", e.target.value);
  }
  return (
    <div className="simple_note_pad">
      <textarea
        spellCheck={false}
        className="text_area"
        defaultValue={text}
        onChange={saveToLocal}
        style={{ color: textColor }}
      ></textarea>
      <textarea
        spellCheck={false}
        className="text_area_default"
        style={{ color: textColor }}
      ></textarea>
      <div className="bottom_bar">
        {!showColorBox ? (
          <button
            className="show_color_button"
            onClick={() => setShowColorBox(true)}
          >
            Edit Text Color
          </button>
        ) : (
          <input
            type="color"
            className="text_color"
            onChange={changeTextColor}
          ></input>
        )}
      </div>
    </div>
  );
}
