<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
      <q-toolbar>
      <q-btn dense flat round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
      <q-space></q-space>
      <q-btn dense flat round>
        <q-avatar>
          <q-img src="https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"/>
        </q-avatar>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>Log Out</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-primary text-white"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item class="justify-center text-center q-mt-md">
            <div>
              <q-avatar size="150px">
                <q-img src="https://cdn.iconscout.com/icon/free/png-512/avatar-372-456324.png"/>
              </q-avatar>
            <div class="text-bold q-mt-md">
            {{ $q.localStorage.getItem('dataUser').username }}
            </div>
            <div>
                    Aplikasi Penjualan DVD
            </div>
            </div>
          </q-item>
                <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dashboardadmin' }">
                  <q-item-section avatar>
                    <q-icon name="dashboard" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Dashboard</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable active-class="active" v-ripple exact :to="{ name: 'datadvd' }">
                  <q-item-section avatar>
                    <q-icon name="live_tv" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Data DVD</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable active-class="active" v-ripple exact :to="{ name: 'inputdvd' }">
                  <q-item-section avatar>
                    <q-icon name="input" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Input DVD</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable active-class="active" v-ripple exact :to="{ name: 'datauser' }">
                  <q-item-section avatar>
                    <q-icon name="supervisor_account" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Data User</q-item-label>
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
  name: 'MainLayout',

  components: {

  },

  data () {
    return {
      leftDrawerOpen: false
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
<style scoped>
.active {
  color: black;
  background-color: rgb(235, 231, 231);
  padding-right: 10px;
}
</style>
