import { createStore } from "vuex";
import { spotifyApi } from "../api/spotify";

export const store = createStore({
  state: {
    spotifyToken: "",
    listOfPlaylist: null,
    currentPlaylist: null,
    currentUser: null,
    currentPlaylistTracks: null,
    currentPlaylistId: "",
    playState: false,
    currentPlaybackState: null,
    repeatState: null,
    shuffleState: null,
    currentlyPlaying: null,
  },
  mutations: {
    setUserToken(state, token) {
      state.spotifyToken = token;
    },
    setUserPlaylist(state, playlists) {
      state.listOfPlaylist = playlists;
    },
    setCurrentPlaylist(state, currentPlaylist) {
      state.currentPlaylist = currentPlaylist;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setCurrentPlaylistTracks(state, tracks) {
      state.currentPlaylistTracks = tracks;
    },
    setNextPlaylistId(state, id) {
      state.currentPlaylistId = id;
    },
    setCurrentPlaybackState(state, status) {
      state.currentPlaybackState = status;
    },
    setPlayState(state, status) {
      state.playState = status;
    },
    setRepeatState(state, status) {
      state.repeatState = status;
    },
    setShuffleState(state, status) {
      state.shuffleState = status;
    },
    setCurrentlyPlaying(state, item) {
      state.currentlyPlaying = item;
    },
  },
  getters: {
    getUserPlaylist: (state) => {
      return state.listOfPlaylist;
    },
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    getShuffleState: (state) => {
      return state.shuffleState;
    },
    getCurrentPlaylist: (state) => {
      return state.currentPlaylist;
    },
    getCurrentPlaylistTracks: (state) => {
      return state.currentPlaylistTracks;
    },
  },
  actions: {
    fetchUserToken({ commit, state }) {
      //   const spotifyApi = new SpotifyWebApi();
      const hash = window.location.hash.substring(1).split("&");

      const fullAccessToken = hash[0].split("=");
      const token = fullAccessToken[1];
      console.log(token);

      // console.log(`The current hash is ${hash[0]}`);
      // console.log(`The current hash is ${fullAccessToken}`);
      //   console.log(`Current token is ${token}`);

      commit("setUserToken", token);
      spotifyApi.setAccessToken(state.spotifyToken);
      console.log("Successfully set token for spotify...");
    },
    fetchUserPlaylist({ commit, state }) {
      //   const spotifyApi = new SpotifyWebApi();
      spotifyApi.getUserPlaylists().then(
        function (data) {
          commit("setUserPlaylist", data.items);
          //   console.log("User playlists", data);
          console.log("List of playlists in state: ", state.listOfPlaylist);
          // console.log(data.items[0].description);
          console.log("Successfullly get user playlists...");
        },
        function (err) {
          console.error(err);
        }
      );
    },
    fetchCurrentPlaylist({ commit, state }) {
      //   const spotifyApi = new SpotifyWebApi();
      spotifyApi.getPlaylist("37i9dQZEVXcK8znD5QjojE").then(
        function (data) {
          commit("setCurrentPlaylist", data);
          console.log("Current playlists in state: ", state.currentPlaylist);
          // console.log(data.items[0].description);
        },
        function (err) {
          console.error(err);
        }
      );
    },
    fetchCurrentUserInfo({ commit, state }) {
      spotifyApi.getMe().then(
        function (user) {
          commit("setCurrentUser", user);
          console.log("Current user in state: ", state.currentUser);
          // console.log("List of playlists in state: ", state.currentUser);
          // console.log(data.items[0].description);
        },
        function (err) {
          console.error(err);
        }
      );
    },
    fetchNextPlaylistAndTracks({ commit, state }) {
      spotifyApi
        .getPlaylist(state.currentPlaylistId)
        .then((data) => {
          commit("setCurrentPlaylist", data);
          console.log("Current playlists in state: ", state.currentPlaylist);
        })
        .catch((err) => console.log(err));
      spotifyApi
        .getPlaylistTracks(state.currentPlaylistId)
        .then((data) => {
          commit("setCurrentPlaylistTracks", data.items);
          console.log("List of tracks in state: ", state.currentPlaylistTracks);
        })
        .catch((err) => console.log(err));
    },
    fetchCurrentPlayback({ commit, state }) {
      spotifyApi
        .getMyCurrentPlaybackState()
        .then((status) => {
          console.log("Current playback: ", status);
          commit("setCurrentPlaybackState", status);
          commit("setPlayState", status.is_playing);
          commit("setShuffleState", status.shuffle_state);
          commit("setRepeatState", status.repeat_state);
          console.log("shuffle state is ", state.shuffleState);
          console.log("Current playback state is ", state.currentPlaybackState);
        })
        .catch((err) => console.log(err));
    },
    fetchCurrentTrack({ commit, state }) {
      spotifyApi.getMyCurrentPlayingTrack().then((track) => {
        console.log("track is ", track);
        commit("setCurrentlyPlaying", track);
      });
    },
  },
});
