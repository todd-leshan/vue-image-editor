<template>
  <div class="cutup">
    <header>
      <div class="container--page-title">
        <h1 class="page-title">Brightness & Contrast Developer Test</h1>
        <span class="page-subtitle">01 Jun, 2018 - 31 Dec, 2019</span>
      </div>
      <div class="container--avatar">
        <img class="avatar" src="../assets/avatar-minion.jpg" alt="candidate avatar">
      </div>
    </header>
    <main>
      <form>
        <div class="container--filter filter--eucalyptus disabled">
          <h3 class="filter-name">Brightness</h3>
          <div class="filter-range">
            <input type="range" value="50" min="0" max="100">
          </div>
          <span class="filter-desp">Slide to adjust image brightness!☀️</span>
        </div>
        <div class="container--filter filter--havelock-blue">
          <h3 class="filter-name">Contrast</h3>
          <div class="filter-range">
            <input type="range" value="50" min="0" max="100">
          </div>
          <span class="filter-desp">Slide to adjust image contrast! 🌓</span>
        </div>
        <canvas></canvas>
        <div class="container--upload">
          <div class="file-name">
            <span>name</span>
            <span>a long file name ...</span>
          </div>
          <div class="file-upload">
            <label for="file--img">
              upload
            </label>
            <input type="file" id="file--img">
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Cutup'
}
</script>

<style lang="scss">


</style>