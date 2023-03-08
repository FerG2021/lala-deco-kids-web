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
          <i class="pi pi-google" style="font-size: 20px" />
          Enviar comprobante por Mail
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
              <InputText
                id="mailAsociado"
                v-model="mailAsociado"
                style="width: 100%"
                mode="decimal"
                :useGrouping="false"
                :class="{ 'p-invalid': v$.mailAsociado.$invalid && submitted }"
              />
              <label
                for="mailAsociado"
                :class="{ 'p-error': v$.mailAsociado.$invalid && submitted }"
                >Mail asociado <span style="color: red">*</span></label
              >
            </div>
            <small
              v-if="
                (v$.mailAsociado.$invalid && submitted) ||
                v$.mailAsociado.$pending.$response
              "
              class="p-error"
              >{{
                v$.mailAsociado.required.$message.replace(
                  "Value",
                  "Mail asociado"
                )
              }}</small
            >
          </div>

          <Button
            label="Enviar mail"
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

      mailAsociado: null,

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
      mailAsociado: {
        required: helpers.withMessage(
          "El mail del cliente es requerido",
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
              if (response.data.data.datosClient.mailClient != "-") {
                this.mailAsociado = response.data.data.datosClient.mailClient;
                this.datos = response.data.data;
                console.log("this.datos");
                console.log(this.datos);
              }
            }

            this.loadingDatos = false;
          } else {
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
      this.mailAsociado = null;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let params = {
        id: this.id,
        mailCliente: this.mailAsociado,
      };

      await this.axios
        .post("/api/venta/enviarMail", params)
        .then((response) => {
          console.log("response");
          console.log(response);

          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Confirmación de envío",
              detail: "Mail enviado con éxito",
              life: 3000,
            });
          }

          // this.loadingBtnPDF = false

          // window.open(response.data, '_blank')
        });

      this.loadingBtnGuardar = false;

      this.display = false;
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
