// This function is a quick and easy way of resetting the health and stamina of any two warriors given with it not being tied to any specific two.
export const reset = (P1, P2) => {
  // First we get the first players current health and stamina then make them equal to the total health and stamina that player is supposed to have.
  P1.hitpoints = P1.totalHP;
  P1.stamina = P1.totalStamina;
  // We then do the same for the second player.
  P2.hitpoints = P2.totalHP;
  P2.stamina = P2.totalStamina;
};
