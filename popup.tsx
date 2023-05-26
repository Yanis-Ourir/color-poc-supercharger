import { useState, useEffect } from "react";
import { Storage } from "@plasmohq/storage";
import "./assets/css/styles.css";

function IndexPopup() {
  const storage = new Storage();

  const [colorPrincipal, setColorPrincipal] = useState(""); // => couleur des bouttons;
  const [colorLink, setColorLink] = useState("");
  const [colorHeader, setColorHeader] = useState("");  // => Mettre les couleurs par défauts de hubspot que je vais récupérer sur une variable

  useEffect(() => {
    async function storedColors() {


      const storedColorPrincipal = await storage.get('colorPrincipal');
      const storedColorLink = await storage.get('colorLink');
      const storedColorHeader = await storage.get('colorHeader');


      setColorPrincipal(storedColorPrincipal);
      setColorLink(storedColorLink);
      setColorHeader(storedColorHeader);

    } storedColors();
  }, []);


  console.log(colorHeader);
  console.log(colorPrincipal);
  console.log(colorLink);

  function handleColorChange(event, setColor) {
    const newColor = event.target.value;
    setColor(newColor);
  }


  function handleSubmit(event) {
    event.preventDefault();
    storage.set("colorPrincipal", colorPrincipal);
    storage.set("colorLink", colorLink);
    storage.set("colorHeader", colorHeader);
    chrome.tabs.reload();
  }



  return (
    <div>
      <h1>Change your color</h1>

      <form onSubmit={handleSubmit}>
        <div className="color-div">
          <label>Orange principal :</label>
          <input onChange={(e) => handleColorChange(e, setColorPrincipal)} type="color" id="colorpicker-principal" value={colorPrincipal} />
        </div>

        <div className="color-div">
          <label>Bleu clair lien :</label>
          <input onChange={(e) => handleColorChange(e, setColorLink)} type="color" id="colorpicker-link" value={colorLink} />
        </div>

        <div className="color-div">
          <label>Bleu foncé header :</label>
          <input onChange={(e) => handleColorChange(e, setColorHeader)} type="color" id="colorpicker-header" value={colorHeader} />
        </div>

        <div className="div-color-button">
          <button className="color-button" type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default IndexPopup;
