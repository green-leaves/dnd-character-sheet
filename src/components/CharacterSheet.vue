<script setup>
  import { ref, reactive, computed } from 'vue';
  import characterData from './CharacterData.js'
  const abilityList = [
    {key: 'str', value: 'strength'},
    {key: 'dex', value: 'dexterity'},
    {key: 'con', value: 'constitution'},
    {key: 'int', value: 'intelligence'},
    {key: 'wis', value: 'wisdom'},
    {key: 'cha', value: 'charisma'}
  ];

  const calculateMod = (score) => {
    if (score === '') return '';
    return Math.floor((score - 10) / 2);
  };

  const computeMod = (abilityKey) => {
    return calculateMod(data.abilities[abilityKey].score);
  };

  const computedTempMod = (abilityKey) => {
    return calculateMod(data.abilities[abilityKey].tempScore);
  };

  const computeData = () => {
    for (const ability of abilityList) {
      data.abilities[ability.key].mod = computed(() => computeMod(ability.key));
      data.abilities[ability.key].tempMod = computed(() => computedTempMod(ability.key));
    }
  }

  const exportData = () => {
    const abilitiesJson = JSON.stringify(data, null, 2);
    const blob = new Blob([abilitiesJson], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'abilities.json';
    a.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        console.log(importedData);
        for (const key in importedData) {
          if (data.hasOwnProperty(key)) {
            data[key] = importedData[key];
          }
        }
        computeData();
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };
    reader.readAsText(file);
  };

  const data = reactive(characterData);
  computeData();

</script>

<template>
  <form id="sheet">
    <section style="text-align: right">
      <button style="color: white; padding: 10px" @click="exportData">Export</button>
      <input style="margin-left: 20px" type="file" @change="importData" accept=".json">
    </section>
    <header>
      <section id="character">
        <table id="info">
          <tr>
            <td colspan="2">
              <input type="text" name="character-name" title="character-name" placeholder="Thalorin Nightbane">
              <br>
              <label for="character-name">Character Name</label>
            </td>
            <td>
              <input type="text" name="class-level" title="class" placeholder="Necromancer">
              <br>
              <label for="class-level">Class (Level)</label>
            </td>
            <td>
              <input type="text" name="alignment" title="alignment">
              <br>
              <label for="class-level">Alignment</label>
            </td>
            <td colspan="2">
              <input type="text" name="deities" title="deities">
              <br>
              <label for="class-level">Deities</label>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <input type="text" name="player-name" title="player-name">
              <br>
              <label for="player-name">Player Name</label>
            </td>
            <td>
              <input type="text" name="class-level" title="experience">
              <br>
              <label for="class-level">Class (Level)</label>
            </td>
            <td>
              <input type="text" name="age" title="age">
              <br>
              <label for="class-level">Age</label>
            </td>
            <td>
              <input type="text" name="height" title="height">
              <br>
              <label for="class-level">Height</label>
            </td>
            <td>
              <input type="text" name="weight" title="weight" placeholder="80kg">
              <br>
              <label for="class-level">Weight</label>
            </td>
          </tr>
        </table>
      </section>
    </header>
    <main>
      <section id="stats">
        <table id="abilities">
          <tr class="small-header">
            <td></td>
            <td>Ability Score</td>
            <td>Ability Modifier</td>
            <td>Temporary Score</td>
            <td>Temporary Modifier</td>
          </tr>
          <tr v-for="ability in abilityList" :key="ability.key">
            <td class="tag"
                :class="{'round-header': ability.key === 'str'}">
              <span>{{ ability.key }}</span>
            </td>
            <td><input type="text" v-model.number="data.abilities[ability.key].score" :name="ability.key" :title="ability.key" class="mod"></td>
            <td class="readonly"><input readonly type="text" :value="data.abilities[ability.key].mod" :name="ability.key + 'Mod'" :title="ability.key + 'Mod'" class="mod"></td>
            <td><input type="text" v-model.number="data.abilities[ability.key].tempScore" :name="ability.key + 'Temp'"  :title="ability.key + 'Temp'" class="mod"></td>
            <td class="readonly"><input readonly type="text" :value="data.abilities[ability.key].tempMod" :name="ability.key + 'TempMod'" :title="ability.key + 'TempMod'" class="mod"></td>
          </tr>
        </table>
      </section>
      <section id="hp">
        <table id="ac">
          <tr class="small-header">
            <td><span>&nbsp;<br><br></span></td>
            <td><span>TOTAL</span></td>
            <td colspan="3"></td>
            <td class="unit">Armor</td><td></td>
            <td class="unit">Shield</td><td></td>
            <td class="unit">Dex</td><td></td>
            <td class="unit">Size</td><td></td>
            <td class="unit">Natural</td><td></td>
            <td class="unit">Misc</td>
          </tr>
          <tr>
            <td class="tag round-header"><span>AC</span></td>
            <td class="unit"><input type="text"></td>
            <td class="char"><span>=</span></td>
            <td class="char"><span>10</span></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td><td class="char">+</td>
            <td class="unit"><input type="text"></td><td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td><td class="char">+</td>
            <td class="unit"><input type="text"></td><td class="char">+</td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag unit"><span>Flat-Footed</span></td>
            <td class="unit" colspan="4"><input type="text"></td>
            <td></td>
            <td></td>
            <td class="tag unit round-header" colspan="3">XP</td>
            <td class="unit" colspan="6"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag unit"><span>Touch</span></td>
            <td class="unit" colspan="4"><input type="text"></td>
            <td></td>
            <td></td>
            <td class="tag unit" colspan="3">Next Level</td>
            <td class="unit" colspan="6"><input type="text"></td>
          </tr>
          <tr class="small-header">
            <td><span>&nbsp;</span></td>
            <td><span>TOTAL</span></td>
            <td class="char"></td>
            <td class="unit">Dex</td>
            <td></td>
            <td class="unit">Misc</td>
          </tr>
          <tr>
            <td class="tag round-header"><span>INIT</span></td>
            <td class="unit"><input type="text"></td>
            <td class="char"><span>=</span></td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag"><span>Speed</span></td>
            <td colspan="5" class="unit"><input type="text"></td>
            <td></td>
            <td class="tag unit round-header" colspan="3">HP</td>
            <td class="unit" colspan="6"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag"><span>Action</span></td>
            <td colspan="5" class="unit"><input type="text"></td>
            <td></td>
            <td class="tag unit" colspan="3">CHP</td>
            <td class="unit" colspan="6"><input type="text"></td>
          </tr>
        </table>
      </section>
    </main>
    <main>
      <section id="saves-attack">
        <table class="saves-and-attack">
          <tr class="small-header">
            <td>Saving Throws</td>
            <td>Total</td><td></td>
            <td>Base Save</td><td></td>
            <td>Ability Modifier</td><td></td>
            <td>Magic Modifier</td><td></td>
            <td>Misc Modifier</td><td></td>
            <td>Temp Modifier</td>
          </tr>
          <tr>
            <td class="tag round-header">
              <span class="rotate-tag">CON</span>
              <span>Fortitude</span>
            </td>
            <td class="unit"><input type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.con.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag">
              <span class="rotate-tag">DEX</span>
              <span>Reflex</span>
            </td>
            <td class="unit"><input type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag">
              <span class="rotate-tag">WIS</span>
              <span>WillPower</span>
            </td>
            <td class="unit"><input type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.wis.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
          </tr>
        </table>
        <table class="saves-and-attack">
          <tr class="small-header">
            <td>Attack Bonus</td>
            <td>Total</td><td></td>
            <td>Base Attack Bonus</td><td></td>
            <td>Ability Modifier</td><td></td>
            <td>Magic Modifier</td><td></td>
            <td>Misc Modifier</td><td></td>
            <td>Temp Modifier</td>
          </tr>
          <tr>
            <td class="tag round-header">
              <span class="rotate-tag">STR</span>
              <span>Melee</span>
            </td>
            <td class="unit"><input type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.str.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag">
              <span class="rotate-tag">DEX</span>
              <span>Range</span>
            </td>
            <td class="unit"><input type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input type="text"></td>
          </tr>
        </table>
      </section>
      <section id="languages-gold">
        <table>
          <tr>
            <td>Languages</td>
            <td>Gold/Valuables</td>
          </tr>
          <tr v-for="row in 8" :key="row">
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
        </table>
      </section>
    </main>
    <main>
      <section class="equipment">
        <table id="proficiency">
          <tr>
            <td class="tag round-header">Weapon <br> Proficiency</td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag round-header">Armor <br> Proficiency</td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
          </tr>
        </table>

        <table v-for="index in 3" :key="index" class="weapon">
          <tr>
            <th class="tag" colspan="2">Weapon</th>
            <th class="tag">Attack Bonus</th>
            <th class="tag">Damage</th>
            <th class="tag">Critical</th>
          </tr>
          <tr>
            <td class="unit" colspan="2"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <th class="tag">Range</th>
            <th class="tag">Type</th>
            <th class="tag" colspan="3">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit" colspan="3"><input type="text"></td>
          </tr>
        </table>
      </section>
      <section class="equipment equipment2">
        <table>
          <tr>
            <th class="tag" colspan="2">Armor</th>
            <th class="tag">Bonus</th>
            <th class="tag">Max Dex</th>
            <th class="tag">Penalty</th>
          </tr>
          <tr>
            <td class="unit" colspan="2"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <th class="tag">Speed Reduction</th>
            <th class="tag">Type</th>
            <th class="tag" colspan="3">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit" colspan="3"><input type="text"></td>
          </tr>
        </table>
        <table>
          <tr>
            <th class="tag" colspan="2">Shield</th>
            <th class="tag">Bonus</th>
            <th class="tag">Max Dex</th>
            <th class="tag">Penalty</th>
          </tr>
          <tr>
            <td class="unit" colspan="2"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
          </tr>
          <tr>
            <th class="tag">Speed Reduction</th>
            <th class="tag">Type</th>
            <th class="tag" colspan="3">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
            <td class="unit" colspan="3"><input type="text"></td>
          </tr>
        </table>
        <table>
          <tr>
            <th class="tag">Boots</th>
            <th class="tag">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
          </tr>
        </table>
        <table>
          <tr>
            <th class="tag">Armlet</th>
            <th class="tag">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input type="text"></td>
            <td class="unit"><input type="text"></td>
          </tr>
        </table>
      </section>
    </main>
  </form>
</template>
<style lang="sass">
$sheet-width: 1000px
$bg: white
$faded: #ddd
$faded-light: #eee
$faded-dark: #2d2d2d
$radius: 10px
$gutter: 10px
$bubble-size: 10px
$small-box-width: 30px
$large-box-width: 70px
form#sheet
  width: $sheet-width
  .round-header
    border-radius: 10px 10px 0 0
  input[type="file"]::file-selector-button
    border-radius: 8px
    border: 1px solid transparent
    padding: 11px
    font-size: 1em
    font-weight: 500
    font-family: inherit
    background-color: #1a1a1a
    cursor: pointer
    color: white
    transition: border-color 0.25s
  input[type="text"]:read-only
    background-color: $faded-light
  .readonly
    background-color: $faded-light
  header
    section#character
      table#info
        td
          padding: 0 5px 0 10px

          label
            margin-bottom: 5px
            text-transform: uppercase

          input
            border: 0
            border-bottom: 1px solid $faded
            width: 100%
            padding: 6px
            font-size: 100%
  main
    display: flex
    justify-content: space-between
    margin-top: $gutter*2
    .tag
      background-color: $faded-dark
      color: white
      text-align: center
      font-weight: bold
      text-transform: uppercase
    section#stats
      width: 40%
      display: flex
      table#abilities
        width: 100%
        border-collapse: separate
        tr.small-header
          td
            vertical-align: bottom
            font-size: 12px
            border: none
        td
          width: 20%
          padding: 0
          border: 1px solid $faded-dark
          input[type="text"]
            width: 100%
            height: 100%
            border: none
            box-sizing: border-box
            text-align: center
            padding: 6px
            outline: none
    section#hp
      margin-top: 10px
      padding-left: 10px
      width: 60%
      table#ac
        width: 100%
        border-collapse: separate
        .char
          width: 1em
        .tag
          width: 20%
        .unit
          min-width: 40px
          width: 40px
        tr.small-header
          td
            vertical-align: bottom
            font-size: 12px
        td
          input[type="text"]
            width: 100%
            box-sizing: border-box
            text-align: center
            padding: 6px
            border: 1px solid $faded-dark
    section#saves-attack
      width: 60%
      table.saves-and-attack
        .rotate-tag
          display: inline-block
          float: left
          transform: rotate(-90deg)
          margin-top: 3px
          font-size: 8px
        .tag
          width: 200px
          font-size: 12px
          padding-right: 4px
        .unit
          width: 12%
        .char
          width: 1em
        border-collapse: separate
        tr.small-header
          td
            vertical-align: bottom
            font-size: 12px
            border: none
        td
          input[type="text"]
            width: 100%
            height: 100%
            box-sizing: border-box
            text-align: center
            padding: 6px
            border: 1px solid black
    section#languages-gold
      width: 40%
      .tag
        background-color: $faded-dark
        color: white
        text-align: center
        font-weight: bold
        text-transform: uppercase
      table
        width: 100%
        td
          input
            border-style: none
            border-top: 1px solid white
            border-bottom: 1px solid black
            outline: none
    section.equipment
      width: 50%
      .tag
        width: 100px
        font-size: 12px
      table
        width: 100%
        input[type="text"]
          width: 100%
          box-sizing: border-box
          text-align: center
          padding: 6px
          border: 1px solid $faded-dark
    section.equipment2
      table
        padding-top: 11px
</style>