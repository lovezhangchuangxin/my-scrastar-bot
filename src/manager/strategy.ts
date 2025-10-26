import { getGalaxyMemory } from "../memory";
import { BuildTask, createBuildTask } from "./tasks";

/**
 * 星系任务发布策略
 */
export function publishTask(galaxyId: number) {
  const galaxy = Game.getGalaxy(galaxyId);
  const structures = galaxy.getMyStructures();
  const galaxyMemory = getGalaxyMemory(galaxyId);
  const tasks = galaxyMemory.taskList;

  const factory = structures.find(
    (structure) => structure.type === STRUCTURE.FACTORY
  );
  if (!factory) {
    if (
      tasks.find(
        (task) =>
          task.type === "build" &&
          (task as BuildTask).structureType === STRUCTURE.FACTORY
      )
    ) {
      return;
    }

    // 找一个有铁矿石的星球创建 factory
    const planet = galaxy
      .getPlanets()
      .find((planet) => planet.resources[RESOURCE.IRON_ORE] > 0);
    if (!planet) {
      console.log(`星系 ${galaxy.name} 没有 Iron Ore`);
      return;
    }
    const task = createBuildTask(galaxyId, planet.name, STRUCTURE.FACTORY, 1);
    tasks.push(task);

    return;
  }
}
