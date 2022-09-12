export const viewRoster = (roster) => {
  for (let i = 0; i < roster.length; i++) {
    roster[i].statSheet();
  }
};
