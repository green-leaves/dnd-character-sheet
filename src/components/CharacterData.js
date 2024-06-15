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

export const weapon = () => {
  return {
    name: '',
    attackBonus: '',
    damage: '',
    critical: '',
    range: '',
    type: '',
    notes: ''
  }
}

export const defenseItem = () => {
  return {
    name: '',
    bonus: '',
    maxDex: '',
    penalty: '',
    speedReduction: '',
    type: '',
    notes: ''
  }
}

const skill = (name, keyAbility) => {
  return {
    name: name,
    classSkill: true,
    keyAbility: keyAbility,
    skillMod: '',
    skillRank: '',
    miscMod: '',
    penalty: ''
  }
}

const skills = () => {
  return [
    skill("Craft", ""),
    skill("Athletics", "str"),
    skill("Acrobatics", "dex"),
    skill("Burgling", "dex"),
    skill("Sleight of Hand", "dex"),
    skill("Stealth", "dex"),
    skill("Arcana", "int"),
    skill("History", "int"),
    skill("Investigation", "int"),
    skill("Nature", "int"),
    skill("Religion", "int"),
    skill("Piloting", "int"),
    skill("Insight", "wis"),
    skill("Medicine", "wis"),
    skill("Perception", "wis"),
    skill("Survival", "wis"),
    skill("Animal Handling", "cha"),
    skill("Deception", "cha"),
    skill("Intimidation", "cha"),
    skill("Performance", "cha"),
    skill("Persuasion", "cha"),
  ]
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
  level: {
    currentXP: 0,
    nextLevelXP: '',
    currentLevel: 1,
  },
  hp: {
    currentHP: '',
    CHP: ''
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
  goldValuables: [],
  weaponProficiencies: [],
  armorProficiencies: [],
  weapons: [],
  armor: defenseItem(),
  shield: defenseItem(),
  boots: defenseItem(),
  armlet: defenseItem(),
  miscEquips: [],
  feats: [],
  possessions: [],
  spellsAndPowersKnown: [],
  skills: skills(),
}

export const abilityList = [
  {key: 'str', value: 'strength'},
  {key: 'dex', value: 'dexterity'},
  {key: 'con', value: 'constitution'},
  {key: 'int', value: 'intelligence'},
  {key: 'wis', value: 'wisdom'},
  {key: 'cha', value: 'charisma'}
];

const xpLevels = [
  { requiredXP: 0, level: 1, nextXP: 300 },
  { requiredXP: 300, level: 2, nextXP: 900 },
  { requiredXP: 900, level: 3, nextXP: 2700 },
  { requiredXP: 2700, level: 4, nextXP: 6500 },
  { requiredXP: 6500, level: 5, nextXP: 14000 },
  { requiredXP: 14000, level: 6, nextXP: 23000 },
  { requiredXP: 23000, level: 7, nextXP: 34000 },
  { requiredXP: 34000, level: 8, nextXP: 48000 },
  { requiredXP: 48000, level: 9, nextXP: 64000 },
  { requiredXP: 64000, level: 10, nextXP: 85000 },
  { requiredXP: 85000, level: 11, nextXP: 100000 },
  { requiredXP: 100000, level: 12, nextXP: 120000 },
  { requiredXP: 120000, level: 13, nextXP: 140000 },
  { requiredXP: 140000, level: 14, nextXP: 165000 },
  { requiredXP: 165000, level: 15, nextXP: 195000 },
  { requiredXP: 195000, level: 16, nextXP: 225000 },
  { requiredXP: 225000, level: 17, nextXP: 265000 },
  { requiredXP: 265000, level: 18, nextXP: 305000 },
  { requiredXP: 305000, level: 19, nextXP: 355000 },
  { requiredXP: 355000, level: 20, nextXP: Infinity }  // Level 20 is the max level
];

export const getLevelInfo = (currentXP) => {
  for (let i = 0; i < xpLevels.length; i++) {
    if (currentXP >= xpLevels[i].requiredXP
      && currentXP < xpLevels[i].nextXP) {
      return {
        currentLevel: xpLevels[i].level,
        nextLevelXP: xpLevels[i].nextXP
      };
    }
  }
}


export default characterData;