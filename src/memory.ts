declare global {
  interface ShipMemory {
    working: boolean;
    taskId?: string;
  }

  interface StructureMemory {}

  interface GalaxyMemory {}

  interface Memory {
    myShips: Record<string, ShipMemory>;
    myStructures: Record<string, StructureMemory>;
    myGalaxies: Record<string, GalaxyMemory>;
  }
}

/**
 * 获取有类型的 Memory（现在的 Memory全局对象并未类型导致没法扩展，后续 Memory 类型规范后就不需要该函数了）
 */
export function getMemory(): Memory {
  return (Memory || {}) as Memory;
}

/**
 * 获取 ship memory
 */
export function getShipMemory(shipId: number) {
  return getMemory().myShips[shipId] || {};
}

/**
 * 获取建筑 memory
 */
export function getStructureMemory(structureId: number) {
  return getMemory().myStructures[structureId] || {};
}

/**
 * 获取星系 memory
 */
export function getGalaxyMemory(galaxyId: number) {
  return getMemory().myGalaxies[galaxyId] || {};
}

/**
 * 初始化 memory，为所有的 ship 和建筑添加 memory
 */
export function initMemory() {
  const memory = getMemory();
  if (!memory.myShips) {
    memory.myShips = {};
  }
  if (!memory.myStructures) {
    memory.myStructures = {};
  }
  if (!memory.myGalaxies) {
    memory.myGalaxies = {};
  }

  const ships = Game.getMyShips();
  ships.forEach((ship) => {
    if (!memory.myShips[ship.id]) {
      memory.myShips[ship.id] = {} as ShipMemory;
    }

    if (!memory.myGalaxies[ship.galaxyId]) {
      memory.myGalaxies[ship.galaxyId] = {
        taskList: [],
      } as GalaxyMemory;
    }
  });

  const structures = Game.getMyStructures();
  structures.forEach((structure) => {
    if (!memory.myStructures[structure.id]) {
      memory.myStructures[structure.id] = {} as StructureMemory;
    }
  });

  Object.values(memory.myGalaxies).forEach((galaxyMemory) => {
    if (!galaxyMemory.taskList) {
      galaxyMemory.taskList = [];
    }
  });
}

/**
 * 清理过期 memory
 */
export function clearMemory() {
  const memory = getMemory();

  const ships = Game.getMyShips();
  const shipIdSet = new Set(ships.map((ship) => ship.id));
  Object.keys(memory.myShips).forEach((shipId) => {
    if (!shipIdSet.has(+shipId)) {
      delete memory.myShips[shipId];
    }
  });

  const structures = Game.getMyStructures();
  const structureIdSet = new Set(structures.map((structure) => structure.id));
  Object.keys(memory.myStructures).forEach((structureId) => {
    if (!structureIdSet.has(+structureId)) {
      delete memory.myStructures[structureId];
    }
  });

  // 过期星系记忆暂时不清，玩家自己决定什么时候清
}
