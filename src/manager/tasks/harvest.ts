// 采矿任务

import { BaseTask } from "../types";

/**
 * 采矿任务
 */
export interface HarvestTask extends BaseTask {
  /** 矿点所在星球 */
  planetName: string;
  /** 矿的类型 */
  resourceType: string;
  /** 需要的数量 */
  amount: number;
  /** 需要存到哪个仓库，没有则表示不存到仓库，就放在自己身上 */
  storageId?: number;
}

/**
 * 执行采矿任务
 */
export function executeHarvestTask(task: HarvestTask, ships: Ship[] = []) {
  const { resourceType, amount } = task;
  ships.forEach((ship) => {
    // 飞船资源已满足
    if ((ship.storage[resourceType] || 0) > amount) {
      if (!task.storageId) {
        task.done = true;
        return;
      }

      const storage = global.myStructures[task.storageId];
      if (!storage || storage.getStorageAvailable() < amount) {
        task.done = true;
        return;
      }

      // TODO：将资源运动到指定建筑

      return;
    }

    // 前往目标星球采集资源
    const galaxy = Game.getGalaxy(ship.galaxyId);
    const targetPlanet = galaxy
      .getPlanets()
      .find((planet) => planet.name === task.planetName);
    if (!targetPlanet || targetPlanet.resources[resourceType] == undefined) {
      task.done = true;
      return;
    }

    if (ship.pos.getRangeTo(targetPlanet.pos) > 1) {
      ship.moveTo(targetPlanet.pos);
      return;
    }

    ship.harvest(targetPlanet, resourceType);
  });
}
