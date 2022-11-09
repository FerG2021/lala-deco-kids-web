<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">Cuentas corrientes</h1>
      </template>

      <template #content>
        <!-- <div style="display: flex">
          <div style="margin-left: auto">
            <Button 
              label="Nuevo producto" 
              @click="$refs.modalNuevo.abrir()"/>
          </div>
        </div> -->

        <div style="margin-top: 10px">
          <Toolbar class="mb-4">
            <template #start>
              <Button
                label="Excel"
                icon="pi pi-file-excel"
                class="p-button-success mr-2"
                @click="exportCSV($event)"
              />

              <Button
                label="PDF"
                icon="pi pi-file-pdf"
                class="p-button-danger"
                @click="exportPDF($event)"
              />
            </template>

            <!-- <template #end>
              <Button label="Nueva venta" @click="$refs.modalNuevo.abrir()" />
            </template> -->
          </Toolbar>

          <DataTable
            :value="cuentascorrientes"
            responsiveLayout="scroll"
            :paginator="true"
            class="p-datatable-customers"
            :rows="10"
            :loading="loading"
            :globalFilterFields="['lastNameClient', 'nameClient']"
            v-model:filters="filters"
            filterDisplay="menu"
            style="text-align: center"
            headerStyle="text-align: center"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Mostrando {first} de {last} de un total de {totalRecords} cuentas corrientes"
          >
            <template #header>
              <div style="display: flex">
                <!-- <h5 class="m-0">Customers</h5> -->
                <div style="margin-left: 0px">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText
                      v-model="filters['global'].value"
                      placeholder="Escriba para buscar"
                    />
                  </span>
                </div>
              </div>
            </template>

            <template #empty>
              <div style="display: flex">
                <div style="margin: auto">No se encontraron ventas</div>
              </div>
            </template>

            <template #loading>
              <div style="display: flex">
                <div style="margin: auto">
                  Cargando cuentas corrientes, por favor espere
                </div>
              </div>
            </template>

            <!-- <Column field="name" header="Código" style="width: 20px">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.codeProduct }}
                </span>
              </template>
            </Column> -->

            <!-- <Column 
              header="Imagen"
              style="width: 20px"
            >
                <template #body="slotProps">
                  <div style="display: flex">
                    <div style="margin: auto">
                      <Image 
                        preview 
                        :src="slotProps.data.imageURL" 
                        alt="Image" 
                        width="70" 
                        class="ver-imagen" 
                        imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px;"
                      />
                    </div>
                  </div>
                </template>
            </Column> -->

            <Column field="id" header="Nro">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.clientId }}
                </span>
              </template>
            </Column>

            <Column field="lastNameClient" header="Apellido">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.lastNameClient }}
                </span>
              </template>
            </Column>

            <Column field="nameClient" header="Nombre">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.nameClient }}
                </span>
              </template>
            </Column>

            <Column field="balance" header="Monto adeudado">
              <template #body="slotProps">
                <span> $ {{ moneda(slotProps.data.balance) }} </span>
              </template>
            </Column>

            <Column field="updated_at" header="Fecha última acción">
              <template #body="slotProps">
                <span> {{ formatearFecha(slotProps.data.updated_at) }} </span>
              </template>
            </Column>

            <Column field="acciones" header="Acciones" headerStyle="width: 10em" style="min-width:16rem">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <!-- Nuevo pago -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Nuevo pago"
                      placement="top-start"
                    >
                      <Button 
                        icon="pi pi-dollar" 
                        class="p-button-rounded p-button-success" 
                        @click="$refs.modalNuevoPago.abrir(slotProps.data.id)" 
                        style="margin-right: 5px"
                      />
                    </el-tooltip>

                    <!-- Detalle -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Detalles"
                      placement="top-start"
                    >
                      <Button
                        icon="pi pi-eye"
                        class="p-button-rounded p-button-primary mr-2"
                        @click="$refs.modalDetalle.abrir(slotProps.data.id)"
                        style="margin-right: 5px;"
                      />
                    </el-tooltip>

                    <!-- Generar PDF -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Generar PDF"
                      placement="top-start"
                    >
                      <Button 
                        icon="pi pi-file-pdf" 
                        class="p-button-rounded p-button-danger" 
                        @click="generarPDF(slotProps.data.id)" 
                        style="margin-right: 5px"
                        :loading="loadingBtnPDF"
                      />
                    </el-tooltip>


                    <!-- Enviar por WhatsApp -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Enviar por WhatsApp"
                      placement="top-start"
                    >
                      <Button 
                        icon="pi pi-whatsapp" 
                        class="p-button-rounded p-button-success" 
                        @click="$refs.modalEnviarWhatsApp.abrir(slotProps.data.id)" 
                        style="margin-right: 5px"
                      />
                        <!-- @click="enviarWhatsApp(slotProps.data.id)"  -->
                    </el-tooltip>

                    <!-- Enviar por mail -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="Enviar por mail"
                      placement="top-start"
                    >
                      <Button 
                        icon="pi pi-google" 
                        class="p-button-rounded p-button-primary" 
                        @click="$refs.modalEnviarMail.abrir(slotProps.data.id)" 
                        style="margin-right: 5px"
                      />
                        <!-- @click="enviarWhatsApp(slotProps.data.id)"  -->

                    </el-tooltip>
                    
                  </div>
                </div>
              </template>
            </Column>

            <!-- <Column field="name" header="Stock">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.cantStockProduct }}
                </span>
              </template>
            </Column>

            <Column field="name" header="Estado stock" headerStyle="text-align: center">
              <template #body="slotProps">
                <span v-if="slotProps.data.cantStockProduct > slotProps.data.cantStockMinProduct">
                  <Tag class="mr-2" icon="pi pi-check" severity="success" value="En stock"></Tag>
                </span>

                <span v-if="slotProps.data.cantStockProduct < slotProps.data.cantStockMinProduct && slotProps.data.cantStockProduct > 0">
                  <Tag class="mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Stock mínimo"></Tag>
                </span>

                <span v-if="slotProps.data.cantStockProduct == 0">
                  <Tag icon="pi pi-times" severity="danger" value="Sin stock"></Tag>
                </span>
              </template>
            </Column>

            <Column field="modificar" header="Modificar" headerStyle="width: 3em">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <Button
                      icon="pi pi-pencil"
                      class="p-button-rounded p-button-warning mr-2"
                      @click="$refs.modalModificar.abrir(slotProps.data.id)"
                      style="margin-right: 5px"
                    />
                  </div>
                </div>
              </template>
            </Column>

            <Column field="eliminar" header="Eliminar" headerStyle="width: 3em">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <Button
                      icon="pi pi-trash"
                      class="p-button-rounded p-button-danger"
                      @click="eliminar(slotProps)"
                    />
                  </div>
                </div>
              </template>
            </Column> -->
          </DataTable>
        </div>
      </template>
    </Card>
  </main>

  <modal-nuevo ref="modalNuevo" @actualizarTabla="obtenerTodos()"></modal-nuevo>

  <modal-detalle ref="modalDetalle"></modal-detalle>

  <modal-nuevo-pago
    ref="modalNuevoPago"
    @actualizarTabla="obtenerTodos()"
  ></modal-nuevo-pago>

  <modal-enviar-whats-app
    ref="modalEnviarWhatsApp"
  ></modal-enviar-whats-app>

  <modal-enviar-mail
    ref="modalEnviarMail"
  ></modal-enviar-mail>

  <modal-modificar
    ref="modalModificar"
    @actualizarTabla="obtenerTodos"
  ></modal-modificar>

  <modal-eliminar
    ref="modalEliminar"
    @actualizarTabla="obtenerTodos"
  ></modal-eliminar>

  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { FilterMatchMode, FilterOperator } from "primevue/api";

// import ModalNuevo from "./modales/nuevo.vue";
import ModalDetalle from "./modales/detalle.vue";
import ModalNuevoPago from "./modales/nuevopago.vue";
import ModalEnviarWhatsApp from "./modales/enviarwhatsapp.vue";
import ModalEnviarMail from "./modales/enviarmail.vue";
import ModalModificar from "./modales/modificar.vue";
import ModalEliminar from "./modales/eliminar.vue";

export default {
  components: {
    // ModalNuevo,
    ModalDetalle,
    ModalNuevoPago,
    ModalEnviarWhatsApp,
    ModalEnviarMail,
    ModalModificar,
    ModalEliminar,
  },

  data() {
    return {
      cuentascorrientes: [],
      loading: false,
      loadingBtnPDF: false,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
      },
      statuses: [
        "unqualified",
        "qualified",
        "new",
        "negotiation",
        "renewal",
        "proposal",
      ],
    };
  },

  mounted() {
    this.obtenerTodos();
  },

  methods: {
    async exportPDF(event) {
      console.log("event");
      console.log(event);

      await this.axios.get("/api/producto/exportarPDF").then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);
        }
      });
    },

    async obtenerTodos() {
      this.usuarios = [];
      this.cuentascorrientes = [];
      this.loading = true;
      await this.axios.get("/api/cuentacorriente/obtenerTodos")
      .then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.cuentascorrientes = response.data.data;
          console.log("this.ventas");
          console.log(this.ventas);
        }
      });

      this.loading = false;
    },

    async generarPDF(id){
      // this.loadingBtnPDF = true

      await this.axios
        .get("/api/cuentacorriente/exportarPDF/" + id)
        .then((response) => {
          if (response.data.code == 200) {
            console.log("response");
            console.log(response);
            // this.loadingBtnPDF = false

            window.open(response.data.data, '_blank')
          } else {}
        })
    },

    async enviarWhatsApp(id){
      await this.axios
        .get("/api/cuentacorriente/datosWhatsApp/" + id)
        .then((response) => {
          if (response.data.code == 200) {
            console.log("response");
            console.log(response);
            // this.loadingBtnPDF = false

            // window.open(response.data.data, '_blank')
          } else {}
        })
    },

    moneda(x) {
      let aux = parseFloat(x);
      return aux.toLocaleString("es-AR");
    },

    formatearFecha(fecha) {
      let fecha1 = new Date(fecha);
      // let fecha2 = fecha1.toLocaleString();
      let fecha2 = fecha1.toLocaleDateString();
      return fecha2;
    },
  },
};
</script>

<style scoped>
.product-image {
  width: 70px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  padding: 3px;
}

.headerClass {
  text-align: center !important;
}

.p-column-header-content {
  text-align: center !important;
  align-content: center !important;
  /* border: 1px solid red !important; */
}

.p-column-title {
  /* border: 1px solid green !important; */
  text-align: center !important;
  align-content: center !important;
}

.p-image-preview-indicator {
  /* background-color: red; */
  width: 70px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 8px;
  padding: 3px;
}
</style>
