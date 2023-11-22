<template>
  <q-page padding>
    <div class="fit row justify-center text-center">
      <div class="col-10 col-lg-8">
        <q-card class="q-py-md">
          <q-card-section>
            <div class="text-h5 text-weight-medium">
              Calculadora de propinas
            </div>
          </q-card-section>
          <q-separator class="q-mx-lg" />
          <q-card-section>
            <div class="row q-gutter-lg q-mb-sm q-lg-pl-md justify-center">
              <div class="col-10 col-md-2">
                <!-- CAMPO MONTO DE LA FACTURA -->
                <q-input
                  v-model="montoFactura"
                  label="Monto total de factura $"
                  type="number"
                  autofocus
                />
              </div>
              <div class="col-10 col-md-2">
                <!-- CAMPO PORCENTAJE DE PROPINA -->
                <q-select
                  v-model="porcentajePropina"
                  :options="porcentajesData"
                  label="Propina"
                >
                  <template v-slot:append>
                    <q-icon name="percent" />
                  </template>
                </q-select>
              </div>
              <div class="col-12 col-md-1">
                <!-- BOTON CALCULAR PROPINA -->
                <q-btn
                  color="secondary"
                  label="Calcular"
                  class="q-mt-sm"
                  @click="calcularPropina()"
                />
              </div>
              <q-space />
              <div
                class="col-12 col-md-5 text-subtitle1"
                v-if="this.mostrarTotal == true"
              >
                <!-- MUESTRA LOS TOTALES -->
                <p>
                  Monto de propina: {{ this.montoPropina }}$ <br />
                  Total a pagar: {{ this.montoTotal }}$
                </p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { auth } from "../firebase";

export default {
  data() {
    let porcentajesData = ["2", "3", "5", "10", "15", "20"];
    let porcentajePropina = ref(null);
    let montoFactura = ref(null);
    let montoPropina = ref(null);
    let montoTotal = ref(null);
    let mostrarTotal = ref(false);

    return {
      porcentajesData,
      porcentajePropina,
      montoFactura,
      montoPropina,
      montoTotal,
      mostrarTotal,
    };
  },

  methods: {
    // CALCULA EL MONTO DE PROPINA EN BASE AL MONTO TOTAL DE LA FACTURA Y EL PORCENTAJE
    // DE PROPINA DADO Y SE LO SUMA AL MONTO TOTAL DE LA FACTURA
    calcularPropina() {
      console.log(this.porcentajePropina);
      this.montoPropina = (this.porcentajePropina * this.montoFactura) / 100;
      this.montoTotal =
        parseInt(this.montoFactura) + parseInt(this.montoPropina);
      this.mostrarTotal = true;
    },
  },

  created() {
    console.log(auth.currentUser, auth.from, this.mostrarTotal);
  },
};
</script>
