<template>
  <q-page padding>
    <div class="fit row justify-center text-center">
      <div class="col-10">
        <q-card class="card-galeria">
          <q-card-section>
            <div class="text-h5 text-medium">Galeria de imagenes</div>
          </q-card-section>
          <q-card-section>
            <q-carousel
              v-model="slide"
              transition-prev="jump-right"
              transition-next="jump-left"
              swipeable
              animated
              control-color="white"
              navigation
              padding
              arrows
              class="card-galeria q-mx-md q-mb-md"
              style="height: 70vh"
            >
              <q-carousel-slide
                v-for="foto in fotosData"
                :key="foto.id"
                :name="foto.id"
                :img-src="foto.src.original"
              />
            </q-carousel>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase";
import { createClient } from "pexels";

export default {
  data() {
    let fotosData = ref([]);
    let slide = ref(null);

    return {
      fotosData,
      slide,
    };
  },

  methods: {
    async llenarGaleria() {
      //let datos = await axios.get("https://api.pexels.com/v1/search?query=university" + this.id);
      const client = createClient(
        "P0T0XXNoanO1hrmg9gvjgQOp3kQGN75tSK6uxVRPB19eBSFpbiXsHeuN"
      );
      const query = "Nature";
      client.photos.search({ query, per_page: 10 }).then((result) => {
        console.log("las fotos", result);
        this.fotosData = result.photos;
        this.slide = this.fotosData[0].id;
      });
    },
  },

  created() {
    this.llenarGaleria();
    console.log(auth.currentUser);
  },
};
</script>
