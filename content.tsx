import React, { createElement } from 'react'
import { useEffect } from 'react'

export default function Content() {

  const blueLink = document.getElementsByClassName('private-button__link'); // la couleur bleu des liens
  

  if (!blueLink) {
    return;
  }
  // => ou changer directement la couleur de la classe private-button__link ?

  // avoir son style et changer sa couleur 
  const testBtn = document.createElement("button");
  testBtn.innerHTML = "Changer Couleur";
  const getBody = document.querySelector("body");
  console.log(getBody);
  getBody.appendChild(testBtn);

  testBtn.addEventListener('click', () => {
    // changer la couleur de la class private-button__link
    const styleElement = document.createElement('style');
    styleElement.innerHTML = '.private-button__link { color: #FF0000; }';
    document.head.appendChild(styleElement);
  })

  return (
    <div>content</div>
  )
}

