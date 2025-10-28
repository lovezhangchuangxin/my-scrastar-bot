/**
 * Star Empire Game API TypeScript Definitions
 * 用于 Monaco 编辑器的代码提示
 *
 * 模块系统说明：
 * - 游戏会自动执行 main.js 中的 main() 函数作为入口
 * - 支持 ES6 import/export 和 CommonJS require/module.exports 两种方式
 *
 * ES6 模块示例：
 * // utils.js (ES6 风格 - 推荐)
 * export function helper() {
 *   console.log("辅助函数");
 * }
 * export const VERSION = "1.0.0";
 *
 * // main.js
 * import { helper, VERSION } from 'utils';
 * // 或者使用默认导入
 * import utils from 'utils';
 *
 * function main() {
 *   helper();
 *   console.log(VERSION);
 * }
 *
 * CommonJS 模块示例：
 * // utils.js (CommonJS 风格)
 * function helper() {
 *   console.log("辅助函数");
 * }
 * module.exports = { helper };
 *
 * // main.js
 * const utils = require('utils');
 *
 * 支持的导入语法：
 * - import x from 'module'           // 默认导入
 * - import { a, b } from 'module'    // 命名导入
 * - import * as x from 'module'      // 命名空间导入
 * - import 'module'                  // 副作用导入
 * - const x = require('module')      // CommonJS 导入
 *
 * 支持的导出语法：
 * - export function name() {}
 * - export const name = value
 * - export { a, b, c }
 * - export default value
 * - module.exports = { ... }
 * - exports.name = value
 */

// ==================== 模块系统 ====================

/**
 * require - 导入模块
 * @param moduleName 模块名称（可以省略 .js 后缀）
 * @returns 模块导出的内容
 */
declare function require(moduleName: string): any;

/**
 * module - 模块对象
 */
declare const module: {
  /** 导出的内容 */
  exports: any;
};

/**
 * exports - module.exports 的别名
 */
declare const exports: any;

/**
 * export - ES6 模块导出（编译时会转换为 module.exports）
 *
 * 支持的语法：
 * - export function name() {}
 * - export const name = value
 * - export let name = value
 * - export var name = value
 * - export { name1, name2 }
 * - export default value
 */

// ==================== 全局对象 ====================

/**
 * Game - 游戏主对象
 */
declare const Game: {
  /** 当前游戏 tick */
  time: number;

  /** 获取玩家的所有飞船 */
  getMyShips(): Ship[];

  /** 获取玩家的所有建筑 */
  getMyStructures(): Structure[];

  /** 获取玩家的所有空间站 */
  getMyStations(): SpaceStation[];

  /** 获取星系对象 */
  getGalaxy(galaxySeed: number): Galaxy;

  /** 获取组件信息 */
  getComponentInfo(componentType: string): ComponentInfo;

  /** 获取建筑成本 */
  getStructureCost(structureType: string): BuildCost;

  // 星系查询
  /** 获取有视野的星系列表 */
  getVisibleGalaxies(): number[];
};

/**
 * Memory - 全局持久化存储对象
 *
 * Memory 对象用于在 tick 之间存储持久化数据。
 *
 * 自动序列化机制：
 * - Tick 开始时：自动从数据库加载 Memory 数据
 * - Tick 运行中：可以自由读写 Memory 对象
 * - Tick 结束时：自动将 Memory 序列化为 JSON 并保存到数据库
 *
 * 注意事项：
 * - 只能存储可序列化的数据（字符串、数字、布尔值、对象、数组）
 * - 序列化时会自动过滤掉函数，只保存数据属性
 * - 不能存储循环引用
 * - 建议总数据量不超过 1MB
 *
 * @example
 * // 初始化 Memory
 * if (!Memory.ships) {
 *   Memory.ships = {};
 * }
 *
 * // 保存数据
 * Memory.ships[ship.id] = { role: "miner", target: 123 };
 *
 * // 读取数据
 * const role = Memory.ships[ship.id].role;
 */
declare const Memory: any;

/**
 * console - 控制台输出
 */
declare const console: {
  log(...args: any[]): void;
};

// ==================== 资源类型常量 ====================

declare const RESOURCE: {
  IRON_ORE: "iron_ore";
  CRYSTAL: "crystal";
  DEUTERIUM: "deuterium";
  METAL: "metal";
  ENERGY: "energy";
  ALLOY: "alloy";
  MISSILE: "missile";
};

// ==================== 建筑类型常量 ====================

declare const STRUCTURE: {
  MINING_FACILITY: "mining_facility";
  IRON_EXTRACTOR: "iron_extractor";
  CRYSTAL_HARVESTER: "crystal_harvester";
  DEUTERIUM_COLLECTOR: "deuterium_collector";
  FACTORY: "factory";
  COMPONENT_FACTORY: "component_factory";
  STORAGE: "storage";
  WAREHOUSE: "warehouse";
  SHIPYARD: "shipyard";
  DEFENSE_TOWER: "defense_tower";
  SHIELD_GENERATOR: "shield_generator";
  TRADE_TERMINAL: "trade_terminal";
  ENERGY_PLANT: "energy_plant";
  LAB: "lab";
};

// ==================== 组件类型常量 ====================

declare const COMPONENT: {
  BASIC_ENGINE: "basic_engine";
  WARP_DRIVE: "warp_drive";
  ADVANCED_ENGINE: "advanced_engine";
  MINING_LASER: "mining_laser";
  STORAGE: "storage";
  RESOURCE_SCANNER: "resource_scanner";
  CONSTRUCTION_ARM: "construction_arm";
  REPAIR_DRONE: "repair_drone";
  WEAPON_SYSTEM: "weapon_system";
  SHIELD_GENERATOR: "shield_generator_component";
  ARMOR_PLATING: "armor_plating";
  TARGETING_SYSTEM: "targeting_system";
  MISSILE_LAUNCHER: "missile_launcher";
  LASER_WEAPON: "laser_weapon";
  POWER_CORE: "power_core";
  SENSOR_ARRAY: "sensor_array";
  CLOAKING_DEVICE: "cloaking_device";
};

// ==================== 接口定义 ====================

/**
 * 仓库容器接口
 * 飞船和建筑都实现此接口，提供统一的仓库管理API
 */
interface StorageContainer {
  /**
   * 获取仓库已使用容量
   * @returns 所有资源数量之和
   */
  getStorageUsed(): number;

  /**
   * 获取仓库可用容量
   * @returns 总容量 - 已使用容量
   */
  getStorageAvailable(): number;

  /**
   * 获取仓库总容量
   */
  readonly storageCapacity: number;

  /**
   * 获取仓库内容
   */
  readonly storage: { [key: string]: number };
}

/** 位置对象 */
interface Position {
  x: number;
  y: number;
  /**
   * 获取到目标位置的距离（切比雪夫距离）
   * @param x 目标X坐标
   * @param y 目标Y坐标
   */
  getRangeTo(x: number, y: number): number;
  /**
   * 获取到目标位置的距离（切比雪夫距离）
   * @param position 目标位置对象
   */
  getRangeTo(position: Position): number;
}

/** 飞船对象 */
interface Ship extends StorageContainer {
  id: number;
  name: string;
  ownerId: number;
  galaxyId: number;
  pos: Position;
  hp: number;
  maxHP: number;
  /** 当前能量（从storage中读取） */
  energy: number;
  /** 最大能量（基础值100 + 组件加成） */
  maxEnergy: number;
  shield: number;
  maxShield: number;
  attack: number;
  defense: number;
  /** 当前辐能值（限制每tick可执行的操作数量） */
  radiance: number;
  /** 最大辐能值（默认4，每tick最多执行4个不同类型的操作） */
  maxRadiance: number;
  speed: number;

  // 仓库相关属性（统一API）
  /** 仓库内容 */
  readonly storage: { [key: string]: number };
  /** 仓库容量 */
  readonly storageCapacity: number;

  components: string;
  memory: string;

  // 敌方单位标记
  isEnemy?: boolean;
  isMy?: boolean;

  // 移动方法
  /**
   * 移动到指定坐标（根据speed属性决定移动距离，最多移动speed格）
   * @param x 目标X坐标
   * @param y 目标Y坐标
   */
  moveTo(x: number, y: number): boolean;
  /**
   * 移动到目标位置（根据speed属性决定移动距离，最多移动speed格）
   * @param position 目标位置对象
   */
  moveTo(position: Position): boolean;
  /** 按方向移动1格（固定移动1格，不受speed属性影响，消耗1点能量） */
  move(direction: "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw"): boolean;

  // 采集方法（需要采矿激光组件）
  /**
   * 采集目标星球的资源
   * @param target 目标星球对象（必须有 pos 和 resources 属性）
   * @param resourceType 可选，指定要采集的资源类型（如 RESOURCE.IRON_ORE）。不指定则采集第一个可用资源
   * @returns 采集是否成功
   *
   * 采集量：每个采矿激光每次采集 2 单位资源。可安装多个激光以提高采集速率。
   *
   * 注意：当前星球资源是程序化生成的（无限资源）
   */
  harvest(
    target: Planet | { pos: Position; resources: { [key: string]: number } },
    resourceType?: string
  ): boolean;

  // 建造方法（需要建造臂组件）
  /**
   * 建造建筑（创建建筑工地，允许在同一位置建造多个建筑）
   *
   * 建造机制：
   * - 创建建筑工地（Progress = 0）
   * - 飞船携带的资源会自动转移到工地
   * - 可以多次运送资源到工地（使用 supplyConstruction）
   * - 资源供给达到要求后，工地会按建造时间推进
   *
   * @param target 目标对象（星球或空间站）
   * @param structureType 建筑类型（如 STRUCTURE.MINING_FACILITY）
   * @returns 是否成功创建工地
   *
   * @example
   * // 在星球上建造采矿设施
   * const planet = galaxy.getPlanets()[0];
   * ship.build(planet, STRUCTURE.MINING_FACILITY);
   *
   * @example
   * // 在空间站上建造仓库
   * const station = galaxy.getMyStructures().find(s => s.type === 'station');
   * ship.build(station, STRUCTURE.WAREHOUSE);
   */
  build(target: Planet | Structure, structureType: string): boolean;

  /**
   * 向建筑工地运送资源
   *
   * 用于分批提供建筑所需资源。适用于大型建筑，单个飞船无法一次性提供所有资源的情况。
   *
   * @param constructionSite 建筑工地对象（Progress < 100 的建筑）
   * @param resources 可选，指定要运送的资源。不指定则自动运送所有需要的资源
   * @returns 是否成功运送
   *
   * @example
   * // 自动运送所有需要的资源
   * const site = galaxy.getMyStructures().find(s => s.progress < 100);
   * ship.supplyConstruction(site);
   *
   * @example
   * // 指定运送特定资源
   * ship.supplyConstruction(site, {
   *   [RESOURCE.METAL]: 50,
   *   [RESOURCE.CRYSTAL]: 30
   * });
   */
  supplyConstruction(
    constructionSite: Structure,
    resources?: { [key: string]: number }
  ): boolean;
  /**
   * 建造空间站（空间站是特殊的"星球"，不算作建筑）
   * 同一位置只能有一个空间站
   * 成本：能量50，铁矿石200，晶体100，重氢50
   * @param name 空间站名称
   * @param x 目标坐标X
   * @param y 目标坐标Y
   */
  buildStation(name: string, x: number, y: number): boolean;

  // 战斗方法
  attackTarget(targetId: number): boolean;

  /**
   * 发射导弹攻击目标（需要 MISSILE_LAUNCHER 组件）
   * @param target 目标对象（飞船或建筑对象）
   * @returns 是否成功发射
   */
  fireMissile(target: Ship | Structure): boolean;

  /**
   * 发射激光攻击目标（需要 LASER_WEAPON 组件）
   * @param target 目标对象（飞船或建筑对象）
   * @returns 是否成功发射
   */
  fireLaser(target: Ship | Structure): boolean;

  /**
   * 获取当前携带的导弹数量
   * @returns 导弹数量
   */
  getMissileCount(): number;

  /**
   * 获取导弹发射器的剩余冷却时间（ticks）
   * @returns 剩余冷却时间
   */
  getMissileCooldown(): number;

  /**
   * 检查激光武器是否可以使用（是否有足够能量）
   * @returns 是否可用
   */
  canFireLaser(): boolean;

  repair(targetId: number): boolean;

  // 护盾方法
  enableShield(): boolean;
  disableShield(): boolean;

  // 资源传输
  /**
   * 传输资源到目标（飞船或建筑）
   * @param target 目标对象（飞船或建筑）
   * @param resource 资源类型
   * @param amount 数量
   */
  transfer(target: Ship | Structure, resource: string, amount: number): boolean;

  /**
   * 从建筑提取资源到飞船
   * @param structure 建筑对象
   * @param resource 资源类型
   * @param amount 数量
   */
  withdraw(structure: Structure, resource: string, amount: number): boolean;

  /**
   * 丢弃资源（资源会虚空消失，后续可能改为放置在原地等待重新捡起）
   * @param resource 资源类型
   * @param amount 数量
   */
  drop(resource: string, amount: number): boolean;

  // 仓库管理（统一API）- 继承自 StorageContainer
  getStorageUsed(): number;
  getStorageAvailable(): number;

  // 自毁
  /**
   * 飞船自毁（立即摧毁飞船）
   * @returns 是否成功自毁
   */
  selfDestruct(): boolean;

  // 组件相关
  getComponents(): string[];
  hasComponent(componentType: string): boolean;
  canWarpJump(): boolean;
  /**
   * 通过附近的星门跃迁到目标星系（无需参数）
   *
   * 自动检测飞船周围1格距离内的星门并跃迁：
   * - 需要安装跃迁引擎（WARP_DRIVE）组件
   * - 飞船必须在星门1格距离内
   * - 消耗重氢：基于星门距离计算（距离/5，最少10）
   * - 跃迁后会出现在目标星系的对应星门位置
   *
   * @returns 跃迁结果对象
   *
   * @example
   * // 移动到星门附近
   * const gate = galaxy.getJumpGates()[0];
   * ship.moveTo(gate.pos);
   *
   * // 下一个tick跃迁
   * const result = ship.warpJump();
   * if (result.success) {
   *   console.log("跃迁到:", result.galaxyName);
   *   console.log("消耗重氢:", result.deuteriumCost);
   * }
   */
  warpJump(): {
    success: boolean;
    message?: string;
    galaxyId?: number;
    galaxyName?: string;
    deuteriumCost?: number;
    arrivalPos?: { x: number; y: number };
  };

  // 隐形
  enableCloaking(): boolean;
  disableCloaking(): boolean;
  isCloaked(): boolean;
}

/** 建筑对象 */
interface Structure extends StorageContainer {
  id: number;
  name: string;
  /**
   * 建筑类型（功能性，决定建筑能力）
   * 使用 STRUCTURE 常量
   */
  type: string;
  ownerId: number;
  galaxyId: number;
  /** 所在星球/空间站的ID（格式：galaxyId_x_y） */
  planetId: string;
  hp: number;
  maxHP: number;
  /** 当前能量（从storage中读取） */
  energy: number;
  /** 最大能量（从建筑类型配置中获取） */
  maxEnergy: number;
  defense: number;
  /** 当前辐能值（限制每tick可执行的操作数量） */
  radiance: number;
  /** 最大辐能值（默认1，每tick只能执行一次操作） */
  maxRadiance: number;

  // 仓库相关属性（统一API）
  /** 建筑仓库/已提供的资源（对象格式） */
  storage: { [key: string]: number };
  /** 存储容量（0表示无存储功能） */
  storageCapacity: number;

  /** 建筑等级（用于可升级建筑） */
  level: number;
  /** 建造进度 (0-100)。< 100 表示建筑工地，= 100 表示已完工 */
  progress: number;
  /**
   * 工作状态（生产任务、建造任务等）
   * - type: 'produce' - 工厂生产任务
   * - type: 'build_ship' - 船坞建造飞船
   * - type: 'build_component' - 组件工厂制造组件
   */
  working: {
    /** 工作类型 */
    type?: "produce" | "build_ship" | "build_component" | string;
    /** 目标类型（如生产的资源类型、组件类型等） */
    target_type?: string;
    /** 开始时间戳 */
    start_tick?: number;
    /** 持续时间（ticks） */
    duration?: number;
    /** 当前进度（已完成的ticks） */
    progress?: number;
    /** 额外数据 */
    data?: { [key: string]: number };
  };

  // 以下字段仅在建造中（progress < 100）时存在
  /** 总共需要的资源（仅建造中） */
  requiredResources?: { [key: string]: number };
  /** 还差的资源（仅建造中） */
  remainingResources?: { [key: string]: number };
  /** 建造时间（ticks）（仅建造中） */
  buildTime?: number;

  // 敌方单位标记
  isEnemy?: boolean;
  isMy?: boolean;

  // 通用方法
  getStorage(): { [resource: string]: number };
  /**
   * 获取存储详细信息
   * @returns 包含存储空间、已使用量、可用量等信息的对象
   */
  getStorageInfo(): {
    items: { [resource: string]: number };
    used: number;
    capacity: number;
    available: number;
    level: number;
    upgradeable: boolean;
  };
  /**
   * 升级建筑（仅可升级建筑可用，如仓库）
   * @returns 包含升级结果的对象
   */
  upgrade?(): {
    success: boolean;
    message?: string;
    newLevel?: number;
    newCapacity?: number;
  };
  /**
   * 获取升级成本（仅可升级建筑可用）
   * @returns 包含升级所需资源和能量的对象
   */
  getUpgradeCost?(): {
    upgradeable: boolean;
    currentLevel?: number;
    energy?: number;
    resources?: { [resource: string]: number };
    capacityIncrease?: number;
    newCapacity?: number;
  };

  // 仓库管理（统一API）- 继承自 StorageContainer
  getStorageUsed(): number;
  getStorageAvailable(): number;

  // 自毁
  /**
   * 建筑自毁（立即摧毁建筑）
   * @returns 是否成功自毁
   */
  selfDestruct(): boolean;

  // 采集建筑方法
  harvest?(): boolean;
  getHarvestRate?(): { [resource: string]: number };

  // 船坞方法
  buildShip?(): { success: boolean; message?: string; duration?: number };
  getShipBuildQueue?(): any[];
  cancelBuild?(): boolean;

  // 装备工厂方法
  buildComponent?(componentType: string): {
    success: boolean;
    message?: string;
  };
  /**
   * 为飞船安装组件
   * @param ship 目标飞船对象
   * @param componentType 组件类型
   * @returns 是否安装成功
   */
  installComponent?(ship: Ship, componentType: string): boolean;
  getComponentInventory?(): { [component: string]: number };

  // 防御塔方法
  attack?(targetId: number): boolean;
  heal?(targetId: number): boolean;
  repair?(targetId: number): boolean;
  setAutoDefend?(enabled: boolean): boolean;

  // 工厂方法（FACTORY）
  /**
   * 开始生产指定类型的资源（立即扣除原材料和能量，需要等待指定 tick 后完成）
   * @param resourceType 要生产的资源类型（如 RESOURCE.METAL, RESOURCE.ENERGY, RESOURCE.ALLOY）
   * @returns 生产结果对象
   */
  produce?(resourceType: string): {
    success: boolean;
    message?: string;
    product?: string;
    duration?: number;
    output?: { [resource: string]: number };
  };
  /**
   * 获取当前生产状态和进度
   * @returns 生产状态对象，如果没有正在进行的生产则返回 null
   */
  getProductionStatus?(): {
    product: string;
    progress: number;
    duration: number;
    output: { [resource: string]: number };
  } | null;
  /**
   * 取消当前生产任务（已扣除的资源和能量不会退还）
   * @returns 是否成功取消
   */
  cancelProduction?(): boolean;
  /**
   * 获取工厂可生产的产品列表
   * @returns 可生产的资源类型数组
   */
  getAvailableProducts?(): string[];
  /**
   * 获取所有可用的生产配方
   * @returns 配方数组
   */
  getRecipes?(): Recipe[];
}

/** 星系对象 */
interface Galaxy {
  seed: number;
  name: string;
  positionX: number;
  positionY: number;
  starType: string;
  planetsCount: number;
  gridSize: number;
  minCoord: number;
  maxCoord: number;

  /** 获取星系内的所有自然星球（不包括玩家建造的空间站） */
  getPlanets(): Planet[];

  /** 获取星系内的所有空间站（玩家建造的） */
  getSpaceStations(): SpaceStation[];

  /** 获取星系内的所有跳跃门 */
  getJumpGates(): JumpGate[];

  /** 查看指定位置的所有对象 */
  lookAt(x: number, y: number): any[];

  // ========== 我的单位 ==========

  /** 获取我的所有飞船在此星系 */
  getMyShips(): Ship[];

  /** 获取我的所有建筑在此星系 */
  getMyStructures(): Structure[];

  /** 获取我的所有空间站在此星系 */
  getMyStations(): SpaceStation[];

  // ========== 所有单位（包括其他玩家） ==========

  /** 获取所有飞船在此星系（包括其他玩家的，隐形飞船除外） */
  getAllShips(): Ship[];

  /** 获取所有建筑在此星系（包括其他玩家的） */
  getAllStructures(): Structure[];

  /** 获取所有空间站在此星系（包括其他玩家的） */
  getAllStations(): SpaceStation[];

  // ========== 指定玩家的单位 ==========

  /** 获取指定玩家的飞船在此星系 */
  getShipsByOwner(ownerId: number): Ship[];

  /** 获取指定玩家的建筑在此星系 */
  getStructuresByOwner(ownerId: number): Structure[];

  /** 获取指定玩家的空间站在此星系 */
  getStationsByOwner(ownerId: number): SpaceStation[];

  // ========== 敌对单位 ==========

  /** 查找敌对飞船（所有非己方飞船） */
  findHostileShips(): Ship[];

  /** 查找敌对建筑（所有非己方建筑） */
  findHostileStructures(): Structure[];

  /** 查找敌对空间站（所有非己方空间站） */
  findHostileStations(): SpaceStation[];

  // ========== 区域扫描 ==========

  /** 扫描指定范围内的所有对象 */
  scanArea(x: number, y: number, radius: number): ScanResult;
}

/** 星球对象 */
interface Planet {
  name: string;
  type: string;
  size: number;
  resources: { [resource: string]: number };
  galaxyId: number;
  pos: Position;
  /** 星球上的所有建筑列表（仅包含你自己的建筑） */
  structures: Structure[];
  /** 获取星球上的所有建筑（方法形式，效果同 structures 属性） */
  getStructures(): Structure[];
}

/** 空间站对象 */
interface SpaceStation {
  /** 空间站ID（格式：station_galaxyId_x_y） */
  id: string;
  name: string;
  /** 类型（固定为 "space_station"） */
  type: string;
  size: number;
  /** 仓库资源（对象格式） */
  resources: { [resource: string]: number };
  galaxyId: number;
  pos: Position;
  /** 当前生命值 */
  hp: number;
  /** 最大生命值 */
  maxHP: number;
  /** 建造进度 (0-100) */
  progress: number;
  /** 所有者ID */
  ownerId?: number;
  /** 防御力 */
  defense?: number;
  /** 空间站上的所有建筑列表（仅包含你自己的建筑） */
  structures: Structure[];

  /** 获取空间站上的所有建筑（方法形式，效果同 structures 属性） */
  getStructures(): Structure[];

  /**
   * 空间站自毁（立即摧毁空间站）
   * 注意：空间站上必须没有任何建筑，需要先拆除所有建筑
   * @returns 是否成功自毁
   */
  selfDestruct(): boolean;
}

/** 跳跃门对象 */
interface JumpGate {
  position: Position;
  targetGalaxyId: number;
  targetGateName: string;
}

/** 组件信息 */
interface ComponentInfo {
  type: string;
  name: string;
  description: string;
  effects: {
    speed: number;
    storage: number;
    energy: number;
    attack: number;
    defense: number;
    shield: number;
    enableMining: boolean;
    enableBuilding: boolean;
    enableWarpJump: boolean;
    enableCloaking: boolean;
    enableRepair: boolean;
    energyCostPerTick: number;
  };
  buildCost: ResourceCost;
}

/** 建造成本 */
interface BuildCost {
  energy: number;
  resources: ResourceCost;
}

/** 资源成本 */
interface ResourceCost {
  [resource: string]: number;
}

/** 配方 */
interface Recipe {
  /** 主要产品名称 */
  product?: string;
  /** 输入资源 */
  input: { [resource: string]: number };
  /** 输出资源 */
  output: { [resource: string]: number };
  /** 生产时间（ticks） */
  time: number;
  /** 能量消耗 */
  energy: number;
}

/** 扫描结果 */
interface ScanResult {
  ships: Ship[];
  structures: Structure[];
  center: { x: number; y: number };
  radius: number;
}
