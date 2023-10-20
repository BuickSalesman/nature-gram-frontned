<script>
import axios from "axios";
export default {
  data: function () {
    return {
      photos: [],
      newPhotoParams: {},
      editPhotoParams: {},
      currentPhoto: {},
    };
  },
  created: function () {
    this.indexPhotos();
  },
  methods: {
    indexPhotos: function () {
      axios.get("/photos.json").then((response) => {
        console.log("photos index", response);
        this.photos = response.data;
      });
    },

    createPhoto: function () {
      axios
        .post("/photos.json", this.newPhotoParams)
        .then((response) => {
          console.log("photos create", response);
          this.photos.push(response.data);
          this.newPhotoParams = {};
        })
        .catch((error) => {
          console.log("photos create error", error.response);
        });
    },
    showPhoto: function (photo) {
      this.currentPhoto = photo;
      this.editPhotoParams = photo;
      document.querySelector("#photo-details").showModal();
    },
    updatePhoto: function (photo) {
      console.log(photo, this.editPhotoParams);
      axios
        .patch("/photos/" + photo.id + ".json", this.editPhotoParams)
        .then((response) => {
          console.log("photos update", response);
          this.currentPhoto = {};
        })
        .catch((error) => {
          console.log("photos update error", error.response);
        });
    },
    destroyPhoto: function (photo) {
      axios.delete("/photos/" + photo.id + ".json").then((response) => {
        console.log("photos destroy", response);
        var index = this.photos.indexOf(photo);
        this.photos.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <div class="bg-pastel-green min-h-screen p-8">
      <h1 class="text-3xl text-white font-semibold mb-4">All Photos</h1>
      <div v-for="photo in photos" :key="photo.id" class="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h2 class="text-lg font-semibold text-gray-800">{{ photo.name }}</h2>
        <img :src="photo.url" :alt="photo.name" class="mt-2 w-full h-auto" />
        <p class="text-gray-600 mt-2">Width: {{ photo.width }}</p>
        <p class="text-gray-600">Height: {{ photo.height }}</p>
        <button
          @click="showPhoto(photo)"
          class="bg-pastel-green hover:bg-pastel-green-dark text-white font-medium py-2 px-4 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pastel-green-light"
        >
          More info
        </button>
      </div>
      <dialog id="photo-details" class="dialog">
        <form method="dialog">
          <h1 class="text-2xl text-pastel-green-dark mb-4">Photo info</h1>
          <p class="text-gray-800">
            Name:
            <input type="text" v-model="editPhotoParams.name" class="border rounded w-full p-2" />
          </p>
          <p class="text-gray-800">
            Width:
            <input type="text" v-model="editPhotoParams.width" class="border rounded w-full p-2" />
          </p>
          <p class="text-gray-800">
            Height:
            <input type="text" v-model="editPhotoParams.height" class="border rounded w-full p-2" />
          </p>
          <p class="text-gray-800">
            Url:
            <input type="text" v-model="editPhotoParams.url" class="border rounded w-full p-2" />
          </p>
          <button
            @click="updatePhoto(currentPhoto)"
            class="bg-pastel-green hover:bg-pastel-green-dark text-white font-medium py-2 px-4 mt-4 rounded-full focus:outline-none focus:ring-2 focus:ring-pastel-green-light"
          >
            Update
          </button>
          <button
            @click="destroyPhoto(currentPhoto)"
            class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 mt-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Destroy Photo
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 mt-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Close
          </button>
        </form>
      </dialog>
    </div>
  </div>
  <!-- Missing closing div -->
</template>

<style></style>
