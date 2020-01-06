<template>
  <Layout :show-logo="false" :show-footer-absolute="true">
        <p id="nf-header">Ouch!</p>
        <div id="nf-text">It seems like you are lost, why don't you try to return to the <g-link to="/">home page</g-link>?</div>
  </Layout>
</template>

<style>
#nf-header {
    font-size: 5em;
    text-align: center;
}
#nf-text {
    text-align: center;
}
</style>
