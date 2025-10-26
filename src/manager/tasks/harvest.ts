// 采矿任务

import { BaseTask } from "../types";

/**
 * 采矿任务
 */
export interface HarvestTask extends BaseTask {
  /** 矿点所在星球 */
  planetId: number;
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
      return;
    }
  });
}
