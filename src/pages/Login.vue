<template>
  <div class="bg-black h-screen flex flex-col items-center justify-center">
    <div>
      <!-- Spotify logo -->
      <img class="w-56" src="/Spotify_Icon_RGB_Green.png" alt="spotify icon" />
    </div>
    <div class="mt-40">
      <!-- Login button -->
      <a
        class="
          text-lg
          font-semibold
          bg-green
          rounded-full
          active:border-green active:rounded-md
          hover:text-white
          cursor-pointer
          py-2
          px-6
        "
        :href="userDirect"
      >
        Login to Spotify
      </a>
    </div>
  </div>
</template>

<script>
import { accessUrl } from "../api/auth";
export default {
  data() {
    return {
      userDirect: accessUrl,
    };
  },
};
</script>
