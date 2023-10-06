const getAttacks = (id1, id2, id3, id4) => {
  const newAttacks = [
    attacks[id1 - 1],
    attacks[id2 - 1],
    attacks[id3 - 1],
    attacks[id4 - 1],
  ];
  return newAttacks;
};

const getType = (id) => {
  return types[id - 1];
};

const getActions = (id) => {
  return actions[id - 1];
};

const getState = (id) => {
  return states[id - 1];
};

const actions = [
  {
    id: 1,
    name: "damage",
  },
  {
    id: 2,
    name: "heal",
  },
  {
    id: 3,
    name: "increase defense",
  },
  {
    id: 4,
    name: "increase damage",
  },
  {
    id: 5,
    name: "increase speed",
  },
  {
    id: 6,
    name: "decrease defense",
  },
  {
    id: 7,
    name: "decrease damage",
  },
  {
    id: 8,
    name: "decrease speed",
  },
];

const states = [
  {
    id: 1,
    name: "normal",
  },
  {
    id: 2,
    name: "poisoned",
  },
  {
    id: 3,
    name: "burned",
  },
  {
    id: 4,
    name: "crazy",
  },
];

const weakness = {
  normal: [],
  fire: ["water"],
  water: ["ice"],
  ice: ["fire"],
  iron: ["fire"],
};

const types = [
  {
    id: 1,
    name: "normal",
    weakness: weakness.normal,
  },
  {
    id: 2,
    name: "fire",
    weakness: weakness.fire,
  },
  {
    id: 3,
    name: "water",
    weakness: weakness.water,
  },
  {
    id: 4,
    name: "ice",
    weakness: weakness.ice,
  },
  {
    id: 5,
    name: "iron",
    weakness: weakness.iron,
  },
];

const attacks = [
  {
    id: 1,
    name: "Bullet rush",
    value: 15,
    type: getType(5),
    action: getActions(1),
  },
  {
    id: 2,
    name: "Ration",
    value: 15,
    type: getType(1),
    action: getActions(2),
  },
  {
    id: 3,
    name: "Kevlar",
    value: 30,
    type: getType(5),
    action: getActions(3),
  },
  {
    id: 4,
    name: "Bellow",
    value: 20,
    type: getType(1),
    action: getActions(4),
  },
  {
    id: 5,
    name: "Ball burst",
    value: 20,
    type: getType(1),
    action: getActions(1),
  },
  {
    id: 6,
    name: "Cold chest",
    value: 25,
    type: getType(4),
    action: getActions(3),
  },
  {
    id: 7,
    name: "Preparation",
    value: 5,
    type: getType(1),
    action: getActions(5),
  },
];

const monsters = [
  {
    id: 1,
    name: "Floppa",
    image:
      "https://i.postimg.cc/y8xrdXv1/Floppagunner.webp",
    life: 150, // 200
    defense: 50, // 100
    attack: 110, // 150
    speed: 40, // 100
    attacks: getAttacks(1, 2, 3, 4),
    types: [getType(5)],
    state: getState(1),
  },
  {
    id: 2,
    name: "Messi",
    image:
      "https://i.postimg.cc/G2MwTSP2/Fjutnz-KWAAQM3c-F-removebg-preview.png",
    life: 120, // 200
    defense: 45, // 100
    attack: 130, // 150
    speed: 80, // 100
    attacks: getAttacks(5, 6, 7, 4),
    types: [getType(4)],
    state: getState(1),
  },
];

export { monsters, types, attacks, weakness };
