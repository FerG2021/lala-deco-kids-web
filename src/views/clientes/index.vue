<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">Clientes</h1>
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
            <!-- <template #start>
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
            </template> -->

            <template #end>
              <Button label="Nuevo cliente" @click="$refs.modalNuevo.abrir()" />
            </template>
          </Toolbar>

          <DataTable
            :value="cuentascorrientes"
            responsiveLayout="scroll"
            :paginator="true"
            class="p-datatable-customers"
            :rows="10"
            :loading="loading"
            :globalFilterFields="['lastNameClient', 'nameClient', 'phoneClient']"
            v-model:filters="filters"
            filterDisplay="menu"
            style="text-align: center"
            headerStyle="text-align: center"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Mostrando {first} de {last} de un total de {totalRecords} clientes"
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
                <div style="margin: auto">No se encontraron clientes</div>
              </div>
            </template>

            <template #loading>
              <div style="display: flex">
                <div style="margin: auto">
                  Cargando clientes, por favor espere
                </div>
              </div>
            </template>

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

            <Column field="dniClient" header="DNI">
              <template #body="slotProps">
                <span> {{ slotProps.data.dniClient }} </span>
              </template>
            </Column>
            
            <!-- Editar -->
            <Column field="editar" header="Editar" headerStyle="width: 2em" style="min-width:2rem">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <Button 
                      icon="pi pi-pencil" 
                      class="p-button-rounded p-button-warning" 
                      @click="$refs.modalModificar.abrir(slotProps.data.id)" 
                      style="margin-right: 5px"
                    />
                  </div>
                </div>
              </template>
            </Column>

            <!-- Detalle -->
            <Column field="detalle" header="Detalle" headerStyle="width: 2em" style="min-width:2rem">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <Button
                      icon="pi pi-eye"
                      class="p-button-rounded p-button-primary mr-2"
                      @click="$refs.modalDetalle.abrir(slotProps.data.id)"
                      style="margin-right: 5px;"
                    />
                  </div>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </main>

  <modal-nuevo 
    ref="modalNuevo" 
    @actualizarTabla="obtenerTodos()"
  ></modal-nuevo>

  <modal-detalle 
    ref="modalDetalle"
    @actualizarTabla="obtenerTodos()"
  ></modal-detalle>

  <modal-modificar
    ref="modalModificar"
    @actualizarTabla="obtenerTodos()"
  ></modal-modificar>

  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { FilterMatchMode, FilterOperator } from "primevue/api";

import ModalNuevo from "./modales/nuevo.vue";
import ModalDetalle from "./modales/detalle.vue";
import ModalModificar from "./modales/modificar.vue";

export default {
  components: {
    ModalNuevo,
    ModalDetalle,
    ModalModificar,
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
    async obtenerTodos() {
      this.usuarios = [];
      this.cuentascorrientes = [];
      this.loading = true;
      await this.axios.get("/api/cliente/obtenerTodos")
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
