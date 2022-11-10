<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '50%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px">
          <i class="pi pi-eye" style="font-size: 20px" /> Detalle del cliente
        </h3>
      </template>

      <!-- <div style="display: flex">
        <div style="margin-left: auto">
          <Button 
            label="Generar PDF" 
            icon="pi pi-file-pdf" 
            class="p-button-danger" 
            @click="exportarPDF()"
            :loading="loadingBtnPDF"
          />
        </div>
      </div> -->

      <div style="display: flex" v-if="datos == null">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center" />
        </div>
      </div>

      <div style="margin-top: 5px; width: 100%" v-if="datos != null">
        <div class="p-fluid grid formgrid">
          <div class="field col-12 md:col-4">
            <label for="apellido">Apellido</label>
            <InputText 
              inputId="apellido" 
              v-model="apellido" 
              disabled
            />
          </div>

          <div class="field col-12 md:col-4">
            <label for="nombre">Nombre</label>
            <InputText 
              inputId="nombre" 
              v-model="nombre" 
              disabled
            />
          </div>

          <div class="field col-12 md:col-4">
            <label for="dni">DNI</label>
            <InputText 
              inputId="dni" 
              v-model="dni" 
              disabled
            />
          </div>

          
        </div>

        <div class="p-fluid grid formgrid">
          <div class="field col-12 md:col-6">
            <label for="telefono">Teléfono</label>
            <InputText 
              inputId="telefono" 
              v-model="telefono" 
              disabled
            />
          </div>

          <div class="field col-12 md:col-6">
            <label for="mail">Mail</label>
            <InputText 
              inputId="mail" 
              v-model="mail" 
              disabled
            />
          </div>
        </div>
      </div>


      <!-- <template #footer>
        <Button
          label="Guardar"
          type="submit"
          icon="pi pi-check"
          autofocus
          @click="guardar()"
          :loading="loadingBtnGuardar"
        />
      </template> -->
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

      id: null,
      datos: null,
      apellido: null,
      nombre: null,
      mail: null,
      telefono: null,
      dni: null,
      direccion: null,
    };
  },

  validations() {
    return {
      codigo: {
        required: helpers.withMessage("El código es requerido", required),
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
      console.log("abrir");
      await this.axios
        .get("/api/cliente/obtenerDatos/" + this.id)
        .then((response) => {
          if (response.data.code == 200) {
            console.log("response");
            console.log(response.data.data);

            this.apellido = response.data.data.lastNameClient
            this.nombre = response.data.data.nameClient
            this.mail = response.data.data.mailClient
            this.telefono = response.data.data.phoneClient
            this.dni = response.data.data.dniClient
            this.direccion = response.data.data.directionClient
            this.datos = response.data.data;
          }
        });
    },

    async exportarPDF(){
      this.loadingBtnPDF = true
      await this.axios
        .get("/api/venta/exportarPDF/" + this.id)
        .then((response) => {
          console.log("response");
          console.log(response);
          this.loadingBtnPDF = false

          window.open(response.data.data, '_blank')
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
      // this.form.id = null;
      // this.form.codigo = null;
      // this.form.nombre = null;
      // this.form.precioVenta = null;
      // this.form.procPrecioFiado = null;
      // this.form.stock = null;
      // this.form.stockMinimo = null;
      // this.form.imagen = null;
      // this.form.imagenAPI = null;
      // this.form.imagenID = null;
      // this.submitted = false;

      this.datos = null
      this.nombreComprador = null
      this.nombreVendedor = null
      this.fechaVenta = null
      this.tipoVenta = null
      this.productos = []
      this.datos = null;
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      // console.log("this.form");
      // console.log(this.form);
      // this.$emit("update:nuevoEmpleado", this.form);

      // codigo: null,
      //   nombre: null,
      //   precioVenta: null,
      //   precioFiado: null,
      //   stock: null,
      //   stockMinimo: null,
      //   imagen: null,

      let formData = new FormData();

      // formData.set("codigo", this.form.codigo)
      // formData.set("nombre", this.form.nombre)
      // formData.set("precioVenta", this.form.precioVenta)
      // formData.set("precioFiado", this.form.precioFiado)
      // formData.set("stock", this.form.stock)
      // formData.set("stockMinimo", this.form.stockMinimo)
      // formData.append("imagen", this.form.imagen)

      for (let key in this.form) {
        formData.append(key, this.form[key]);
      }

      console.log("formData");
      console.log(formData);

      await this.axios
        .post("/api/producto/actualizar", formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Producto actualizado con éxito",
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
