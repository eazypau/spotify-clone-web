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
        <button
          class="pl-3 py-2 flex items-center text-gray-400 hover:text-white"
        >
          <i class="bi bi-search text-xl mr-4"></i>
          <p class="font-bold text-sm">Search</p>
        </button>
        <button
          class="pl-3 py-2 flex items-center text-gray-400 hover:text-white"
        >
          <i class="bi bi-bar-chart-fill text-xl mr-4"></i>
          <p class="font-bold text-sm">My Library</p>
        </button>
      </div>
      <div class="mt-5">
        <button
          class="pl-3 py-2 flex items-center text-gray-400 hover:text-white"
        >
          <i class="bi bi-plus-square-fill text-xl mr-4"></i>
          <p class="font-bold text-sm">Create Playlist</p>
        </button>
        <button
          class="pl-3 py-2 flex items-center text-gray-400 hover:text-white"
        >
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
            <i
              class="bi bi-chevron-left text-white"
              style="font-size: 18px"
            ></i>
          </button>
          <button
            class="rounded-full bg-black bg-opacity-80 ml-5 chevronPadding"
          >
            <i
              class="bi bi-chevron-right text-white"
              style="font-size: 18px"
            ></i>
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
            <img class="w-6 rounded-full" :src="userHeader.images[0].url" />
          </div>
          <p class="text-white text-sm font-bold ml-2">
            {{ userHeader.display_name }}
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
              class="
                py-3
                px-3
                bg-white bg-opacity-0
                hover:bg-opacity-10
                rounded-sm
                text-left
              "
            >
              Account
            </button>
            <button
              class="
                py-3
                px-3
                bg-white bg-opacity-0
                hover:bg-opacity-10
                rounded-sm
                text-left
              "
            >
              Profile
            </button>
            <button
              class="
                py-3
                px-3
                bg-white bg-opacity-0
                hover:bg-opacity-10
                rounded-sm
                text-left
              "
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
      <!-- Content -->
      <router-view></router-view>
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
          <img class="w-14 h-14" src="" alt="" />
        </div>
        <div class="ml-3">
          <p class="text-gray-400 text-sm">Song Name</p>
          <p class="text-gray-400 text-xs">Artist</p>
        </div>
        <div class="text-gray-400 ml-5">
          <button class="pt-1 cursor-not-allowed" disabled>
            <abbr title="Save to your library">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 150 150"
                fill="none"
                class="w-5"
              >
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
          <button>
            <i class="bi bi-skip-start-fill"></i>
          </button>
          <button>
            <i
              v-if="!store.state.playState"
              class="bi bi-play-circle-fill text-3xl"
            ></i>
            <i v-else class="bi bi-pause-circle-fill text-3xl"></i>
          </button>
          <button>
            <i class="bi bi-skip-end-fill"></i>
          </button>
          <button>
            <i class="bi bi-arrow-repeat"></i>
          </button>
        </div>
      </div>
      <div class="flex items-center">
        <!-- Volume and other utilities bar -->
        <i class="bi bi-volume-up-fill text-xl text-white mr-2"></i>
        <input type="range" class="max-w-md h-1 slider" min="0" max="100" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { spotifyApi } from "../api/spotify";
import { useStore } from "vuex";

export default {
  methods: {
    changePlaylist(playlistId) {
      this.$store.commit("setNextPlaylistId", playlistId);
      this.$store.dispatch("fetchNextPlaylistAndTracks");
    },
  },
  setup() {
    const store = useStore();
    let show = ref(false);

    store.dispatch("fetchUserToken");
    // const hash = window.location.hash.substring(1).split("&");

    // const fullAccessToken = hash[0].split("=");
    // const token = fullAccessToken[1];
    // console.log(token);

    // store.commit("setUserToken", token);
    // spotifyApi.setAccessToken(token);
    // console.log("Successfully set token for spotify...");

    spotifyApi
      .getUserPlaylists()
      .then((data) => {
        store.commit("setUserPlaylist", data.items);
        console.log("List of playlists in state: ", store.state.listOfPlaylist);
      })
      .catch((err) => console.log(err));

    spotifyApi
      .getMe()
      .then((user) => {
        store.commit("setCurrentUser", user);
        console.log("Current user in state: ", store.state.currentUser);
      })
      .catch((err) => console.log(err));

    spotifyApi
      .getMyCurrentPlaybackState()
      .then((data) => {
        // console.log("Current playback: ", data);
        store.commit("setCurrentPlaybackState", data);
        store.commit("setPlayState", data.is_playing);
        store.commit("setShuffleState", data.shuffle_state);
        store.commit("setRepeatState", data.repeat_state);
        // console.log("shuffle state is ", state.shuffleState);
        console.log(
          "Current playback state is ",
          store.state.currentPlaybackState
        );
      })
      .catch((err) => console.log(err));
    // store.dispatch("fetchCurrentUserInfo");
    // store.dispatch("fetchUserPlaylist");
    // store.dispatch("fetchCurrentPlaylist");
    // store.dispatch("fetchCurrentPlayback");
    // store.dispatch("fetchCurrentTrack");

    const playlists = computed(() => {
      return store.state.listOfPlaylist;
    });
    const userHeader = computed(() => {
      return store.state.currentUser;
    });
    const active = computed(() => {
      return store.state.shuffleState;
    });

    return { show, store, playlists, userHeader, active };
  },
};
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
