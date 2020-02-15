<template>
  <div>
    <Header 
      title='Brightness & Contrast Developer Test'
      subtitle='01 Jun, 2018 - 31 Dec, 2019'
      avatar='sample-avatar.png'
    />
    <Main></Main>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Main
  }
}
</script>
