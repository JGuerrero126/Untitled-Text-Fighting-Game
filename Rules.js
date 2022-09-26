import mainmenu from "./index.js";

export async function rules() {
  await console.log("These are the rules for Warriors Of Wrath");
  await setTimeout(function () {
    console.log(
      "Before the fight begins you must select single-player or two-player.\n"
    );
  }, 1000);
  await setTimeout(function () {
    console.log(
      "If you select single-player, you may choose your fighter and opponent\nTwo-player allows the same thing but will allow the opponent to be controlled by a second player using the same keyboard.\n"
    );
  }, 3000);
  await setTimeout(function () {
    console.log(
      "During the fight you will be presented with the option to do an Basic or Heavy Attack, as well as to Guard or 'Total Guard'.\n"
    );
  }, 5000);
  await setTimeout(function () {
    console.log(
      "A Basic Attack will do lesser damage than a Heavy Attack.\nTry to use this to try to mindgame your opponent and use a Heavy Attack when they aren't ready to defend themselves while using Basic Attacks for the attack they defend against.\n"
    );
  }, 8000);
  await setTimeout(function () {
    console.log(
      "You can also Guard and Total Guard.\nUsing Guard will make your fighter defend themselves. Reducing the damage taken from an attack by your defense.\nEvery fighter has different defense so be sure to view the roster and check them.\n"
    );
  }, 12000);
  await setTimeout(function () {
    console.log(
      "A Total Guard will make your fighter use everything they have to defend themselves, making it so damage is taken regardless of the attack used against you and can only be used once per battle.\nMake sure to use your Total Guard when you feel your opponent is going to use a Heavy Attack to get the most use out of it!\n"
    );
  }, 16000);
  await setTimeout(function () {
    mainmenu();
  }, 20000);
}
