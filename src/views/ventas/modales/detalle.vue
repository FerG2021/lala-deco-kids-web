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
          <i class="pi pi-eye" style="font-size: 20px" /> Detalle de la venta
        </h3>
      </template>

      <div style="display: flex">
        <div style="margin-left: auto">
          <Button 
            label="Generar PDF" 
            icon="pi pi-file-pdf" 
            class="p-button-danger" 
            @click="exportarPDF()"
            :loading="loadingBtnPDF"
          />
        </div>
        
      </div>

      <div style="display: flex" v-if="datos == null">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center" />
        </div>
      </div>

      <div style="margin-top: 5px; width: 100%" v-if="datos != null">
        <div class="p-fluid grid formgrid">
          <div class="field col-12 md:col-3">
            <label for="nombreVendedor">Vendedor</label>
            <InputText 
              inputId="nombreVendedor" 
              v-model="nombreVendedor" 
              disabled
            />
          </div>

          <div class="field col-12 md:col-3">
            <label for="nombreComprador">Comprador</label>
            <InputText 
              inputId="nombreComprador" 
              v-model="nombreComprador" 
              disabled
            />
          </div>

          <div class="field col-12 md:col-3">
            <label for="fechaVenta">Fecha</label>
            <InputText 
              inputId="fechaVenta" 
              v-model="fechaVenta" 
              disabled
            />
          </div>

          <div class="field col-12 md:col-3">
            <label for="tipoVenta">Tipo de venta</label>
            <InputText 
              inputId="tipoVenta" 
              v-model="tipoVenta" 
              disabled
            />
          </div>
        </div>



        <!-- productos de la venta -->
        <DataTable :value="productos" responsiveLayout="scroll">
          <!-- <Column field="code" header="Code"></Column> -->
          <Column field="name" header="Nombre"></Column>
          <Column field="cantProduct" header="Cantidad"></Column>
          <Column field="precio" header="Precio">
            <template #body="slotProps">
              <span v-if="tipoVenta == 'Consumidor final'">
                $ {{ slotProps.data.priceProductSale }}
              </span>
              <span v-else>
                $ {{ slotProps.data.priceProductTrust }}
              </span>
            </template>
          </Column>
          <Column field="subtotal" header="Subtotal" style="min-width:2rem">
            <template #body="slotProps">
              <span>
                $ {{ slotProps.data.subtotal }}
              </span>
              
            </template>
          </Column>

            <template #footer>
              <div style="display: flex">
                <div style="margin-left: auto">
                  Total:  $ {{ moneda(datos.venta.totalPrice) }}
                </div>
              </div>
            </template>
          </DataTable>

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
      nombreComprador: null,
      nombreVendedor: null,
      fechaVenta: null,
      tipoVenta: null,
      productos: [],
      loadingBtnPDF: false,
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
        .get("/api/venta/obtenerDatos/" + this.id)
        .then((response) => {
          if (response.data.code == 200) {
            console.log("response");
            console.log(response.data.data);
            this.datos = response.data.data;
            this.nombreComprador = response.data.data.venta.nameBuyer;
            this.nombreVendedor = response.data.data.venta.nameSeller;
            // this.fechaVenta = response.data.data.dateSale;
            this.fechaVenta = this.formatearFecha(response.data.data.venta.dateSale)
            if (response.data.data.venta.typeSale == 0) {
              this.tipoVenta = "Consumidor final"
            } else {
              this.tipoVenta = "Cuenta corriente"
            }
            this.productos = response.data.data.productos
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
