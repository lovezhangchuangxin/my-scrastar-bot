import { getGalaxyMemory } from "../memory";
import { executeHarvestTask, HarvestTask } from "./tasks";

/**
 * 执行所有星系的任务
 */
export function executeGalaxiesTask() {
  const galaxies = global.myGalaxies;
  Object.keys(galaxies).forEach((id) => {
    const galaxyId = +id;
    const galaxyMemory = getGalaxyMemory(galaxyId);
    const tasks = galaxyMemory.tasks;

    tasks.forEach((task) => {
      // 获取所有绑定的船，去除不存在的
      const ships = task.ships
        .map((shipId) => global.myShips[shipId])
        .filter((s) => s);
      task.ships = ships.map((s) => s.id);

      switch (task.type) {
        case "harvest":
          executeHarvestTask(task as HarvestTask, ships);
          break;
      }
    });

    galaxyMemory.tasks = tasks.filter((task) => {
      return !task.done;
    });
  });
}
