<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{width: '35%'}"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px"><i class="pi pi-box" style="font-size: 20px"/> Modificar producto</h3>
      </template>

      <div style="display: flex" v-if="datos == null">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center"/>
        </div>
      </div>

      <div style="margin-top: 5px; width: 100%" v-if="datos != null">
        <!-- <h5 style="margin: 0px">DNI</h5> -->
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid" style="margin-top: 30px">

          <!-- Codigo -->
          <div class="field">
            <div class="p-float-label">
              <InputNumber 
                id="codigo"
                v-model="form.codigo"
                style="width: 100%"
                :class="{'p-invalid':v$.codigo.$invalid && submitted}"
              />
              <label for="codigo" :class="{'p-error':v$.codigo.$invalid && submitted}">Código</label>
            </div>
            <small v-if="(v$.codigo.$invalid && submitted) || v$.codigo.$pending.$response" class="p-error">{{v$.codigo.required.$message.replace('Value', 'Codigo')}}</small>
          </div>

          <!-- Nombre -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="nombre"
                type="text"
                v-model="form.nombre"
                style="width: 100%"
                :class="{'p-invalid':v$.nombre.$invalid && submitted}"
              />
              <label for="nombre" :class="{'p-error':v$.nombre.$invalid && submitted}">Nombre</label>
            </div>
            <small v-if="(v$.nombre.$invalid && submitted) || v$.nombre.$pending.$response" class="p-error">{{v$.nombre.required.$message.replace('Value', 'Nombre')}}</small>
          </div>
         
          <!-- Precio de venta -->
          <div class="field">
            <div class="p-float-label">
              <InputNumber 
                id="precioVenta"
                v-model="form.precioVenta"
                style="width: 100%"
                mode="currency" 
                currency="ARS" 
                locale="es-AR"
                :class="{'p-invalid':v$.precioVenta.$invalid && submitted}"
              />
              <label for="precioVenta" :class="{'p-error':v$.precioVenta.$invalid && submitted}">Precio de venta</label>
            </div>
            <small v-if="(v$.precioVenta.$invalid && submitted) || v$.precioVenta.$pending.$response" class="p-error">{{v$.precioVenta.required.$message.replace('Value', 'Precio de venta')}}</small>
          </div>

          <!-- Porc de fiado -->
          <div class="field">
            <div class="p-float-label">
              <InputNumber 
                id="procPrecioFiado"
                v-model="form.procPrecioFiado"
                style="width: 100%"
                suffix=" %"
                :class="{'p-invalid':v$.procPrecioFiado.$invalid && submitted}"
              />
              <label for="procPrecioFiado" :class="{'p-error':v$.procPrecioFiado.$invalid && submitted}">Porcentaje precio de fiado</label>
            </div>
            <small v-if="(v$.procPrecioFiado.$invalid && submitted) || v$.procPrecioFiado.$pending.$response" class="p-error">{{v$.procPrecioFiado.required.$message.replace('Value', 'Porcentaje de fiado')}}</small>
          </div>

          <!-- Precio de fiado -->
          <div class="field">
            <div class="p-float-label">
              <InputNumber 
                id="procPrecioFiado"
                v-model="form.precioFiado"
                style="width: 100%"
                mode="currency" 
                currency="ARS" 
                locale="es-AR"
                :class="{'p-invalid':v$.precioFiado.$invalid && submitted}"
                disabled
              />
              <label for="precioFiado" :class="{'p-error':v$.precioFiado.$invalid && submitted}">Porcentaje precio de fiado</label>
            </div>
            <small v-if="(v$.precioFiado.$invalid && submitted) || v$.precioFiado.$pending.$response" class="p-error">{{v$.precioFiado.required.$message.replace('Value', 'Precio de fiado')}}</small>
          </div>

          <!-- Stock -->
          <div class="field">
            <div class="p-float-label">
              <InputNumber 
                id="stock"
                v-model="form.stock"
                style="width: 100%"
                :class="{'p-invalid':v$.stock.$invalid && submitted}"
              />
              <label for="stock" :class="{'p-error':v$.stock.$invalid && submitted}">Stock</label>
            </div>
            <small v-if="(v$.stock.$invalid && submitted) || v$.stock.$pending.$response" class="p-error">{{v$.stock.required.$message.replace('Value', 'Stock')}}</small>
          </div>

          <!-- Stock minimo-->
          <div class="field">
            <div class="p-float-label">
              <InputNumber 
                id="stockMinimo"
                v-model="form.stockMinimo"
                style="width: 100%"
                :class="{'p-invalid':v$.stockMinimo.$invalid && submitted}"
              />
              <label for="stockMinimo" :class="{'p-error':v$.stockMinimo.$invalid && submitted}">Stock mínimo</label>
            </div>
            <small v-if="(v$.stockMinimo.$invalid && submitted) || v$.stockMinimo.$pending.$response" class="p-error">{{v$.stockMinimo.required.$message.replace('Value', 'Stock mínimo')}}</small>
          </div>

          <!-- Imagen -->
          <div class="field">
            <div class="p-float-label">
              <FileUpload 
                name="form.demo" 
                url="./upload.php" 
                @upload="onUpload" 
                @select="imagenSeleccionada"
                :multiple="false" 
                accept="image/*" 
                :maxFileSize="1000000"
                invalidFileSizeMessage="{0}: Tamaño de archivo inválido, debe ser menor a {1}."
              >
                <template #empty>
                    <p>Arrastre las imágenes para subirlas</p>
                </template>
              </FileUpload>
              <!-- <label for="stockMinimo" :class="{'p-error':v$.stockMinimo.$invalid && submitted}">Stock mínimo</label> -->
            </div>
            <!-- <small v-if="(v$.stockMinimo.$invalid && submitted) || v$.stockMinimo.$pending.$response" class="p-error">{{v$.stockMinimo.required.$message.replace('Value', 'Stock mínimo')}}</small> -->
          </div>
        </form>
      </div>

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
import { helpers } from '@vuelidate/validators';

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
      form: {
        codigo: null,
        nombre: null,
        precioVenta: null,
        procPrecioFiado: null,
        precioFiado: null,
        stock: null,
        stockMinimo: null,
        imagen: null,
      },
    };
  },

  validations() {
    return {
      codigo: {
        required: helpers.withMessage('El código es requerido', required),
        // email,
      },
      nombre: {
        required: helpers.withMessage('El nombre es requerido', required),
        // email,
      },
      precioVenta: {
        required: helpers.withMessage('El precio de venta es requerido', required),
        // email,
      },
      procPrecioFiado: {
        required: helpers.withMessage('El procentaje de fiado es requerido', required),
        // email,
      },
      precioFiado: {
        required: helpers.withMessage('El precio de fiado es requerido', required),
        // email,
      },
      stock: {
        required: helpers.withMessage('El precio de fiado es requerido', required),
        // email,
      },
      stockMinimo: {
        required: helpers.withMessage('El precio de fiado es requerido', required),
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
      this.getDatos()
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


    async getDatos(){
      console.log("abrir");
      await this.axios.get("/api/producto/obtenerDatos/" + this.id)
          .then(response => {
            if (response.data.code == 200) {
              this.datos = response.data.data
              this.form.codigo = response.data.data.codeProduct
              this.form.nombre = response.data.data.nameProduct
              this.form.precioVenta = response.data.data.priceSaleProduct
              this.form.procPrecioFiado = response.data.data.porcPriceTrustProduct
              let porcentaje = this.form.procPrecioFiado / 100
              this.form.precioFiado = (this.form.precioVenta * porcentaje) + parseFloat(this.form.precioVenta)
              this.form.stock = response.data.data.cantStockProduct
              this.form.stockMinimo = response.data.data.cantStockMinProduct
            } 
          })
    },



    onUpload() {
        this.$toast.add({severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000});
    },

    imagenSeleccionada(event){
      console.log("imagen");
      console.log(event.files[0]);
      this.form.imagen = event.files[0]
    },

    handleSubmit(isFormValid) {
      this.isFormValid = isFormValid

      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      this.toggleDialog();
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;
  
      if(!this.showMessage) {
        this.resetForm();
      }
    },

    resetForm() {
      this.form.codigo = null
      this.form.nombre = null
      this.form.precioVenta = null
      this.form.procPrecioFiado = null
      this.form.stock = null
      this.form.stockMinimo = null
      this.form.imagen = null
      this.submitted = false;
    },

    async guardar() {
      this.loadingBtnGuardar = true

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
        formData.append(key, this.form[key])        
      }

      console.log("formData");
      console.log(formData);


      await this.axios.post("/api/producto/crear", formData)
          .then(response => {
            console.log(response.data);
            if (response.data.code == 200) {

              this.$toast.add({
                severity: "success",
                summary: "Mensaje de confirmación",
                detail: "Producto creado con éxito",
                life: 3000,
              });

              this.display = false;
              this.$emit("actualizar-tabla")


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

        })

        this.loadingBtnGuardar = false



      
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
</style>