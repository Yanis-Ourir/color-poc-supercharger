import React from 'react'
import { useEffect } from 'react'
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  world: "MAIN"
}

export default function Content() {
  useEffect(() => {
    const titleElement = document.getElementsByClassName('dashboard-selector__title'); // Remplacez 'ID_DU_TITRE' par l'ID réel de l'élément titre

    if (titleElement) {
      // Faites quelque chose avec l'élément titre
      console.log(titleElement);
    }
  }, []);
  return (
    <div>content</div>
  )
}

