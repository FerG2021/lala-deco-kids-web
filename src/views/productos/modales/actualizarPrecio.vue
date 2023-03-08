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
          <i class="pi pi-percentage" style="font-size: 20px" />
          Actualizar precio de productos
        </h3>
      </template>

      <div style="margin-top: 20px">
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid"
          style="margin-top: 30px"
        >
          <div class="field">
            <div class="p-float-label">
              <InputNumber
                id="porcentaje"
                v-model="v$.porcentaje.$model"
                style="width: 100%"
                suffix=" %"
                :class="{ 'p-invalid': v$.porcentaje.$invalid && submitted }"
              />
              <label
                for="porcentaje"
                :class="{ 'p-error': v$.porcentaje.$invalid && submitted }"
                >Porcentaje <span style="color: red">*</span></label
              >
            </div>
            <small
              v-if="
                (v$.porcentaje.$invalid && submitted) ||
                v$.porcentaje.$pending.$response
              "
              class="p-error"
              >{{
                v$.porcentaje.required.$message.replace("Value", "Porcentaje")
              }}</small
            >
          </div>

          <Button
            label="Guardar"
            type="submit"
            class="mt-2"
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

      form: {
        porcentaje: null,
      },

      porcentaje: null,
    };
  },

  validations() {
    return {
      porcentaje: {
        required: helpers.withMessage("El porcentaje es requerido", required),
      },
    };
  },

  methods: {
    abrir() {
      this.submitted = false;
      this.display = true;
      // this.isFormValid = false;
      this.resetForm();
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
      this.form.porcentaje = null;
      this.porcentaje = null;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let params = {
        porcentaje: this.porcentaje,
      };

      await this.axios
        .post("/api/producto/modificarPrecio", params)
        .then((response) => {
          console.log("response");
          console.log(response);

          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Confirmación de envío",
              detail: "Precios de los productos actualizados con éxito",
              life: 3000,
            });
          }

          // this.loadingBtnPDF = false

          // window.open(response.data, '_blank')
        });

      this.loadingBtnGuardar = false;
      this.$emit("actualizar-tabla");
      this.display = false;
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
