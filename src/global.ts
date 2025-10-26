declare global {
  namespace globalThis {
    /** 我的飞船 */
    var myShips: Record<string, Ship>;
    /** 我的建筑 */
    var myStructures: Record<string, Structure>;
    /** 我的星系 */
    var myGalaxies: Record<string, Galaxy>;
  }
}

var global = {} as any;

export function initGlobal() {
  global.myShips = {};
  global.myStructures = {};
  global.myGalaxies = {};

  Game.getMyShips().forEach((ship) => {
    global.myShips[ship.id] = ship;
    if (!global.myGalaxies[ship.galaxyId]) {
      global.myGalaxies[ship.galaxyId] = Game.getGalaxy(ship.galaxyId);
    }
  });

  Game.getMyStructures().forEach((structure) => {
    global.myStructures[structure.id] = structure;
  });
}
