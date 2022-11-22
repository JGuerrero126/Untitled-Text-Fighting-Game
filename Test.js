import { Warrior } from "./util_files/Warrior.js";

const berserker = new Warrior("Guts", "Berserker", 20, 100, 20, 65, 75);

const merc = new Warrior("Vincent", "Merc", 25, 70, 30, 55, 90);

const vagabond = new Warrior("Musashi", "Vagabond", 40, 60, 15, 55, 80);

const gunslinger = new Warrior("Clint", "Gunslinger", 10, 75, 20, 60, 80);

const roster = [berserker, merc, vagabond, gunslinger];
const testName = "Guts";

const p1 = roster.find((el) => {
  return el.name === testName;
});
console.log(p1);
