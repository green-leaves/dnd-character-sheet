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
    class: '',
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
  speed: '',
  action: '',
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
  { level: 1, requiredXP: 0, nextXP: 1000 },
  { level: 2, requiredXP: 1000, nextXP: 3000 },
  { level: 3, requiredXP: 3000, nextXP: 6000 },
  { level: 4, requiredXP: 6000, nextXP: 10000 },
  { level: 5, requiredXP: 10000, nextXP: 15000 },
  { level: 6, requiredXP: 15000, nextXP: 21000 },
  { level: 7, requiredXP: 21000, nextXP: 28000 },
  { level: 8, requiredXP: 28000, nextXP: 36000 },
  { level: 9, requiredXP: 36000, nextXP: 45000 },
  { level: 10, requiredXP: 45000, nextXP: 55000 },
  { level: 11, requiredXP: 55000, nextXP: 66000 },
  { level: 12, requiredXP: 66000, nextXP: 78000 },
  { level: 13, requiredXP: 78000, nextXP: 91000 },
  { level: 14, requiredXP: 91000, nextXP: 105000 },
  { level: 15, requiredXP: 105000, nextXP: 120000 },
  { level: 16, requiredXP: 120000, nextXP: 136000 },
  { level: 17, requiredXP: 136000, nextXP: 153000 },
  { level: 18, requiredXP: 153000, nextXP: 171000 },
  { level: 19, requiredXP: 171000, nextXP: 190000 },
  { level: 20, requiredXP: 190000, nextXP: Infinity }  // Level 20 is the max level
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