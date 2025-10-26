// 基础任务
export interface BaseTask {
  /** 任务 id */
  id: string;
  /** 任务所属的星系 */
  galaxyId: number;
  /** 任务类型 */
  type: string;
  /** 绑定的 ship id */
  ships: number[];
  /** 需要的 ship 数量 */
  shipCount: number;
  /** 是否完成 */
  done: boolean;
}

declare global {
  interface GalaxyMemory {
    tasks: BaseTask[];
  }
}
