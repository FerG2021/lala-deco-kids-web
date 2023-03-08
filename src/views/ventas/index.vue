<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">Ventas</h1>
      </template>

      <template #content>
        <div style="margin-top: 10px">
          <DataTable
            :value="ventas"
            responsiveLayout="scroll"
            :paginator="true"
            class="p-datatable-customers"
            :rows="10"
            :loading="loading"
            :globalFilterFields="['codeProduct', 'nameProduct']"
            v-model:filters="filters"
            filterDisplay="menu"
            style="text-align: center"
            headerStyle="text-align: center"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Mostrando {first} de {last} de un total de {totalRecords} ventas"
          >
            <template #header>
              <div style="display: flex">
                <div style="width: 100%">
                  <div style="float: left">
                    <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText
                        v-model="filters['global'].value"
                        placeholder="Escriba para buscar"
                      />
                    </span>
                  </div>
                </div>

                <div style="width: 100%; display: flex">
                  <Calendar
                    inputId="fechaInicio"
                    v-model="fechaInicio"
                    autocomplete="off"
                    placeholder="Fecha de incio"
                    style="margin-right: 20px"
                    dateFormat="dd/mm/yy"
                  />

                  <Calendar
                    inputId="fechaFin"
                    v-model="fechaFin"
                    autocomplete="off"
                    placeholder="Fecha de fin"
                    style="margin-right: 20px"
                    dateFormat="dd/mm/yy"
                  />

                  <Button
                    icon="pi pi-search"
                    @click="filtrarVentas()"
                    style="margin-right: 10px"
                  />
                  <Button
                    icon="pi pi-times-circle"
                    @click="limpiarCampos()"
                    class="p-button-danger"
                  />
                </div>

                <div style="width: 100%">
                  <div style="float: right">
                    <Button
                      label="Nueva venta"
                      @click="$refs.modalNuevo.abrir()"
                    />
                  </div>
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
                  Cargando ventas, por favor espere
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

            <Column field="id" header="Nro venta">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.id }}
                </span>
              </template>
            </Column>

            <Column field="dateSale" header="Fecha">
              <template #body="slotProps">
                <span>
                  {{ formatearFecha(slotProps.data.dateSale) }}
                </span>
              </template>
            </Column>

            <Column field="nameBuyer" header="Nombre cliente">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.nameBuyer }}
                </span>
              </template>
            </Column>

            <Column field="nameSeller" header="Nombre vendedor">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.nameSeller }}
                </span>
              </template>
            </Column>

            <Column field="totalPrice" header="Precio total">
              <template #body="slotProps">
                <span> $ {{ moneda(slotProps.data.totalPrice) }} </span>
              </template>
            </Column>

            <Column
              field="acciones"
              header="Acciones"
              headerStyle="width: 10em"
              style="min-width: 14rem"
            >
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
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
                        style="margin-right: 5px"
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
                        @click="
                          $refs.modalEnviarWhatsApp.abrir(slotProps.data.id)
                        "
                        style="margin-right: 5px"
                      />
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

  <modal-enviar-whats-app ref="modalEnviarWhatsApp"></modal-enviar-whats-app>

  <modal-enviar-mail ref="modalEnviarMail"></modal-enviar-mail>

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

import ModalNuevo from "./modales/nuevo.vue";
import ModalDetalle from "./modales/detalle.vue";
import ModalModificar from "./modales/modificar.vue";
import ModalEliminar from "./modales/eliminar.vue";
import ModalEnviarWhatsApp from "./modales/enviarwhatsapp.vue";
import ModalEnviarMail from "./modales/enviarmail.vue";

export default {
  components: {
    ModalNuevo,
    ModalDetalle,
    ModalEnviarWhatsApp,
    ModalEnviarMail,
    ModalModificar,
    ModalEliminar,
  },

  data() {
    return {
      ventas: [],
      loading: false,

      fechaInicio: null,
      fechaFin: null,

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
      this.loading = true;
      await this.axios.get("/api/venta/obtenerTodos").then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.ventas = response.data.data;
          console.log("this.ventas");
          console.log(this.ventas);
        }
      });

      this.loading = false;
    },

    async filtrarVentas() {
      //
      // FECHA DE INICIO
      //
      let mesInicio;
      if ((this.fechaInicio.getMonth() + 1).toString().length == 1) {
        mesInicio = "0" + (this.fechaInicio.getMonth() + 1);
      } else {
        mesInicio = this.fechaInicio.getMonth() + 1;
      }

      let diaInicio;
      if (this.fechaInicio.getDate().toString().length == 1) {
        diaInicio = "0" + this.fechaInicio.getDate();
      } else {
        diaInicio = this.fechaInicio.getDate();
      }

      let fechaInicioEnviar =
        this.fechaInicio.getFullYear() + "-" + mesInicio + "-" + diaInicio;

      console.log("fechaInicioEnviar");
      console.log(fechaInicioEnviar);

      //
      // FECHA DE FIN
      //

      let mesFin;
      if ((this.fechaFin.getMonth() + 1).toString().length == 1) {
        mesFin = "0" + (this.fechaFin.getMonth() + 1);
      } else {
        mesFin = this.fechaFin.getMonth() + 1;
      }

      let diaFin;
      if (this.fechaFin.getDate().toString().length == 1) {
        diaFin = "0" + this.fechaFin.getDate();
      } else {
        diaFin = this.fechaFin.getDate();
      }

      let fechaFinEnviar =
        this.fechaFin.getFullYear() + "-" + mesFin + "-" + diaFin;

      console.log("fechaFinEnviar");
      console.log(fechaFinEnviar);

      let params = {
        fechaInicio: fechaInicioEnviar,
        fechaFin: fechaFinEnviar,
      };

      this.loading = true;
      await this.axios
        .post("/api/venta/filtrarFecha", params)
        .then((response) => {
          if (response.data.code == 200) {
            console.log("response.data");
            console.log(response.data);

            this.ventas = response.data.data;
            console.log("this.ventas");
            console.log(this.ventas);
          }
        });

      this.loading = false;
    },

    limpiarCampos() {
      this.fechaInicio = null;
      this.fechaFin = null;

      this.obtenerTodos();
    },

    async generarUsuariosProveedores() {
      console.log("usuarios proveedores");

      this.axios.post("api/usuario/crearUsuarioProveedor").then((response) => {
        ElMessage({
          type: "success",
          message: "¡Usuarios proveedores añadidos con éxito!",
        });
        this.obtenerTodos();
      });
    },

    async eliminar(row) {
      console.log("row");
      console.log(row);

      this.$confirm.require({
        header: "Confirmación",
        message: "¿Está seguro que desea eliminar el producto?",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        accept: () => {
          this.eliminarUsuario(row);
        },
        reject: () => {
          // this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
        },
        onHide: () => {
          // this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
        },
      });
    },

    async generarPDF(id) {
      await this.axios.get("/api/venta/exportarPDF/" + id).then((response) => {
        if (response.data.code == 200) {
          console.log("response");
          console.log(response);
          // this.loadingBtnPDF = false

          window.open(response.data.data, "_blank");
        } else {
        }
      });
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
