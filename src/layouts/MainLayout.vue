<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="text-secondary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Prueba tecnica Crazy Imagine</q-toolbar-title>
        <q-space />
        <!-- SOLO APARECE CUANDO SE INICIA SESION -->
        <h6 class="q-my-none q-mr-sm" v-if="this.userStore.from == 'login'">
          Bienvenido usuario
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </h6>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :show-if-above="false"
      bordered
      overlay
      class="bg-grey-1"
    >
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-my-md" />

        <q-item clickable @click="cerrarSesion()">
          <q-item-section avatar>
            <q-icon name="logout" color="secondary" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cerrar sesion</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { defineComponent, ref } from "vue";
import { useUserStore } from "src/stores/user.js";

const linksList = [
  {
    title: "Calculadora de propina",
    icon: "calculate",
    link: "/calculadora",
  },
  {
    title: "Galeria de imagenes",
    icon: "photo_library",
    link: "/galeria",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const userStore = useUserStore();

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      userStore,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  methods: {
    cerrarSesion() {
      window.location = "/";
    },
  },
});
</script>
