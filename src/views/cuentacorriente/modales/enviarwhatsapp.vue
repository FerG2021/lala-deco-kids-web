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
          <i class="pi pi-whatsapp" style="font-size: 20px" /> 
          Enviar comprobante por WhatsApp
        </h3>
      </template>

      <div style="display: flex" v-if="datos == null">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center" />
        </div>
      </div>

      <div v-else>
        <div class="field">
          <div class="p-float-label">
            <span>Teléfono asociado al cliente (Si no es correcto modificar)</span>
            <InputNumber 
              id="telefonoAsociado"
              v-model="form.telefonoAsociado"
              style="width: 100%"
              mode="decimal" 
              :useGrouping="false"
            />
            <label for="telefonoAsociado">Teléfono asociado</label>
          </div>
        </div>
      </div>
        

      <template #footer>
        <Button
          label="Enviar WhatsApp"
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
      datos: null,
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,

      form: {
        telefonoAsociado: null,
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
      this.getDatos();
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
      await this.axios
        .get("/api/cuentacorriente/datosWhatsApp/" + this.id)
        .then((response) => {
          if (response.data.code == 200) {
            console.log("response");
            console.log(response.data.data);
            // this.loadingBtnPDF = false

            // window.open(response.data.data, '_blank')
            this.form.telefonoAsociado = response.data.data.datosClient.phoneClient

            this.datos = response.data.data
            console.log("this.datos");
            console.log(this.datos);

          } else {}
        })
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
      this.datos = null
      this.form.telefonoAsociado = null
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let mensaje = `
        ¡Hola ${this.datos.datosClient.nameClient}!
        Te adjuntamos el comprobante de tu cuenta corriente, para visualizarlo presioná en el siguiente enlace: 
        `;

      mensaje = mensaje + this.datos.urlEnviar

      mensaje = mensaje + "\n"

      mensaje = mensaje + "¡¡¡Muchas gracias por elegirnos!!!"


      let url = encodeURI(
        "https://wa.me/" + this.form.telefonoAsociado.toString() + "?text=" + mensaje
      );

      window.open(url, "_blank");

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
