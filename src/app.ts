// import * as PIXI from "pixi.js";

// // Extend PIXI.Graphics to include custom properties
// interface Particle extends PIXI.Graphics {
//   vx: number;
//   vy: number;
// }

// // Initialize the Slot Game Application
// const slotApp = new PIXI.Application();
// slotApp.init({
//   view: slotGameCanvas,
//   width: 600,
//   height: 400,
//   background: 0x061639,
// });

import { Application, Assets, AnimatedSprite, Texture, Sprite, FrameObject } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();
  const slotGameCanvas = document.getElementById("slotGameCanvas") as HTMLCanvasElement;

  // Initialize the application
  //   view: slotGameCanvas,
  await app.init({
    canvas: slotGameCanvas,
    width: 600,
    height: 400,
    background: "0x061639",
  });

  // Append the application canvas to the document body
  // document.body.appendChild(app.canvas);

  // Load the textures
  const alien1texture = await Assets.load("https://pixijs.com/assets/flowerTop.png");
  const alien2texture = await Assets.load("https://pixijs.com/assets/eggHead.png");

  let isAlien1 = true;

  // Create a new alien Sprite using the 1st texture and add it to the stage
  const character = new Sprite(alien1texture);

  // Center the sprites anchor point
  character.anchor.set(0.5);

  // Move the sprite to the center of the screen
  character.x = app.screen.width / 2;
  character.y = app.screen.height / 2;

  app.stage.addChild(character);

  // Make the sprite interactive
  character.eventMode = "static";
  character.cursor = "pointer";

  character.on("pointertap", () => {
    isAlien1 = !isAlien1;
    // Dynamically swap the texture
    character.texture = isAlien1 ? alien1texture : alien2texture;
  });

  app.ticker.add(() => {
    character.rotation += 0.02;
  });
})();

(async () => {
  // Create a new application
  const app = new Application();
  const particleEffectCanvas = document.getElementById("particleEffectCanvas") as HTMLCanvasElement;

  // Initialize the application
  await app.init({
    canvas: particleEffectCanvas,
    width: 600,
    height: 400,
    background: 0x000000,
    autoStart: false,
  });

  // Load the animation sprite sheet
  const texture = await Assets.load("https://pixijs.com/assets/spritesheet/mc.json");

  // Create an array to store the textures
  const explosionTextures: Texture[] = [];
  let i;

  for (i = 0; i < 26; i++) {
    const texture: Texture = Texture.from(`Explosion_Sequence_A ${i + 1}.png`);

    explosionTextures.push(texture);
  }

  // Create and randomly place the animated explosion sprites on the stage
  for (i = 0; i < 1; i++) {
    // Create an explosion AnimatedSprite
    const explosion = new AnimatedSprite(explosionTextures);

    explosion.x = Math.random() * app.screen.width;
    explosion.y = Math.random() * app.screen.height;
    explosion.anchor.set(0.5);
    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.set(0.75 + Math.random() * 0.5);
    explosion.gotoAndPlay((Math.random() * 26) | 0);
    app.stage.addChild(explosion);
  }
  app.stage.eventMode = "static";
  app.stage.cursor = "pointer";

  app.stage.on("pointertap", () => {
    for (i = 0; i < 1; i++) {
      const explosion = new AnimatedSprite(explosionTextures);

      explosion.x = Math.random() * app.screen.width;
      explosion.y = Math.random() * app.screen.height;
      explosion.anchor.set(0.5);
      explosion.rotation = Math.random() * Math.PI;
      explosion.scale.set(0.75 + Math.random() * 0.5);
      explosion.gotoAndPlay((Math.random() * 10) | 0);
      app.stage.addChild(explosion);
    }
  });

  // Start animating
  app.start();
})();
