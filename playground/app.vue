<template>
  <div>Nuxt module playground!</div>
</template>

<script setup lang="ts">
const heyo = useHeyo();

onMounted(() => {
  // wait 5 sec then console log and show heyo
  setTimeout(() => {
    console.log("showing heyo");
    heyo.show();
    setTimeout(() => {
      console.log("opening heyo");
      heyo.open();
    }, 1000);
  }, 5000);
});
</script>
