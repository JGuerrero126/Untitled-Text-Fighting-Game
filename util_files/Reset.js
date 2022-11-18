export const reset = (P1, P2) => {
  P1.hitpoints = P1.totalHP;
  P1.stamina = P1.totalStamina;
  P2.hitpoints = P2.totalHP;
  P2.stamina = P2.totalStamina;
};
