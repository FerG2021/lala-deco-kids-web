<template>
  <main class="about-page">
    <Card>
      <template #header>
        <h1 style="margin-top: 15px; margin-left: 15px">Usuarios</h1>
      </template>

      <template #content>
        <div style="display: flex">
          <div style="margin-left: auto">
            <Button 
              label="Nuevo usuario" 
              @click="$refs.modalNuevo.abrir()"/>
          </div>
        </div>


        <div style="margin-top: 10px">
          <DataTable 
            :value="usuarios" 
            responsiveLayout="scroll" 
            :loading="loading"
            :globalFilterFields="['name','lastname','email']"
            v-model:filters="filters" 
            filterDisplay="menu"
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


            <Column field="name" header="Nombre">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.name }}
                </span>
              </template>
            </Column>

            <Column field="apellido" header="Apellido">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.lastname }}
                </span>
              </template>
            </Column>
            
            <Column field="username" header="Nombre usuario">
              <template #body="slotProps">
                <span>
                  {{ slotProps.data.email }}
                </span>
              </template>
            </Column>

            <Column field="editar" header="Editar" headerStyle="width: 3em">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-warning mr-2"
                  @click="$refs.modalModificar.abrir(slotProps.data.id)"
                  style="margin-right: 5px"
                />
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
        usuarios: [],
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
        this.loading = true
        await this.axios.get("/api/usuario/obtenerTodos")
          .then(response => {
            if (response.data.code == 200) {
              console.log("response.data");
              console.log(response.data);

              // this.usuarios = response.data.data
              response.data.data.forEach((elemento) => {
                console.log("elemento.id");
                console.log(elemento.id);

                console.log("localStorage.getItem(usuarioID)");
                console.log(localStorage.getItem("usuarioID"));


                if (elemento.id != localStorage.getItem("usuarioID")) {
                  this.usuarios.push(elemento)
                }
              })

              console.log("this.usuarios");
              console.log(this.usuarios);
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
      }
    },
  }
</script>

<style>

</style>