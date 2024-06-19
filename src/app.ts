import * as PIXI from "pixi.js";

// Extend PIXI.Graphics to include custom properties
interface Particle extends PIXI.Graphics {
  vx: number;
  vy: number;
}

// Initialize the Slot Game Application
const slotGameCanvas = document.getElementById("slotGameCanvas") as HTMLCanvasElement;
const slotApp = new PIXI.Application();
slotApp.init({
  view: slotGameCanvas,
  width: 600,
  height: 400,
  background: 0x061639,
});
// Add your slot game logic here using Pixi.js

// Initialize the Particle Effect Application
const particleEffectCanvas = document.getElementById("particleEffectCanvas") as HTMLCanvasElement;
const particleApp = new PIXI.Application();
particleApp.init({
  view: particleEffectCanvas,
  width: 600,
  height: 400,
  background: 0x000000,
});

// Creating a basic particle explosion effect
const particles: Particle[] = [];
for (let i = 0; i < 100; i++) {
  const particle = new PIXI.Graphics() as Particle;
  particle.beginFill(0xff0000);
  particle.drawCircle(0, 0, 5);
  particle.endFill();
  particle.x = particleApp.renderer.width / 2;
  particle.y = particleApp.renderer.height / 2;
  particle.vx = (Math.random() - 0.5) * 10;
  particle.vy = (Math.random() - 0.5) * 10;
  particles.push(particle);
  particleApp.stage.addChild(particle);
}

particleApp.ticker.add(() => {
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= 0.99; // damping
    particle.vy *= 0.99; // damping
  });
});
