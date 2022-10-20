<template>
  <div>
    <Dialog v-model:visible="display">
      <template #header icon="pi pi-times">
        <h3>Modal de ejemplo</h3>
      </template>

      <!-- Content -->

      <DataTable :value="products" responsiveLayout="scroll">
        <template #header>
          <div class="table-header">
            <div style="display: flex">
              <div style="margin: right: auto">Products</div>
              <div style="margin-left: auto">
                <Button icon="pi pi-refresh" />
              </div>
            </div>
          </div>
        </template>

        <!-- <Column selectionMode="multiple" headerStyle="width: 3rem"></Column> -->
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column
          field="quantity"
          header="Quantity"
          style="text-align: center"
        ></Column>
      </DataTable>

      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" />
        <Button label="Yes" icon="pi pi-check" autofocus />
        <Button label="Toast" @click="showSuccess()"></Button>

        <Button label="Cerrar" @click="cerrar()"></Button>
      </template>
    </Dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      display: false,
      products: [
        {
          id: "1000",
          code: "f230fh0g3",
          name: "Bamboo Watch",
          description: "Product Description",
          image: "bamboo-watch.jpg",
          price: 65,
          category: "Accessories",
          quantity: 24,
          inventoryStatus: "INSTOCK",
          rating: 5,
          verified: false,
        },
        {
          id: "1001",
          code: "nvklal433",
          name: "Black Watch",
          description: "Product Description",
          image: "black-watch.jpg",
          price: 72,
          category: "Accessories",
          quantity: 61,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1002",
          code: "zz21cz3c1",
          name: "Blue Band",
          description: "Product Description",
          image: "blue-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1003",
          code: "244wgerg2",
          name: "Blue T-Shirt",
          description: "Product Description",
          image: "blue-t-shirt.jpg",
          price: 29,
          category: "Clothing",
          quantity: 25,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1004",
          code: "h456wer53",
          name: "Bracelet",
          description: "Product Description",
          image: "bracelet.jpg",
          price: 15,
          category: "Accessories",
          quantity: 73,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1005",
          code: "av2231fwg",
          name: "Brown Purse",
          description: "Product Description",
          image: "brown-purse.jpg",
          price: 120,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1006",
          code: "bib36pfvm",
          name: "Chakra Bracelet",
          description: "Product Description",
          image: "chakra-bracelet.jpg",
          price: 32,
          category: "Accessories",
          quantity: 5,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1007",
          code: "mbvjkgip5",
          name: "Galaxy Earrings",
          description: "Product Description",
          image: "galaxy-earrings.jpg",
          price: 34,
          category: "Accessories",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1008",
          code: "vbb124btr",
          name: "Game Controller",
          description: "Product Description",
          image: "game-controller.jpg",
          price: 99,
          category: "Electronics",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 4,
        },
        {
          id: "1009",
          code: "cm230f032",
          name: "Gaming Set",
          description: "Product Description",
          image: "gaming-set.jpg",
          price: 299,
          category: "Electronics",
          quantity: 63,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
      ],
    };
  },

  methods: {
    abrir() {
      this.display = true;
    },

    cerrar() {
      this.display = false;
    },

    showSuccess() {
      this.$toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Message Content",
        life: 3000,
      });
    },
  },
};
</script>

<style>
</style>