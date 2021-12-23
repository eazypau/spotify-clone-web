<template>
  <div class="flex">
    <div class="sideBar flex flex-col w-60 p-3 bg-black">
      <div class="w-40 p-3">
        <img src="/Spotify_Logo_RGB_White.png" alt="spotify text" />
      </div>
      <div class="mt-3 flex flex-col">
        <button
          class="
            pl-3
            py-2
            flex
            items-center
            bg-lightdark bg-opacity-40
            text-white
            rounded-sm
            hover:text-white
          "
        >
          <i class="bi bi-house-door-fill text-xl mr-4"></i>
          <p class="font-bold text-sm">Home</p>
        </button>
        <button class="pl-3 py-2 flex items-center text-gray-400 hover:text-white">
          <i class="bi bi-search text-xl mr-4"></i>
          <p class="font-bold text-sm">Search</p>
        </button>
        <button class="pl-3 py-2 flex items-center text-gray-400 hover:text-white">
          <i class="bi bi-bar-chart-fill text-xl mr-4"></i>
          <p class="font-bold text-sm">My Library</p>
        </button>
      </div>
      <div class="mt-5">
        <button class="pl-3 py-2 flex items-center text-gray-400 hover:text-white">
          <i class="bi bi-plus-square-fill text-xl mr-4"></i>
          <p class="font-bold text-sm">Create Playlist</p>
        </button>
        <button class="pl-3 py-2 flex items-center text-gray-400 hover:text-white">
          <i
            class="
              bi bi-heart-fill
              text-sm
              rounded-sm
              bg-gradient-to-tl
              from-gray-400
              to-indigo-600
              px-1
              mr-4
            "
          ></i>
          <!-- <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 bg-gradient-to-tl from-gray-400 to-indigo-600 p-1 mr-4"
            viewBox="0 0 150 150"
            fill="none"
          >
            <path
              d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z"
              fill="#535353"
            />
          </svg> -->
          <p class="font-bold text-sm">Liked Songs</p>
        </button>
        <!-- <div class="px-3 mt-3 mb-3">
          <hr />
        </div> -->
        <div class="h-px w-48 bg-lightdark ml-3 my-3 pl-3"></div>
      </div>
      <div class="overflow-y-scroll">
        <div v-for="(item, index) in playlists" :key="index">
          <button
            class="text-gray-400 text-sm text-left pl-3 py-1 hover:text-white"
            @click="changePlaylist(item.id)"
          >
            {{ item.name }}
          </button>
          <!-- <p class="text-gray-400 pl-3 py-1">{{ item.name }}</p> -->
        </div>
      </div>
    </div>
    <div class="flex-grow header overflow-y-scroll">
      <!-- Header -->
      <div class="h-16 w-full px-5 top-0 flex items-center justify-between">
        <div class="flex justify-between items-center pl-3">
          <button class="rounded-full bg-black bg-opacity-80 chevronPadding">
            <i class="bi bi-chevron-left text-white" style="font-size: 18px"></i>
          </button>
          <button class="rounded-full bg-black bg-opacity-80 ml-5 chevronPadding">
            <i class="bi bi-chevron-right text-white" style="font-size: 18px"></i>
          </button>
        </div>
        <button
          class="
            rounded-full
            flex
            items-center
            bg-black
            px-1
            py-1
            bg-opacity-70
            hover:bg-opacity-50
          "
          @click="!show ? (show = true) : (show = false)"
        >
          <div>
            <img class="w-6 rounded-full" :src="user.images[0].url ? user.images[0].url : ''" />
          </div>
          <p class="text-white text-sm font-bold ml-2">
            {{ user.display_name }}
          </p>
          <i class="bi bi-caret-down-fill p-1 text-white text-sm ml-2 pr-2"></i>
        </button>
        <div
          v-if="show"
          class="absolute right-6 top-16 w-52 bg-black bg-opacity-60 rounded-md"
          style="padding: 3px"
        >
          <!-- Dropdown here -->
          <div class="flex flex-col items-stretch text-white text-sm">
            <button
              class="py-3 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-sm text-left"
            >
              Account
            </button>
            <button
              class="py-3 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-sm text-left"
            >
              Profile
            </button>
            <button
              class="py-3 px-3 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-sm text-left"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <!-- playlist template -->
      <div class="py-6 h-full">
        <div class="flex items-end px-7 pb-5">
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
            <button class="hover:scale-110 transform transition duration-300 ease-in-out">
              <i class="bi bi-play-circle-fill text-green text-5xl"></i>
            </button>
          </div>
          <div>
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
              <tbody v-for="(item, index) in currentPlaylistTracks.items" :key="index">
                <tr class="my-10 bg-gray-400 bg-opacity-0 hover:bg-opacity-10">
                  <td class="py-4 text-center">
                    <button v-if="item.hovered">
                      <i class="bi bi-play-fill"></i>
                    </button>
                    <span v-if="!item.hovered">{{ index + 1 }}</span>
                  </td>
                  <td class="text-left">{{ item.track.name }}</td>
                  <td class="text-left w-3/12 truncate pr-5">{{ item.track.album.name }}</td>
                  <!-- <td class="text-left">{{ item.dateAdded ? item.dateAdded : ''}}</td> -->
                  <td class="text-left">
                    {{ convertTime(item.track.duration_ms / 1000) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        bg-dark
        fixed
        bottom-0
        footer
        w-screen
        flex
        items-center
        justify-between
        px-5
        border-top-2 border-white
      "
    >
      <!-- Footer Play bar -->
      <div class="flex items-center">
        <div>
          <img class="w-14 h-14" :src="currentTrack.item.album.images[0].url" alt="" />
        </div>
        <div class="ml-3">
          <p class="text-gray-400 text-sm">{{ currentTrack.item.name }}</p>
          <p class="text-gray-400 text-xs">{{ currentTrack.item.artists[0].name }}</p>
        </div>
        <div class="text-gray-400 ml-5">
          <button class="pt-1 cursor-not-allowed" disabled>
            <abbr title="Save to your library">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" fill="none" class="w-5">
                <path
                  d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z"
                  fill="#535353"
                />
              </svg>
            </abbr>
          </button>
        </div>
        <div class="text-gray-400 ml-4">
          <button disabled class="cursor-not-allowed">
            <abbr title="Remove">
              <i class="bi bi-slash-circle"></i>
            </abbr>
          </button>
        </div>
      </div>
      <div class="w-2/6 flex flex-col items-center justify-center">
        <!-- Play bar -->
        <div class="text-white w-2/6 flex justify-between items-center">
          <button :class="active ? 'text-green' : ''">
            <i class="bi bi-shuffle"></i>
          </button>
          <button @click="store.dispatch('skipToPrevTrack')">
            <i class="bi bi-skip-start-fill"></i>
          </button>
          <button>
            <i
              v-if="!playBackState.is_playing"
              class="bi bi-play-circle-fill text-3xl"
              @click="play"
            ></i>
            <i v-else class="bi bi-pause-circle-fill text-3xl" @click="pause"></i>
          </button>
          <button>
            <i class="bi bi-skip-end-fill" @click="store.dispatch('skipToNextTrack')"></i>
          </button>
          <button>
            <i class="bi bi-arrow-repeat"></i>
          </button>
        </div>
      </div>
      <div class="flex items-center">
        <!-- Volume and other utilities bar -->
        <i class="bi bi-volume-up-fill text-xl text-white mr-2"></i>
        <input
          type="range"
          v-model="currentVolume"
          @change="store.dispatch('setNewVolume')"
          class="max-w-md h-1 slider"
          min="0"
          max="100"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import { computed, ref } from "@vue/reactivity";
  import { onBeforeMount } from "@vue/runtime-core";
  import { useStore } from "vuex";

  const store = useStore();
  let show = ref(false);

  store.dispatch("fetchUserToken");
  await store.dispatch("fetchCurrentUser");
  await store.dispatch("fetchUserPlaylist");
  await store.dispatch("fetchCurrentPlayback");
  await store.dispatch("fetchCurrentPlaylist", "37i9dQZF1EUMDoJuT8yJsl");
  await store.dispatch("fetchPlaylistTracks", "37i9dQZF1EUMDoJuT8yJsl");
  await store.dispatch("fetchCurrentPlayingTrack");
  store.dispatch("setNewVolume");

  const user = computed(() => {
    if (!store.getters.getCurrentUser) {
      return {
        display_name: "string",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
            height: 300,
            width: 300,
          },
        ],
      };
    }
    return store.getters.getCurrentUser;
  });
  const currentList = computed(() => {
    return store.getters.getCurrentPlaylist;
  });
  const currentPlaylistTracks = computed(() => {
    return store.getters.getCurrentPlaylistTracks;
  });
  const playlists = computed(() => {
    return store.getters.getUserPlaylist;
  });
  const active = computed(() => {
    return store.getters.getShuffleState;
  });
  const playBackState = computed(() => {
    return store.getters.getCurrentPlayBackState;
  });
  const currentTrack = computed(() => {
    return store.getters.getMyCurrentPlayingTrack;
  });
  const currentVolume = computed({
    get() {
      return store.getters.getVolume;
    },
    set(payload) {
      store.commit("setVolume", payload);
    },
  });

  const convertTime = (time) => {
    // * from https://code.labstack.com/HVdZZYqH
    // * ~~ converts the following into integer (https://stackoverflow.com/questions/32607970/what-is-in-javascript)
    // var hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

    let ret = "";
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  const changePlaylist = (playlistId) => {
    store.commit("setNextPlaylistId", playlistId);
    store.dispatch("fetchNextPlaylistAndTracks");
  };

  const play = () => {
    store.state.currentPlaybackState.is_playing = true;
    store.dispatch("playMusic");
  };

  const pause = () => {
    store.state.currentPlaybackState.is_playing = false;
    store.dispatch("pauseMusic");
  };

  setInterval(() => {
    store.dispatch("fetchCurrentPlayingTrack");
  }, 5000);
</script>
<style scoped>
  .sideBar {
    height: 90vh;
  }
  .footer {
    height: 10vh;
  }
  .chevronPadding {
    padding: 3px 8px 4px 8px;
  }
  .header {
    background: linear-gradient(#3e3b39, #0b090a);
    height: 90vh;
  }
  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 5px; /* Set a specific slider handle width */
    height: 5px; /* Slider handle height */
    background: #04aa6d; /* Green background */
    cursor: pointer; /* Cursor on hover */
  }
</style>
