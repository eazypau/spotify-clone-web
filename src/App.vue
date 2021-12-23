<template>
  <div>
    <router-view v-slot="{ Component }">
      <suspense>
        <component :is="Component" />
      </suspense>
    </router-view>
  </div>
</template>

<script setup></script>

<style>
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #000000;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
</style>
