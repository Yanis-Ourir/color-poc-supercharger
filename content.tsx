import React, { useState, useEffect } from 'react';
import { Storage } from "@plasmohq/storage";

export default function Content() {
  const storage = new Storage();

  const [userButtonColor, setUserButtonColor] = useState("");
  const [userHeaderColor, setUserHeaderColor] = useState("");
  const [userLinkColor, setUserLinkColor] = useState("");
  const styleElement = document.createElement('style');
  const styleHeader = document.createElement('style');




  useEffect(() => {
    async function changeColors() {
      const storeduserButtonColor = await storage.get("colorPrincipal");
      const storeduserHeaderColor = await storage.get("colorHeader");
      const storeduserLinkColor = await storage.get("colorLink");

      setUserButtonColor(storeduserButtonColor);
      setUserHeaderColor(storeduserHeaderColor);
      setUserLinkColor(storeduserLinkColor);

    }

    changeColors();
  }, []);

  console.log(userHeaderColor);

  const navHoverColor = darkenColor(userHeaderColor, 10);
  const linkHoverColor = darkenColor(userLinkColor, 10);

  // Assombrir la couleur pour les hovers
  function darkenColor(color, amount) {
    // Convertir la couleur hexadécimale en valeurs RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Assombrir la couleur en réduisant les valeurs RGB
    const darkenedR = Math.max(r - amount, 0);
    const darkenedG = Math.max(g - amount, 0);
    const darkenedB = Math.max(b - amount, 0);

    // Convertir les valeurs RGB en couleur hexadécimale
    const darkenedHex = `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;

    return darkenedHex;
  }

  styleElement.innerHTML = `
  .private-button__link { color: ${userLinkColor}; } 
  .private-button__link:hover { color : ${linkHoverColor} }
  .private-button--primary { background-color: ${userButtonColor}; border-color: ${userButtonColor}} 
  .private-button--secondary { color: ${userButtonColor}; border-color: ${userButtonColor}}
`;
  document.head.appendChild(styleElement);

  const interval = setInterval(function () {
    if (document.querySelector("#hs-nav-v4--logo") === null) {
      return;
    }
    clearInterval(interval);

    styleHeader.innerHTML = `
.navbar-inner { background-color: ${userHeaderColor} }
#hs-nav-v4 .navSearch-v2 .navSearch-inputWrapper .navSearch-input { background-color: ${userHeaderColor} }
#hs-nav-v4 .mobile .nav-left  { background: ${userHeaderColor} }
#hs-nav-v4 .primary-links>li.active>a, #hs-nav-v4 .primary-links>li.currentPage>a  { background-color: ${userHeaderColor} }
#hs-nav-v4 .secondary-nav {background-color: ${userHeaderColor} }
#hs-nav-v4 .expansion a.navSecondaryLink { background-color: ${userHeaderColor} }
.nav-dropdown-separator { color: ${userHeaderColor} }

`;
    document.head.appendChild(styleHeader);
  }, 50)




}

