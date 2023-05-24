import { useState, useEffect } from "react";
import { Storage } from "@plasmohq/storage";
import "./assets/css/styles.css";

function IndexPopup() {
  const storage = new Storage();

  const [colorPrincipal, setColorPrincipal] = useState("");
  const [colorLink, setColorLink] = useState("");
  const [colorHeader, setColorHeader] = useState("");  // => Mettre les couleurs par défauts de hubspot
  const [colorHelp, setColorHelp] = useState("");

  useEffect(() => {
    async function fetchData() {
        const storedColorPrincipal = await storage.get("colorPrincipal");
        const storedColorLink = await storage.get("colorLink");
        const storedColorHeader = await storage.get("colorHeader");
        const storedColorHelp = await storage.get("colorHelp");

        setColorPrincipal(storedColorPrincipal || "");
        setColorLink(storedColorLink || "");
        setColorHeader(storedColorHeader || "");
        setColorHelp(storedColorHelp || "");
    } fetchData(); 
  }, []);


  function handleColorChange(event, setColor) {
    const newColor = event.target.value;
    setColor(newColor);
    console.log(newColor);
  }

  function handleSubmit(event) {
    event.preventDefault();
    storage.set("colorPrincipal", colorPrincipal);
    storage.set("colorLink", colorLink);
    storage.set("colorHeader", colorHeader);
    storage.set("colorHelp", colorHelp);
    // Envoyez les couleurs au content.js via un message ou autre méthode
  }

  return (
    <div>
      <h1>Change your color</h1>

      <form onSubmit={handleSubmit}>
        <div className="color-div">
          <label>Orange principal</label>
          <input onChange={(e) => handleColorChange(e, setColorPrincipal)} type="color" id="colorpicker-principal" value={colorPrincipal} />
        </div>

        <div className="color-div">
          <label>Bleu clair lien</label>
          <input onChange={(e) => handleColorChange(e, setColorLink)} type="color" id="colorpicker-link" value={colorLink} />
        </div>

        <div className="color-div">
          <label>Bleu foncé header</label>
          <input onChange={(e) => handleColorChange(e, setColorHeader)} type="color" id="colorpicker-header" value={colorHeader} />
        </div>

        <div className="color-div">
          <label>Bleu aide</label>
          <input onChange={(e) => handleColorChange(e, setColorHelp)} type="color" id="colorpicker-help" value={colorHelp} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default IndexPopup;
