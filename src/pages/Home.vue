<template>
  <!-- playlist template -->
  <div class="py-6 h-full">
    <div class="flex items-end px-7 pb-5">
      <!-- Playlist header -->
      <div class="w-60">
        <img :src="currentList.images[0].url" alt="playlist image" />
      </div>
      <div class="ml-6 text-white">
        <div>
          <p class="uppercase text-sm font-bold">{{ currentList.type }}</p>
        </div>
        <div class="mb-7">
          <h1 class="text-8xl font-bold tracking-tighter">
            {{ currentList.name }}
          </h1>
        </div>
        <div>
          <p class="text-sm">{{ currentList.description }}</p>
        </div>
        <div class="text-sm">
          {{ user.display_name }} • {{ currentList.tracks.total }} songs
        </div>
      </div>
    </div>
    <div class="bg-dark px-7 py-5">
      <div>
        <!-- Playlist utility bar -->
        <button
          class="hover:scale-110 transform transition duration-300 ease-in-out"
        >
          <i class="bi bi-play-circle-fill text-green text-5xl"></i>
        </button>
      </div>
      <div>
        <!-- Playlist song table -->
        <table class="table-fixed font-normal w-full text-gray-400 my-3">
          <thead class="border-b-2 border-gray-500 border-opacity-40">
            <tr class="uppercase">
              <th class="py-2">#</th>
              <th class="w-6/12 text-left">title</th>
              <th class="w-3/12 text-left">album</th>
              <!-- <th class="w-2/12 text-left">date added</th> -->
              <th class="text-left">
                <i class="bi bi-clock"></i>
              </th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in currentPlaylistTracks" :key="index">
            <tr
              class="my-10 bg-white bg-opacity-0 hover:bg-opacity-10"
              @mouseover="playlistItems[index].hovered = true"
              @mouseout="playlistItems[index].hovered = false"
            >
              <td class="py-4 text-center">
                <button v-if="item.hovered">
                  <i class="bi bi-play-fill"></i>
                </button>
                <span v-if="!item.hovered">{{ index + 1 }}</span>
              </td>
              <td class="text-left">{{ item.track.name }}</td>
              <td class="text-left">{{ item.track.album.name }}</td>
              <!-- <td class="text-left">{{ item.dateAdded }}</td> -->
              <td class="text-left">
                {{ convertTime(item.track.duration_ms / 1000) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { spotifyApi } from "../api/spotify";
export default {
  // computed: {
  //   user() {
  //     return this.$store.getters.getCurrentUser;
  //   },
  //   currentList() {
  //     return this.$store.getters.getCurrentPlaylist;
  //   },
  //   currentPlaylistTracks() {
  //     return this.$store.getters.getCurrentPlaylistTracks;
  //   },
  // },
  methods: {
    convertTime(time) {
      // * from https://code.labstack.com/HVdZZYqH
      // * ~~ converts the following into integer (https://stackoverflow.com/questions/32607970/what-is-in-javascript)
      // var hrs = ~~(time / 3600);
      const mins = ~~((time % 3600) / 60);
      const secs = ~~time % 60;

      let ret = "";
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },
  },
  setup() {
    const store = useStore();

    spotifyApi.getPlaylist("37i9dQZEVXcK8znD5QjojE").then((data) => {
      store.commit("setCurrentPlaylist", data);
      console.log("Current playlists in state: ", store.state.currentPlaylist);
    });

    spotifyApi.getPlaylistTracks("37i9dQZEVXcK8znD5QjojE").then(
      function (data) {
        store.commit("setCurrentPlaylistTracks", data.items);
        // console.log("Current playlists tracks is", data.items);
        console.log(
          "List of tracks in state: ",
          store.state.currentPlaylistTracks
        );
        // console.log(data.items[0].description);
      },
      function (err) {
        console.error(err);
      }
    );

    const user = computed(() => {
      return store.state.currentUser;
    });
    const currentList = computed(() => {
      return store.state.currentPlaylist;
    });
    const currentPlaylistTracks = computed(() => {
      return store.state.currentPlaylistTracks;
    });

    return { store, user, currentList, currentPlaylistTracks };
  },
};
</script>

<style></style>
