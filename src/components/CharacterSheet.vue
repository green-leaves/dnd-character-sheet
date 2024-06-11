<script setup>
  import { reactive, computed } from 'vue';
  import vueFilePond from "vue-filepond";
  import "filepond/dist/filepond.min.css";
  import { saveAs } from 'file-saver';
  import characterData, {abilityList, defenseItem, skills, weapon} from './CharacterData.js'

  const FilePond = vueFilePond();

  const totalFeatRows = 15;
  const totalLanguages = 8;
  const totalGoldValuables = 8;
  const totalProficiencies = 4;
  const totalWeapons = 3;
  const data = reactive(characterData);

  // Init Data
  data.languages = Array(totalLanguages).fill('');
  data.goldValuables = Array(totalGoldValuables).fill('');
  data.weaponProficiencies = Array(totalProficiencies).fill('');
  data.armorProficiencies = Array(totalProficiencies).fill('');
  data.weapons = Array(totalWeapons).fill(null).map(() => weapon());
  data.feats = Array(totalFeatRows).fill('');
  data.possessions = Array(totalFeatRows).fill('');
  data.spellsAndPowersKnown = Array(totalFeatRows).fill('');

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
    data.ac.total = computed(() => {
      return 10
          + Number(data.ac.armor)
          + Number(data.ac.shield)
          + Number(data.abilities.dex.mod)
          + Number(data.ac.size)
          + Number(data.ac.natural)
          + Number(data.ac.misc);
    });
    data.flatFooted.ac = computed(() => {
      return 10
          + Number(data.ac.armor)
          + Number(data.ac.shield)
          + Number(data.ac.size)
          + Number(data.ac.natural)
          + Number(data.ac.misc);
    })

    data.touch.ac = computed(() => {
      return 10
          + Number(data.abilities.dex.mod)
          + Number(data.ac.size)
          + Number(data.ac.natural)
          + Number(data.ac.misc);
    })

    data.init.total = computed(() => {
      return Number(data.abilities.dex.mod) + Number(data.init.misc);
    })

    data.fortitudeSave.total = computed(() => {
      return Number(data.fortitudeSave.base)
          + Number(data.abilities.con.mod)
          + Number(data.fortitudeSave.magic)
          + Number(data.fortitudeSave.misc)
          + Number(data.fortitudeSave.temp)
    });

    data.reflexSave.total = computed(() => {
      return Number(data.reflexSave.base)
          + Number(data.abilities.dex.mod)
          + Number(data.reflexSave.magic)
          + Number(data.reflexSave.misc)
          + Number(data.reflexSave.temp)
    })

    data.willPowerSave.total = computed(() => {
      return Number(data.willPowerSave.base)
          + Number(data.abilities.wis.mod)
          + Number(data.willPowerSave.magic)
          + Number(data.willPowerSave.misc)
          + Number(data.willPowerSave.temp)
    })

    data.meleeAtkBonus.total = computed(() => {
      return Number(data.meleeAtkBonus.base)
          + Number(data.abilities.str.mod)
          + Number(data.meleeAtkBonus.magic)
          + Number(data.meleeAtkBonus.misc)
          + Number(data.meleeAtkBonus.temp)
    })

    data.rangeAtkBonus.total = computed(() => {
      return Number(data.rangeAtkBonus.base)
          + Number(data.abilities.dex.mod)
          + Number(data.rangeAtkBonus.magic)
          + Number(data.rangeAtkBonus.misc)
          + Number(data.rangeAtkBonus.temp)
    })
  }

  const exportData = () => {
    const abilitiesJson = JSON.stringify(data, null, 2);
    const blob = new Blob([abilitiesJson], { type: 'application/json' });
    const exportFileName = data.characterInfo.characterName.replaceAll(" " ,"")
        + "_" + new Date().toISOString() + ".json";
    saveAs(blob, exportFileName);
  };

  const addFile = (error, file) => {
    if (error) {
      console.error('Error adding file:', error);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
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
    reader.readAsText(file.file);
  };

  computeData();
</script>

<template>
  <form id="sheet">
    <section id="file-upload-container">
        <div id="file-pond-div">
          <file-pond
              name="file"
              ref="pond"
              label-idle="Drop files here..."
              :acceptedFileTypes="['application/json']"
              :credits="'false'"
              @addfile="addFile"
          />
        </div>
      <button id="export" @click.prevent="exportData">Export</button>
    </section>
    <header>
      <section id="character">
        <table id="info">
          <tr>
            <td colspan="2">
              <input type="text" v-model="data.characterInfo.characterName" name="character-name" title="character-name" placeholder="Thalorin Nightbane">
              <br>
              <label for="character-name">Character Name</label>
            </td>
            <td>
              <input type="text" name="class-level" v-model="data.characterInfo.firstClassLevel"  title="class" placeholder="Necromancer">
              <br>
              <label for="class-level">Class (Level)</label>
            </td>
            <td>
              <input type="text" name="alignment" v-model="data.characterInfo.alignment"  title="alignment">
              <br>
              <label for="class-level">Alignment</label>
            </td>
            <td colspan="2">
              <input type="text" name="deities" v-model="data.characterInfo.deities"  title="deities">
              <br>
              <label for="class-level">Deities</label>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <input type="text" name="player-name" v-model="data.characterInfo.playerName"  title="player-name">
              <br>
              <label for="player-name">Player Name</label>
            </td>
            <td>
              <input type="text" name="class-level" v-model="data.characterInfo.secondClassLevel"  title="experience">
              <br>
              <label for="class-level">Class (Level)</label>
            </td>
            <td>
              <input type="text" name="age" title="age" v-model="data.characterInfo.age" >
              <br>
              <label for="class-level">Age</label>
            </td>
            <td>
              <input type="text" name="height" title="height" v-model="data.characterInfo.height" >
              <br>
              <label for="class-level">Height</label>
            </td>
            <td>
              <input type="text" name="weight" title="weight" placeholder="80kg" v-model="data.characterInfo.weight" >
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
            <td class="unit"><input readonly :value="data.ac.total" type="text"></td>
            <td class="char"><span>=</span></td>
            <td class="char"><span>10</span></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.ac.armor" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.ac.shield" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.ac.size"  type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.ac.natural"  type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.ac.misc" type="text"></td>
          </tr>
          <tr>
            <td class="tag unit"><span>Flat-Footed</span></td>
            <td class="unit" colspan="4"><input readonly :value="data.flatFooted.ac" type="text"></td>
            <td></td>
            <td></td>
            <td class="tag unit round-header" colspan="3">XP</td>
            <td class="unit" colspan="6"><input type="text"></td>
          </tr>
          <tr>
            <td class="tag unit"><span>Touch</span></td>
            <td class="unit" colspan="4"><input readonly :value="data.touch.ac"  type="text"></td>
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
            <td class="unit"><input readonly v-model="data.init.total" type="text"></td>
            <td class="char"><span>=</span></td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.init.misc"  type="text"></td>
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
            <td class="unit"><input v-model="data.fortitudeSave.total" type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input v-model="data.fortitudeSave.base" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.con.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.fortitudeSave.magic" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.fortitudeSave.misc" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.fortitudeSave.temp" type="text"></td>
          </tr>
          <tr>
            <td class="tag">
              <span class="rotate-tag">DEX</span>
              <span>Reflex</span>
            </td>
            <td class="unit"><input v-model="data.reflexSave.total" type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input v-model="data.reflexSave.base" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.reflexSave.magic" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.reflexSave.misc" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.reflexSave.temp" type="text"></td>
          </tr>
          <tr>
            <td class="tag">
              <span class="rotate-tag">WIS</span>
              <span>WillPower</span>
            </td>
            <td class="unit"><input v-model="data.willPowerSave.total" type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input v-model="data.willPowerSave.base" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.wis.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.willPowerSave.magic" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.willPowerSave.misc" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.willPowerSave.temp" type="text"></td>
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
            <td class="unit"><input readonly v-model="data.meleeAtkBonus.total" type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input v-model="data.meleeAtkBonus.base" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.str.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.meleeAtkBonus.magic" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.meleeAtkBonus.misc" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.meleeAtkBonus.temp" type="text"></td>
          </tr>
          <tr>
            <td class="tag">
              <span class="rotate-tag">DEX</span>
              <span>Range</span>
            </td>
            <td class="unit"><input readonly v-model="data.rangeAtkBonus.total" type="text"></td>
            <td class="char">=</td>
            <td class="unit"><input v-model="data.rangeAtkBonus.base" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input readonly type="text" :value="data.abilities.dex.mod"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.rangeAtkBonus.magic" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.rangeAtkBonus.misc" type="text"></td>
            <td class="char">+</td>
            <td class="unit"><input v-model="data.rangeAtkBonus.temp" type="text"></td>
          </tr>
        </table>
      </section>
      <section id="languages-gold">
        <table>
          <tr>
            <td>Languages</td>
          </tr>
          <tr v-for="(language, index) in data.languages" :key="index">
            <td>
              <input v-model="data.languages[index]" type="text" />
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>Gold/Valuables</td>
          </tr>
          <tr v-for="(valuable, index) in data.goldValuables" :key="index">
            <td>
              <input v-model="data.goldValuables[index]" type="text" />
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
            <td v-for="(proficiency, index) in data.weaponProficiencies" class="unit">
              <input v-model="data.weaponProficiencies[index]" type="text">
            </td>
          </tr>
          <tr>
            <td class="tag round-header">Armor <br> Proficiency</td>
            <td v-for="(proficiency, index) in data.armorProficiencies" class="unit">
              <input v-model="data.armorProficiencies[index]" type="text">
            </td>
          </tr>
        </table>

        <table v-for="(weapon, index) in data.weapons" class="weapon">
          <tr>
            <th class="tag" colspan="2">Weapon</th>
            <th class="tag">Attack Bonus</th>
            <th class="tag">Damage</th>
            <th class="tag">Critical</th>
          </tr>
          <tr>
            <td class="unit" colspan="2">
              <input v-model="data.weapons[index].name" type="text">
            </td>
            <td class="unit"><input v-model="data.weapons[index].attackBonus" type="text"></td>
            <td class="unit"><input v-model="data.weapons[index].damage" type="text"></td>
            <td class="unit"><input v-model="data.weapons[index].critical" type="text"></td>
          </tr>
          <tr>
            <th class="tag">Range</th>
            <th class="tag">Type</th>
            <th class="tag" colspan="3">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input v-model="data.weapons[index].range" type="text"></td>
            <td class="unit"><input v-model="data.weapons[index].types" type="text"></td>
            <td class="unit" colspan="3">
              <input type="text" v-model="data.weapons[index].notes">
            </td>
          </tr>
        </table>
      </section>
      <section class="equipment equipment2">
        <table id="armor">
          <tr>
            <th class="tag" colspan="2">Armor</th>
            <th class="tag">Bonus</th>
            <th class="tag">Max Dex</th>
            <th class="tag">Penalty</th>
          </tr>
          <tr>
            <td class="unit" colspan="2">
              <input v-model="data.armor.name" type="text">
            </td>
            <td class="unit"><input v-model="data.armor.bonus" type="text"></td>
            <td class="unit"><input v-model="data.armor.maxDex" type="text"></td>
            <td class="unit"><input v-model="data.armor.penalty" type="text"></td>
          </tr>
          <tr>
            <th class="tag">Speed Reduction</th>
            <th class="tag">Type</th>
            <th class="tag" colspan="3">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input v-model="data.armor.speedReduction"  type="text"></td>
            <td class="unit"><input v-model="data.armor.type" type="text"></td>
            <td class="unit" colspan="3"><input v-model="data.armor.notes"  type="text"></td>
          </tr>
        </table>
        <table id="shield">
          <tr>
            <th class="tag" colspan="2">Shield</th>
            <th class="tag">Bonus</th>
            <th class="tag">Max Dex</th>
            <th class="tag">Penalty</th>
          </tr>
          <tr>
            <td class="unit" colspan="2">
              <input v-model="data.shield.name" type="text">
            </td>
            <td class="unit"><input v-model="data.shield.bonus" type="text"></td>
            <td class="unit"><input v-model="data.shield.maxDex" type="text"></td>
            <td class="unit"><input v-model="data.shield.penalty" type="text"></td>
          </tr>
          <tr>
            <th class="tag">Speed Reduction</th>
            <th class="tag">Type</th>
            <th class="tag" colspan="3">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input v-model="data.shield.speedReduction"  type="text"></td>
            <td class="unit"><input v-model="data.shield.type" type="text"></td>
            <td class="unit" colspan="3"><input v-model="data.shield.notes"  type="text"></td>
          </tr>
        </table>
        <table id="boots">
          <tr>
            <th class="tag">Boots</th>
            <th class="tag">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input v-model="data.boots.name" type="text"></td>
            <td class="unit"><input v-model="data.boots.notes" type="text"></td>
          </tr>
        </table>
        <table id="armlets">
          <tr>
            <th class="tag">Armlet</th>
            <th class="tag">Notes</th>
          </tr>
          <tr>
            <td class="unit"><input v-model="data.armlet.name" type="text"></td>
            <td class="unit"><input v-model="data.armlet.notes" type="text"></td>
          </tr>
        </table>
      </section>
    </main>
    <main id="feats-spells">
      <section id="feat">
        <table class="multiple-inputs">
          <tr>
            <td class="tag">Feats</td>
          </tr>
          <tr v-for="row in totalFeatRows" :key="row">
            <td>
              <input v-model="data.feats[row]" type="text" />
            </td>
          </tr>
        </table>
      </section>
      <section id="possessions">
        <table class="multiple-inputs">
          <tr>
            <td class="tag">Possessions</td>
          </tr>
          <tr v-for="row in totalFeatRows" :key="row">
            <td>
              <input v-model="data.possessions[row]" type="text" />
            </td>
          </tr>
        </table>
      </section>
      <section id="spells">
        <table class="multiple-inputs">
          <tr>
            <td class="tag">Spells/Powers Known</td>
          </tr>
          <tr v-for="row in totalFeatRows" :key="row">
            <td>
              <input v-model="data.spellsAndPowersKnown[row]" type="text" />
            </td>
          </tr>
        </table>
      </section>
    </main>
    <main id="skills">
      <table>
        <tr>
          <td class="tag">Skill</td>
          <td class="tag">Class Skill</td>
          <td class="tag">Key Ability</td>
          <td class="tag">Skill Modifier</td>
          <td class="tag">=</td>
          <td class="tag">Skill Rank</td>
          <td class="tag">Ability Mod</td>
          <td class="tag">Misc Mod</td>
        </tr>
        <tr v-for="skill in skills">
          <td style="text-align: left">{{skill.name}}</td>
          <td></td>
          <td>{{skill.keyAbility}}</td>
          <td></td>
          <td>=</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
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
  input[type="text"]:read-only
    background-color: $faded-light
  .readonly
    background-color: $faded-light
  section#file-upload-container
    display: flex
    div#file-pond-div
      width: 50%
    button#export
      color: white
      height: 77px
      margin-left: 10px
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
            font-size: 18px
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
      display: flex
      .tag
        background-color: $faded-dark
        color: white
        text-align: center
        font-weight: bold
        text-transform: uppercase
      table
        width: 50%
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
    .equipment2
      table#armor
        margin-top: 5px
      table#shield
        margin-top: 20px
      table#boots
        margin-top: 21px
      table#armlets
        margin-top: -2px
  main#feats-spells
    section
      width: 33.333%
      table.multiple-inputs
        width: 100%
        box-sizing: border-box
        input
          width: 100%
          border-style: none
          border-top: 1px solid white
          border-bottom: 1px solid black
          outline: none
  main#skills
    table
      width: 100%
      border-collapse: collapse
      tr
       td
         border: 1px solid black
</style>