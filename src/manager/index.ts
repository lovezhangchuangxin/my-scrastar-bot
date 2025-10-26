import { global } from "../global";
import { getGalaxyMemory } from "../memory";
import { publishTask } from "./strategy";
import {
  BuildTask,
  executeBuildTask,
  executeHarvestTask,
  HarvestTask,
} from "./tasks";

/**
 * 执行所有星系的任务
 */
export function executeGalaxiesTask() {
  const galaxies = global.myGalaxies;
  Object.keys(galaxies).forEach((id) => {
    const galaxyId = +id;
    const galaxyMemory = getGalaxyMemory(galaxyId);
    const tasks = galaxyMemory.taskList || [];

    publishTask(galaxyId);

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
        case "build":
          executeBuildTask(task as BuildTask, ships);
      }
    });

    galaxyMemory.taskList = tasks.filter((task) => {
      return !task.done;
    });
  });
}
