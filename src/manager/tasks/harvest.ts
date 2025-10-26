// 采矿任务

import { getShipMemory } from "../../memory";
import { generateId } from "../../utils";
import { BaseTask } from "../types";

/**
 * 采矿任务
 */
export interface HarvestTask extends BaseTask {
  type: "harvest";
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
 * 创建采矿任务
 */
export function createHarvestTask(
  galaxyId: number,
  planetName: string,
  resourceType: string,
  amount: number,
  shipCount: number,
  storageId?: number
): HarvestTask {
  return {
    id: generateId(),
    galaxyId,
    type: "harvest",
    planetName,
    resourceType,
    amount,
    ships: [],
    done: false,
    shipCount,
    storageId,
  };
}

/**
 * 执行采矿任务
 */
export function executeHarvestTask(task: HarvestTask, ships: Ship[] = []) {
  const { resourceType, amount } = task;
  bindShips(task);

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

/**
 * 绑定 ship
 */
function bindShips(task: HarvestTask) {
  const { shipCount } = task;
  if (task.ships.length >= shipCount) return;

  const galaxy = Game.getGalaxy(task.galaxyId);
  const ships = galaxy.getMyShips();
  for (const ship of ships) {
    const shipMemory = getShipMemory(ship.id);
    if (shipMemory.taskId || task.ships.includes(ship.id)) continue;

    if (!ship.hasComponent(COMPONENT.MINING_LASER)) {
      continue;
    }

    shipMemory.taskId = task.id;
    task.ships.push(ship.id);
    if (task.ships.length >= shipCount) break;
  }
}
