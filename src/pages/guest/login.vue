<template>
  <q-layout class="bg-blue-gray-1" view="lHh Lpr Lff">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pa-md">
            <q-card>
              <div class="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-8">
                      <q-img src="~assets/undraw_home_cinema_l7yl.png"></q-img>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <q-card-section>
                    <div class="text-h4">Movie App</div>
                    <div>Login Akun Anda</div>
                  </q-card-section>
                  <q-form @submit="login">
                    <q-card-section>
                      <q-input v-model="username" label="Username"/>
                      <q-input v-model="password" label="Password"/>
                    </q-card-section>
                    <q-card-section>
                      <q-btn class="full-width q-mb-md" label="Login" color="primary" type="submit"/>
                      <q-btn class="full-width" label="Registrasi" flat :to="{ name:'registrasi' }"/>
                    </q-card-section>
                  </q-form>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('dataUser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dashboardadmin' })
          } else {
            this.$router.push({ name: 'homeuser' })
          }
        } else {
          this.showNotif('')
        }
      })
    }
  }
}
</script>
