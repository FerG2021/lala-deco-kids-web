<template>
  <main>
    <Toast />

    <Card>
      <template #header>
        <h1>Mi cuenta</h1>
      </template>

      <template #content>
        <div style="display: flex" v-if="datos == null">
          <div style="margin: auto">
            <ProgressSpinner style="text-align: center"/>
          </div>
        </div>

        <div v-if="datos != null">
          <div style="margin-bottom: 20px">
            <div>
              <h3 style="margin-right: 10px; margin-bottom: 10px">
                Habilitar edición de datos
              </h3>
              <!-- <el-switch v-model="habilitarEdicion" /> -->
              <InputSwitch v-model="habilitarEdicion" />
            </div>

            <div v-if="habilitarEdicion == true">
              <!-- <el-alert title="IMPORTANTE" description="Al modificar algunos de los datos de su cuenta la sesión se cerrará y deberá voler a ingresar" type="warning" show-icon/> -->

              <Message severity="warn" :closable="false"
                >Al modificar algunos de los datos de su cuenta la sesión se
                cerrará y deberá voler a ingresar</Message
              >
            </div>
          </div>

          <form
            @submit.prevent="handleSubmit(!v$.$invalid)"
            class="p-fluid"
            style="margin-top: 30px"
          >
            <!-- Nombre -->
            <div class="field">
              <div class="p-float-label">
                <InputText
                  id="nombre"
                  type="text"
                  v-model="form.nombre"
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.nombre.$invalid && submitted }"
                  :disabled="habilitarEdicionpassword()"
                />
                <label
                  for="nombre"
                  :class="{ 'p-error': v$.nombre.$invalid && submitted }"
                  >Nombre</label
                >
              </div>
              <small
                v-if="
                  (v$.nombre.$invalid && submitted) ||
                  v$.nombre.$pending.$response
                "
                class="p-error"
                >{{
                  v$.nombre.required.$message.replace("Value", "Nombre")
                }}</small
              >
            </div>

            <!-- Apellido -->
            <div class="field">
              <div class="p-float-label">
                <InputText
                  id="apellido"
                  type="text"
                  v-model="form.apellido"
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.apellido.$invalid && submitted }"
                  :disabled="habilitarEdicionpassword()"
                />
                <label
                  for="apellido"
                  :class="{ 'p-error': v$.apellido.$invalid && submitted }"
                  >Apellido</label
                >
              </div>
              <small
                v-if="
                  (v$.apellido.$invalid && submitted) ||
                  v$.apellido.$pending.$response
                "
                class="p-error"
                >{{
                  v$.apellido.required.$message.replace("Value", "Apellido")
                }}</small
              >
            </div>

            <!-- Email -->
            <div class="field">
              <div class="p-float-label">
                <InputText
                  id="email"
                  type="text"
                  v-model="form.email"
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                  :disabled="habilitarEdicionpassword()"
                />
                <label
                  for="email"
                  :class="{ 'p-error': v$.email.$invalid && submitted }"
                  >Nombre usuario</label
                >
              </div>
              <small
                v-if="
                  (v$.email.$invalid && submitted) ||
                  v$.email.$pending.$response
                "
                class="p-error"
                >{{
                  v$.email.required.$message.replace("Value", "Usuario")
                }}</small
              >
            </div>

            <!-- Password -->
            <div class="field">
              <div class="p-float-label">
                <InputText
                  id="email"
                  type="text"
                  v-model="form.password"
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                  :disabled="habilitarEdicionpassword()"
                />
                <label
                  for="password"
                  :class="{ 'p-error': v$.password.$invalid && submitted }"
                  >Contraseña</label
                >
              </div>
              <small
                v-if="
                  (v$.password.$invalid && submitted) ||
                  v$.password.$pending.$response
                "
                class="p-error"
                >{{
                  v$.password.required.$message.replace("Value", "Contraseña")
                }}</small
              >
            </div>

            <!-- Confirmar password -->
            <div class="field">
              <div class="p-float-label">
                <InputText
                  id="email"
                  type="text"
                  v-model="form.cpassword"
                  style="width: 100%"
                  :class="{ 'p-invalid': v$.cpassword.$invalid && submitted }"
                  :disabled="habilitarEdicionpassword()"
                />
                <label
                  for="cpassword"
                  :class="{ 'p-error': v$.cpassword.$invalid && submitted }"
                  >Confirmar contraseña</label
                >
              </div>
              <small
                v-if="
                  (v$.cpassword.$invalid && submitted) ||
                  v$.cpassword.$pending.$response
                "
                class="p-error"
                >{{
                  v$.cpassword.required.$message.replace("Value", "Usuario")
                }}</small
              >
            </div>
          </form>

          <!-- <el-form
          label-width="150px"
          ref="form"
          :model="form"
          :rules="rules"
          status-icon
        >
          <el-form-item label="Nombre" prop="nombre">
            <el-input
              v-model="form.nombre"
              :disabled="habilitarEdicionNombre()"
            />
          </el-form-item>

          <el-form-item label="Email" prop="email">
            <el-input
              v-model="form.email"
              :disabled="habilitarEdicionEmail()"
            />
          </el-form-item>

          <el-form-item label="Contraseña" prop="password">
            <el-input
              v-model="form.password"
              :disabled="habilitarEdicionpassword()"
              type="password"
            />
          </el-form-item>

          <el-form-item label="Repetir contraseña" prop="cpassword">
            <el-input
              v-model="form.cpassword"
              :disabled="habilitarEdicioncpassword()"
              type="password"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              class="btnEnviar"
              type="primary"
              @click="onSubmit()"
              :disabled="deshabilitarBtnGuardarDatos()"
            >
              Guardar datos
            </el-button>
          </el-form-item>
        </el-form> -->
        </div>
      </template>

      <template #footer>
        <Button
          label="Guardar"
          type="submit"
          icon="pi pi-check"
          autofocus
          @click="onSubmit()"
          :loading="loadingBtnGuardar"
        />
      </template>
    </Card>
  </main>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";

export default {
  setup: () => ({ v$: useVuelidate() }),

  data() {
    return {      
      id: null,
      datos: null,
      form: {
        nombre: null,
        apellido: null,
        email: null,
        password: null,
        cpassword: null,
      },
      habilitarEdicion: false,

      rules: {
        nombre: [
          {
            required: true,
            message: "Por favor ingrese su mail.",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            message: "Por favor ingrese su mail.",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "Por favor ingrese su contraseña.",
            trigger: "change",
          },
        ],
        cpassword: [
          {
            required: true,
            message: "Por favor repita la contraseña.",
            trigger: "change",
          },
        ],
      },
    };
  },

  validations() {
    return {
      nombre: {
        required: helpers.withMessage("El nombre es requerido", required),
        // email,
      },
      apellido: {
        required: helpers.withMessage("El apellido es requerido", required),
      },
      email: {
        required: helpers.withMessage(
          "El nombre de usuario es requerido",
          required
        ),
      },
      password: {
        required: helpers.withMessage("La contraseña es requerida", required),
      },
      cpassword: {
        required: helpers.withMessage(
          "Se debe confirmar la contraseña",
          required
        ),
      },
    };
  },

  created() {
    this.getDatosMiCuenta();
  },

  methods: {
    async getDatosMiCuenta() {
      // console.log(this.store.state.user.name)
      // console.log("created");
      // console.log(this.$store.state.user);
      // this.form.nombre = this.$store.state.user.name;
      // this.form.email = this.$store.state.user.email;

      this.id = this.$store.state.user.id;
      console.log("this.id");
      console.log(this.id);

      await this.axios.get("/api/usuario/obtenerDatos/" + this.id)
          .then(response => {
            if (response.data.code == 200) {
              console.log("response.data.data");
              console.log(response.data.data);
              this.datos = response.data.data

              this.form.nombre = response.data.data.nombre
              this.form.apellido = response.data.data.apellido
              this.form.email = response.data.data.email
            }
          })
    },

    

    async onSubmit() {
      console.log("guadarDatos");
      let params = {
        id: this.id,
        nombre: this.form.nombre,
        email: this.form.email,
      };

      if (this.form.password != null) {
        params.password = this.form.password;
      } else {
        params.password = null;
      }

      if (this.form.cpassword != null) {
        params.cpassword = this.form.cpassword;
      } else {
        params.cpassword = null;
      }

      const respuestaApi = await this.axios.put(
        "/api/usuario/actualizar/" + this.id,
        params
      );

      if (respuestaApi.data.code == 200) {
        // ElMessage({
        //   type: "success",
        //   message: "¡Datos de la cuenta modificados con éxito!",
        // });
        this.$toast.add({
          severity: "success",
          summary: "Mensaje de confirmación",
          detail: "Datos de la cuenta modificados con éxito",
          life: 3000,
        });
        this.$emit("actualizarTabla");
        this.logout();
      } else {
        if (respuestaApi.data.code == 400) {
          let erroresMostrar = "// ";
          let erorres = Object.values(respuestaApi.data.data);

          erorres.forEach((elemento) => {
            erroresMostrar = erroresMostrar + " " + elemento + " //";
          });

          // ElMessage({
          //   type: "error",
          //   grouping: true,
          //   message: erroresMostrar,
          //   duration: 5000,
          // });

          this.$toast.add({
            severity: "error",
            summary: "Se ha producido un error",
            detail: erroresMostrar,
            life: 5000,
          });
        }
      }
    },

    async logout() {
      await this.$store.dispatch("logout");
      // redirect
      return this.$router.replace("/login");
    },

    deshabilitarBtnGuardarDatos() {
      if (
        this.form.nombre == null ||
        this.form.nombre == "" ||
        this.form.email == null ||
        this.form.email == "" ||
        this.habilitarEdicion == false
      ) {
        return true;
      } else {
        return false;
      }
    },

    habilitarEdicionNombre() {
      if (this.habilitarEdicion == false) {
        return true;
      } else {
        return false;
      }
    },

    habilitarEdicionEmail() {
      if (this.habilitarEdicion == false) {
        return true;
      } else {
        return false;
      }
    },
    habilitarEdicionpassword() {
      if (this.habilitarEdicion == false) {
        return true;
      } else {
        return false;
      }
    },
    habilitarEdicioncpassword() {
      if (this.habilitarEdicion == false) {
        return true;
      } else {
        return false;
      }
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
      this.form.nombre = null;
      this.form.apellido = null;
      this.form.email = null;
      this.form.password = null;
      this.form.cpassword = null;
      this.submitted = false;
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
