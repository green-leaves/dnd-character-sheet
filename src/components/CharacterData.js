const ability = () => {
  return {
    score: '',
    mod: '',
    tempScore: '',
    tempMod: ''
  };
}

const savingThrow = () => {
  return {
    total: '',
    base: '',
    magic: '',
    misc: '',
    temp: ''
  }
}

const attackBonus = () => {
  return {
    total: '',
    base: '',
    magic: '',
    misc: '',
    temp: '',
  }
}

const characterData = {
  characterInfo: {
    characterName: '',
    playerName: '',
    firstClassLevel: '',
    secondClassLevel: '',
    alignment: '',
    deities: '',
    age: '',
    height: '',
    weight: '',
  },
  abilities: {
    str: ability(),
    dex: ability(),
    con: ability(),
    int: ability(),
    wis: ability(),
    cha: ability(),
  },
  ac: {
    total: '',
    armor: '',
    shield: '',
    size: '',
    natural: '',
    misc: ''
  },
  flatFooted: {
    ac: '',
  },
  touch: {
    ac: '',
  },
  init: {
    total: '',
    misc: ''
  },
  fortitudeSave: savingThrow(),
  reflexSave: savingThrow(),
  willPowerSave: savingThrow(),
  meleeAtkBonus: attackBonus(),
  rangeAtkBonus: attackBonus(),
  languages: [],
  goldValuables: []
}

export const abilityList = [
  {key: 'str', value: 'strength'},
  {key: 'dex', value: 'dexterity'},
  {key: 'con', value: 'constitution'},
  {key: 'int', value: 'intelligence'},
  {key: 'wis', value: 'wisdom'},
  {key: 'cha', value: 'charisma'}
];

export const skills = [
  {name: "Craft", keyAbility: ""},
  {name: "Athletics", keyAbility: "dex"},
  {name: "Acrobatics", keyAbility: "dex"},
  {name: "Burgling", keyAbility: "dex"},
  {name: "Sleight of Hand", keyAbility: "int"},
  {name: "Stealth", keyAbility: "int"},
  {name: "Arcana", keyAbility: "int"},
  {name: "History", keyAbility: "int"},
  {name: "Investigation", keyAbility: "int"},
  {name: "Nature", keyAbility: "int"},
  {name: "Religion", keyAbility: "int"},
  {name: "Piloting", keyAbility: "int"},
  {name: "Insight", keyAbility: "wis"},
  {name: "Medicine", keyAbility: "wis"},
  {name: "Perception", keyAbility: "wis"},
  {name: "Survival", keyAbility: "wis"},
  {name: "Animal Handling", keyAbility: "cha"},
  {name: "Deception", keyAbility: "cha"},
  {name: "Intimidation", keyAbility: "cha"},
  {name: "Performance", keyAbility: "cha"},
  {name: "Persuasion", keyAbility: "cha"}
]


export default characterData;