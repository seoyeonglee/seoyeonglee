import { randomInt } from "node:crypto";

export type Suit = "S" | "H" | "D" | "C";
export type Rank = "2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"T"|"J"|"Q"|"K"|"A";
export type Card = `${Rank}${Suit}`;

const SUITS: Suit[] = ["S", "H", "D", "C"];
const RANKS: Rank[] = ["2","3","4","5","6","7","8","9","T","J","Q","K","A"];

export function createDeck(): Card[] {
  return SUITS.flatMap(suit => RANKS.map(rank => `${rank}${suit}` as Card));
}

/**
 * Fisher-Yates shuffle using crypto.randomInt rather than Math.random.
 * This is a prototype of a CSPRNG-backed shuffle, not a claim of RNG certification.
 */
export function secureShuffle<T>(items: readonly T[]): T[] {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
