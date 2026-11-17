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
    "id": "find_cube_001",
    "category": "color_shape",
    "difficulty": 1,
    "difficultyLabel": "Easy",
    "icon": "🧊",
    "instruction": {
      "en": "Find a cube!",
      "ja": "立方体（キューブ）を見つけよう！"
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
  }
];
