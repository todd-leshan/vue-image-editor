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
@font-face {
  font-family: 'Graphik';
  src: local('Graphik Medium'), local('Graphik-Medium'),
      url('/fonts/Graphik-Medium.woff2') format('woff2'),
      url('/fonts/Graphik-Medium.woff') format('woff'),
      url('/fonts/Graphik-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

#app {
  min-width: 375px;
  max-width: 768px;
  margin: auto;
  font-family: "Graphik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container--page-title {
  background-color: $fuchsia-blue;
  color: $white;
  padding: 10px 20px 15px 20px;
  text-align: center;
}

.page-title {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.67;
}

.page-subtitle {
  display: block;
  font-size: 13px;
  line-height: 1.54;
}

.container--avatar {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 195px;
  margin-bottom: 7px;
  background-image: url(../assets/bg-image.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 133px;
    opacity: 0.3;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 33%, #000000);
  }
}

.avatar {
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: -6px;
  transform: translate(-50%, 6px);
  width: 60px;
  height: 60px;
  border: solid 2px $white;
  border-radius: 50%;
}

main {
  padding: 10px 20px 20px 20px;
}

.container--filter {
  margin-bottom: 7px;
  padding: 6px 20px 0 20px;
  border-radius: $border-radius;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

  &.disabled {
    position: relative;
    cursor: not-allowed;

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      background-color: $white;
    }
  }
}

.container--filter:last-of-type {
  margin-bottom: 29px; 
}

.filter--eucalyptus {
  .filter-name,
  .filter-range {
    color: $eucalyptus;
  }

  .filter-range {
    input {
      background-color: $eucalyptus;
      background: linear-gradient(90deg, $eucalyptus 50%, rgba(37,169,91, 0.5) 50%);

      &::-webkit-slider-thumb {
        background-color: $eucalyptus;
      }
    }
  }
}

.filter--havelock-blue {
  .filter-name,
  .filter-range {
    color: $havelock-blue;
  }

  .filter-range {
    input {
      background-color: $havelock-blue;

      &::-webkit-slider-thumb {
        background-color: $havelock-blue;
      }
    }
  }
}

.filter-name {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.39;
}

.filter-range {
  margin-bottom: 7px;

  input {
    width: 100%;
    height: 5px;
    border-radius: $border-radius;
    appearance: none;
    outline: none;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 22px;
      height: 22px;
      border: solid 3px $white;
      border-radius: 50%;
      cursor: pointer;
      transition: background .3s ease-in-out;

      &:hover,
      &:active {
        border: none;
      }
    }
  }
}

.filter-desp {
  display: block;
  padding: 3px 0 4px 0;
  color: $fiord;
  font-size: 13px;
  line-height: 1.39;
}

canvas {
  display: block;
  width: 100%;
  height: auto;
  border-top-right-radius: $border-radius;
  border-top-left-radius: $border-radius;
  background-color: $mischka;
}

.container--upload {
  padding: 20px 9px 8px 8px;
  border: solid 1px $mischka;
  border-top: none;
  border-bottom-right-radius: $border-radius;
  border-bottom-left-radius: $border-radius;
  text-align: left;
}

.file-name,
.file-upload {
  display: inline-block;
}

.file-name span,
.file-upload label {
  display: inline-block;
  background-color: $aqua-haze;
  border: solid 1px $mischka;
  line-height: 2.27;
  letter-spacing: 1.1px;
  text-align: center;
  text-transform: uppercase;
}

.file-name {
  span {
    font-size: 11px;
    font-weight: 500;
    color: $regent-gray;

    &:first-of-type {
      width: 60px;
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }

    &:last-of-type {
      width: 147px;
      background-color: $white;
      color: $eucalyptus;
      border-left: none;
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}

.file-upload {
  float: right;

  label {
    position: relative;
    padding: 0 8px 0 24px;
    color: $havelock-blue;
    font-size: 12px;
    font-weight: 500;
    border-radius: $border-radius;
    line-height: 2.27;
    letter-spacing: 1.1px;
    cursor: pointer;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 8px;
      left: 8px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 5px 8px 5px;
      border-radius: 2px;
      border-color: transparent transparent $havelock-blue transparent;
    }

    &:hover,
    &:active {
      background-color: $havelock-blue;
      color: $white;

      &::before {
        border-color: transparent transparent $white transparent;
      }
    }
  }

  input[type=file] {
    display: none;
    visibility: hidden;
  }
}
</style>