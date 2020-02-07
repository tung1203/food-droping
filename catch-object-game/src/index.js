import createWorld from "./ecs";
import "./index.css";
import {
  createContainers,
  createRecipes,
  createLoots
} from "./game/system/createObjectSystem";
import { renderContainer, renderLoot } from "./game/system/renderSystem";
import renderEnviroment from "./game/system/renderEnviromentSystem";
import renderRecipe from "./game/system/renderRecipeSystem";
import containerPhysicalSystem from "./game/system/containerPhysicalSystem";
import loopPhysicalSystem from "./game/system/loopPhysicalSystem";
import summationSystem from "./game/system/summationSystem";
import deleteLoot from "./game/system/deleteLoot";
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");
// let scree = screen.height;

const world = createWorld();

// canvas.width = (window.innerWidth * 5) / 6;
// canvas.height = window.innerHeight;
// console.log(canvas.width, canvas.height);
let widthScreen = window.innerWidth;
let heightScreen = window.innerHeight;
if (heightScreen >= 697) {
  canvas.height = 697;
} else {
  canvas.height = 550;

  canvas.style.position = "absolute";
  canvas.style.top = "40px";
  canvas.style.left = 0;
  canvas.style.right = 0;
  canvas.style.bottom = 0;
}
if (widthScreen > 500) {
  canvas.width = 549;
} else {
  canvas.width = widthScreen;
  // canvas.height = canvas.style.width;
}
// console.log(canvas.width + "WIDTH");
// console.log(canvas.width + "WIDTH");
world.canvas = canvas;
world.context = context;
const imageBackground = new Image();
imageBackground.src = "./yellow.jpg";

// render sau dc ve len tren
renderEnviroment(world);
renderLoot(world);
renderContainer(world);
renderRecipe(world);
/////////////////////////////
createContainers(world);
createRecipes(world);
createLoots(world);
///////////////////////////////
summationSystem(world);
containerPhysicalSystem(world);
loopPhysicalSystem(world);

deleteLoot(world);

const update = delta => {
  // var b = screen.availHeight;
  // console.log(b);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
  world.setDelta(delta);
  world.process();
};

let lastUpdate = Date.now();
(function loop() {
  const delta = Date.now() - lastUpdate;
  lastUpdate = Date.now();
  update(delta / 1000);

  requestAnimationFrame(loop);
})();
