import React, { useState, useEffect } from 'react';
import { Storage } from "@plasmohq/storage";

export default function Content() {
  const storage = new Storage();

  const [userButtonColor, setUserButtonColor] = useState("");
  const [userHeaderColor, setUserHeaderColor] = useState("");
  const [userLinkColor, setUserLinkColor] = useState("");
  const styleElement = document.createElement('style');
  const navbar = document.querySelector('nav');




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
  .private-button--primary { background-color: ${userButtonColor}; border-color: ${userButtonColor} } 
  .private-button--secondary { color: ${userButtonColor}; border-color: ${userButtonColor} }
`;
  document.head.appendChild(styleElement);

  function applyNewNavColor(element) {

    const navColorToReplace = ['rgba(51, 71, 91,)', 'rgb(37, 51, 66)', 'rgb(46, 63, 80)'];

    const navbarColor = window.getComputedStyle(element).backgroundColor;
    if (navColorToReplace.includes(navbarColor)) {
      element.style.backgroundColor = userHeaderColor;
    }

    // Parcours les éléments enfants
    const childElements = element.querySelectorAll(':scope > *');
    childElements.forEach(child => {
      applyNewNavColor(child);

      child.addEventListener('mouseover', function () {
        event.stopPropagation()
        child.style.backgroundColor = navHoverColor;
      });

      child.addEventListener('mouseout', function () {
        child.style.backgroundColor = userHeaderColor;
      });
    });

  }

  const interval = setInterval(function () {
    const navbar = document.querySelector('nav');

    if (navbar === null) {
      return;
    }
    clearInterval(interval);
    applyNewNavColor(navbar);
  }, 50)

  function applyNewLinksColor(element) {
    const linksColorToReplace = ['#0091ae', 'rgb(0, 145, 174)'];

    const linkColor = window.getComputedStyle(element).color;
    if (linksColorToReplace.includes(linkColor)) {
      element.style.color = userLinkColor;
    }

  }

  function applyNewLinksColorToSpans() {
    const spans = document.querySelectorAll('span');
    spans.forEach(span => {
      applyNewLinksColor(span);
    });
  }

  function applyNewLinksColorToI18nStrings() {
    const i18nStrings = document.querySelectorAll('i18n-string');
    i18nStrings.forEach(elem => {
      applyNewLinksColor(elem);
    });
  }

  function applyNewLinksColorToExistingLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      applyNewLinksColor(link);
    });
  }

  function applyNewLinksColorToButton() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      applyNewLinksColor(button);
    })
  }

  function observeLinksMutation(mutationsList) {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeName === 'A') {
            applyNewLinksColor(node);
          } else if (node.querySelectorAll) {
            const newLinks = node.querySelectorAll('a');
            newLinks.forEach(link => applyNewLinksColor(link));
          }
        });
      }
    });
  }

  // Appliquer la couleur aux éléments existants au démarrage
  applyNewLinksColorToSpans();
  applyNewLinksColorToI18nStrings();
  applyNewLinksColorToExistingLinks();
  applyNewLinksColorToButton();

  // Observer les mutations pour appliquer la couleur aux nouveaux éléments ajoutés
  const observer = new MutationObserver(observeLinksMutation);
  observer.observe(document.body, { childList: true, subtree: true });


}

