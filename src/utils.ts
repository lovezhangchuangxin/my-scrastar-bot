/**
 * 将飞船按星系分组
 */
export function groupShipsByGalaxy(ships: Ship[]) {
  const shipsByGalaxy: Record<number, Ship[]> = {};
  ships.forEach((ship) => {
    if (!shipsByGalaxy[ship.galaxyId]) {
      shipsByGalaxy[ship.galaxyId] = [];
    }
    shipsByGalaxy[ship.galaxyId].push(ship);
  });

  return shipsByGalaxy;
}

/**
 * 生成指定位数的随机 id
 */
export function generateId(length = 8) {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
