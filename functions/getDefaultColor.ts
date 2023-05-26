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



