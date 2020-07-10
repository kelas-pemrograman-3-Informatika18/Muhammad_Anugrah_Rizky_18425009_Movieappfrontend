<template>
    <q-page padding>
        <div>
          <q-carousel
            animated
            v-model="slide"
            navigation
            infinite
            autoplay
            arrows
            swipeable
            transition-prev="slide-right"
            transition-next="slide-left"
          >
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
          </q-carousel>
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-md-3 col-xs-12" v-for="(movie ,i) in data" :key="i">
            <q-card class="my-card q-mt-md">
            <q-img
              :ratio="16/9"
              :src="`${$baseImageURL}/${movie.image}`"
            />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="add_shopping_cart"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  {{ movie.judulfilm}}
                </div>
              </div>

              <q-rating v-model="movie.rating" readonly :max="5" size="32px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">
                Rp.{{ movie.harga }}-
              </div>
              <div class="text-subtitle1">
                {{ movie.genre }}
              </div>
              <div @click="movie.expanded = !movie.expanded" class="text-caption text-grey cursor-pointer">
                Tampilkan Deskripsi
              </div>
              <q-slide-transition>
                <div v-show="movie.expanded">
                  <q-separator />
                  <div class="text-subitle2 text-grey">
                    {{ movie.deskripsi }}
                  </div>
                </div>
              </q-slide-transition>
            </q-card-section>

            <q-card-actions>
              <q-btn @click="opendetail(movie)" dense unelevated class="full-width" color="primary">
                Order Now
              </q-btn>
            </q-card-actions>
          </q-card>
          </div>
        </div>
        <q-dialog v-model="dialog" v-if="dialog" position="bottom">
          <q-card style="width: 500px">
            <q-card-section>
              <div class="text-h6">Detail Pemesanan</div>
            </q-card-section>
            <q-card-section style="max-height: 509vh" class="scroll">
              {{ activeData.judulfilm }} - {{ activeData.harga }}
              <q-form>
                <q-input class="q-mb-md" v-model="jumlah" type="number" label="masukan jumlah" />
              </q-form>
              Rp.{{ total }}-
              <q-file color="teal" class="q-mt-md" filled v-model="image" label="Bukti Pembayaran">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Batal" flat @click="dialog = false"/>
              <q-btn @click="prosesTransaksi()" label="Proses" color="primary"/>
            </q-card-actions>
          </q-card>
    </q-dialog>
    </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 4,
      dialog: false,
      data: [],
      image: null,
      activeData: null,
      jumlah: 1
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    getdata () {
      this.$axios.get('movie/getall')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(movie => {
              return Object.assign(movie, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    opendetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idFilm: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            console.log(res)
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
