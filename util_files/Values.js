function StamValue(guard, totalGuard, basicAttack, heavyAttack) {
  this.guard = guard;
  this.totalGuard = totalGuard;
  this.basicAttack = basicAttack;
  this.heavyAttack = heavyAttack;
}

export const values = new StamValue(5, 8, 15, 30);
