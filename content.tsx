import React from 'react'
import { useEffect } from 'react'
import type { PlasmoCSConfig } from "plasmo"
 
export const config: PlasmoCSConfig = {
  matches: ["https://app.hubspot.com/reports-dashboard/5483623/view/2593188"],
  world: "MAIN"
}

export default function Content() {
  useEffect(() => {
    const titleElement = document.getElementsByClassName('dashboard-selector__title');

    if (titleElement) {
      console.log(titleElement);
    }
  }, []);
  return (
    <div>content</div>
  )
}

