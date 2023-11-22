<template>
  <q-dialog persistent>
    <q-card>
      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="row q-mt-md">
            <div class="col-12 text-center">
              <div class="text-subtitle1 text-medium">REGISTRO DE USUARIO</div>
            </div>
          </div>
          <div class="row justify-center q-mt-md">
            <div class="col-11 col-md-6 q-mb-md q-pl-lg q-pr-md">
              <q-input v-model="nombre" label="Nombre" autofocus />
            </div>
            <div class="col-11 col-md-6 q-mb-md q-pr-lg q-pl-md">
              <q-input v-model="apellido" label="Apellido" />
            </div>
            <div class="col-11 col-md-6 q-mb-md q-pl-lg q-pr-md">
              <q-input v-model="email" label="Email" />
            </div>
            <div class="col-11 col-md-6 q-pr-lg q-pl-md">
              <q-input
                v-model="password"
                label="Contraseña"
                :type="isPwd ? 'password' : 'text'"
                @keydown.tab.prevent="onSubmit()"
                @keyup.enter="onSubmit()"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                    color="secondary"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-11 col-md-7 q-my-md">
              <q-file
                rounded
                outlined
                bottom-slots
                v-model="imagen"
                label="Imagen de perfil"
                counter
              >
                <template v-slot:prepend>
                  <q-icon
                    name="attach_file"
                    @click.stop.prevent
                    color="secondary"
                  />
                </template>
                <template v-slot:append>
                  <q-icon
                    name="close"
                    @click.stop.prevent="model = null"
                    class="cursor-pointer"
                  />
                </template>
              </q-file>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-mb-md" vertical>
          <!-- INICIAR SESION -->
          <q-btn
            unelevated
            label="Registrarse"
            color="primary"
            class="q-mr-md"
            @click="onSubmit()"
          >
          </q-btn>
          <q-btn
            flat
            no-caps
            label="Cancelar"
            color="primary"
            class="q-mr-md text-medium"
            @click="onCancel()"
          >
          </q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  data() {
    let nombre = ref(null);
    let apellido = ref(null);
    let email = ref(null);
    let password = ref(null);
    let imagen = ref(null);

    return {
      nombre,
      apellido,
      email,
      password,
      imagen,
      isPwd: ref(true),
    };
  },

  methods: {
    // ENVIAR CLIENTE //
    onSubmit() {
      let cuenta = {
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        password: this.password,
        imagen: this.imagen,
      };

      this.$emit("crearCuenta", cuenta);
    },

    onCancel() {
      this.$emit("cancelarRegistro", false);
    },
  },
};
</script>
