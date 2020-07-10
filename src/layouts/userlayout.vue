<template>
  <q-layout view="lHh LpR fFf">
    <q-toolbar class="bg-white text-black">
      <div class="text-h5 q-ml-lg">Aplikasi Movie</div>
      <q-space />
      <div v-if="!$q.screen.xs || $q.screen.sm || $q.screen.md || $q.screen.lg || $q.screen.xl">
      <q-btn flat label="Home" />
      <q-btn flat label="Pesanan Saya" :to="{ name: 'myorder' }" />
      <q-btn flat label="Tentang" />
      <q-btn flat label="Logout" @click="logout()" />
      </div>
      <q-btn flat icon="shopping_cart" />
      <q-btn @click="drawer = true" flat icon="menu" v-if="$q.screen.xs || $q.screen.sm" />
    </q-toolbar>
    <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        side="right"
      >
        <q-scroll-area class="fit">
          <q-list>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                Home
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container class="bg-grey-12">
        <router-view />
      </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
