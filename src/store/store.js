import { createStore } from "vuex";
// import { spotifyApi } from "../api/spotify";
import SpotifyWebApi from "spotify-web-api-js";

let spotifyApi = new SpotifyWebApi();

export const store = createStore({
  state: {
    spotifyToken: "",
    listOfPlaylist: [],
    currentPlaylist: {},
    currentUser: {},
    currentPlaylistTracks: [],
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
    async fetchCurrentUser({commit}) {
      try {
        const response = await spotifyApi.getMe()
        // console.log(response);
        commit("setCurrentUser", response)
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserPlaylist({ commit }) {
      try {
        const response  = await spotifyApi.getUserPlaylists()
        // console.log(response.items);
        commit("setUserPlaylist", response.items)
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCurrentPlaylist({ commit }, id) {
      try {
        const response = await spotifyApi.getPlaylist(id)
        // console.log(response);
        commit("setCurrentPlaylist", response)
      } catch (error) {
        console.log(error);
      }
    },
    async fetchNextPlaylistAndTracks({ commit, state }) {
      try {
        const response = await spotifyApi.getPlaylist(state.currentPlaylistId)
        // console.log(response);
        commit("setCurrentPlaylist", response)
        const getTracks = await spotifyApi.getPlaylistTracks(state.currentPlaylistId)
        // console.log(getTracks);
        commit("setCurrentPlaylistTracks", getTracks)
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCurrentPlayback({ commit }) {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState()
        console.log(response);
        commit("setCurrentPlaybackState", response)
      } catch (error) {
        console.log(error);
      }
    },
    fetchCurrentTracks({ commit }) {
      spotifyApi.getMyCurrentPlayingTrack().then((track) => {
        // console.log("track is ", track);
        commit("setCurrentlyPlaying", track);
      });
    },
    async fetchPlaylistTracks({commit}, id) {
      try {
        const response = await spotifyApi.getPlaylistTracks(id)
        console.log(response);
        commit("setCurrentPlaylistTracks", response.items)
      } catch (error) {
        console.log(error);
      }
    }
  },
});
