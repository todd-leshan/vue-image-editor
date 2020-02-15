<template>
  <header>
    <div class="container--page-title">
      <h1 class="page-title">{{ title }}</h1>
      <span class="page-subtitle">{{ subtitle }}</span>
    </div>
    <div class="container--avatar">
      <img class="avatar" alt="candidate avatar" :src="require(`@/assets/${avatar}`)">
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
    subtitle: String,
    avatar: String
  }
}
</script>