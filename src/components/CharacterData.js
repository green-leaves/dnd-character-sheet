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



export default characterData;