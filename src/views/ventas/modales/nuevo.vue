<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{ width: '60%' }"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px">
          <i class="pi pi-shopping-cart" style="font-size: 20px" /> Nueva venta
        </h3>
      </template>

      <!--  -->
      <!-- PASO 1 -->
      <!--  -->
      <Toolbar class="mb-4">
        <template #start>
          <h5>1 - Tipo de cliente</h5>
        </template>
      </Toolbar>

      <div style="margin-top: 5px; width: 100%">
        <!-- <h5 style="margin: 0px">DNI</h5> -->
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid"
          style="margin-top: 30px"
        >
          <!-- Fecha de venta -->
          <div class="field">
            <div class="p-float-label">
              <!-- <Dropdown
                id="tipoCliente"
                v-model="form.tipoCliente"
                :options="tipoCliente"
                optionLabel="name"
                optionValue="code"
                style="width: 100%"
                :class="{ 'p-invalid': v$.tipoCliente.$invalid && submitted }"
                @change="limpiarSelectNombreCliente()"
              /> -->

              <Calendar
                id="fechaVenta"
                v-model="form.fechaVenta"
                dateFormat="dd/mm/yy"
              />
              <!-- {{ form.fechaVenta }} -->

              <label
                for="fechaVenta"
                :class="{ 'p-error': v$.fechaVenta.$invalid && submitted }"
                >Fecha de venta</label
              >
            </div>
            <small
              v-if="
                (v$.fechaVenta.$invalid && submitted) ||
                v$.fechaVenta.$pending.$response
              "
              class="p-error"
              >{{
                v$.fechaVenta.required.$message.replace("Value", "Nombre")
              }}</small
            >
          </div>

          <!-- Tipo cliente -->
          <div class="field">
            <div class="p-float-label">
              <Dropdown
                id="tipoCliente"
                v-model="form.tipoCliente"
                :options="tipoCliente"
                optionLabel="name"
                optionValue="code"
                style="width: 100%"
                :class="{ 'p-invalid': v$.tipoCliente.$invalid && submitted }"
                @change="limpiarSelectNombreCliente()"
              />
              <label
                for="tipoCliente"
                :class="{ 'p-error': v$.tipoCliente.$invalid && submitted }"
                >Tipo de cliente</label
              >
            </div>
            <small
              v-if="
                (v$.tipoCliente.$invalid && submitted) ||
                v$.tipoCliente.$pending.$response
              "
              class="p-error"
              >{{
                v$.tipoCliente.required.$message.replace("Value", "Nombre")
              }}</small
            >
          </div>

          <!-- Nombre cliente -->
          <div class="field" v-if="form.tipoCliente == 1">
            <div class="p-float-label">
              <Dropdown
                id="nombreCliente"
                v-model="form.nombreCliente"
                :options="clientes"
                optionLabel="completName"
                :filter="true"
                :showClear="true"
                style="width: 100%"
                :class="{ 'p-invalid': v$.nombreCliente.$invalid && submitted }"
              />
              <label
                for="nombreCliente"
                :class="{ 'p-error': v$.nombreCliente.$invalid && submitted }"
                >Nombre del cliente</label
              >
            </div>

            <!-- {{ form.nombreCliente }} -->
            <small
              v-if="
                (v$.nombreCliente.$invalid && submitted) ||
                v$.nombreCliente.$pending.$response
              "
              class="p-error"
              >{{
                v$.nombreCliente.required.$message.replace("Value", "Nombre")
              }}</small
            >
          </div>

          <!--  -->
          <!-- PASO 2 -->
          <!--  -->
          <Toolbar class="mb-4">
            <template #start>
              <h5>2 - Selección de productos</h5>
            </template>
          </Toolbar>

          <div
            v-if="
              form.tipoCliente == 0 ||
              (form.tipoCliente == 1 && form.nombreCliente != null)
            "
          >
            <div class="grid">
              <div class="col-10">
                <!-- Nombre cliente -->
                <div class="p-float-label">
                  <Dropdown
                    id="codigoProducto"
                    v-model="form.codigoProducto"
                    :options="productos"
                    optionLabel="codeNameProduct"
                    :filter="true"
                    :showClear="true"
                    style="width: 100%"
                  />
                  <label for="codigoProducto">Seleccione un producto</label>

                  <!-- :class="{'p-invalid':v$.codigoProducto.$invalid && submitted}" -->
                  <!-- <label for="codigoProducto" :class="{'p-error':v$.codigoProducto.$invalid && submitted}">Nombre del cliente</label> -->
                </div>
                <!-- <small v-if="(v$.codigoProducto.$invalid && submitted) || v$.codigoProducto.$pending.$response" class="p-error">{{v$.codigoProducto.required.$message.replace('Value', 'Nombre')}}</small> -->
              </div>
              <div class="col-2">
                <Button
                  label="Agregar"
                  @click="agregarProducto(form.codigoProducto)"
                />
                <!-- icon="pi pi-plus-circle" -->
              </div>
            </div>

            <div>
              <DataTable :value="arrayProductosVenta" responsiveLayout="scroll">
                <Column field="nombre" header="Nombre">
                  <template #body="slotProps">
                    <span>
                      {{ slotProps.data.nombre }}
                    </span>
                  </template>
                </Column>

                <Column field="precioVenta" header="Precio de venta">
                  <template #body="slotProps">
                    <span> $ {{ slotProps.data.precioVenta }} </span>
                  </template>
                </Column>

                <Column field="cantidad" header="Cantidad">
                  <template #body="slotProps">
                    <span>
                      <!-- {{ slotProps.data.cantidad }} -->
                      <InputText
                        v-model="slotProps.data.cantidad"
                        style="width: 50%"
                        @change="cambiarCantidadProductoEnVenta(slotProps.data)"
                      />
                    </span>
                  </template>
                </Column>

                <Column field="subtotal" header="Subtotal">
                  <template #body="slotProps">
                    <span> $ {{ (slotProps.data.subtotal).toFixed(2) }} </span>
                  </template>
                </Column>

                <Column field="eliminar" header="Eliminar">
                  <template #body="slotProps">
                    <!-- <div style="display: flex">
                      <div style="margin: auto"> -->
                    <Button
                      icon="pi pi-trash"
                      class="p-button-rounded p-button-danger"
                      @click="eliminar(slotProps)"
                    />
                    <!-- </div>
                    </div> -->
                  </template>
                </Column>
                <template #footer>
                  <div class="grid">
                    <div class="col-8"></div>
                    <div>Total: $ {{ this.precioTotal.toFixed(2) }}</div>
                  </div>
                </template>
              </DataTable>

              <div class="p-fluid grid formgrid">
                <div class="field col-12 md:col-4"></div>
                <div class="field col-12 md:col-4"></div>

                <div class="field col-12 md:col-4" style="margin-top: 30px">
                  <div class="p-float-label">
                    <InputNumber 
                      id="montoPagado"
                      v-model="form.montoPagado"
                      style="width: 100%"
                      mode="currency" 
                      currency="ARS" 
                      locale="es-AR"
                      :max="precioTotal"
                    />
                    <label for="montoPagado">Monto pagado</label>
                  </div>
                </div>
              </div>

              
            </div>
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
import { helpers } from "@vuelidate/validators";
import { parseQuery } from "vue-router";

export default {
  setup: () => ({ v$: useVuelidate() }),

  created() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  },

  data() {
    return {
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      form: {
        // paso 1
        fechaVenta: null,
        tipoCliente: null,
        nombreCliente: null,

        // paso 2
        codigoProducto: null,
        nombreProducto: null,
        montoPagado: null,
      },
      productos: [],
      clientes: [],
      arrayProductosVenta: [],
      precioTotal: 0,
      tipoCliente: [
        { name: "Consumidor final", code: 0 },
        { name: "Cliente", code: 1 },
      ],

      es: {
        firstDayOfWeek: 1,
        dayNames: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
        monthNames: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        monthNamesShort: [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ],
        today: "Hoy",
        clear: "Borrar",
        weekHeader: "Sm",

        minDate: null,
        maxDate: null,
        invalidDates: null,
      },
    };
  },

  validations() {
    return {
      fechaVenta: {
        required: helpers.withMessage(
          "La fecha de venta es requerida",
          required
        ),
        // email,
      },
      tipoCliente: {
        required: helpers.withMessage(
          "El tipo de cliente es requerido",
          required
        ),
        // email,
      },
      nombreCliente: {
        required: helpers.withMessage(
          "El nombre del cliente es requerido",
          required
        ),
        // email,
      },
      codigoProducto: {
        required: helpers.withMessage(
          "El nombre del cliente es requerido",
          required
        ),
        // email,
      },
    };
  },

  methods: {
    abrir() {
      this.submitted = false;
      console.log("abrir");
      this.display = true;
      this.isFormValid = false;
      this.loadingBtnGuardar = false;
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
      // productos
      await this.axios.get("/api/producto/obtenerTodos").then((response) => {
        this.productos = response.data.data;
        console.log("this.productos");
        console.log(this.productos);
      });

      // clientes
      await this.axios.get("/api/cliente/obtenerTodos").then((response) => {
        this.clientes = response.data.data;
        console.log("this.clientes");
        console.log(this.clientes);
      });

      // 
      

    },

    limpiarSelectNombreCliente() {
      this.form.nombreCliente = null;
      this.arrayProductosVenta = [];
    },

    agregarProducto(producto) {
      if (this.form.codigoProducto == null) {
        this.$toast.add({
          severity: "error",
          summary: "Mensaje de error",
          detail:
            "Se debe seleccionar un producto para agregar a la lista de venta",
          life: 3000,
        });
      } else {
        console.log("Producto a agregar");
        console.log(producto);

        if (producto.cantStockProduct >= 1) {
          console.log("this.form.tipoCliente");
          console.log(this.form.tipoCliente);

          // pregunto si el producto ya fue agregado, si ya esta esta en la lista mostrar mensaje de error

          let b = 0;
          this.arrayProductosVenta.forEach((elemento) => {
            console.log("elemento.id");
            console.log(elemento.id);

            console.log("producto.id");
            console.log(producto.id);

            if (elemento.id == producto.id) {
              b = 1;
            }
          });

          if (b == 0) {
            console.log("el producto no existe");
            // this.form.tipoCliente = 1 CONSUMIDOR FINAL
            // this.form.tipoCliente = 2 CLIENTE

            if (this.form.tipoCliente == 0) {
              let fila = {
                id: producto.id,
                nombre: producto.nameProduct,
                precioVenta: producto.priceSaleProduct,
                cantidad: 1,
                cantidadAnterior: 1,
                subtotal: parseFloat(producto.priceSaleProduct) * 1,
                cantStockMinProduct: producto.cantStockMinProduct,
                cantStockProduct: producto.cantStockProduct,
                codeNameProduct: producto.codeNameProduct,
                codeProduct: producto.codeProduct,
                image: producto.image,
                imageURL: producto.imageURL,
                porcPriceTrustProduct: producto.porcPriceTrustProduct,
                priceTrustProduct: producto.priceTrustProduct,
                uuid: producto.uuid,
              };

              this.arrayProductosVenta.push(fila);
            } else {
              let fila = {
                id: producto.id,
                nombre: producto.nameProduct,
                precioVenta: producto.priceTrustProduct,
                cantidad: 1,
                cantidadAnterior: 1,
                subtotal: parseFloat(producto.priceTrustProduct),
                cantStockMinProduct: producto.cantStockMinProduct,
                cantStockProduct: producto.cantStockProduct,
                codeNameProduct: producto.codeNameProduct,
                codeProduct: producto.codeProduct,
                image: producto.image,
                imageURL: producto.imageURL,
                porcPriceTrustProduct: producto.porcPriceTrustProduct,
                priceTrustProduct: producto.priceTrustProduct,
                uuid: producto.uuid,
              };

              this.arrayProductosVenta.push(fila);
            }

            this.form.codigoProducto = null;

            // recorro el array para el precio total
            this.precioTotal = 0;
            this.arrayProductosVenta.forEach((elemento) => {
              this.precioTotal =
                parseFloat(this.precioTotal) + parseFloat(elemento.subtotal);
            });
          } else {
            console.log("el producto existe");
            this.$toast.add({
              severity: "error",
              summary: "Mensaje de error",
              detail: "El producto ya está agregado a la lista",
              life: 3000,
            });
          }
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Mensaje de error",
            detail: "El producto a agregar no cuenta con stock",
            life: 3000,
          });
        }
      }
    },

    cambiarCantidadProductoEnVenta(row) {
      console.log("row");
      console.log(row);

      if (row.cantidad <= row.cantStockProduct) {
        row.subtotal = parseFloat(row.precioVenta) * parseInt(row.cantidad);
        row.cantidadAnterior = row.cantidad;

        // recorro el array para el precio total
        this.precioTotal = 0;
        this.arrayProductosVenta.forEach((elemento) => {
          this.precioTotal =
            parseFloat(this.precioTotal) + parseFloat(elemento.subtotal);
        });
      } else {
        row.cantidad = row.cantidadAnterior;

        this.$toast.add({
          severity: "error",
          summary: "Mensaje de error",
          detail: `El producto no cuenta con suficiente stock. Stock actual: ${row.cantStockProduct}`,
          life: 4000,
        });
      }
    },

    eliminar(row) {
      // console.log("row");
      // console.log(row);
      // this.arrayProductosAComprar.splice(scope.$index, 1);
      this.arrayProductosVenta.splice(row.index, 1);
      // recorro el array para el precio total
      this.precioTotal = 0;
      this.arrayProductosVenta.forEach((elemento) => {
        this.precioTotal =
          parseFloat(this.precioTotal) + parseFloat(elemento.subtotal);
      });
    },

    async guardar() {
      this.loadingBtnGuardar = true;

      let anio = this.form.fechaVenta.getFullYear();
      let mes = this.form.fechaVenta.getMonth()+1;
      let dia = this.form.fechaVenta.getDate()

      console.log("dia, mes, anio");
      console.log(anio + "-" + mes + "-" + dia);


      let params = {
        fechaVenta: anio + "-" + mes + "-" + dia,
        tipoCliente: this.form.tipoCliente,
        arrayProductosVenta: JSON.stringify(this.arrayProductosVenta),
        // precioTotal: this.precioTotal,
        precioTotal: this.precioTotal
      }

      if (this.tipoCliente == 2 && this.form.nombreCliente != null) {
        params.clienteVenta = tis.form.nombreCliente.id
      }

      params.nombreVendedor = this.$store.state.user.name + " " + this.$store.state.user.lastname

      if (this.form.tipoCliente == 0) {
        params.idCliente = 0
        params.nombreCliente = "Consumidor final"        
      } else {
        params.idCliente = this.form.nombreCliente.id
        params.nombreCliente = this.form.nombreCliente.completName
        params.nameClient = this.form.nombreCliente.nameClient
        params.lastNameClient = this.form.nombreCliente.lastNameClient
        params.dniClient = this.form.nombreCliente.dniClient
        params.montoPagado = this.form.montoPagado
      }

      console.log("this.store.state.user");
      console.log(this.$store.state.user);

      console.log("anio");
      console.log(this.form.fechaVenta.getFullYear());


      console.log("this.form.nombreCliente");
      console.log(this.form.nombreCliente);


      console.log("params");
      console.log(params);



      await this.axios.post("/api/venta/crear", params)
        .then(response => {
          console.log("response");
          console.log(response);
          if (response.data.code == 200) {
            console.log("response.data");
            console.log(response.data);

            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: response.data.data,
              life: 3000,
            });
            this.$emit('actualizar-tabla');
            this.display = false;

          } else {
            console.log("response.data");
            console.log(response.data);
            for (const property in response.data.data) {
              // console.log(`${property}: ${response.data.data[property]}`);
              this.$toast.add({
                severity: "error",
                summary: "Se ha producido un error",
                detail: `${response.data.data[property]}`,
                life: 5000,
              });
            }
          }
        })
        
      this.loadingBtnGuardar = false;
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
      this.loadingBtnGuardar = false;
      // paso 1
      this.form.fechaVenta = null;
      this.form.tipoCliente = null;
      this.form.nombreCliente = null;

      // paso 2
      this.form.codigoProducto = null;
      this.form.nombreProducto = null;
      this.arrayProductosVenta = null;
      this.form.montoPagado = null

      this.productos = [];
      this.clientes = [];
      this.precioTotal = 0;
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

.p-toolbar {
  /* background-color: var(--blue-500)red !important; */
}
</style>
