import Vue from 'vue'

import '../assets/scss/_config/_base.scss'

import '../assets/scss/_config/_vue_overrides.scss'

import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"Pierre Mouchan | Creative developer","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Portfolio - Pierre Mouchan, a passionate creative developer."},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Pierre Mouchan - Portfolio"},{"hid":"robots","name":"robots","content":"index, follow"},{"hid":"og:image","name":"og:image","content":"\u002Fogimage.jpg"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"author","name":"author","content":"Pierre Mouchan"},{"hid":"theme-color","name":"theme-color","content":"#F25D61"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"Pierre Mouchan | Junior Creative developer"},{"hid":"og:site_name","name":"og:site_name","property":"og:site_name","content":"Pierre Mouchan | Junior Creative developer"},{"hid":"og:description","name":"og:description","property":"og:description","content":"Portfolio - Pierre Mouchan, a passionate creative developer."}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.18b914e2.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.af9239.png"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.af9239.png","sizes":"512x512"}],"style":[],"script":[],"htmlAttrs":{"lang":"en"}},

  render(h, props) {
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [transitionEl])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
  }
}
