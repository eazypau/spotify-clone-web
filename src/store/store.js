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
    currentlyPlaying: {},
    volume: 50,
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
    setVolume(state, newVolume) {
      state.volume = newVolume;
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
    getCurrentPlayBackState: (state) => {
      return state.currentPlaybackState;
    },
    getMyCurrentPlayingTrack: (state) => {
      return state.currentlyPlaying;
    },
    getVolume: (state) => {
      return state.volume;
    },
  },
  actions: {
    fetchUserToken({ commit, state }) {
      //   const spotifyApi = new SpotifyWebApi();
      const hash = window.location.hash.substring(1).split("&");
      const fullAccessToken = hash[0].split("=");
      const token = fullAccessToken[1];
      commit("setUserToken", token);
      spotifyApi.setAccessToken(state.spotifyToken);
      // console.log("Successfully set token for spotify...");
    },
    async fetchCurrentUser({ commit }) {
      try {
        const response = await spotifyApi.getMe();
        // console.log(response);
        commit("setCurrentUser", response);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserPlaylist({ commit }) {
      try {
        const response = await spotifyApi.getUserPlaylists();
        // console.log(response.items);
        commit("setUserPlaylist", response.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCurrentPlaylist({ commit }, id) {
      try {
        const response = await spotifyApi.getPlaylist(id);
        // console.log(response);
        commit("setCurrentPlaylist", response);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchNextPlaylistAndTracks({ commit, state }) {
      try {
        const response = await spotifyApi.getPlaylist(state.currentPlaylistId);
        // console.log(response);
        const getTracks = await spotifyApi.getPlaylistTracks(state.currentPlaylistId);
        // console.log(getTracks);
        commit("setCurrentPlaylist", response);
        commit("setCurrentPlaylistTracks", getTracks);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCurrentPlayback({ commit }) {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState();
        // console.log(response);
        commit("setCurrentPlaybackState", response);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPlaylistTracks({ commit }, id) {
      try {
        const response = await spotifyApi.getPlaylistTracks(id);
        // console.log(response);
        commit("setCurrentPlaylistTracks", response);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCurrentPlayingTrack({ commit }) {
      try {
        const response = await spotifyApi.getMyCurrentPlayingTrack();
        // console.log(response);
        commit("setCurrentlyPlaying", response);
      } catch (error) {
        console.log(error);
      }
    },
    playMusic() {
      try {
        spotifyApi.play();
      } catch (error) {
        console.log(error);
      }
    },
    pauseMusic() {
      try {
        spotifyApi.pause();
      } catch (error) {
        console.log(error);
      }
    },
    async skipToNextTrack({ dispatch }) {
      try {
        await spotifyApi.skipToNext();
        setTimeout(async () => {
          await dispatch("fetchCurrentPlayingTrack");
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },
    async skipToPrevTrack({ dispatch }) {
      try {
        await spotifyApi.skipToPrevious();
        setTimeout(async () => {
          await dispatch("fetchCurrentPlayingTrack");
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },
    async setNewVolume({ state }) {
      try {
        spotifyApi.setVolume(state.volume);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
