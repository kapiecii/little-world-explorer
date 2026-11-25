import { Config } from '../core/Config.js';

export class TerrainGenerator {
  constructor() {
    this.width = Config.WORLD.WIDTH;
    this.depth = Config.WORLD.DEPTH;
    this.maxHeight = Config.WORLD.MAX_HEIGHT;
  }

  /**
   * Generates deterministic terrain and initial interactive objects for a stage.
   * Supported stages: 'island' (Nature Island) and 'town' (Sunny Town).
   */
  generate(stageId = 'island') {
    if (stageId === 'town') {
      return this._generateTown();
    }
    return this._generateIsland();
  }

  _generateIsland() {
    const blocks = new Map(); // "x,y,z" -> blockId
    const objects = [];
    const riverCoords = new Set();

    const setBlock = (x, y, z, id) => {
      if (x < 0 || x >= this.width || z < 0 || z >= this.depth || y < 0 || y >= this.maxHeight) return;
      blocks.set(`${x},${y},${z}`, id);
    };

    const cx = this.width / 2;
    const cz = this.depth / 2;

    for (let x = 0; x < this.width; x++) {
      for (let z = 0; z < this.depth; z++) {
        const dx = (x - cx) / (this.width * 0.46);
        const dz = (z - cz) / (this.depth * 0.46);
        const dist = Math.sqrt(dx * dx + dz * dz);

        // River path winding horizontally near z = 27..30
        const riverCenterZ = Math.round(28 + Math.sin(x * 0.14) * 2.5);
        const distToRiver = Math.abs(z - riverCenterZ);

        if (dist > 1.02) {
          // Ocean water surround
          setBlock(x, 0, z, 'sand');
          setBlock(x, 1, z, 'water');
          continue;
        }

        if (dist > 0.9) {
          // Sandy beach shore
          setBlock(x, 0, z, 'dirt');
          setBlock(x, 1, z, 'sand');
          continue;
        }

        if (distToRiver <= 1.5 && dist <= 0.9) {
          // River channel cutting through the island
          setBlock(x, 0, z, 'sand');
          setBlock(x, 1, z, 'water');
          riverCoords.add(`${x},${z}`);
          continue;
        }

        if (distToRiver <= 2.6) {
          // Riverbank sand
          setBlock(x, 0, z, 'dirt');
          setBlock(x, 1, z, 'sand');
          continue;
        }

        // Base island height (gentle hills in Forest NW, flat in Building & Grassland)
        let surfaceY = 2;
        if (x < 24 && z < 24 && dist < 0.78) {
          // Forest gentle hills
          const hill = Math.floor((Math.sin(x * 0.25) + Math.cos(z * 0.25) + 2) * 0.45);
          surfaceY = 2 + Math.min(2, Math.max(0, hill));
        }

        setBlock(x, 0, z, 'stone');
        for (let y = 1; y < surfaceY; y++) {
          setBlock(x, y, z, 'dirt');
        }
        setBlock(x, surfaceY, z, 'grass');
      }
    }

    // Building Area (West/Southwest: x 12..24, z 34..46): Starter colorful display & house wall
    this._buildStarterStructures(setBlock);

    // Populate interactive objects across the 6 areas
    this._populateObjects(objects, blocks);

    return {
      blocks,
      objects,
      riverCoords,
      tableAnchor: { x: 22, y: 3, z: 38 }
    };
  }

  _buildStarterStructures(setBlock) {
    // Colorful stepping blocks in Building Area (x: 15..18, z: 38)
    setBlock(14, 3, 36, 'red');
    setBlock(15, 3, 36, 'blue');
    setBlock(16, 3, 36, 'yellow');
    setBlock(17, 3, 36, 'green');

    // Small cute playhouse arch in Building Area (x: 14..18, z: 43..46)
    for (let x = 14; x <= 18; x++) {
      for (let z = 43; z <= 46; z++) {
        setBlock(x, 2, z, 'white');
      }
    }
    // Corner pillars
    for (let y = 3; y <= 5; y++) {
      setBlock(14, y, 43, 'brown');
      setBlock(18, y, 43, 'brown');
      setBlock(14, y, 46, 'brown');
      setBlock(18, y, 46, 'brown');
    }
    // Roof
    for (let x = 14; x <= 18; x++) {
      for (let z = 43; z <= 46; z++) {
        setBlock(x, 6, z, 'red');
      }
    }

    // Small stone outcrop near Grassland / Forest border for easy stone collection
    setBlock(28, 3, 34, 'stone');
    setBlock(29, 3, 34, 'stone');
    setBlock(28, 4, 34, 'stone');
    setBlock(27, 3, 35, 'stone');
    setBlock(29, 3, 35, 'stone');
  }

  _populateObjects(objects, blocks) {
    const getTopY = (x, z) => {
      for (let y = this.maxHeight - 1; y >= 0; y--) {
        if (blocks.has(`${x},${y},${z}`)) return y + 1;
      }
      return 3;
    };

    // 1. Grassland (Central South: around player spawn 32, 38)
    const appleSpots = [
      [34, 36], [36, 39], [30, 41], [38, 35], [26, 40]
    ];
    appleSpots.forEach(([x, z], i) => {
      objects.push({
        uid: `apple_${i}`,
        id: 'apple',
        position: [x, getTopY(x, z), z]
      });
    });

    const flowerSpots = [
      { id: 'flower_red', pos: [33, 35] },
      { id: 'flower_red', pos: [37, 41] },
      { id: 'flower_yellow', pos: [31, 36] },
      { id: 'flower_yellow', pos: [35, 43] },
      { id: 'flower_blue', pos: [29, 38] },
      { id: 'flower_blue', pos: [39, 38] }
    ];
    flowerSpots.forEach((f, i) => {
      const [x, z] = f.pos;
      objects.push({
        uid: `flower_${i}`,
        id: f.id,
        position: [x, getTopY(x, z), z]
      });
    });

    // Trees in Grassland & Forest (NW)
    const treeSpots = [
      [36, 33], [26, 33], [41, 42],
      [16, 16], [20, 14], [14, 21], [23, 19], [18, 23], [27, 17]
    ];
    treeSpots.forEach(([x, z], i) => {
      objects.push({
        uid: `tree_${i}`,
        id: 'tree',
        position: [x, getTopY(x, z), z]
      });
    });

    // 2. Forest (NW: mushrooms & cat)
    const mushroomSpots = [
      [17, 18], [21, 16], [15, 22], [24, 21]
    ];
    mushroomSpots.forEach(([x, z], i) => {
      objects.push({
        uid: `mushroom_${i}`,
        id: 'mushroom',
        position: [x, getTopY(x, z), z]
      });
    });

    objects.push({
      uid: 'cat_1',
      id: 'cat',
      position: [22, getTopY(22, 22), 22]
    });

    // 3. River (Middle Z ~ 28: Fish swimming in water)
    const fishSpots = [
      [25, 28], [32, 29], [39, 27]
    ];
    fishSpots.forEach(([x, z], i) => {
      objects.push({
        uid: `fish_${i}`,
        id: 'fish',
        position: [x, 1.6, z]
      });
    });

    // 4. Farm Area (NE: x 38..48, z 16..23)
    const farmPlots = [
      [40, 20], [42, 20], [44, 20], [40, 22], [42, 22], [44, 22]
    ];
    farmPlots.forEach(([x, z], i) => {
      objects.push({
        uid: `farm_plot_${i}`,
        id: 'farm_plot',
        position: [x, getTopY(x, z), z],
        growthStage: i === 0 ? 1 : 0 // First plot already has a sprout for curiosity!
      });
    });

    const seedSpots = [
      [38, 21], [46, 21]
    ];
    seedSpots.forEach(([x, z], i) => {
      objects.push({
        uid: `seed_${i}`,
        id: 'seed_item',
        position: [x, getTopY(x, z), z]
      });
    });

    // 5. Building & Shape Area (SW: x 14..24, z 34..46)
    objects.push(
      { uid: 'shape_cube_1', id: 'shape_cube', position: [19, getTopY(19, 35), 35] },
      { uid: 'shape_sphere_1', id: 'shape_sphere', position: [21, getTopY(21, 35), 35] },
      { uid: 'shape_cylinder_1', id: 'shape_cylinder', position: [23, getTopY(23, 35), 35] },
      { uid: 'shape_triangle_1', id: 'shape_triangle', position: [25, getTopY(25, 35), 35] },
      { uid: 'table_box_1', id: 'table_box', position: [22, getTopY(22, 38), 38] }
    );

    // 6. Animal Area (SE: x 40..50, z 34..46)
    objects.push(
      { uid: 'dog_1', id: 'dog', position: [38, getTopY(38, 38), 38] },
      { uid: 'cow_1', id: 'cow', position: [44, getTopY(44, 37), 37] },
      { uid: 'sheep_1', id: 'sheep', position: [47, getTopY(47, 40), 40] },
      { uid: 'chicken_1', id: 'chicken', position: [42, getTopY(42, 41), 41] }
    );

    // 7. Magic Travel Gate to Sunny Town (right near spawn!)
    objects.push({
      uid: 'travel_gate_to_town',
      id: 'travel_gate',
      position: [32, getTopY(32, 34), 34]
    });
  }

  _generateTown() {
    const blocks = new Map();
    const objects = [];
    const riverCoords = new Set();

    const setBlock = (x, y, z, id) => {
      if (x < 0 || x >= this.width || z < 0 || z >= this.depth || y < 0 || y >= this.maxHeight) return;
      blocks.set(`${x},${y},${z}`, id);
    };

    const cx = this.width / 2;
    const cz = this.depth / 2;

    // 1. Base town terrain: roads, sidewalks, park grass, and outer border
    for (let x = 0; x < this.width; x++) {
      for (let z = 0; z < this.depth; z++) {
        const dx = Math.abs(x - cx);
        const dz = Math.abs(z - cz);

        if (dx > 27 || dz > 27) {
          // Surrounding sea / canal edge
          setBlock(x, 0, z, 'stone');
          setBlock(x, 1, z, 'water');
          continue;
        }

        setBlock(x, 0, z, 'stone');
        setBlock(x, 1, z, 'dirt');

        // Main cross-shaped asphalt roads (x: 29..34, z: 29..34)
        const onVerticalRoad = x >= 29 && x <= 34;
        const onHorizontalRoad = z >= 29 && z <= 34;

        if (onVerticalRoad || onHorizontalRoad) {
          // Crosswalk white stripes near intersection edges
          const isCrosswalk =
            ((z === 28 || z === 35) && onVerticalRoad && x % 2 === 0) ||
            ((x === 28 || x === 35) && onHorizontalRoad && z % 2 === 0) ||
            ((z === 29 || z === 34) && onVerticalRoad && !onHorizontalRoad && x % 2 === 0) ||
            ((x === 29 || x === 34) && onHorizontalRoad && !onVerticalRoad && z % 2 === 0);
          setBlock(x, 2, z, isCrosswalk ? 'white' : 'gray');
        } else if ((x >= 27 && x <= 36) || (z >= 27 && z <= 36)) {
          // Clean stone sidewalks along the main roads
          setBlock(x, 2, z, 'white');
        } else {
          // Town blocks & park greenery
          setBlock(x, 2, z, 'grass');
        }
      }
    }

    // 2. Town Buildings
    const buildBoxHouse = (x0, z0, w, d, h, wallId, roofId, hasWindows = true) => {
      for (let x = x0; x < x0 + w; x++) {
        for (let z = z0; z < z0 + d; z++) {
          setBlock(x, 2, z, 'white');
          for (let y = 3; y < 3 + h; y++) {
            const isEdge = x === x0 || x === x0 + w - 1 || z === z0 || z === z0 + d - 1;
            if (!isEdge) continue;
            // Front door opening on the road-facing side
            const isFrontDoor = z === z0 + d - 1 && x === x0 + Math.floor(w / 2) && y <= 4;
            if (isFrontDoor) continue;
            const isWindow = hasWindows && y === 4 && (x === x0 + 1 || x === x0 + w - 2) && (z === z0 + d - 1 || z === z0);
            setBlock(x, y, z, isWindow ? 'glass' : wallId);
          }
          setBlock(x, 3 + h, z, roofId);
        }
      }
    };

    // NW Quadrant: Warm Bakery Shop (x: 16..24, z: 16..23)
    buildBoxHouse(16, 16, 8, 7, 4, 'yellow', 'red', true);
    // Bakery awning
    for (let x = 16; x < 24; x++) {
      setBlock(x, 5, 23, x % 2 === 0 ? 'red' : 'white');
    }

    // NE Quadrant: Sunny School & Library (x: 39..49, z: 16..23)
    buildBoxHouse(39, 16, 10, 7, 5, 'white', 'blue', true);

    // SE Quadrant: Cozy Town House & Bus Shelter (x: 41..48, z: 40..46)
    buildBoxHouse(41, 40, 7, 6, 4, 'brown', 'green', true);

    // SW Quadrant: Town Park Plaza paving around fountain (x: 18..24, z: 39..45)
    for (let x = 18; x <= 24; x++) {
      for (let z = 39; z <= 45; z++) {
        if (x === 18 || x === 24 || z === 39 || z === 45) {
          setBlock(x, 2, z, 'sand');
        }
      }
    }

    // 3. Interactive Town Objects
    const topY = 3;

    // Magic Travel Gate back to Nature Island (near spawn [32, 5, 38])
    objects.push({
      uid: 'travel_gate_to_island',
      id: 'travel_gate',
      position: [32, topY, 35]
    });

    // Vehicles on the roads
    objects.push(
      { uid: 'town_car_1', id: 'car', position: [30, topY, 22] },
      { uid: 'town_car_2', id: 'car', position: [22, topY, 31] },
      { uid: 'town_bus_1', id: 'bus', position: [33, topY, 43] },
      { uid: 'town_bicycle_1', id: 'bicycle', position: [27, topY, 40] },
      { uid: 'town_bicycle_2', id: 'bicycle', position: [37, topY, 26] }
    );

    // Interactive Traffic Lights at the main crosswalk intersection
    objects.push(
      { uid: 'town_signal_1', id: 'traffic_light', position: [28, topY, 28], signalState: 0 },
      { uid: 'town_signal_2', id: 'traffic_light', position: [35, topY, 35], signalState: 2 }
    );

    // Collectible Bread in front of Bakery (NW)
    const breadSpots = [[18, 25], [20, 25], [22, 25], [24, 25]];
    breadSpots.forEach(([x, z], i) => {
      objects.push({ uid: `town_bread_${i}`, id: 'bread', position: [x, topY, z] });
    });

    // Collectible Books in front of School (NE)
    const bookSpots = [[40, 25], [43, 25], [46, 25], [48, 25]];
    bookSpots.forEach(([x, z], i) => {
      objects.push({ uid: `town_book_${i}`, id: 'book', position: [x, topY, z] });
    });

    // Collectible Ice Creams in the Park (SW)
    const iceCreamSpots = [[17, 40], [17, 44], [25, 40], [25, 44]];
    iceCreamSpots.forEach(([x, z], i) => {
      objects.push({ uid: `town_ice_cream_${i}`, id: 'ice_cream', position: [x, topY, z] });
    });

    // Park Fountain, Benches, Trees, and Flowers (SW)
    objects.push(
      { uid: 'town_fountain_1', id: 'fountain', position: [21, topY, 42] },
      { uid: 'town_bench_1', id: 'bench', position: [19, topY, 42] },
      { uid: 'town_bench_2', id: 'bench', position: [23, topY, 42] },
      { uid: 'town_tree_1', id: 'tree', position: [15, topY, 38] },
      { uid: 'town_tree_2', id: 'tree', position: [15, topY, 46] },
      { uid: 'town_flower_1', id: 'flower_red', position: [19, topY, 40] },
      { uid: 'town_flower_2', id: 'flower_yellow', position: [23, topY, 40] },
      { uid: 'town_flower_3', id: 'flower_blue', position: [21, topY, 45] }
    );

    // Town Landmarks: Clock Tower, Mailbox, Street Lamps (SE & Sidewalks)
    objects.push(
      { uid: 'town_clock_1', id: 'clock_tower', position: [38, topY, 38] },
      { uid: 'town_mailbox_1', id: 'mailbox', position: [37, topY, 41] },
      { uid: 'town_lamp_1', id: 'street_lamp', position: [27, topY, 36] },
      { uid: 'town_lamp_2', id: 'street_lamp', position: [36, topY, 27] },
      { uid: 'town_lamp_3', id: 'street_lamp', position: [36, topY, 44] }
    );

    return {
      blocks,
      objects,
      riverCoords,
      tableAnchor: null
    };
  }
}
