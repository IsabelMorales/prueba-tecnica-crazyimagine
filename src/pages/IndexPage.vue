<template>
  <q-page class="flex flex-center">
    <q-dialog v-model="this.inicioSesion" persistent>
      <q-card>
        <q-form @submit="onSubmit">
          <q-card-section>
            <div class="row q-mt-md">
              <div class="col-12 text-center">
                <div class="text-subtitle1 text-medium">BIENVENIDO</div>
              </div>
            </div>
            <div class="row justify-center q-mt-md">
              <div class="col-11 col-md-7 q-mb-md">
                <q-input v-model="email" label="Email" autofocus>
                  <template v-slot:before>
                    <q-icon name="mail" color="secondary" />
                  </template>
                </q-input>
              </div>
              <div class="col-11 col-md-7">
                <q-input
                  v-model="password"
                  label="Contraseña"
                  :type="isPwd ? 'password' : 'text'"
                  @keydown.tab.prevent="onSubmit()"
                  @keyup.enter="onSubmit()"
                >
                  <template v-slot:before>
                    <q-icon name="key" color="secondary" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center" class="q-mb-md" vertical>
            <!-- INICIAR SESION -->
            <q-btn
              unelevated
              label="Iniciar sesion"
              color="primary"
              class="q-mr-md"
              @click="onSubmit()"
            >
            </q-btn>
            <q-btn
              flat
              no-caps
              label="Registrarse"
              color="primary"
              class="q-mr-md text-medium"
              @click="onActivarModalRegistro()"
            >
            </q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="noExiste" persistent>
      <q-card>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-9 text-center q-px-md">
              <div class="text-h6">
                EL USUARIO O LA CONTRASEÑA NO SON VALIDOS
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-mb-sm">
          <q-btn
            unelevated
            label="Ok"
            color="primary"
            class="q-mr-md"
            v-close-popup
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalRegistroExitoso" persistent>
      <q-card>
        <q-card-section>
          <div class="row justify-center">
            <div class="col-9 text-center q-px-md">
              <div class="text-h6">
                El usuario ha sido registrado exitosamente
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-mb-sm">
          <q-btn
            unelevated
            label="Ok"
            color="primary"
            class="q-mr-md"
            v-close-popup
          >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <ModalRegistro
      v-model="modalRegistro"
      @crearCuenta="onRegistrarCliente"
      @cancelarRegistro="onCancelarRegistroCliente"
    ></ModalRegistro>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import ModalRegistro from "../components/ModalRegistro.vue";
import { useUserStore } from "src/stores/user.js";

export default defineComponent({
  name: "IndexPage",
  components: {
    ModalRegistro,
  },

  data() {
    let inicioSesion = ref(true);
    let noExiste = ref(false);
    let email = ref(null);
    let password = ref(null);
    let modalRegistro = ref(false);
    let modalRegistroExitoso = ref(false);
    const userStore = useUserStore();

    return {
      inicioSesion,
      email,
      password,
      noExiste,
      modalRegistro,
      modalRegistroExitoso,
      userStore,
      isPwd: ref(true),
      id: 0,
    };
  },

  methods: {
    onActivarModalRegistro() {
      this.modalRegistro = true;
    },

    async onRegistrarCliente(cliente) {
      console.log("entro al registrar");
      await this.userStore.registro(
        cliente.email,
        cliente.password,
        cliente.nombre
      );
      console.log(this.userStore.user);
      if (this.userStore.user.accessToken) {
        this.modalRegistroExitoso = true;
        this.modalRegistro = false;
      }
    },

    onCancelarRegistroCliente() {
      this.modalRegistro = false;
    },

    async onSubmit() {
      console.log("los datos", this.email, this.password);
      await this.userStore.login(this.email, this.password);
      console.log("los datos", this.userStore.user);

      if (this.userStore.user.accessToken) {
        this.inicioSesion = false;
      }
    },

    async verificador() {
      console.log(
        "el user",
        this.userStore.user,
        this.userStore.from,
        this.userStore
      );
      if (this.userStore.user != null) {
        this.inicioSesion = false;
      } else {
        this.from = null;
      }
      console.log(
        "el user",
        this.userStore.user,
        this.userStore.from,
        this.userStore
      );
    },
  },

  created() {
    this.verificador();
  },
});
</script>
