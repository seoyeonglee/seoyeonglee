import test from "node:test";
import assert from "node:assert/strict";
import { createDeck, secureShuffle } from "../src/shuffle.js";

test("deck contains 52 unique cards", () => {
  const deck = createDeck();
  assert.equal(deck.length, 52);
  assert.equal(new Set(deck).size, 52);
});

test("secureShuffle preserves the deck contents", () => {
  const deck = createDeck();
  const shuffled = secureShuffle(deck);
  assert.equal(shuffled.length, 52);
  assert.deepEqual([...shuffled].sort(), [...deck].sort());
});
