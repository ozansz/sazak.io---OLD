export default [
  {
    name: "toolsMetuGpa",
    path: "/tools/metu-gpa",
    component: () => import(/* webpackChunkName: "component--tools-metu-gpa" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/pages/tools/MetuGpa/Index.vue"),
    meta: { isStatic: true }
  },
  {
    name: "tools",
    path: "/tools",
    component: () => import(/* webpackChunkName: "component--tools" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/pages/tools/Index.vue"),
    meta: { isStatic: true }
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "component--home" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/pages/Index.vue"),
    meta: { isStatic: true }
  },
  {
    name: "articles",
    path: "/articles",
    component: () => import(/* webpackChunkName: "component--articles" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/pages/Articles.vue")
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "component--404" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/pages/404.vue"),
    meta: { isStatic: true, isIndex: false }
  },
  {
    name: "tag",
    path: "/tags/:id",
    component: () => import(/* webpackChunkName: "component--tag" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/templates/Tag.vue")
  },
  {
    name: "post",
    path: "/articles/:year/:month/:day/:slug",
    component: () => import(/* webpackChunkName: "component--post" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/templates/Post.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "component--404" */ "/Users/sazak/Dev/sazak.io/gridsome-blog/src/pages/404.vue"),
    meta: { isStatic: true, isIndex: false }
  }
]

