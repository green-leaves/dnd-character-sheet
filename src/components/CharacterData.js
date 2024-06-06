const ability = () => {
  return {
    score: '',
    mod: '',
    tempScore: '',
    tempMod: ''
  };
}


const characterData = {
  abilities: {
    str: ability(),
    dex: ability(),
    con: ability(),
    int: ability(),
    wis: ability(),
    cha: ability(),
  },
  languages: [],
  goldValuables: []
}


export default characterData;