<template>
    <Layout :showFooterAbsolute="true">

    </Layout>
</template>

<script>
export default {
    metaInfo () {
        return {
            title: 'Tools',
        }
    },
    mounted() {
        window.location = 'https://sazak.io/tools/metu-gpa/'
    }
}
</script>

