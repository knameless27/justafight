const getAttacks = (id1, id2, id3, id4) => {
  const newAttacks = [
    attacks[id1 - 1],
    attacks[id2 - 1],
    attacks[id3 - 1],
    attacks[id4 - 1],
  ];
  return newAttacks;
};

const getAttack = (id) => {
  return attacks[id - 1];
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
    image: "https://i.postimg.cc/y8xrdXv1/Floppagunner.webp",
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
  {
    id: 3,
    name: "Ronaldo",
    image: "https://i.postimg.cc/bwMw2X4D/3817ab002188426a57cafbeb1caa9fc6-removebg-preview.png",
    life: 150,
    defense: 60,
    attack: 140,
    speed: 85,
    attacks: getAttacks(6, 7, 8, 5),
    types: [getType(4)],
    state: getState(1),
  },
  {
    id: 4,
    name: "Nimu",
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/48265441-add4-48b6-99ce-fb71117c63bb/dfo8dsj-a6e3b788-3a8e-4602-b0ad-bce765035339.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ4MjY1NDQxLWFkZDQtNDhiNi05OWNlLWZiNzExMTdjNjNiYlwvZGZvOGRzai1hNmUzYjc4OC0zYThlLTQ2MDItYjBhZC1iY2U3NjUwMzUzMzkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FaYul2MUP9qsC_H_6kZaejsKIAjoUSZVwsEBi7kXV8E",
    life: 110,
    defense: 40,
    attack: 150,
    speed: 90,
    attacks: getAttacks(7, 8, 9, 6),
    types: [getType(4)],
    state: getState(1),
  },
  {
    id: 5,
    name: "Puck",
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0933e753-46e6-4a96-aa10-0d6e0c26c2d6/dg8i845-537dc74a-2335-49b0-8f8a-cdd21d6bc75f.png/v1/fill/w_1280,h_1707/berserk___puck___small__xps_dl__by_crypt_xps_dg8i845-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTcwNyIsInBhdGgiOiJcL2ZcLzA5MzNlNzUzLTQ2ZTYtNGE5Ni1hYTEwLTBkNmUwYzI2YzJkNlwvZGc4aTg0NS01MzdkYzc0YS0yMzM1LTQ5YjAtOGY4YS1jZGQyMWQ2YmM3NWYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.fSccFJt8WzKMWb_Vn6P6MQy_UulgoYU5S2tMM9Kk_8A",
    life: 130,
    defense: 55,
    attack: 120,
    speed: 75,
    attacks: getAttacks(4, 5, 6, 3),
    types: [getType(2)],
    state: getState(1),
  },
  {
    id: 6,
    name: "Webi wabo",
    image: "https://i.postimg.cc/sDxBBJ1L/webi-removebg-preview.png",
    life: 140,
    defense: 50,
    attack: 110,
    speed: 70,
    attacks: getAttacks(3, 4, 5, 2),
    types: [getType(2)],
    state: getState(1),
  },
  {
    id: 7,
    name: "Sanic",
    image: "https://i.postimg.cc/sf98Bpb5/1385136139955.webp",
    life: 125,
    defense: 48,
    attack: 135,
    speed: 95,
    attacks: getAttacks(8, 9, 10, 7),
    types: [getType(4)],
    state: getState(1),
  },
  {
    id: 8,
    name: "Roblox guy",
    image: "https://tr.rbxcdn.com/148d6286490083cc4d410af4a302d239/420/420/Avatar/Png",
    life: 160,
    defense: 80,
    attack: 70,
    speed: 60,
    attacks: getAttacks(2, 3, 4, 1),
    types: [getType(1)],
    state: getState(1),
  },
  {
    id: 9,
    name: "Lewandowski",
    image: "URL de la imagen de Lewandowski",
    life: 140,
    defense: 70,
    attack: 160,
    speed: 75,
    attacks: getAttacks(9, 10, 11, 8),
    types: [getType(5)],
    state: getState(1),
  },
  {
    id: 10,
    name: "Hazard",
    image: "URL de la imagen de Hazard",
    life: 135,
    defense: 55,
    attack: 125,
    speed: 78,
    attacks: getAttacks(6, 7, 8, 4),
    types: [getType(3)],
    state: getState(1),
  },
];

export { monsters, types, attacks, getAttack, getAttacks, getActions, getType };
