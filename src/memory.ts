declare global {
  interface ShipMemory {
    working: boolean;
  }

  interface StructureMemory {}

  interface GalaxyMemory {}

  interface Memory {
    ships: Record<string, ShipMemory>;
    structures: Record<string, StructureMemory>;
    galaxies: Record<string, GalaxyMemory>;
  }
}

/**
 * 获取有类型的 Memory（现在的 Memory全局对象并未类型导致没法扩展，后续 Memory 类型规范后就不需要该函数了）
 */
export function getMemory(): Memory {
  return Memory as Memory;
}

/**
 * 获取 ship memory
 */
export function getShipMemory(shipId: number) {
  return getMemory().ships[shipId];
}

/**
 * 获取建筑 memory
 */
export function getStructureMemory(structureId: number) {
  return getMemory().structures[structureId];
}

/**
 * 获取星系 memory
 */
export function getGalaxyMemory(galaxyId: number) {
  return getMemory().galaxies[galaxyId];
}

/**
 * 初始化 memory，为所有的 ship 和建筑添加 memory
 */
export function initMemory() {
  const memory = getMemory();
  if (!memory.ships) {
    memory.ships = {};
  }
  if (!memory.structures) {
    memory.structures = {};
  }

  const ships = Game.getMyShips();
  ships.forEach((ship) => {
    if (!memory.ships[ship.id]) {
      memory.ships[ship.id] = {} as ShipMemory;
    }

    if (!memory.galaxies[ship.galaxyId]) {
      memory.galaxies[ship.galaxyId] = {} as GalaxyMemory;
    }
  });

  const structures = Game.getMyStructures();
  structures.forEach((structure) => {
    if (!memory.structures[structure.id]) {
      memory.structures[structure.id] = {} as StructureMemory;
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
  Object.keys(memory.ships).forEach((shipId) => {
    if (!shipIdSet.has(+shipId)) {
      delete memory.ships[shipId];
    }
  });

  const structures = Game.getMyStructures();
  const structureIdSet = new Set(structures.map((structure) => structure.id));
  Object.keys(memory.structures).forEach((structureId) => {
    if (!structureIdSet.has(+structureId)) {
      delete memory.structures[structureId];
    }
  });

  // 过期星系记忆暂时不清，玩家自己决定什么时候清
}
