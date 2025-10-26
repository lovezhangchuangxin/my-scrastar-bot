import { initGlobal } from "./global";
import { clearMemory, initMemory } from "./memory";

export function main() {
  initGlobal();
  initMemory();

  // console.log(Game.getStructureCost(STRUCTURE.FACTORY));

  clearMemory();
}

declare global {
  interface Memory {
    // 是否有工厂
    factoryIds?: number[];
  }
}
