<script setup>
  const abilities = [
    {key: 'str', value: 'strength'},
    {key: 'dex', value: 'dexterity'},
    {key: 'con', value: 'constitution'},
    {key: 'int', value: 'intelligence'},
    {key: 'wis', value: 'wisdom'},
    {key: 'cha', value: 'charisma'}
  ]


</script>

<template>
  <form id="sheet">
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
          <thead>
          <tr class="small-header">
            <td></td>
            <td>Ability Score</td>
            <td>Ability Modifier</td>
            <td>Temporary Score</td>
            <td>Temporary Modifier</td>
          </tr>
          <tr v-for="ability in abilities" :key="ability.key">
            <td class="tag"
                :class="{'round-header': ability.key === 'str'}">
              <span>{{ ability.key }}</span>
            </td>
            <td><input type="text" name="{{ability.key}}" title="{{ability.key}}" class="mod"></td>
            <td><input type="text" name="Str" title="Str" class="mod"></td>
            <td><input type="text" name="Str" title="Str" class="mod"></td>
            <td><input type="text" name="Str" title="Str" class="mod"></td>
          </tr>
          </thead>
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
            <td class="unit"><input type="text"></td><td class="char">+</td>
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
            <td class="unit"><input type="text"></td><td class="char">+</td>
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
</style>