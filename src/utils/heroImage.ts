import { heroImages } from "../data/site";

export function getRandomHeroImage() {
  const index = Math.floor(Math.random() * heroImages.length);
  return heroImages[index];
}