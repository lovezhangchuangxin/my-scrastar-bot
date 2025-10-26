// 建造任务

import { getShipMemory } from "../../memory";
import { findPlanetsWithResource, generateId } from "../../utils";
import { BaseTask } from "../types";

/**
 * 建造任务
 */
export interface BuildTask extends BaseTask {
  type: "build";
  /** 要建造的建筑类型 */
  structureType: string;
  /** 建筑所在星球 */
  planetName: string;
  /** 是否创建了建筑工地 */
  created: boolean;
}

/**
 * 创建建造任务
 */
export function createBuildTask(
  galaxyId: number,
  planetName: string,
  structureType: string,
  shipCount: number
): BuildTask {
  return {
    id: generateId(),
    galaxyId,
    type: "build",
    ships: [],
    done: false,
    planetName,
    structureType,
    created: false,
    shipCount,
  };
}

/**
 * 执行建造任务
 */
export function executeBuildTask(task: BuildTask, ships: Ship[] = []) {
  const { structureType } = task;
  bindShips(task);

  ships.forEach((ship) => {
    const galaxy = Game.getGalaxy(ship.galaxyId);
    const planet = galaxy
      .getPlanets()
      .find((planet) => planet.name === task.planetName);
    if (!planet) {
      task.done = true;
      return;
    }

    const shipMemory = getShipMemory(ship.id);
    const structure = planet.getStructures().filter((structure) => {
      return structure.type === structureType && structure.progress < 100;
    })[0];
    const needResource = Object.entries(
      structure?.remainingResources ||
        Game.getStructureCost(structureType).resources ||
        {}
    ).find(([res, amount]) => {
      return (ship.storage[res] || 0) < amount;
    })?.[0];

    // 资源不够
    if (shipMemory.working && ship.getStorageUsed() <= 0 && needResource) {
      shipMemory.working = false;
    }
    if (
      !shipMemory.working &&
      (!needResource || ship.getStorageAvailable() <= 0)
    ) {
      shipMemory.working = true;
    }

    // 去挖资源
    if (!shipMemory.working && needResource) {
      const planet = findPlanetsWithResource(galaxy, needResource)[0];
      if (!planet) {
        console.log(`没有${needResource}的矿点`);
        return;
      }

      if (ship.pos.getRangeTo(planet.pos) > 1) {
        ship.moveTo(planet.pos);
        return;
      }

      ship.harvest(planet, needResource);
      console.log(
        `建造 ${structureType} 缺少 ${needResource}，正在采集 ${needResource}`
      );
      return;
    }

    if (ship.pos.getRangeTo(planet.pos) > 1) {
      ship.moveTo(planet.pos);
      return;
    }

    if (!task.created) {
      const result = ship.build(planet, structureType);
      if (result) {
        task.created = true;
      } else {
        console.log(`创建建筑 ${structureType} 失败`);
      }
      return;
    }

    if (!structure || structure.progress >= 100) {
      task.done = true;
      return;
    }
    ship.supplyConstruction(structure, ship.storage);
  });
}

/**
 * 绑定 ship
 */
function bindShips(task: BuildTask) {
  const { shipCount } = task;
  if (task.ships.length >= shipCount) return;

  const galaxy = Game.getGalaxy(task.galaxyId);
  const ships = galaxy.getMyShips();
  for (const ship of ships) {
    const shipMemory = getShipMemory(ship.id);
    if (shipMemory.taskId || task.ships.includes(ship.id)) continue;

    if (!ship.hasComponent(COMPONENT.CONSTRUCTION_ARM)) {
      continue;
    }

    shipMemory.taskId = task.id;
    task.ships.push(ship.id);
    shipMemory.working = false;
    if (task.ships.length >= shipCount) break;
  }
}
