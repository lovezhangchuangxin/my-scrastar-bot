export function main() {
  const ships = Game.getMyShips();
  ships.forEach((ship) => {
    runShip(ship);
  });

  // console.log(Game.getStructureCost(STRUCTURE.FACTORY));
}

function runShip(ship: Ship) {
  const galaxy = Game.getGalaxy(ship.galaxyId);
  const planets = galaxy.getPlanets();
  const planet = planets[0];
  if (ship.pos.getRangeTo(planet.pos) > 1) {
    ship.moveTo(planet.pos);
  } else {
    ship.harvest(planet);
  }
}
