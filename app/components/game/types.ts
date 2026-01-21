export enum TileType {
  Grass = "grass",
  Road = "road",
  Asphalt = "asphalt",
  Tile = "tile",
  Snow = "snow",
  Building = "building",
}

// Simplified tool types - Building is now generic, actual building selected separately
export enum ToolType {
  None = "none",
  RoadNetwork = "roadNetwork",
  Asphalt = "asphalt",
  Tile = "tile",
  Snow = "snow",
  Building = "building", // Generic - actual building ID stored separately
  Eraser = "eraser",
}

export interface GridCell {
  type: TileType;
  x: number;
  y: number;
  // For multi-tile objects, marks the origin (top-left in grid coords)
  isOrigin?: boolean;
  originX?: number;
  originY?: number;
  // For buildings, specify the ID (from building registry)
  buildingId?: string;
  // For rotatable buildings, specify the orientation (defaults to Down/South)
  buildingOrientation?: Direction;
  // For props, store the underlying tile type (so props don't render their own floor)
  underlyingTileType?: TileType;
}

export enum Direction {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

export enum LightingType {
  Day = "day",
  Night = "night",
  Sunset = "sunset",
}

export interface VisualSettings {
  blueness: number; // -100 to 100 (hue shift toward blue)
  contrast: number; // 0.5 to 2.0
  saturation: number; // 0.5 to 2.0
  brightness: number; // 0.5 to 2.0
}

export enum CharacterType {
  Banana = "banana",
  Apple = "apple",
}

export interface Character {
  id: string;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
  characterType: CharacterType;
}

export enum CarType {
  Truck1 = "truck-1",
  Truck2 = "truck-2",
  Truck3 = "truck-3",
}

// Truck status from backend
export enum TruckStatus {
  IDLE = "IDLE",
  SERVING = "SERVING",
  MOVING = "MOVING",
  RESTOCKING = "RESTOCKING",
}

// Truck state from backend API
export interface TruckState {
  id: string;
  status: TruckStatus;
  current_zone: string;
  destination_zone?: string | null;
  arrival_time: number;
}

export interface BuildingOrigin {
  x: number;
  y: number;
}

export interface Car {
  id: string;
  x: number;
  y: number;
  direction: Direction;
  speed: number;
  waiting: number;
  carType: CarType;
  isParked: boolean;
  path: Array<{ x: number; y: number }>;
  pathIndex: number;
  parkedAtBuilding?: BuildingOrigin;
  destinationBuilding?: BuildingOrigin;
  // Zone-based parking (for fleet trucks)
  parkedAtZone?: string;
  destinationZone?: string;
}

export const GRID_WIDTH = 48;
export const GRID_HEIGHT = 48;

export const CAR_SPEED = 0.05;

// Zone configuration for Fleet Feast city regions
export interface ZoneConfig {
  id: string;
  name: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  tileType: TileType;
  // Color for boundary overlay (hex string with alpha, e.g., "0xff0000" for red)
  borderColor: number;
  // Optional label position offset from center
  labelOffset?: { x: number; y: number };
  parking_zones: Array<{x: number, y: number}>
}

// Isometric tile dimensions (44x22 isometric diamond)
export const TILE_WIDTH = 44;
export const TILE_HEIGHT = 22;

// Tile sizes for different types (in grid cells) - this is the FOOTPRINT
export const TILE_SIZES: Record<TileType, { w: number; h: number }> = {
  [TileType.Grass]: { w: 1, h: 1 },
  [TileType.Road]: { w: 1, h: 1 },
  [TileType.Asphalt]: { w: 1, h: 1 },
  [TileType.Tile]: { w: 1, h: 1 },
  [TileType.Snow]: { w: 1, h: 1 },
  [TileType.Building]: { w: 4, h: 4 }, // Default, actual size from building registry
};

// Character movement constants
export const CHARACTER_PIXELS_PER_FRAME_X = 13 / 58;
export const CHARACTER_PIXELS_PER_FRAME_Y = 5 / 58;
export const CHARACTER_SPEED = 0.015;

// Convert grid coordinates to isometric screen coordinates
export function gridToIso(gridX: number, gridY: number): { x: number; y: number } {
  return {
    x: (gridX - gridY) * (TILE_WIDTH / 2),
    y: (gridX + gridY) * (TILE_HEIGHT / 2),
  };
}

// Convert isometric screen coordinates back to grid coordinates
export function isoToGrid(isoX: number, isoY: number): { x: number; y: number } {
  return {
    x: (isoX / (TILE_WIDTH / 2) + isoY / (TILE_HEIGHT / 2)) / 2,
    y: (isoY / (TILE_HEIGHT / 2) - isoX / (TILE_WIDTH / 2)) / 2,
  };
}
