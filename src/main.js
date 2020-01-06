// Import main css
import '~/assets/style/index.scss'

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {
  
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    name: 'title',
    content: 'Ozan Sazak # sazak.io'
  })

  head.meta.push({
    name: 'keywords',
    content: 'ozan sazak, sazak, ozan, odtü, metu, bilgisayar mühendisliği, computer engineering, python, golang, vuejs, web crawling'
  })

  head.meta.push({
    name: 'author',
    content: 'Ozan Sazak'
  })

  head.meta.push({
    name: 'owner',
    content: 'Ozan Sazak'
  })
}