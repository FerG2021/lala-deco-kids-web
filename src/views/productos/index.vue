<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">Productos</h1>
      </template>

      <template #content>
        <div style="display: flex">
          <div style="margin-left: auto">
            <Button 
              label="Nuevo producto" 
              @click="$refs.modalNuevo.abrir()"/>
          </div>
        </div>


        <div style="margin-top: 10px">
          <DataTable 
            :value="productos" 
            responsiveLayout="scroll" 
            :loading="loading"
            :globalFilterFields="['codeProduct', 'nameProduct']"
            v-model:filters="filters" 
            filterDisplay="menu"
            style="text-align: center"
            headerStyle="text-align: center"
          >
            
            <template #header>
              <div class="display: flex">
                <!-- <h5 class="m-0">Customers</h5> -->
                <div class="margin-left: auto">
                  <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Escriba para buscar" />
                  </span>
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
            

            <Column 
              header="Imagen"
              style="width: 20px"
            >
                <template #body="slotProps">
                  <div style="display: flex">
                    <div style="margin: auto">
                      <img v-if="slotProps.data.imageURL != null" :src="slotProps.data.imageURL" :alt="slotProps.data.imageURL" class="product-image"/>
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
                <span>
                  $ {{ moneda(slotProps.data.priceSaleProduct) }}
                </span>
              </template>
            </Column>

            <Column field="name" header="Precio de fiado">
              <template #body="slotProps">
                <span>
                  $ {{ moneda(slotProps.data.priceTrustProduct) }}
                </span>
              </template>
            </Column>

            <Column field="name" header="Stock">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.cantStockProduct }}
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
            </Column>

          </DataTable>
        </div>
      </template>

    </Card>
  </main>
  

  <modal-nuevo 
    ref="modalNuevo"
    @actualizarTabla="obtenerTodos"
  ></modal-nuevo>
  
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
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { FilterMatchMode, FilterOperator } from "primevue/api";

  import ModalNuevo from './modales/nuevo.vue'
  import ModalModificar from './modales/modificar.vue'
  import ModalEliminar from './modales/eliminar.vue'

  

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
          'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        }
      }
    },

    mounted() {
      this.obtenerTodos()
    },

    methods: {
      async obtenerTodos(){
        this.usuarios = []
        this.loading = false
        await this.axios.get("/api/producto/obtenerTodos")
          .then(response => {
            if (response.data.code == 200) {
              console.log("response.data");
              console.log(response.data);

              this.productos = response.data.data
              
            }

        })

        this.loading = false
      },

      async generarUsuariosProveedores(){
        console.log("usuarios proveedores");

        this.axios.post("api/usuario/crearUsuarioProveedor")
          .then(response => {
            ElMessage({
              type: 'success',
              message: '¡Usuarios proveedores añadidos con éxito!',
            })
            this.obtenerTodos()
          })
      },

      async eliminar(row){
        console.log("row");
        console.log(row);

        this.$confirm.require({
          header: 'Confirmación',
          message: '¿Está seguro que desea eliminar el usuario?',
          icon: 'pi pi-info-circle',
          acceptClass: 'p-button-danger',
          acceptIcon: 'pi pi-check',
          rejectIcon: 'pi pi-times',        
          accept: () => {
            this.eliminarUsuario(row)
            
          },
          reject: () => {
            // this.$toast.add({severity:'error', summary:'Rejected', detail:'You have rejected', life: 3000});
          },
          onHide: () => {
            // this.$toast.add({severity:'error', summary:'Hide', detail:'You have hidden', life: 3000});
          }
        });
      },

      async eliminarUsuario(row){
        console.log("entra");
        await this.axios.delete("/api/usuario/eliminar/" + row.data.id)
          .then(response => {
            if (response.data.code == 200) {
              this.$toast.add({severity:'success', summary:'Mensaje de confirmación', detail:'Usuario elimado con éxito', life: 3000});
              this.obtenerTodos()
            }
          })
      },

      moneda(x){
        return x.toLocaleString('es-AR');
      },
    },
  }
</script>

<style>
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
</style>