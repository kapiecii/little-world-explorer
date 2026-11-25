export const DEFAULT_BLOCKS = [
  {
    "id": "grass",
    "category": "terrain",
    "name": {
      "en": "Grass",
      "ja": "草ブロック"
    },
    "color": "#58b847",
    "topColor": "#6fd158",
    "sideColor": "#8b6343",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "grass",
    "icon": "🟩",
    "audio": {
      "name": "grass"
    },
    "learning": {
      "english": true,
      "color": "green",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape"
      ]
    }
  },
  {
    "id": "dirt",
    "category": "terrain",
    "name": {
      "en": "Dirt",
      "ja": "土ブロック"
    },
    "color": "#8b5a3c",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "dirt",
    "icon": "🟫",
    "audio": {
      "name": "dirt"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape"
      ]
    }
  },
  {
    "id": "sand",
    "category": "terrain",
    "name": {
      "en": "Sand",
      "ja": "砂ブロック"
    },
    "color": "#f2d680",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "sand",
    "icon": "🟨",
    "audio": {
      "name": "sand"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "science"
      ]
    }
  },
  {
    "id": "stone",
    "category": "nature",
    "name": {
      "en": "Stone",
      "ja": "石ブロック"
    },
    "color": "#9099a2",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "stone",
    "icon": "🪨",
    "audio": {
      "name": "stone"
    },
    "learning": {
      "english": true,
      "color": "gray",
      "shape": "cube",
      "countable": true,
      "sinkInWater": true,
      "category": [
        "english",
        "math",
        "science"
      ]
    }
  },
  {
    "id": "water",
    "category": "nature",
    "name": {
      "en": "Water",
      "ja": "水"
    },
    "color": "#38a3f8",
    "opacity": 0.72,
    "transparent": true,
    "shape": "cube",
    "solid": false,
    "breakable": false,
    "dropItem": "water",
    "icon": "💧",
    "audio": {
      "name": "water"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "shape": "cube",
      "countable": false,
      "category": [
        "english",
        "science"
      ]
    }
  },
  {
    "id": "wood",
    "category": "nature",
    "name": {
      "en": "Wood",
      "ja": "木（木材）"
    },
    "color": "#9c6635",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "wood",
    "icon": "🪵",
    "audio": {
      "name": "wood"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "shape": "cube",
      "countable": true,
      "floatInWater": true,
      "category": [
        "english",
        "math",
        "science"
      ]
    }
  },
  {
    "id": "leaves",
    "category": "nature",
    "name": {
      "en": "Leaves",
      "ja": "葉っぱ"
    },
    "color": "#3ca342",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "leaves",
    "icon": "🍃",
    "audio": {
      "name": "leaves"
    },
    "learning": {
      "english": true,
      "color": "green",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "science"
      ]
    }
  },
  {
    "id": "red",
    "category": "color",
    "name": {
      "en": "Red Block",
      "ja": "赤いブロック"
    },
    "color": "#ff4b4b",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "red",
    "icon": "🟥",
    "audio": {
      "name": "red_block"
    },
    "learning": {
      "english": true,
      "color": "red",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "math",
        "spatial"
      ]
    }
  },
  {
    "id": "blue",
    "category": "color",
    "name": {
      "en": "Blue Block",
      "ja": "青いブロック"
    },
    "color": "#3b82f6",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "blue",
    "icon": "🟦",
    "audio": {
      "name": "blue_block"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "math",
        "spatial"
      ]
    }
  },
  {
    "id": "yellow",
    "category": "color",
    "name": {
      "en": "Yellow Block",
      "ja": "黄色いブロック"
    },
    "color": "#facc15",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "yellow",
    "icon": "🟨",
    "audio": {
      "name": "yellow_block"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "math",
        "spatial"
      ]
    }
  },
  {
    "id": "green",
    "category": "color",
    "name": {
      "en": "Green Block",
      "ja": "緑のブロック"
    },
    "color": "#22c55e",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "green",
    "icon": "🟩",
    "audio": {
      "name": "green_block"
    },
    "learning": {
      "english": true,
      "color": "green",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "math",
        "spatial"
      ]
    }
  },
  {
    "id": "white",
    "category": "building",
    "name": {
      "en": "White Block",
      "ja": "白いブロック"
    },
    "color": "#f8fafc",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "white",
    "icon": "⬜",
    "audio": {
      "name": "white_block"
    },
    "learning": {
      "english": true,
      "color": "white",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "spatial"
      ]
    }
  },
  {
    "id": "gray",
    "category": "building",
    "name": {
      "en": "Gray Block",
      "ja": "灰色のブロック"
    },
    "color": "#64748b",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "gray",
    "icon": "⬛",
    "audio": {
      "name": "gray_block"
    },
    "learning": {
      "english": true,
      "color": "gray",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "spatial"
      ]
    }
  },
  {
    "id": "brown",
    "category": "building",
    "name": {
      "en": "Brown Block",
      "ja": "茶色のブロック"
    },
    "color": "#78350f",
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "brown",
    "icon": "🟫",
    "audio": {
      "name": "brown_block"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "spatial"
      ]
    }
  },
  {
    "id": "flower",
    "category": "decoration",
    "name": {
      "en": "Flower",
      "ja": "花"
    },
    "color": "#f43f5e",
    "shape": "flower",
    "solid": false,
    "breakable": true,
    "dropItem": "flower",
    "icon": "🌸",
    "audio": {
      "name": "flower"
    },
    "learning": {
      "english": true,
      "color": "red",
      "shape": "circle",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "science",
        "math"
      ]
    }
  },
  {
    "id": "glass",
    "category": "decoration",
    "name": {
      "en": "Glass",
      "ja": "ガラス"
    },
    "color": "#bae6fd",
    "opacity": 0.45,
    "transparent": true,
    "shape": "cube",
    "solid": true,
    "breakable": true,
    "dropItem": "glass",
    "icon": "🧊",
    "audio": {
      "name": "glass"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "shape": "cube",
      "countable": true,
      "category": [
        "english",
        "color_shape",
        "science"
      ]
    }
  }
];

export const DEFAULT_OBJECTS = [
  {
    "id": "apple",
    "type": "food",
    "name": {
      "en": "Apple",
      "ja": "リンゴ"
    },
    "icon": "🍎",
    "color": "#ef4444",
    "audio": {
      "name": "Apple",
      "level1": "Apple!",
      "level2": "Red Apple!",
      "level3": "This is a sweet red apple!"
    },
    "learning": {
      "english": true,
      "color": "red",
      "shape": "sphere",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "math",
        "color_shape"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ]
  },
  {
    "id": "tree",
    "type": "nature",
    "name": {
      "en": "Tree",
      "ja": "木"
    },
    "icon": "🌳",
    "color": "#22c55e",
    "audio": {
      "name": "Tree",
      "level1": "Tree!",
      "level2": "Big Green Tree!",
      "level3": "Look at the big green tree!"
    },
    "learning": {
      "english": true,
      "color": "green",
      "shape": "cylinder",
      "size": "big",
      "countable": true,
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "harvest"
    ],
    "dropItem": "wood"
  },
  {
    "id": "flower_red",
    "type": "nature",
    "name": {
      "en": "Red Flower",
      "ja": "赤い花"
    },
    "icon": "🌹",
    "color": "#f43f5e",
    "audio": {
      "name": "Flower",
      "level1": "Flower!",
      "level2": "Red Flower!",
      "level3": "You found a pretty red flower!"
    },
    "learning": {
      "english": true,
      "color": "red",
      "shape": "circle",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "color_shape",
        "math",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ],
    "collectId": "flower"
  },
  {
    "id": "flower_yellow",
    "type": "nature",
    "name": {
      "en": "Yellow Flower",
      "ja": "黄色い花"
    },
    "icon": "🌻",
    "color": "#facc15",
    "audio": {
      "name": "Yellow Flower",
      "level1": "Flower!",
      "level2": "Yellow Flower!",
      "level3": "Look at the bright yellow flower!"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "shape": "circle",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "color_shape",
        "math",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ],
    "collectId": "flower"
  },
  {
    "id": "flower_blue",
    "type": "nature",
    "name": {
      "en": "Blue Flower",
      "ja": "青い花"
    },
    "icon": "💠",
    "color": "#38bdf8",
    "audio": {
      "name": "Blue Flower",
      "level1": "Flower!",
      "level2": "Blue Flower!",
      "level3": "A lovely blue flower is blooming!"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "shape": "circle",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "color_shape",
        "math",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ],
    "collectId": "flower"
  },
  {
    "id": "mushroom",
    "type": "nature",
    "name": {
      "en": "Mushroom",
      "ja": "キノコ"
    },
    "icon": "🍄",
    "color": "#fb7185",
    "audio": {
      "name": "Mushroom",
      "level1": "Mushroom!",
      "level2": "Small Mushroom!",
      "level3": "A mushroom grows in the forest!"
    },
    "learning": {
      "english": true,
      "color": "red",
      "shape": "circle",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "science",
        "math"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ]
  },
  {
    "id": "seed_item",
    "type": "nature",
    "name": {
      "en": "Seed",
      "ja": "種（タネ）"
    },
    "icon": "🌱",
    "color": "#84cc16",
    "audio": {
      "name": "Seed",
      "level1": "Seed!",
      "level2": "Small Seed!",
      "level3": "Plant a seed to make a flower grow!"
    },
    "learning": {
      "english": true,
      "color": "green",
      "shape": "sphere",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ],
    "collectId": "seed"
  },
  {
    "id": "farm_plot",
    "type": "science",
    "name": {
      "en": "Garden Plot",
      "ja": "畑"
    },
    "icon": "🪴",
    "color": "#78350f",
    "audio": {
      "name": "Garden",
      "level1": "Garden!",
      "level2": "Plant a seed!",
      "level3": "Plant a seed and give it water to grow!"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "shape": "square",
      "countable": false,
      "categories": [
        "science",
        "english",
        "logic"
      ]
    },
    "interactions": [
      "observe",
      "plant",
      "water"
    ]
  },
  {
    "id": "cow",
    "type": "animal",
    "name": {
      "en": "Cow",
      "ja": "ウシ"
    },
    "icon": "🐮",
    "color": "#f8fafc",
    "audio": {
      "name": "Cow",
      "level1": "Cow!",
      "level2": "Big Cow! Moo!",
      "level3": "The big cow says Moo!"
    },
    "learning": {
      "english": true,
      "color": "white",
      "size": "big",
      "countable": true,
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "pet"
    ]
  },
  {
    "id": "sheep",
    "type": "animal",
    "name": {
      "en": "Sheep",
      "ja": "ヒツジ"
    },
    "icon": "🐑",
    "color": "#f1f5f9",
    "audio": {
      "name": "Sheep",
      "level1": "Sheep!",
      "level2": "White Sheep! Baa!",
      "level3": "The fluffy white sheep says Baa!"
    },
    "learning": {
      "english": true,
      "color": "white",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "pet"
    ]
  },
  {
    "id": "chicken",
    "type": "animal",
    "name": {
      "en": "Chicken",
      "ja": "ニワトリ"
    },
    "icon": "🐔",
    "color": "#fef08a",
    "audio": {
      "name": "Chicken",
      "level1": "Chicken!",
      "level2": "Small Chicken!",
      "level3": "The small chicken walks around!"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "pet"
    ]
  },
  {
    "id": "dog",
    "type": "animal",
    "name": {
      "en": "Dog",
      "ja": "イヌ"
    },
    "icon": "🐶",
    "color": "#d97706",
    "audio": {
      "name": "Dog",
      "level1": "Dog!",
      "level2": "Friendly Dog! Woof!",
      "level3": "The happy dog wags its tail! Woof!"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "pet"
    ]
  },
  {
    "id": "cat",
    "type": "animal",
    "name": {
      "en": "Cat",
      "ja": "ネコ"
    },
    "icon": "🐱",
    "color": "#fb923c",
    "audio": {
      "name": "Cat",
      "level1": "Cat!",
      "level2": "Cute Cat! Meow!",
      "level3": "The orange cat says Meow!"
    },
    "learning": {
      "english": true,
      "color": "orange",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe",
      "pet"
    ]
  },
  {
    "id": "fish",
    "type": "animal",
    "name": {
      "en": "Fish",
      "ja": "サカナ"
    },
    "icon": "🐟",
    "color": "#38bdf8",
    "audio": {
      "name": "Fish",
      "level1": "Fish!",
      "level2": "Blue Fish!",
      "level3": "The fish swims in the water!"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "size": "small",
      "countable": true,
      "categories": [
        "english",
        "science",
        "spatial"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "shape_sphere",
    "type": "shape_object",
    "name": {
      "en": "Sphere",
      "ja": "球（スフィア）"
    },
    "icon": "🔮",
    "color": "#a855f7",
    "audio": {
      "name": "Sphere",
      "level1": "Sphere!",
      "level2": "Purple Sphere!",
      "level3": "A sphere is round like a ball!"
    },
    "learning": {
      "english": true,
      "color": "purple",
      "shape": "sphere",
      "countable": true,
      "categories": [
        "color_shape",
        "english"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "shape_cylinder",
    "type": "shape_object",
    "name": {
      "en": "Cylinder",
      "ja": "円柱（シリンダー）"
    },
    "icon": "🛢️",
    "color": "#f97316",
    "audio": {
      "name": "Cylinder",
      "level1": "Cylinder!",
      "level2": "Orange Cylinder!",
      "level3": "This orange pillar is a cylinder!"
    },
    "learning": {
      "english": true,
      "color": "orange",
      "shape": "cylinder",
      "countable": true,
      "categories": [
        "color_shape",
        "english"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "shape_triangle",
    "type": "shape_object",
    "name": {
      "en": "Triangle",
      "ja": "三角（トライアングル）"
    },
    "icon": "🔺",
    "color": "#eab308",
    "audio": {
      "name": "Triangle",
      "level1": "Triangle!",
      "level2": "Yellow Triangle!",
      "level3": "A triangle has three corners!"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "shape": "triangle",
      "countable": true,
      "categories": [
        "color_shape",
        "english",
        "math"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "shape_cube",
    "type": "shape_object",
    "name": {
      "en": "Cube",
      "ja": "立方体（キューブ）"
    },
    "icon": "🧊",
    "color": "#3b82f6",
    "audio": {
      "name": "Cube",
      "level1": "Cube!",
      "level2": "Blue Cube!",
      "level3": "This box shape is called a cube!"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "shape": "cube",
      "countable": true,
      "categories": [
        "color_shape",
        "english",
        "spatial"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "table_box",
    "type": "spatial_object",
    "name": {
      "en": "Table",
      "ja": "テーブル"
    },
    "icon": "🪑",
    "color": "#b45309",
    "audio": {
      "name": "Table",
      "level1": "Table!",
      "level2": "Wooden Table!",
      "level3": "Put a block ON or UNDER the table!"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "shape": "square",
      "spatial": [
        "on",
        "under"
      ],
      "categories": [
        "spatial",
        "english"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "star",
    "type": "decoration",
    "name": {
      "en": "Star Trophy",
      "ja": "スター（ごほうび）"
    },
    "icon": "⭐",
    "color": "#fde047",
    "audio": {
      "name": "Star",
      "level1": "Star!",
      "level2": "Shining Star!",
      "level3": "Great job! You got a shining star!"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "countable": true,
      "categories": [
        "english"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ]
  },
  {
    "id": "car",
    "type": "vehicle",
    "name": {
      "en": "Car",
      "ja": "くるま"
    },
    "icon": "🚗",
    "color": "#ef4444",
    "audio": {
      "name": "Car",
      "level1": "Car!",
      "level2": "Red Car! Beep beep!",
      "level3": "The red car drives on the road!"
    },
    "learning": {
      "english": true,
      "color": "red",
      "countable": true,
      "categories": [
        "english",
        "color_shape"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "bus",
    "type": "vehicle",
    "name": {
      "en": "Bus",
      "ja": "バス"
    },
    "icon": "🚌",
    "color": "#facc15",
    "audio": {
      "name": "Bus",
      "level1": "Bus!",
      "level2": "Yellow School Bus!",
      "level3": "Let us ride the big yellow bus!"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "size": "big",
      "countable": true,
      "categories": [
        "english",
        "color_shape"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "bicycle",
    "type": "vehicle",
    "name": {
      "en": "Bicycle",
      "ja": "じてんしゃ"
    },
    "icon": "🚲",
    "color": "#3b82f6",
    "audio": {
      "name": "Bicycle",
      "level1": "Bicycle!",
      "level2": "Blue Bicycle!",
      "level3": "Ride a blue bicycle in the park!"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "countable": true,
      "categories": [
        "english",
        "color_shape"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "traffic_light",
    "type": "town_object",
    "name": {
      "en": "Traffic Light",
      "ja": "しんごうき"
    },
    "icon": "🚦",
    "color": "#334155",
    "audio": {
      "name": "Traffic Light",
      "level1": "Traffic Light!",
      "level2": "Red Stop, Green Go!",
      "level3": "Click the traffic light to change Stop and Go!"
    },
    "learning": {
      "english": true,
      "color": "green",
      "categories": [
        "english",
        "logic",
        "color_shape"
      ]
    },
    "interactions": [
      "observe",
      "toggle_signal"
    ]
  },
  {
    "id": "bread",
    "type": "food",
    "name": {
      "en": "Bread",
      "ja": "パン"
    },
    "icon": "🥖",
    "color": "#d97706",
    "audio": {
      "name": "Bread",
      "level1": "Bread!",
      "level2": "Yummy Bread!",
      "level3": "You bought warm bread at the bakery!"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "countable": true,
      "categories": [
        "english",
        "math"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ]
  },
  {
    "id": "ice_cream",
    "type": "food",
    "name": {
      "en": "Ice Cream",
      "ja": "アイスクリーム"
    },
    "icon": "🍦",
    "color": "#f472b6",
    "audio": {
      "name": "Ice Cream",
      "level1": "Ice Cream!",
      "level2": "Sweet Ice Cream!",
      "level3": "A yummy pink ice cream cone!"
    },
    "learning": {
      "english": true,
      "color": "red",
      "countable": true,
      "categories": [
        "english",
        "math"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ]
  },
  {
    "id": "book",
    "type": "town_object",
    "name": {
      "en": "Book",
      "ja": "ほん"
    },
    "icon": "📚",
    "color": "#2563eb",
    "audio": {
      "name": "Book",
      "level1": "Book!",
      "level2": "Read a Book!",
      "level3": "Let us read a fun story book!"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "countable": true,
      "categories": [
        "english",
        "math"
      ]
    },
    "interactions": [
      "observe",
      "collect"
    ]
  },
  {
    "id": "mailbox",
    "type": "town_object",
    "name": {
      "en": "Mailbox",
      "ja": "ゆうびんポスト"
    },
    "icon": "📮",
    "color": "#dc2626",
    "audio": {
      "name": "Mailbox",
      "level1": "Mailbox!",
      "level2": "Red Mailbox!",
      "level3": "Send a letter in the red mailbox!"
    },
    "learning": {
      "english": true,
      "color": "red",
      "categories": [
        "english",
        "color_shape"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "bench",
    "type": "town_object",
    "name": {
      "en": "Bench",
      "ja": "ベンチ"
    },
    "icon": "🪑",
    "color": "#a16207",
    "audio": {
      "name": "Bench",
      "level1": "Bench!",
      "level2": "Park Bench!",
      "level3": "Sit and rest on the park bench!"
    },
    "learning": {
      "english": true,
      "color": "brown",
      "categories": [
        "english",
        "spatial"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "fountain",
    "type": "town_object",
    "name": {
      "en": "Fountain",
      "ja": "ふんすい"
    },
    "icon": "⛲",
    "color": "#38bdf8",
    "audio": {
      "name": "Fountain",
      "level1": "Fountain!",
      "level2": "Water Fountain!",
      "level3": "Sparkling water splashes in the fountain!"
    },
    "learning": {
      "english": true,
      "color": "blue",
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "clock_tower",
    "type": "town_object",
    "name": {
      "en": "Clock",
      "ja": "とけい"
    },
    "icon": "🕰️",
    "color": "#fbbf24",
    "audio": {
      "name": "Clock",
      "level1": "Clock!",
      "level2": "Big Clock! Tick Tock!",
      "level3": "The big town clock goes tick tock!"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "categories": [
        "english",
        "math"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "street_lamp",
    "type": "town_object",
    "name": {
      "en": "Street Lamp",
      "ja": "がいとう"
    },
    "icon": "💡",
    "color": "#fef08a",
    "audio": {
      "name": "Street Lamp",
      "level1": "Lamp!",
      "level2": "Bright Street Lamp!",
      "level3": "The street lamp lights up the town!"
    },
    "learning": {
      "english": true,
      "color": "yellow",
      "categories": [
        "english",
        "science"
      ]
    },
    "interactions": [
      "observe"
    ]
  },
  {
    "id": "travel_gate",
    "type": "portal",
    "name": {
      "en": "Travel Gate",
      "ja": "ワープゲート（ステージ移動）"
    },
    "icon": "🌀",
    "color": "#8b5cf6",
    "audio": {
      "name": "Travel Gate",
      "level1": "Go!",
      "level2": "Travel Gate!",
      "level3": "Click the gate to travel between the Island and Town!"
    },
    "learning": {
      "english": true,
      "color": "purple",
      "categories": [
        "english",
        "spatial"
      ]
    },
    "interactions": [
      "observe",
      "travel"
    ]
  }
];

export const DEFAULT_VOCABULARY = [
  {
    "id": "tree",
    "category": "english",
    "subCategory": "object",
    "en": "Tree",
    "ja": "木",
    "icon": "🌳",
    "levels": {
      "1": "Tree!",
      "2": "Big Green Tree!",
      "3": "Look at the big green tree!"
    }
  },
  {
    "id": "apple",
    "category": "english",
    "subCategory": "object",
    "en": "Apple",
    "ja": "リンゴ",
    "icon": "🍎",
    "levels": {
      "1": "Apple!",
      "2": "Red Apple!",
      "3": "Find a red apple!"
    }
  },
  {
    "id": "flower",
    "category": "english",
    "subCategory": "object",
    "en": "Flower",
    "ja": "花",
    "icon": "🌸",
    "levels": {
      "1": "Flower!",
      "2": "Pretty Flower!",
      "3": "You found a pretty flower!"
    }
  },
  {
    "id": "cat",
    "category": "english",
    "subCategory": "animal",
    "en": "Cat",
    "ja": "猫",
    "icon": "🐱",
    "levels": {
      "1": "Cat!",
      "2": "Small Cat!",
      "3": "The cute cat says Meow!"
    }
  },
  {
    "id": "cow",
    "category": "english",
    "subCategory": "animal",
    "en": "Cow",
    "ja": "牛",
    "icon": "🐮",
    "levels": {
      "1": "Cow!",
      "2": "Big Cow!",
      "3": "The big cow eats grass!"
    }
  },
  {
    "id": "dog",
    "category": "english",
    "subCategory": "animal",
    "en": "Dog",
    "ja": "犬",
    "icon": "🐶",
    "levels": {
      "1": "Dog!",
      "2": "Happy Dog!",
      "3": "Find a friendly dog!"
    }
  },
  {
    "id": "sheep",
    "category": "english",
    "subCategory": "animal",
    "en": "Sheep",
    "ja": "羊",
    "icon": "🐑",
    "levels": {
      "1": "Sheep!",
      "2": "White Sheep!",
      "3": "Look at the fluffy white sheep!"
    }
  },
  {
    "id": "chicken",
    "category": "english",
    "subCategory": "animal",
    "en": "Chicken",
    "ja": "鶏",
    "icon": "🐔",
    "levels": {
      "1": "Chicken!",
      "2": "Yellow Chicken!",
      "3": "The small chicken is walking!"
    }
  },
  {
    "id": "fish",
    "category": "english",
    "subCategory": "animal",
    "en": "Fish",
    "ja": "魚",
    "icon": "🐟",
    "levels": {
      "1": "Fish!",
      "2": "Blue Fish!",
      "3": "The fish swims in the river!"
    }
  },
  {
    "id": "walk",
    "category": "english",
    "subCategory": "action",
    "en": "Walk",
    "ja": "歩く",
    "icon": "🚶",
    "levels": {
      "1": "Walk!",
      "2": "Walk forward!",
      "3": "Let's walk around the island!"
    }
  },
  {
    "id": "jump",
    "category": "english",
    "subCategory": "action",
    "en": "Jump",
    "ja": "跳ぶ",
    "icon": "🦘",
    "levels": {
      "1": "Jump!",
      "2": "High Jump!",
      "3": "Jump up high in the sky!"
    }
  },
  {
    "id": "run",
    "category": "english",
    "subCategory": "action",
    "en": "Run",
    "ja": "走る",
    "icon": "🏃",
    "levels": {
      "1": "Run!",
      "2": "Run fast!",
      "3": "Let's run fast across the grass!"
    }
  },
  {
    "id": "big",
    "category": "english",
    "subCategory": "state",
    "en": "Big",
    "ja": "大きい",
    "icon": "🐘",
    "levels": {
      "1": "Big!",
      "2": "Very Big!",
      "3": "This is a very big object!"
    }
  },
  {
    "id": "small",
    "category": "english",
    "subCategory": "state",
    "en": "Small",
    "ja": "小さい",
    "icon": "🐣",
    "levels": {
      "1": "Small!",
      "2": "So Small!",
      "3": "Look at this cute small thing!"
    }
  },
  {
    "id": "red",
    "category": "color_shape",
    "subCategory": "color",
    "en": "Red",
    "ja": "赤",
    "icon": "🟥",
    "levels": {
      "1": "Red!",
      "2": "Red Block!",
      "3": "Find something bright red!"
    }
  },
  {
    "id": "blue",
    "category": "color_shape",
    "subCategory": "color",
    "en": "Blue",
    "ja": "青",
    "icon": "🟦",
    "levels": {
      "1": "Blue!",
      "2": "Blue Block!",
      "3": "Blue like the clear sky!"
    }
  },
  {
    "id": "yellow",
    "category": "color_shape",
    "subCategory": "color",
    "en": "Yellow",
    "ja": "黄色",
    "icon": "🟨",
    "levels": {
      "1": "Yellow!",
      "2": "Yellow Block!",
      "3": "Bright yellow like the sun!"
    }
  },
  {
    "id": "green",
    "category": "color_shape",
    "subCategory": "color",
    "en": "Green",
    "ja": "緑",
    "icon": "🟩",
    "levels": {
      "1": "Green!",
      "2": "Green Block!",
      "3": "Green like fresh grass and leaves!"
    }
  },
  {
    "id": "under",
    "category": "spatial",
    "subCategory": "position",
    "en": "Under",
    "ja": "下",
    "icon": "⬇️",
    "levels": {
      "1": "Under!",
      "2": "Under the table!",
      "3": "You put the block under the table!"
    }
  },
  {
    "id": "on",
    "category": "spatial",
    "subCategory": "position",
    "en": "On",
    "ja": "上",
    "icon": "⬆️",
    "levels": {
      "1": "On!",
      "2": "On the table!",
      "3": "Great! The block is on the table!"
    }
  },
  {
    "id": "up",
    "category": "spatial",
    "subCategory": "position",
    "en": "Up",
    "ja": "上へ",
    "icon": "🔼",
    "levels": {
      "1": "Up!",
      "2": "Stack it up!",
      "3": "Stack the blocks up high!"
    }
  },
  {
    "id": "wood",
    "category": "english",
    "subCategory": "material",
    "en": "Wood",
    "ja": "木材",
    "icon": "🪵",
    "levels": {
      "1": "Wood!",
      "2": "Brown Wood!",
      "3": "Use wood to build a house or bridge!"
    }
  },
  {
    "id": "stone",
    "category": "english",
    "subCategory": "material",
    "en": "Stone",
    "ja": "石",
    "icon": "🪨",
    "levels": {
      "1": "Stone!",
      "2": "Gray Stone!",
      "3": "Stone is strong and heavy!"
    }
  },
  {
    "id": "seed",
    "category": "science",
    "subCategory": "nature",
    "en": "Seed",
    "ja": "種",
    "icon": "🌱",
    "levels": {
      "1": "Seed!",
      "2": "Plant a seed!",
      "3": "Plant the seed in the garden!"
    }
  },
  {
    "id": "sprout",
    "category": "science",
    "subCategory": "nature",
    "en": "Sprout",
    "ja": "芽",
    "icon": "🌿",
    "levels": {
      "1": "Sprout!",
      "2": "Little Sprout!",
      "3": "The seed grew into a green sprout!"
    }
  },
  {
    "id": "water",
    "category": "science",
    "subCategory": "nature",
    "en": "Water",
    "ja": "水",
    "icon": "💧",
    "levels": {
      "1": "Water!",
      "2": "Cool Water!",
      "3": "Give water to help plants grow!"
    }
  },
  {
    "id": "cube",
    "category": "color_shape",
    "subCategory": "shape",
    "en": "Cube",
    "ja": "立方体",
    "icon": "🧊",
    "levels": {
      "1": "Cube!",
      "2": "Blue Cube!",
      "3": "A cube has six square sides!"
    }
  },
  {
    "id": "sphere",
    "category": "color_shape",
    "subCategory": "shape",
    "en": "Sphere",
    "ja": "球",
    "icon": "🔮",
    "levels": {
      "1": "Sphere!",
      "2": "Round Sphere!",
      "3": "A sphere is round like a ball!"
    }
  },
  {
    "id": "cylinder",
    "category": "color_shape",
    "subCategory": "shape",
    "en": "Cylinder",
    "ja": "円柱",
    "icon": "🛢️",
    "levels": {
      "1": "Cylinder!",
      "2": "Tall Cylinder!",
      "3": "Look at the tall orange cylinder!"
    }
  },
  {
    "id": "triangle",
    "category": "color_shape",
    "subCategory": "shape",
    "en": "Triangle",
    "ja": "三角形",
    "icon": "🔺",
    "levels": {
      "1": "Triangle!",
      "2": "Yellow Triangle!",
      "3": "A triangle has three corners!"
    }
  },
  {
    "id": "car",
    "category": "english",
    "subCategory": "town",
    "en": "Car",
    "ja": "くるま",
    "icon": "🚗",
    "levels": {
      "1": "Car!",
      "2": "Red Car!",
      "3": "The red car drives on the road!"
    }
  },
  {
    "id": "bus",
    "category": "english",
    "subCategory": "town",
    "en": "Bus",
    "ja": "バス",
    "icon": "🚌",
    "levels": {
      "1": "Bus!",
      "2": "Yellow Bus!",
      "3": "Ride the big yellow bus in town!"
    }
  },
  {
    "id": "bicycle",
    "category": "english",
    "subCategory": "town",
    "en": "Bicycle",
    "ja": "じてんしゃ",
    "icon": "🚲",
    "levels": {
      "1": "Bicycle!",
      "2": "Blue Bicycle!",
      "3": "Let us ride a blue bicycle!"
    }
  },
  {
    "id": "traffic_light",
    "category": "english",
    "subCategory": "town",
    "en": "Traffic Light",
    "ja": "しんごうき",
    "icon": "🚦",
    "levels": {
      "1": "Traffic Light!",
      "2": "Stop and Go!",
      "3": "Red means stop, green means go!"
    }
  },
  {
    "id": "stop",
    "category": "english",
    "subCategory": "action",
    "en": "Stop",
    "ja": "とまる",
    "icon": "🛑",
    "levels": {
      "1": "Stop!",
      "2": "Red Light, Stop!",
      "3": "When the light is red, please stop!"
    }
  },
  {
    "id": "go",
    "category": "english",
    "subCategory": "action",
    "en": "Go",
    "ja": "すすむ",
    "icon": "🟢",
    "levels": {
      "1": "Go!",
      "2": "Green Light, Go!",
      "3": "When the light is green, you can go!"
    }
  },
  {
    "id": "bread",
    "category": "english",
    "subCategory": "town",
    "en": "Bread",
    "ja": "パン",
    "icon": "🥖",
    "levels": {
      "1": "Bread!",
      "2": "Warm Bread!",
      "3": "Buy yummy bread at the bakery!"
    }
  },
  {
    "id": "ice_cream",
    "category": "english",
    "subCategory": "town",
    "en": "Ice Cream",
    "ja": "アイスクリーム",
    "icon": "🍦",
    "levels": {
      "1": "Ice Cream!",
      "2": "Sweet Ice Cream!",
      "3": "Eat cool ice cream in the park!"
    }
  },
  {
    "id": "book",
    "category": "english",
    "subCategory": "town",
    "en": "Book",
    "ja": "ほん",
    "icon": "📚",
    "levels": {
      "1": "Book!",
      "2": "Read a Book!",
      "3": "Read a fun book at school!"
    }
  },
  {
    "id": "mailbox",
    "category": "english",
    "subCategory": "town",
    "en": "Mailbox",
    "ja": "ゆうびんポスト",
    "icon": "📮",
    "levels": {
      "1": "Mailbox!",
      "2": "Red Mailbox!",
      "3": "Put a letter in the mailbox!"
    }
  },
  {
    "id": "fountain",
    "category": "english",
    "subCategory": "town",
    "en": "Fountain",
    "ja": "ふんすい",
    "icon": "⛲",
    "levels": {
      "1": "Fountain!",
      "2": "Park Fountain!",
      "3": "Look at the water splashing in the fountain!"
    }
  },
  {
    "id": "clock_tower",
    "category": "english",
    "subCategory": "town",
    "en": "Clock",
    "ja": "とけい",
    "icon": "🕰️",
    "levels": {
      "1": "Clock!",
      "2": "Big Clock!",
      "3": "The big town clock goes tick tock!"
    }
  },
  {
    "id": "town",
    "category": "spatial",
    "subCategory": "place",
    "en": "Town",
    "ja": "まち",
    "icon": "🏙️",
    "levels": {
      "1": "Town!",
      "2": "Sunny Town!",
      "3": "Welcome to Sunny Town!"
    }
  },
  {
    "id": "island",
    "category": "spatial",
    "subCategory": "place",
    "en": "Island",
    "ja": "しま",
    "icon": "🏝️",
    "levels": {
      "1": "Island!",
      "2": "Nature Island!",
      "3": "Welcome back to Nature Island!"
    }
  }
];

export const DEFAULT_MISSIONS = [
  {
    "id": "find_apples_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🍎",
    "instruction": {
      "en": "Find 3 apples!",
      "ja": "リンゴを3個見つけよう！"
    },
    "audio": "Find three apples!",
    "objective": {
      "type": "collect",
      "target": "apple",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_dog_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🐶",
    "instruction": {
      "en": "Find a dog!",
      "ja": "イヌを見つけてクリックしよう！"
    },
    "audio": "Find a dog!",
    "objective": {
      "type": "select",
      "target": "dog",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_cat_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🐱",
    "instruction": {
      "en": "Find a cat in the forest!",
      "ja": "森にいるネコを見つけよう！"
    },
    "audio": "Find a cat in the forest!",
    "objective": {
      "type": "select",
      "target": "cat",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_cow_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🐮",
    "instruction": {
      "en": "Find a big cow!",
      "ja": "大きなウシを見つけよう！"
    },
    "audio": "Find a big cow!",
    "objective": {
      "type": "select",
      "target": "cow",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_sheep_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🐑",
    "instruction": {
      "en": "Find a white sheep!",
      "ja": "白いヒツジを見つけよう！"
    },
    "audio": "Find a white sheep!",
    "objective": {
      "type": "select",
      "target": "sheep",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_chicken_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🐔",
    "instruction": {
      "en": "Find a small chicken!",
      "ja": "小さなニワトリを見つけよう！"
    },
    "audio": "Find a small chicken!",
    "objective": {
      "type": "select",
      "target": "chicken",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_fish_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🐟",
    "instruction": {
      "en": "Find a fish in the river!",
      "ja": "川を泳ぐサカナを見つけよう！"
    },
    "audio": "Find a fish in the river!",
    "objective": {
      "type": "select",
      "target": "fish",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "meet_three_animals_001",
    "category": "english",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🐾",
    "instruction": {
      "en": "Say hello to 3 animals!",
      "ja": "動物を3匹見つけてクリックしよう！"
    },
    "audio": "Say hello to three animals!",
    "objective": {
      "type": "select_animal",
      "target": "any",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "jump_five_times_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🦘",
    "instruction": {
      "en": "Jump 5 times!",
      "ja": "Spaceキーで5回ジャンプしよう！"
    },
    "audio": "Jump five times!",
    "objective": {
      "type": "jump",
      "target": "any",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_red_flower_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🌹",
    "instruction": {
      "en": "Find a red flower!",
      "ja": "赤い花を見つけよう！"
    },
    "audio": "Find a red flower!",
    "objective": {
      "type": "select",
      "target": "flower_red",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_yellow_flower_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🌻",
    "instruction": {
      "en": "Find a yellow flower!",
      "ja": "黄色い花を見つけよう！"
    },
    "audio": "Find a yellow flower!",
    "objective": {
      "type": "select",
      "target": "flower_yellow",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_blue_flower_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "💠",
    "instruction": {
      "en": "Find a blue flower!",
      "ja": "青い花を見つけよう！"
    },
    "audio": "Find a blue flower!",
    "objective": {
      "type": "select",
      "target": "flower_blue",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "collect_three_flowers_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🌸",
    "instruction": {
      "en": "Collect 3 flowers!",
      "ja": "花を3つ集めよう！"
    },
    "audio": "Collect three flowers!",
    "objective": {
      "type": "collect",
      "target": "flower",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_cube_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🧊",
    "instruction": {
      "en": "Find a blue cube!",
      "ja": "青い立方体（キューブ）を見つけよう！"
    },
    "audio": "Find a blue cube!",
    "objective": {
      "type": "select",
      "target": "shape_cube",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_sphere_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🔮",
    "instruction": {
      "en": "Find a purple sphere!",
      "ja": "紫の球（スフィア）を見つけよう！"
    },
    "audio": "Find a purple sphere!",
    "objective": {
      "type": "select",
      "target": "shape_sphere",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_cylinder_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🛢️",
    "instruction": {
      "en": "Find an orange cylinder!",
      "ja": "オレンジの円柱（シリンダー）を見つけよう！"
    },
    "audio": "Find an orange cylinder!",
    "objective": {
      "type": "select",
      "target": "shape_cylinder",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_triangle_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🔺",
    "instruction": {
      "en": "Find a yellow triangle!",
      "ja": "黄色い三角（トライアングル）を見つけよう！"
    },
    "audio": "Find a yellow triangle!",
    "objective": {
      "type": "select",
      "target": "shape_triangle",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "place_blue_blocks_001",
    "category": "color_shape",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🟦",
    "instruction": {
      "en": "Place 3 blue blocks!",
      "ja": "青いブロックを3個置こう！"
    },
    "audio": "Place three blue blocks!",
    "objective": {
      "type": "place",
      "target": "blue",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "place_red_blocks_001",
    "category": "color_shape",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🟥",
    "instruction": {
      "en": "Place 3 red blocks!",
      "ja": "赤いブロックを3個置こう！"
    },
    "audio": "Place three red blocks!",
    "objective": {
      "type": "place",
      "target": "red",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "stack_three_blocks_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🧱",
    "instruction": {
      "en": "Stack 3 blocks high!",
      "ja": "ブロックを3つ積み上げよう！"
    },
    "audio": "Stack three blocks high!",
    "objective": {
      "type": "stack",
      "target": "any",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "stack_five_blocks_001",
    "category": "math",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🗼",
    "instruction": {
      "en": "Build a tower 5 blocks high!",
      "ja": "ブロックを5段高く積み上げよう！"
    },
    "audio": "Build a tower five blocks high!",
    "objective": {
      "type": "stack",
      "target": "any",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "collect_stones_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🪨",
    "instruction": {
      "en": "Collect 5 stones!",
      "ja": "石ブロックを5個集めよう！"
    },
    "audio": "Collect five stones!",
    "objective": {
      "type": "collect",
      "target": "stone",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "collect_mushrooms_001",
    "category": "science",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🍄",
    "instruction": {
      "en": "Collect 3 mushrooms in the forest!",
      "ja": "森でキノコを3個集めよう！"
    },
    "audio": "Collect three mushrooms in the forest!",
    "objective": {
      "type": "collect",
      "target": "mushroom",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "collect_wood_001",
    "category": "science",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🪵",
    "instruction": {
      "en": "Harvest 4 wood blocks from trees!",
      "ja": "木を長押しで壊して木材を4個集めよう！"
    },
    "audio": "Harvest four wood blocks from trees!",
    "objective": {
      "type": "collect",
      "target": "wood",
      "count": 4
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "plant_seed_001",
    "category": "science",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🌱",
    "instruction": {
      "en": "Plant a seed in the garden!",
      "ja": "畑に種（タネ）を植えよう！"
    },
    "audio": "Plant a seed in the garden!",
    "objective": {
      "type": "plant",
      "target": "farm_plot",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "grow_plant_001",
    "category": "science",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🌿",
    "instruction": {
      "en": "Water and grow a plant 2 times!",
      "ja": "畑の植物をクリックして2段階育てよう！"
    },
    "audio": "Water and grow a plant in the garden!",
    "objective": {
      "type": "grow",
      "target": "any",
      "count": 2
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "put_block_on_table_001",
    "category": "spatial",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🪑",
    "instruction": {
      "en": "Put the block ON the table!",
      "ja": "テーブルの上（ON）にブロックを置こう！"
    },
    "audio": "Put the block on the table!",
    "objective": {
      "type": "spatial_place",
      "target": "on_table",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "put_block_under_table_001",
    "category": "spatial",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "⬇️",
    "instruction": {
      "en": "Put the block UNDER the table!",
      "ja": "テーブルの下（UNDER）にブロックを置こう！"
    },
    "audio": "Put the block under the table!",
    "objective": {
      "type": "spatial_place",
      "target": "under_table",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_bridge_001",
    "category": "logic",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🌉",
    "instruction": {
      "en": "Build a bridge over the river!",
      "ja": "川の上にブロックを3つ置いて橋を作ろう！"
    },
    "audio": "Build a bridge over the river!",
    "objective": {
      "type": "bridge",
      "target": "river",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_wood_house_001",
    "category": "logic",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🏠",
    "instruction": {
      "en": "Build with 6 wood blocks!",
      "ja": "木材ブロックを6個配置してお家を作ろう！"
    },
    "audio": "Build with six wood blocks!",
    "objective": {
      "type": "place",
      "target": "wood",
      "count": 6
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_tree_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🌳",
    "instruction": {
      "en": "Find a big green tree!",
      "ja": "大きな緑の木を見つけよう！"
    },
    "audio": "Find a big green tree!",
    "objective": {
      "type": "select",
      "target": "tree",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "run_fast_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🏃",
    "instruction": {
      "en": "Run fast with Shift!",
      "ja": "Shiftキーを押しながら3秒走ろう！"
    },
    "audio": "Run fast with Shift!",
    "objective": {
      "type": "run",
      "target": "any",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "listen_five_words_001",
    "category": "english",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🔊",
    "instruction": {
      "en": "Click and listen to 5 things!",
      "ja": "いろんな物を5回クリックして英語を聞こう！"
    },
    "audio": "Click and listen to five things!",
    "objective": {
      "type": "select",
      "target": "any",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "place_yellow_blocks_001",
    "category": "color_shape",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🟨",
    "instruction": {
      "en": "Place 3 yellow blocks!",
      "ja": "黄色いブロックを3個置こう！"
    },
    "audio": "Place three yellow blocks!",
    "objective": {
      "type": "place",
      "target": "yellow",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_all_shapes_001",
    "category": "color_shape",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🔷",
    "instruction": {
      "en": "Find 4 shapes in the plaza!",
      "ja": "広場で4つの形（図形）をクリックしよう！"
    },
    "audio": "Find four shapes in the plaza!",
    "objective": {
      "type": "select_shape",
      "target": "any",
      "count": 4
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "place_colorful_blocks_001",
    "category": "color_shape",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🌈",
    "instruction": {
      "en": "Place 5 colorful blocks!",
      "ja": "カラフルな色ブロックを5個置こう！"
    },
    "audio": "Place five colorful blocks!",
    "objective": {
      "type": "place_color",
      "target": "any",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "break_three_blocks_001",
    "category": "math",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "⛏️",
    "instruction": {
      "en": "Break 3 blocks!",
      "ja": "ブロックを長押しで3個こわそう！"
    },
    "audio": "Break three blocks!",
    "objective": {
      "type": "break",
      "target": "any",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "break_two_stones_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🪨",
    "instruction": {
      "en": "Remove 2 stone blocks!",
      "ja": "石ブロックを2個取り除こう！"
    },
    "audio": "Remove two stone blocks!",
    "objective": {
      "type": "break",
      "target": "stone",
      "count": 2
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "jump_ten_times_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🔢",
    "instruction": {
      "en": "Count and jump 10 times!",
      "ja": "数えながら10回ジャンプしよう！"
    },
    "audio": "Count and jump ten times!",
    "objective": {
      "type": "jump",
      "target": "any",
      "count": 10
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "place_ten_blocks_001",
    "category": "math",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🏗️",
    "instruction": {
      "en": "Count to 10: place 10 blocks!",
      "ja": "10まで数えよう！ブロックを10個置こう！"
    },
    "audio": "Count to ten! Place ten blocks!",
    "objective": {
      "type": "place",
      "target": "any",
      "count": 10
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_river_water_001",
    "category": "science",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "💧",
    "instruction": {
      "en": "Find the blue river!",
      "ja": "青い川の水を見つけてクリックしよう！"
    },
    "audio": "Find the blue river!",
    "objective": {
      "type": "select",
      "target": "water",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_sandy_beach_001",
    "category": "science",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🏖️",
    "instruction": {
      "en": "Find the sandy beach!",
      "ja": "砂浜の砂ブロックを見つけよう！"
    },
    "audio": "Find the sandy beach!",
    "objective": {
      "type": "select",
      "target": "sand",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "plant_three_seeds_001",
    "category": "science",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🪴",
    "instruction": {
      "en": "Plant 3 seeds in the garden!",
      "ja": "畑に種（タネ）を3つ植えよう！"
    },
    "audio": "Plant three seeds in the garden!",
    "objective": {
      "type": "plant",
      "target": "farm_plot",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "bloom_flower_001",
    "category": "science",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🌺",
    "instruction": {
      "en": "Grow a flower to full bloom!",
      "ja": "畑の植物に水をあげて花を咲かせよう！"
    },
    "audio": "Grow a flower to full bloom!",
    "objective": {
      "type": "grow",
      "target": "flower",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_table_001",
    "category": "spatial",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🪑",
    "instruction": {
      "en": "Find the wooden table!",
      "ja": "建築エリアの木製テーブルを見つけよう！"
    },
    "audio": "Find the wooden table!",
    "objective": {
      "type": "select",
      "target": "table_box",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "put_two_blocks_on_table_001",
    "category": "spatial",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "⬆️",
    "instruction": {
      "en": "Put 2 blocks ON the table!",
      "ja": "テーブルの上（ON）にブロックを2個置こう！"
    },
    "audio": "Put two blocks on the table!",
    "objective": {
      "type": "spatial_place",
      "target": "on_table",
      "count": 2
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "plant_garden_flowers_001",
    "category": "spatial",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🌸",
    "instruction": {
      "en": "Place 3 flowers around the island!",
      "ja": "島に花を3つ飾ろう！"
    },
    "audio": "Place three flowers around the island!",
    "objective": {
      "type": "place",
      "target": "flower",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_stone_wall_001",
    "category": "logic",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🏰",
    "instruction": {
      "en": "Build a wall with 5 stone blocks!",
      "ja": "石ブロックを5個並べて壁を作ろう！"
    },
    "audio": "Build a wall with five stone blocks!",
    "objective": {
      "type": "place",
      "target": "stone",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_animal_fence_001",
    "category": "logic",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🐄",
    "instruction": {
      "en": "Build a fence in the animal area!",
      "ja": "動物エリアにブロックを6個置いて柵を作ろう！"
    },
    "audio": "Build a fence in the animal area!",
    "objective": {
      "type": "build_fence",
      "target": "animal_area",
      "count": 6
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_wide_bridge_001",
    "category": "logic",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🌉",
    "instruction": {
      "en": "Build a wide bridge (6 blocks)!",
      "ja": "川の上にブロックを6個置いて大きな橋を作ろう！"
    },
    "audio": "Build a wide bridge over the river!",
    "objective": {
      "type": "bridge",
      "target": "river",
      "count": 6
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "walk_explore_001",
    "category": "english",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🚶",
    "instruction": {
      "en": "Walk around the island!",
      "ja": "島の中を5秒お散歩しよう！"
    },
    "audio": "Walk around the island!",
    "objective": {
      "type": "walk",
      "target": "any",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "meet_six_animals_001",
    "category": "english",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🐾",
    "instruction": {
      "en": "Say hello to 6 animals!",
      "ja": "動物たちと6回あいさつしよう！"
    },
    "audio": "Say hello to six animals!",
    "objective": {
      "type": "select_animal",
      "target": "any",
      "count": 6
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "listen_ten_words_001",
    "category": "english",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🎧",
    "instruction": {
      "en": "Click and listen to 10 things!",
      "ja": "10回クリックして英語をたくさん聞こう！"
    },
    "audio": "Click and listen to ten things!",
    "objective": {
      "type": "select",
      "target": "any",
      "count": 10
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_green_block_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🟩",
    "instruction": {
      "en": "Find a green block in the plaza!",
      "ja": "広場の緑のブロックを見つけよう！"
    },
    "audio": "Find a green block in the plaza!",
    "objective": {
      "type": "select",
      "target": "green",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_white_block_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "⬜",
    "instruction": {
      "en": "Find a white block at the house!",
      "ja": "お家の白いブロックを見つけよう！"
    },
    "audio": "Find a white block at the house!",
    "objective": {
      "type": "select",
      "target": "white",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "place_eight_colors_001",
    "category": "color_shape",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🎨",
    "instruction": {
      "en": "Place 8 colorful blocks!",
      "ja": "カラフルな色ブロックを8個置こう！"
    },
    "audio": "Place eight colorful blocks!",
    "objective": {
      "type": "place_color",
      "target": "any",
      "count": 8
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "collect_five_apples_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🍎",
    "instruction": {
      "en": "Collect 5 apples!",
      "ja": "リンゴを5個ぜんぶ集めよう！"
    },
    "audio": "Collect five apples!",
    "objective": {
      "type": "collect",
      "target": "apple",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "break_five_blocks_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "⛏️",
    "instruction": {
      "en": "Break 5 blocks!",
      "ja": "ブロックを長押しで5個こわそう！"
    },
    "audio": "Break five blocks!",
    "objective": {
      "type": "break",
      "target": "any",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "stack_seven_blocks_001",
    "category": "math",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🗼",
    "instruction": {
      "en": "Build a giant tower 7 blocks high!",
      "ja": "ブロックを7段高く積み上げよう！"
    },
    "audio": "Build a giant tower seven blocks high!",
    "objective": {
      "type": "stack",
      "target": "any",
      "count": 7
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "run_six_seconds_001",
    "category": "math",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "⏱️",
    "instruction": {
      "en": "Count to 6 while running!",
      "ja": "6まで数えながらShiftで走ろう！"
    },
    "audio": "Count to six while running!",
    "objective": {
      "type": "run",
      "target": "any",
      "count": 6
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "find_grass_block_001",
    "category": "science",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🌿",
    "instruction": {
      "en": "Find green grass!",
      "ja": "緑の草ブロックをクリックしよう！"
    },
    "audio": "Find green grass!",
    "objective": {
      "type": "select",
      "target": "grass",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "collect_two_seeds_001",
    "category": "science",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🌱",
    "instruction": {
      "en": "Find 2 seeds near the farm!",
      "ja": "畑の近くで種（タネ）を2個拾おう！"
    },
    "audio": "Find two seeds near the farm!",
    "objective": {
      "type": "collect",
      "target": "seed",
      "count": 2
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "grow_sprout_001",
    "category": "science",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🪴",
    "instruction": {
      "en": "Grow a green sprout!",
      "ja": "タネに水をあげて芽（Sprout）を出そう！"
    },
    "audio": "Grow a green sprout!",
    "objective": {
      "type": "grow",
      "target": "sprout",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "grow_five_times_001",
    "category": "science",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "💧",
    "instruction": {
      "en": "Water and grow plants 5 times!",
      "ja": "畑の植物を5回育てよう！"
    },
    "audio": "Water and grow plants five times!",
    "objective": {
      "type": "grow",
      "target": "any",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "put_two_blocks_under_table_001",
    "category": "spatial",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "⬇️",
    "instruction": {
      "en": "Put 2 blocks UNDER the table!",
      "ja": "テーブルの下（UNDER）にブロックを2個置こう！"
    },
    "audio": "Put two blocks under the table!",
    "objective": {
      "type": "spatial_place",
      "target": "under_table",
      "count": 2
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "place_five_flowers_001",
    "category": "spatial",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "💐",
    "instruction": {
      "en": "Decorate with 5 flowers!",
      "ja": "島に花を5つ飾ろう！"
    },
    "audio": "Decorate with five flowers!",
    "objective": {
      "type": "place",
      "target": "flower",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_in_plaza_001",
    "category": "spatial",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🏛️",
    "instruction": {
      "en": "Build 5 blocks in the plaza!",
      "ja": "建築エリアにブロックを5個置こう！"
    },
    "audio": "Build five blocks in the plaza!",
    "objective": {
      "type": "build_plaza",
      "target": "building_area",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_farm_border_001",
    "category": "logic",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🚜",
    "instruction": {
      "en": "Build a border in the farm!",
      "ja": "農場エリアにブロックを4個置こう！"
    },
    "audio": "Build a border in the farm!",
    "objective": {
      "type": "build_farm",
      "target": "farm_area",
      "count": 4
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_stone_castle_001",
    "category": "logic",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🏰",
    "instruction": {
      "en": "Build a castle with 10 stones!",
      "ja": "石ブロックを10個使って大きなお城を作ろう！"
    },
    "audio": "Build a castle with ten stones!",
    "objective": {
      "type": "place",
      "target": "stone",
      "count": 10
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "build_wood_cabin_001",
    "category": "logic",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🏡",
    "instruction": {
      "en": "Build a cabin with 10 wood blocks!",
      "ja": "木材ブロックを10個使ってログハウスを作ろう！"
    },
    "audio": "Build a cabin with ten wood blocks!",
    "objective": {
      "type": "place",
      "target": "wood",
      "count": 10
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_visit_001",
    "category": "spatial",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🏙️",
    "instruction": {
      "en": "Visit Sunny Town!",
      "ja": "街のステージ（Sunny Town）へ行ってみよう！"
    },
    "audio": "Let us visit Sunny Town!",
    "objective": {
      "type": "visit_stage",
      "target": "town",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_car_001",
    "category": "english",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🚗",
    "instruction": {
      "en": "Town: Find a red car!",
      "ja": "【街】赤い車（Car）を見つけよう！"
    },
    "audio": "Find a red car in town!",
    "objective": {
      "type": "select",
      "target": "car",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_bus_001",
    "category": "english",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🚌",
    "instruction": {
      "en": "Town: Find a yellow bus!",
      "ja": "【街】黄色いバス（Bus）を見つけよう！"
    },
    "audio": "Find a yellow bus in town!",
    "objective": {
      "type": "select",
      "target": "bus",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_bicycle_001",
    "category": "english",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🚲",
    "instruction": {
      "en": "Town: Find a blue bicycle!",
      "ja": "【街】青い自転車（Bicycle）を見つけよう！"
    },
    "audio": "Find a blue bicycle in town!",
    "objective": {
      "type": "select",
      "target": "bicycle",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_traffic_light_001",
    "category": "logic",
    "stage": "town",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🚦",
    "instruction": {
      "en": "Town: Change the traffic light 3 times!",
      "ja": "【街】信号機を3回クリックしてStopとGoを学ぼう！"
    },
    "audio": "Click the traffic light three times! Stop and go!",
    "objective": {
      "type": "traffic_light",
      "target": "any",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_collect_bread_001",
    "category": "math",
    "stage": "town",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🥖",
    "instruction": {
      "en": "Town: Collect 3 loaves of bread!",
      "ja": "【街】パン屋さんでパン（Bread）を3個集めよう！"
    },
    "audio": "Collect three loaves of bread at the bakery!",
    "objective": {
      "type": "collect",
      "target": "bread",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_collect_ice_cream_001",
    "category": "math",
    "stage": "town",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🍦",
    "instruction": {
      "en": "Town: Collect 3 ice creams!",
      "ja": "【街】公園でアイスクリームを3個集めよう！"
    },
    "audio": "Collect three ice creams in the park!",
    "objective": {
      "type": "collect",
      "target": "ice_cream",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_collect_books_001",
    "category": "english",
    "stage": "town",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "📚",
    "instruction": {
      "en": "Town: Collect 3 books at school!",
      "ja": "【街】学校の前で本（Book）を3冊集めよう！"
    },
    "audio": "Collect three books at the school!",
    "objective": {
      "type": "collect",
      "target": "book",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_mailbox_001",
    "category": "color_shape",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "📮",
    "instruction": {
      "en": "Town: Find a red mailbox!",
      "ja": "【街】赤い郵便ポスト（Mailbox）を見つけよう！"
    },
    "audio": "Find a red mailbox in town!",
    "objective": {
      "type": "select",
      "target": "mailbox",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_fountain_001",
    "category": "science",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "⛲",
    "instruction": {
      "en": "Town: Find the park fountain!",
      "ja": "【街】公園の噴水（Fountain）を見つけよう！"
    },
    "audio": "Find the sparkling fountain in the park!",
    "objective": {
      "type": "select",
      "target": "fountain",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_clock_001",
    "category": "math",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🕰️",
    "instruction": {
      "en": "Town: Find the big clock tower!",
      "ja": "【街】大きな時計塔（Clock）を見つけよう！"
    },
    "audio": "Find the big clock in town!",
    "objective": {
      "type": "select",
      "target": "clock_tower",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_bench_001",
    "category": "spatial",
    "stage": "town",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🪑",
    "instruction": {
      "en": "Town: Find a park bench!",
      "ja": "【街】公園のベンチ（Bench）を見つけよう！"
    },
    "audio": "Find a bench in the park!",
    "objective": {
      "type": "select",
      "target": "bench",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_find_vehicles_001",
    "category": "english",
    "stage": "town",
    "difficulty": 2,
    "difficultyLabel": "Normal",
    "icon": "🚙",
    "instruction": {
      "en": "Town: Find 3 vehicles!",
      "ja": "【街】乗り物（車・バス・自転車）を3回見つけよう！"
    },
    "audio": "Find three vehicles in town!",
    "objective": {
      "type": "select_vehicle",
      "target": "any",
      "count": 3
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_build_shop_001",
    "category": "logic",
    "stage": "town",
    "difficulty": 3,
    "difficultyLabel": "Challenge",
    "icon": "🏪",
    "instruction": {
      "en": "Town: Build 5 blocks in Sunny Town!",
      "ja": "【街】街のステージでブロックを5個配置しよう！"
    },
    "audio": "Build five blocks in Sunny Town!",
    "objective": {
      "type": "build_town",
      "target": "town",
      "count": 5
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  },
  {
    "id": "town_return_island_001",
    "category": "spatial",
    "stage": "island",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🏝️",
    "instruction": {
      "en": "Travel back to Nature Island!",
      "ja": "自然の島（Nature Island）へ戻ろう！"
    },
    "audio": "Travel back to Nature Island!",
    "objective": {
      "type": "visit_stage",
      "target": "island",
      "count": 1
    },
    "reward": {
      "type": "decoration",
      "itemId": "star"
    }
  }
];
