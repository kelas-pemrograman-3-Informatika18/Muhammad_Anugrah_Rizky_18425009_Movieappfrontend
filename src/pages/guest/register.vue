<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="bg-blue-grey-1">
        <div class="row">
          <q-card class="fixed-center col-md-4 col-xs-12">
            <q-card-section>
              <div class="text-h6">
                Halaman Regitrasi
              </div>
              <q-form
              @submit="onSubmit"
              >
                <q-input v-model="username"
                label="Username"
                :rules="[
                  val => val && val.length >0 || 'Tolong Isi Data Dengan Lengkap'
                ]"
                />
                <q-input v-model="namalengkap"
                label="Nama Lengkap"
                :rules="[
                  val => val && val.length >0 || 'Tolong Isi Data Dengan Lengkap'
                ]"
                />
                <q-input v-model="email"
                label="Email"
                :rules="[
                  val => val && val.length >0 || 'Tolong Isi Data Dengan Lengkap'
                ]"
                />
                <q-input v-model="password"
                label="Password"
                :rules="[
                  val => val && val.length >0 || 'Tolong Isi Data Dengan Lengkap'
                ]"
                />
                <div class="q-gutter-md">
                  <q-btn label="Regitrasi" color="primary" type="submit" />
                  <q-btn :to="{ name:'login' }" label="Login" flat />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
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
      namalengkap: null,
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        namalengkap: this.namalengkap,
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.$router.push({ name: 'login' })
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
