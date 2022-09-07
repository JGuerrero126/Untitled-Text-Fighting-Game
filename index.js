function Warrior(name, type, defense, hitpoints, basicAttack, heavyAttack) {
  this.name = name;
  this.type = type;
  this.defense = defense;
  this.hitpoints = hitpoints;
  this.basicAttack = basicAttack;
  this.heavyAttack = heavyAttack;
}

Warrior.prototype.statSheet = function () {
  console.log(
    `Name: ${this.name}\nType: ${this.type}\nDefense: ${this.defense}\nHitPoints: ${this.hitpoints}\nBasic Attack: ${this.basicAttack}\nHeavy Attack: ${this.heavyAttack}`
  );
  console.log("\n-------------\n");
};

Warrior.prototype.attack = (character2) => {
  character2.hitpoints -= this.strength + character2.defense;
};

const berserker = new Warrior("Guts", "Berserker", 20, 100, 20, 45);

const merc = new Warrior("Vincent", "Merc", 15, 70, 30, 40);

berserker.statSheet();

merc.statSheet();
