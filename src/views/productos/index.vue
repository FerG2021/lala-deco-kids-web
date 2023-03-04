<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">Productos</h1>
      </template>

      <template #content>
        <div style="margin-top: 10px">
          <DataTable
            :value="productos"
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
            currentPageReportTemplate="Mostrando {first} de {last} de un total de {totalRecords} productos"
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

                <div style="width: 100%">
                  <div style="float: right">
                    <Button
                      label="Nuevo producto"
                      @click="$refs.modalNuevo.abrir()"
                    />
                  </div>
                </div>
              </div>
            </template>

            <template #empty>
              <div style="display: flex">
                <div style="margin: auto">No se encontraron productos</div>
              </div>
            </template>

            <template #loading>
              <div style="display: flex">
                <div style="margin: auto">
                  Cargando productos, por favor espere
                </div>
              </div>
            </template>

            <Column field="name" header="Código" style="width: 20px">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.codeProduct }}
                </span>
              </template>
            </Column>

            <Column header="Imagen" style="width: 20px">
              <template #body="slotProps">
                <div style="display: flex">
                  <div style="margin: auto">
                    <!-- <img v-if="slotProps.data.imageURL != null" :src="slotProps.data.imageURL" :alt="slotProps.data.imageURL" class="product-image"/> -->

                    <Image
                      preview
                      :src="slotProps.data.imageURL"
                      alt="Image"
                      width="70"
                      class="ver-imagen"
                      imageStyle="border-radius: 8px; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);padding: 3px;"
                      v-if="slotProps.data.image != null"
                    />

                    <img
                      v-else
                      src="../../assets/productosinimagen.png"
                      alt=""
                      srcset=""
                      style="
                        border-radius: 8px;
                        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
                          0 3px 6px rgba(0, 0, 0, 0.23);
                        width: 70px;
                        height: 70px;
                      "
                    />
                  </div>
                </div>
              </template>
            </Column>

            <Column field="name" header="Nombre">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.nameProduct }}
                </span>
              </template>
            </Column>

            <Column field="name" header="Precio de venta">
              <template #body="slotProps">
                <span> $ {{ moneda(slotProps.data.priceSaleProduct) }} </span>
              </template>
            </Column>

            <Column field="name" header="Precio de fiado">
              <template #body="slotProps">
                <span> $ {{ moneda(slotProps.data.priceTrustProduct) }} </span>
              </template>
            </Column>

            <Column field="name" header="Stock">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.cantStockProduct }}
                </span>
              </template>
            </Column>

            <Column
              field="name"
              header="Estado stock"
              headerStyle="text-align: center"
            >
              <template #body="slotProps">
                <span
                  v-if="
                    slotProps.data.cantStockMinProduct >=
                    slotProps.data.cantStockProduct
                  "
                >
                  <Tag
                    class="mr-2"
                    icon="pi pi-check-circle"
                    severity="success"
                    value="En stock"
                  ></Tag>
                </span>

                <span v-else>
                  <Tag
                    class="mr-2"
                    icon="pi pi-times-circle"
                    severity="danger"
                    value="Sin stock"
                  ></Tag>
                </span>
              </template>
            </Column>

            <Column
              field="modificar"
              header="Modificar"
              headerStyle="width: 3em"
            >
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
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </main>

  <modal-nuevo ref="modalNuevo" @actualizarTabla="obtenerTodos"></modal-nuevo>

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
import ModalModificar from "./modales/modificar.vue";
import ModalEliminar from "./modales/eliminar.vue";

export default {
  components: {
    ModalNuevo,
    ModalModificar,
    ModalEliminar,
  },

  data() {
    return {
      productos: [],
      loading: false,
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
      await this.axios.get("/api/producto/obtenerTodos").then((response) => {
        if (response.data.code == 200) {
          console.log("response.data");
          console.log(response.data);

          this.productos = response.data.data;
        }
      });

      this.loading = false;
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

    async eliminarUsuario(row) {
      console.log("entra");
      await this.axios
        .delete("/api/producto/eliminar/" + row.data.id)
        .then((response) => {
          if (response.data.code == 200) {
            this.$toast.add({
              severity: "success",
              summary: "Mensaje de confirmación",
              detail: "Producto eliminado con éxito",
              life: 3000,
            });
            this.obtenerTodos();
          }
        });
    },

    moneda(x) {
      let aux = parseFloat(x);
      return aux.toLocaleString("es-AR");
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