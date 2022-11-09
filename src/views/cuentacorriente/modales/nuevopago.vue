<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '30%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px">
          <i class="pi pi-eye" style="font-size: 20px" /> 
          Nuevo pago de cuenta corriente
        </h3>
      </template>

      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid" style="margin-top: 30px">
        <!-- Precio de venta -->
        <div class="field">
          <div class="p-float-label">
            <InputNumber 
              id="montoPagado"
              v-model="form.montoPagado"
              style="width: 100%"
              mode="currency" 
              currency="ARS" 
              locale="es-AR"
              :class="{'p-invalid':v$.montoPagado.$invalid && submitted}"
            />
            <label for="montoPagado" :class="{'p-error':v$.montoPagado.$invalid && submitted}">Monto pagado</label>
          </div>
          <small v-if="(v$.montoPagado.$invalid && submitted) || v$.montoPagado.$pending.$response" class="p-error">{{v$.montoPagado.required.$message.replace('Value', 'Monto pagado')}}</small>
        </div>
      </form>

      <template #footer>
        <Button
          label="Guardar"
          type="submit"
          icon="pi pi-check"
          autofocus
          @click="guardar()"
          :loading="loadingBtnGuardar"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,

      form: {
        montoPagado: null,
      },

      id: null,
      datos: null,
      nombreComprador: null,
      nombreVendedor: null,
      fechaUltimaAccion: null,
      dniComprador: null,
      detalleCuentaCorriente: [],
      loadingBtnPDF: false,
    };
  },

  validations() {
    return {
      montoPagado: {
        required: helpers.withMessage("El monto pagado por el cliente es requerido", required),
        // email,
      },
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },
      precioVenta: {
        required: helpers.withMessage(
          "El precio de venta es requerido",
          required
        ),
        // email,
      },
      procPrecioFiado: {
        required: helpers.withMessage(
          "El procentaje de fiado es requerido",
          required
        ),
        // email,
      },
      precioFiado: {
        required: helpers.withMessage(
          "El precio de fiado es requerido",
          required
        ),
        // email,
      },
      stock: {
        required: helpers.withMessage(
          "El precio de fiado es requerido",
          required
        ),
        // email,
      },
      stockMinimo: {
        required: helpers.withMessage(
          "El precio de fiado es requerido",
          required
        ),
        // email,
      },
    };
  },

  methods: {
    abrir(id) {
      this.id = id;
      console.log("this.id");
      console.log(this.id);
      this.submitted = false;
      this.display = true;
      this.isFormValid = false;
      this.resetForm();
      // this.getDatos();
    },

    cerrar() {
      this.$toast.add({
        severity: "error",
        summary: "Ventana cerrada con éxito",
        detail: "Message Content",
        life: 3000,
      });
      this.display = false;
    },

    async getDatos() {
      console.log("abrir");
      await this.axios
        .get("/api/cuentacorriente/obtenerDatos/" + this.id)
        .then((response) => {
          if (response.data.code == 200) {
            
            this.detalleCuentaCorriente = response.data.data.datosCuentaCorrienteProducto
            console.log("this.detalleCuentaCorriente");
            console.log(this.detalleCuentaCorriente);

            this.nombreComprador = response.data.data.datosCuentaCorriente.lastNameClient + ", "  + response.data.data.datosCuentaCorriente.nameClient

            this.dniComprador = response.data.data.datosCuentaCorriente.dniClient

            let auxFecha = this.formatearFecha(response.data.data.datosCuentaCorriente.datelastaction)
            this.fechaUltimaAccion = auxFecha

            this.datos = response.data.data;
            console.log("this.datos");
            console.log(this.datos);

            
          }
        });
    },

    async exportarPDF(){
      this.loadingBtnPDF = true
      await this.axios
        .get("/api/cuentacorriente/exportarPDF/" + this.id)
        .then((response) => {
          console.log("response");
          console.log(response);
          this.loadingBtnPDF = false

          window.open(response.data, '_blank')
        })
    },

    formatearFecha(fecha) {
      let fecha1 = new Date(fecha);
      // let fecha2 = fecha1.toLocaleString();
      let fecha2 = fecha1.toLocaleDateString();
      return fecha2;
    },

    onUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },

    imagenSeleccionada(event) {
      console.log("imagen");
      console.log(event.files[0]);
      this.form.imagen = event.files[0];
    },

    handleSubmit(isFormValid) {
      this.isFormValid = isFormValid;

      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },

    resetForm() {
      this.form.montoPagado = null
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let params = {
        id: this.id,
        montoPagado: this.form.montoPagado,
      }

      
      await this.axios
        .post("/api/cuentacorriente/nuevoPagoCliente", params)
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Producto procesado con éxito",
              life: 3000,
            });

            this.display = false;
            this.$emit("actualizar-tabla");
          } else {
            console.log("response.data.data");
            console.log(response.data.data);

            for (const property in response.data.data) {
              // console.log(`${property}: ${response.data.data[property]}`);
              this.$toast.add({
                severity: "error",
                summary: "Se ha producido un error",
                detail: `${response.data.data[property]}`,
                life: 5000,
              });
            }
            // this.$toast.add({
            //   severity: "success",
            //   summary: "Se ha producido un error",
            //   detail: response.data.data,
            //   life: 5000,
            // });
          }
        });

      this.loadingBtnGuardar = false;
    },

    formatearFecha(fecha) {
      let fecha1 = new Date(fecha);
      // let fecha2 = fecha1.toLocaleString();
      let fecha2 = fecha1.toLocaleDateString();
      return fecha2;
    },

    moneda(x) {
      let aux = parseFloat(x);
      return aux.toLocaleString("es-AR");
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 1.5rem;
}

.header {
  margin: 0px !important;
}

.p-dialog {
  border-radius: 30% !important;
}

.ver-imagen {
  border-radius: 20px !important;
}

.p-image-preview-indicator {
  width: 130px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  padding: 3px;
}
</style>
