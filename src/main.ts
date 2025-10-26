import { initGlobal } from "./global";
import { executeGalaxiesTask } from "./manager";
import { clearMemory, initMemory } from "./memory";

export function main() {
  initGlobal();
  initMemory();

  executeGalaxiesTask();

  clearMemory();
  // console.log(Game.getStructureCost(STRUCTURE.FACTORY));
}

declare global {
  interface Memory {
    // 是否有工厂
    factoryIds?: number[];
  }
}
