<template>
  <Layout :show-logo="false"  :show-footer-absolute="true">
    <Author :show-title="true" />

    <div id="hp-btns">
      <g-link to="/about">About Me</g-link>
      <g-link to="/articles">Articles</g-link>
      <g-link to="/projects">My Projects</g-link>
      <g-link to="/tools">Tools</g-link>
    </div>

  </Layout>
</template>

<script>
import Author from '~/components/Author.vue'

export default {
  components: {
    Author,
  },
  metaInfo: {
    title: 'Ozan Sazak'
  }
}
</script>

<style lang="scss">
#hp-btns {
  display: flex;
  max-width: 500px;
  min-width: 300px;
  margin: auto;
  justify-content: space-evenly;
}
</style>