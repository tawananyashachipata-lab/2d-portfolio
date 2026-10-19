import type { LocationId } from "@/data/portfolio";

// Logical tile size in world pixels.
export const TILE = 32;
export const WORLD_W = 48;
export const WORLD_H = 32;

export type TileKind = "grass" | "grass2" | "path" | "water" | "tree" | "flower" | "rock" | "wall";

export type Building = {
  id: LocationId;
  name: string;
  // top-left tile of the building footprint (4x3 tiles)
  tx: number;
  ty: number;
  doorX: number; // tile of the door (interaction point is below it)
  color: string;
  roof: string;
  icon: string;
};

export const buildings: Building[] = [
  {
    id: "profile",
    name: "My Profile",
    tx: 4,
    ty: 4,
    doorX: 6,
    color: "#00E5FF",
    roof: "#7C3AED",
    icon: "ID",
  },
  {
    id: "skills",
    name: "My Skills",
    tx: 39,
    ty: 4,
    doorX: 41,
    color: "#A78BFA",
    roof: "#0EA5E9",
    icon: "SK",
  },
  {
    id: "tech",
    name: "Tech Stack",
    tx: 21,
    ty: 3,
    doorX: 23,
    color: "#38BDF8",
    roof: "#6D28D9",
    icon: "TS",
  },
  {
    id: "projects",
    name: "My Projects",
    tx: 4,
    ty: 22,
    doorX: 6,
    color: "#22D3EE",
    roof: "#7C3AED",
    icon: "PR",
  },
  {
    id: "certificates",
    name: "Certificates",
    tx: 39,
    ty: 22,
    doorX: 41,
    color: "#FACC15",
    roof: "#8B5CF6",
    icon: "CE",
  },
  {
    id: "contact",
    name: "Let's Connect",
    tx: 21,
    ty: 24,
    doorX: 23,
    color: "#39FF14",
    roof: "#0E7490",
    icon: "@",
  },
];

export const spawnPoint = { x: 24 * TILE, y: 15 * TILE };

const grid: TileKind[][] = [];

function setTile(x: number, y: number, k: TileKind) {
  const row = grid[y];
  if (row && x >= 0 && x < WORLD_W) row[x] = k;
}

function baseGrid() {
  for (let y = 0; y < WORLD_H; y++) {
    const row: TileKind[] = [];
    for (let x = 0; x < WORLD_W; x++) {
      row.push((x * 7 + y * 13) % 11 === 0 ? "grass2" : "grass");
    }
    grid.push(row);
  }
}

function carvePath(points: [number, number][]) {
  for (const [x, y] of points) {
    if (x >= 0 && x < WORLD_W && y >= 0 && y < WORLD_H) setTile(x, y, "path");
  }
}

function hPath(x0: number, x1: number, y: number) {
  const pts: [number, number][] = [];
  for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) pts.push([x, y]);
  carvePath(pts);
}

function vPath(y0: number, y1: number, x: number) {
  const pts: [number, number][] = [];
  for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) pts.push([x, y]);
  carvePath(pts);
}

function scatter(kind: TileKind, count: number, seed: number) {
  let placed = 0;
  let n = seed;
  while (placed < count && n < seed + 6000) {
    const x = (n * 37) % WORLD_W;
    const y = (n * 91) % WORLD_H;
    if (grid[y]?.[x] === "grass") {
      setTile(x, y, kind);
      placed++;
    }
    n++;
  }
}

function buildWorld() {
  baseGrid();

  // Central plaza
  for (let y = 13; y <= 17; y++) {
    for (let x = 20; x <= 27; x++) setTile(x, y, "path");
  }

  // Paths from plaza to each zone door
  hPath(6, 41, 12);
  vPath(7, 12, 23);
  vPath(8, 12, 6);
  vPath(8, 12, 41);
  vPath(12, 27, 6);
  vPath(12, 27, 41);
  hPath(6, 41, 20);
  vPath(17, 27, 23);

  // Water ponds in the mid-band corners
  for (let y = 14; y < 19; y++) {
    for (let x = 11; x < 17; x++) {
      const dx = x - 14;
      const dy = y - 16.5;
      if ((dx * dx) / 8 + (dy * dy) / 5 < 1) setTile(x, y, "water");
    }
  }
  for (let y = 14; y < 19; y++) {
    for (let x = 31; x < 37; x++) {
      const dx = x - 34;
      const dy = y - 16.5;
      if ((dx * dx) / 8 + (dy * dy) / 5 < 1) setTile(x, y, "water");
    }
  }

  // Building footprints
  for (const b of buildings) {
    for (let y = b.ty; y < b.ty + 3; y++) {
      for (let x = b.tx; x < b.tx + 4; x++) {
        if (y >= 0 && y < WORLD_H && x >= 0 && x < WORLD_W) setTile(x, y, "wall");
      }
    }
    const dy = b.ty + 3;
    setTile(b.doorX, dy, "path");
  }

  // Border trees
  for (let x = 0; x < WORLD_W; x++) {
    setTile(x, 0, "tree");
    setTile(x, WORLD_H - 1, "tree");
  }
  for (let y = 0; y < WORLD_H; y++) {
    setTile(0, y, "tree");
    setTile(WORLD_W - 1, y, "tree");
  }

  scatter("tree", 24, 3);
  scatter("flower", 44, 11);
  scatter("rock", 12, 23);
}

buildWorld();

export function tileAt(tx: number, ty: number): TileKind {
  if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return "tree";
  return grid[ty]?.[tx] ?? "tree";
}

export function isSolid(tx: number, ty: number): boolean {
  const t = tileAt(tx, ty);
  return t === "tree" || t === "water" || t === "rock" || t === "wall";
}

export function allTiles(): TileKind[][] {
  return grid;
}

// Nearest building within interaction range of a world position, if any.
export function nearbyBuilding(px: number, py: number): Building | null {
  for (const b of buildings) {
    const doorWorldX = (b.doorX + 0.5) * TILE;
    const doorWorldY = (b.ty + 3) * TILE;
    const dist = Math.hypot(px - doorWorldX, py - doorWorldY);
    if (dist < TILE * 1.7) return b;
  }
  return null;
}
