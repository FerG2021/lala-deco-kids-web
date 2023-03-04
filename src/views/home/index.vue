<template>
  <main class="home-page">
    <Card>
      <!-- <template #title> Home </template> -->
      <template #content>
        <!-- PRIMERA FILA -->
        <div class="card">
          <div class="flex">
            <Card class="card-home" @click="$router.replace('/usuarios')">
              <template #title>
                <h2 style="text-align: center">Administración</h2>
              </template>
              <template #content>
                <div style="display: flex">
                  <div style="margin: auto">
                    <i class="pi pi-user" style="font-size: 80px"></i>
                  </div>
                </div>
              </template>
            </Card>

            <Divider layout="vertical" />

            <Card class="card-home" @click="$router.replace('/productos')">
              <template #title>
                <h2 style="text-align: center">Productos</h2>
              </template>

              <template #content>
                <div style="display: flex">
                  <div style="margin: auto">
                    <i class="pi pi-box" style="font-size: 80px"></i>
                  </div>
                </div>
              </template>
            </Card>

            <Divider layout="vertical" />

            <Card class="card-home">
              <template #title>
                <h2 style="text-align: center">Ventas</h2>
              </template>

              <template #content>
                <div style="display: flex">
                  <div style="margin: auto">
                    <i class="pi pi-shopping-cart" style="font-size: 80px"></i>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>

        <Divider />

        <div class="card">
          <div class="flex">
            <Card class="card-home">
              <template #title>
                <h2 style="text-align: center">Presupuestos</h2>
              </template>
              <template #content>
                <div style="display: flex">
                  <div style="margin: auto">
                    <i class="pi pi-file" style="font-size: 80px"></i>
                  </div>
                </div>
              </template>
            </Card>

            <Divider layout="vertical" />

            <Card class="card-home">
              <template #title>
                <h2 style="text-align: center">Clientes</h2>
              </template>

              <template #content>
                <div style="display: flex">
                  <div style="margin: auto">
                    <i class="pi pi-users" style="font-size: 80px"></i>
                  </div>
                </div>
              </template>
            </Card>

            <Divider layout="vertical" />

            <Card class="card-home">
              <template #title>
                <h2 style="text-align: center">Cuenta corriente</h2>
              </template>

              <template #content>
                <div style="display: flex">
                  <div style="margin: auto">
                    <i class="pi pi-credit-card" style="font-size: 80px"></i>
                  </div>
                </div>
              </template>
            </Card>
          </div>
        </div>
      </template>
    </Card>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    algo() {
      console.log("algo");
    },
  },
};
</script>

<style>
* {
  font-family: "Poppins", sans-serif;
}

.card-home {
  width: 33%;
  /* height: 15rem !important; */
  transition: 0.3s !important;
}

.card-home:hover {
  /* width: 35% !important;
    height: 16rem !important; */
  background-color: #d8d8d8;
  cursor: pointer;
}
</style>
