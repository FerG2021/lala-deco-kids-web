<template>
  <div>
    <Toast />

    <Dialog
      v-model:visible="display"
      icon="pi pi-refresh"
      :style="{width: '30%'}"
      class="flex justify-content-center"
      :draggable="false"
    >
      <template #header icon="pi pi-refresh" style="margin: 0px" class="s">
        <h3 style="margin: 0px"><i class="pi pi-user-edit" /> Modificar cliente</h3>
      </template>

      <div style="display: flex" v-if="datos == null">
        <div style="margin: auto">
          <ProgressSpinner style="text-align: center"/>
        </div>
      </div>

      <div style="margin-top: 5px; width: 100%" v-if="datos != null">
        <!-- <h5 style="margin: 0px">DNI</h5> -->
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid" style="margin-top: 30px">
          <!-- DNI -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="dni"
                type="text"
                v-model="form.dni"
                style="width: 100%"
              />
              <label for="dni">DNI</label>
            </div>
            <!-- <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Usuario')}}</small> -->
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
         
         <!-- Apellido -->
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="apellido"
                type="text"
                v-model="form.apellido"
                style="width: 100%"
                :class="{'p-invalid':v$.apellido.$invalid && submitted}"
              />
              <label for="apellido" :class="{'p-error':v$.apellido.$invalid && submitted}">Apellido</label>
            </div>
            <small v-if="(v$.apellido.$invalid && submitted) || v$.apellido.$pending.$response" class="p-error">{{v$.apellido.required.$message.replace('Value', 'Apellido')}}</small>
          </div>

          <div class="field">
            <div class="p-float-label">
              <InputText
                id="email"
                type="text"
                v-model="form.email"
                style="width: 100%"
              />
              <label for="email">Email</label>
            </div>
            <!-- <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Usuario')}}</small> -->
          </div>

          <div class="field">
            <div class="p-float-label">
              <InputText
                id="telefono"
                type="text"
                v-model="form.telefono"
                style="width: 100%"
              />
              <label for="password">Teléfono</label>
            </div>
            <!-- <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Contraseña')}}</small> -->
          </div>

          <div class="field">
            <div class="p-float-label">
              <InputText
                id="direccion"
                type="text"
                v-model="form.direccion"
                style="width: 100%"
              />
              <label for="direccion">Dirección</label>
            </div>
            <!-- <small v-if="(v$.cpassword.$invalid && submitted) || v$.cpassword.$pending.$response" class="p-error">{{v$.cpassword.required.$message.replace('Value', 'Usuario')}}</small> -->
          </div>

          <!-- <div style="display: flex">
            <Button
              label="Cancelar"
              icon="pi pi-times"
              class="p-button-text"
              @click="cerrar()"
            />
            <Button
              label="Guardar"
              type="submit"
              icon="pi pi-check"
              autofocus
              @click="guardar()"
              :loading="loadingBtnGuardar"
            />
          </div> -->
          
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
      id: null,
      display: false,
      submitted: false,
      isFormValid: false,
      loadingBtnGuardar: false,
      datos: null,
      form: {
        dni: null,
        nombre: null,
        apellido: null,
        email: null,
        telefono: null,
        direccion: null,
      },
    };
  },

  validations() {
    return {
      dni: {
        required: helpers.withMessage('El nombre es requerido', required),
        // email,
      },
      nombre: {
        required: helpers.withMessage('El nombre es requerido', required),
        // email,
      },
      apellido: {
        required: helpers.withMessage('El apellido es requerido', required),
      },
    };
  },

  methods: {
    abrir(id) {
      this.id = id
      this.submitted = false
      console.log("abrir");
      this.display = true;
      this.isFormValid = false
      this.resetForm()
      this.getDatos()
    },

    cerrar() {
      // this.$toast.add({
      //   severity: "error",
      //   summary: "Ventana cerrada con éxito",
      //   detail: "Message Content",
      //   life: 3000,
      // });
      this.display = false;
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
      this.datos = null
      this.form.dni = null
      this.form.nombre = null
      this.form.apellido = null
      this.form.email = null
      this.form.direccion = null
      this.form.telefono = null
      this.submitted = false;
    },

    async getDatos(){
      console.log("abrir");
      await this.axios.get("/api/cliente/obtenerDatos/" + this.id)
          .then(response => {
            if (response.data.code == 200) {
              this.form.nombre = response.data.data.nameClient
              this.form.apellido = response.data.data.lastNameClient
              this.form.email = response.data.data.mailClient
              this.form.dni = response.data.data.dniClient
              this.form.direccion = response.data.data.directionClient
              this.form.telefono = response.data.data.phoneClient
              this.datos = response.data.data
            } 
          })
    },


    async guardar() {
      this.loadingBtnGuardar = true

      // console.log("this.form");
      // console.log(this.form);
      // this.$emit("update:nuevoEmpleado", this.form);

      let params = {
        dni: this.form.dni,
        nombre: this.form.nombre,
        apellido: this.form.apellido,
        email: this.form.email,
        telefono: this.form.telefono,
        direccion: this.form.direccion,
      }

      await this.axios.put("/api/cliente/actualizar/" + this.id, params)
          .then(response => {
            if (response.data.code == 200) {

              this.$toast.add({
                severity: "success",
                summary: "Mensaje de confirmación",
                detail: "Cliente modificado con éxito",
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