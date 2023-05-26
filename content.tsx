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

  const links = document.querySelectorAll('.private-button__link');
  const buttons = document.querySelectorAll('.private-button--primary');
  const secondaryButtons = document.querySelectorAll('.private-button--secondary'); 
  
  if (links.length > 0 && buttons.length > 0 && secondaryButtons.length > 0) {
    const getColorValue = (element) => {
      return window.getComputedStyle(element).getPropertyValue('color');
    };

    const linksColorValue = getColorValue(links[0]);
    const buttonColorValue = getColorValue(buttons[0]);
    const secondaryButtonsColorValue = getColorValue(secondaryButtons[0]);

    console.log(linksColorValue + "" + buttonColorValue + "" + secondaryButtonsColorValue);

  }

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

  return;
}

