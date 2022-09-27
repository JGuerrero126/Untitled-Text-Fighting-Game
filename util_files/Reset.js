export const reset = (roster) => {
  roster.forEach((element) => {
    if (element.remainingPG === 0) {
      element.remainingPG = 1;
    }
    if (element.name === "Guts") {
      element.hitpoints = 100;
    }
    if (element.name === "Vincent") {
      element.hitpoints = 70;
    }
    if (element.name === "Musashi") {
      element.hitpoints = 60;
    }
    if (element.name === "Clint") {
      element.hitpoints = 75;
    }
  });
};
