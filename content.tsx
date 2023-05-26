import React, { useState, useEffect } from 'react';
import { Storage } from "@plasmohq/storage";

export default function Content() {
  const storage = new Storage();

  const [buttonColor, setButtonColor] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [linkColor, setLinkColor] = useState("");
  const styleElement = document.createElement('style');

  useEffect(() => {
    async function changeColors() {
      const storedButtonColor = await storage.get("colorPrincipal");
      const storedHeaderColor = await storage.get("colorHeader");
      const storedLinkColor = await storage.get("colorLink");

      setButtonColor(storedButtonColor);
      setHeaderColor(storedHeaderColor);
      setLinkColor(storedLinkColor);

    }

    changeColors();
  }, []);

  

  styleElement.innerHTML = `
          .private-button__link { color: ${linkColor}; } 
          .private-button--primary { background-color: ${buttonColor}; border-color: ${buttonColor}} 
          .private-button--secondary { color: ${buttonColor}; border-color: ${buttonColor}}
          .navbar-inner { background-color: ${headerColor} }
          #hs-nav-v4 .navSearch-v2 .navSearch-inputWrapper .navSearch-input { background-color: ${headerColor}}
          #hs-nav-v4 .mobile .nav-left  { background: ${headerColor}}
          #hs-nav-v4 .primary-links>li.active>a, #hs-nav-v4 .primary-links>li.currentPage>a  { background-color: ${headerColor}}
        `;
  document.head.appendChild(styleElement);

  
}

