<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
      <img src="../assets/buhov.png" alt="Vue" />
    </div>

    <!-- items del menu -->
    <!-- <div class="menu-toggle-wrap" v-if="tipoUsuario == 1"> -->
    <div class="menu-toggle-wrap">
      <button class="menu-toggle">
        <span class="material-icons" @click="toggleMenu()">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <h3 style="color: #fff">MENU</h3>
    <div class="menu">
      <!-- Home -->
      <!-- <div v-if="tipoUsuario == 1"> -->
      <router-link class="button" to="/" v-if="is_expanded">
        <i class="pi pi-home material-icons"></i>
        <span class="text">Home</span>
      </router-link>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Home"
        placement="right-start"
        v-if="!is_expanded"
      >
        <router-link class="button" to="/" v-if="!is_expanded || is_expanded">
          <i class="pi pi-home material-icons"></i>
          <span class="text">Home</span>
        </router-link>
      </el-tooltip>
      <!-- </div> -->

      <!-- Usuarios -->
      <!-- <div v-if="tipoUsuario == 1"> -->
      <router-link class="button" to="/usuarios" v-if="is_expanded">
        <i class="pi pi-user-plus material-icons"></i>
        <span class="text">Usuarios</span>
      </router-link>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Usuarios"
        placement="right-start"
        v-if="!is_expanded"
      >
        <router-link
          class="button"
          to="/usuarios"
          v-if="!is_expanded || is_expanded"
        >
          <i class="pi pi-user-plus material-icons"></i>
          <span class="text">Usuarios</span>
        </router-link>
      </el-tooltip>
      <!-- </div> -->

      <!-- Productos -->
      <!-- <div v-if="tipoUsuario == 1"> -->
      <router-link class="button" to="/productos" v-if="is_expanded">
        <i class="pi pi-box material-icons"></i>
        <span class="text">Productos</span>
      </router-link>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Productos"
        placement="right-start"
        v-if="!is_expanded"
      >
        <router-link
          class="button"
          to="/productos"
          v-if="!is_expanded || is_expanded"
        >
          <i class="pi pi-box material-icons"></i>
          <span class="text">Productos</span>
        </router-link>
      </el-tooltip>
      <!-- </div> -->

      <!--  -->
      <!-- Codigo de barras -->
      <!--  -->
      <!-- <router-link class="button" to="/codigobarras" v-if="is_expanded">
          <i class="pi pi-qrcode material-icons"></i>
          <span class="text">Código de barras</span>
        </router-link>   

        <el-tooltip
          class="box-item"
          effect="dark"
          content="Código de barras"
          placement="right-start"
          v-if="!is_expanded"
        >
          <router-link class="button" to="/codigobarras" v-if="!is_expanded || is_expanded">
            <i class="pi pi-qrcode material-icons"></i>
            <span class="text"></span>
          </router-link> 
        </el-tooltip> -->

      <!--  -->
      <!-- VENTAS -->
      <!--  -->
      <router-link class="button" to="/ventas" v-if="is_expanded">
        <i class="pi pi-shopping-cart material-icons"></i>
        <span class="text">Ventas</span>
      </router-link>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Ventas"
        placement="right-start"
        v-if="!is_expanded"
      >
        <router-link
          class="button"
          to="/ventas"
          v-if="!is_expanded || is_expanded"
        >
          <i class="pi pi-shopping-cart material-icons"></i>
          <span class="text">Ventas</span>
        </router-link>
      </el-tooltip>

      <!--  -->
      <!-- CUENTAS CORRIENTES -->
      <!--  -->
      <router-link class="button" to="/cuentacorriente" v-if="is_expanded">
        <i class="pi pi-wallet material-icons"></i>
        <span class="text">Cuentas corrientes</span>
      </router-link>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Cuentas corrientes"
        placement="right-start"
        v-if="!is_expanded"
      >
        <router-link
          class="button"
          to="/cuentacorriente"
          v-if="!is_expanded || is_expanded"
        >
          <i class="pi pi-wallet material-icons"></i>
          <span class="text">Cuentas</span>
        </router-link>
      </el-tooltip>

      <!--  -->
      <!-- CLIENTES -->
      <!--  -->
      <router-link class="button" to="/clientes" v-if="is_expanded">
        <i class="pi pi-users material-icons"></i>
        <span class="text">Clientes</span>
      </router-link>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Clientes"
        placement="right-start"
        v-if="!is_expanded"
      >
        <router-link
          class="button"
          to="/clientes"
          v-if="!is_expanded || is_expanded"
        >
          <i class="pi pi-users material-icons"></i>
          <span class="text">Clientes</span>
        </router-link>
      </el-tooltip>
    </div>

    <div class="flex"></div>

    <!-- Mi cuenta -->
    <!-- <div class="menu" v-if="tipoUsuario == 1"> -->
    <div class="menu">
      <div>
        <router-link class="button" to="/mi-cuenta" v-if="is_expanded">
          <!-- <span class="material-icons">account_circle</span> -->
          <i class="pi pi-user material-icons"></i>

          <span class="text">{{ $store.state.user.name }}</span>
        </router-link>

        <el-tooltip
          class="box-item"
          effect="dark"
          content="Mi cuenta"
          placement="right-start"
          v-if="!is_expanded"
        >
          <router-link
            class="button"
            to="/mi-cuenta"
            v-if="!is_expanded || is_expanded"
          >
            <!-- <span class="material-icons">account_circle</span> -->
            <i class="pi pi-user material-icons"></i>

            <span class="text">{{ $store.state.user.name }}</span>
          </router-link>
        </el-tooltip>
      </div>

      <!-- <div class="button logout" v-if="is_expanded">
        <span class="material-icons" @click="logout()">account_circle</span>
        <span class="text">{{  $store.state.user.name }}</span>
      </div>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Usuario"
        placement="right-start"
        v-if="!is_expanded"
      >
        <div class="button logout"  v-if="!is_expanded">
          <span class="material-icons" @click="logout()">account_circle</span>
          <span class="text">{{  $store.state.user.name }}</span>
        </div>
      </el-tooltip> -->

      <!-- Logout -->
      <div class="button logout" v-if="is_expanded">
        <!-- <span class="material-icons" @click="logout()">logout</span> -->
        <span @click="logout()">
          <i class="pi pi-sign-out material-icons"></i>
        </span>

        <span class="text">Salir</span>
      </div>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="Salir"
        placement="right-start"
        v-if="!is_expanded"
      >
        <div class="button logout" v-if="!is_expanded">
          <!-- <span class="material-icons" @click="logout()">logout</span> -->
          <span @click="logout()">
            <i class="pi pi-sign-out material-icons"></i>
          </span>
          <span class="text">Salir</span>
        </div>
      </el-tooltip>

      <!-- Configuracion -->
      <!-- <router-link class="button" to="/configuracion" v-if="is_expanded">
          <span class="material-icons">settings</span>
          <span class="text">Configuración</span>
      </router-link>  
      
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Configuración"
        placement="right-start"
        v-if="!is_expanded"
      >
        <router-link class="button" to="/configuracion" v-if="!is_expanded || is_expanded">
          <span class="material-icons">settings</span>
          <span class="text">Configuración</span>
        </router-link>  
      </el-tooltip> -->
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";

const is_expanded = ref(false);
const tipoUsuario = localStorage.getItem("tipoUsuario");

// const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const toggleMenu = () => {
  is_expanded.value = !is_expanded.value;

  // localStorage.setItem("is_expanded", is_expanded.value)
  // console.log("entra");
};
</script>

<script>
export default {
  created() {
    this.ver();
  },

  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      // redirect
      return this.$router.replace("/login");
    },

    ver() {
      console.log("tipo");
      console.log(localStorage.getItem("tipoUsuario"));
      // this.tipoUsuario = localStorage.getItem("tipoUsuario")
      // console.log("tipo");
      // console.log(tipoUsuario);
    },
  },
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  top: 0;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  // color sidebar
  // background-color: var(--dark);
  background-color: var(--primaryLalaHover);

  color: var(--light);

  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
      height: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary-complementary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 1.8rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover,
      &.router-link-exact-active {
        background-color: var(--dark-Lala);

        .material-icons,
        .text {
          color: var(--primary-complementary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary-complementary);
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    h3 {
      color: var(--grey);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }

  .logout {
    cursor: pointer;
  }
}
</style>
