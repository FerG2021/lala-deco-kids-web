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
      <template #header>
        <h3 style="margin: 0px">
          <i class="pi pi-whatsapp" style="font-size: 20px" />
          Enviar comprobante por WhatsApp
        </h3>
      </template>

      <div style="display: flex" v-if="loadingDatos == true">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center" />
        </div>
      </div>

      <div v-else>
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid"
          style="margin-top: 30px"
        >
          <div class="field">
            <div class="p-float-label">
              <InputNumber
                id="telefonoAsociado"
                v-model="v$.telefonoAsociado.$model"
                style="width: 100%"
                mode="decimal"
                :useGrouping="false"
                :class="{
                  'p-invalid': v$.telefonoAsociado.$invalid && submitted,
                }"
              />
              <label
                for="telefonoAsociado"
                :class="{
                  'p-error': v$.telefonoAsociado.$invalid && submitted,
                }"
                >Teléfono asociado <span style="color: red">*</span></label
              >
            </div>
            <small
              v-if="
                (v$.telefonoAsociado.$invalid && submitted) ||
                v$.telefonoAsociado.$pending.$response
              "
              class="p-error"
              >{{
                v$.telefonoAsociado.required.$message.replace(
                  "Value",
                  "Teléfono asociado"
                )
              }}</small
            >
          </div>
          <Button
            label="Enviar WhatsApp"
            type="submit"
            icon="pi pi-check"
            :loading="loadingBtnGuardar"
          />
        </form>
      </div>
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
      loadingDatos: true,

      telefonoAsociado: null,

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
      telefonoAsociado: {
        required: helpers.withMessage(
          "El teléfono del cliente es requerido",
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
      this.loadingDatos = true;
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
        .get("/api/venta/datosWhatsApp/" + this.id)
        .then((response) => {
          if (response.data.code == 200) {
            console.log("response");
            console.log(response.data.data);
            // this.loadingBtnPDF = false

            // window.open(response.data.data, '_blank')

            if (response.data.data.datosClient) {
              if (response.data.data.datosClient.phoneClient != 0) {
                this.telefonoAsociado =
                  response.data.data.datosClient.phoneClient;

                this.datos = response.data.data;
                console.log("this.datos");
                console.log(this.datos);
              }
            }

            this.loadingDatos = false;
          }
        });
    },

    handleSubmit(isFormValid) {
      console.log("isFormValid");
      console.log(isFormValid);

      this.isFormValid = isFormValid;
      console.log("entro");

      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();
    },

    toggleDialog() {
      console.log("entro");
      this.showMessage = !this.showMessage;

      this.guardar();

      // if (!this.showMessage) {
      //   this.resetForm();
      // } else {
      //   this.guardar();
      // }
    },

    resetForm() {
      this.datos = null;
      this.telefonoAsociado = null;
    },

    async guardar() {
      this.loadingBtnGuardar = true;
      let mensaje;

      if (this.datos.datosClient != null) {
        mensaje = `
        ¡Hola ${this.datos.datosClient.nameClient}, te saluda el equipo de Lala Deco Kids!"`;
      } else {
        mensaje = `
        ¡Hola , te saluda el equipo de Lala Deco Kids!"`;
      }

      // let mensaje = `
      //   ¡Hola ${this.datos.datosClient.nameClient}, te saluda el equipo de Lala Deco Kids!"`;

      mensaje = mensaje + "\n";

      mensaje =
        mensaje +
        " Te adjuntamos el comprobante de tu compra, para visualizarlo presioná en el siguiente enlace: ";

      mensaje = mensaje + "\n";

      mensaje = mensaje + this.datos.urlEnviar;

      mensaje = mensaje + "\n";

      mensaje = mensaje + "¡¡¡Muchas gracias por elegirnos!!!";

      let url = encodeURI(
        "https://wa.me/" + this.telefonoAsociado.toString() + "?text=" + mensaje
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
