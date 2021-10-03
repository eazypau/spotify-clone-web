<template>
  <div class="bg-black h-screen flex flex-col items-center justify-center">
    <div class="bg-white p-4 rounded-md w-4/12 h-4/6">
      <div class="flex items-center justify-center mt-3 mb-6">
        <!-- Spotify logo and title -->
        <img
          class="w-16"
          src="/Spotify_Icon_RGB_Black.png"
          alt="spotify icon"
        />
        <p class="text-3xl ml-5 font-bold">User Declaration</p>
      </div>
      <div class="h-4/6">
        <!-- User Discretion -->
        <p class="border-2 border-black rounded-md p-2 text-justify overflow-auto h-full">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          eos enim laudantium quibusdam, commodi esse mollitia odit quia,
          architecto id quos quisquam reprehenderit quam illum voluptas velit!
          Sunt, saepe voluptas! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Consequuntur tempora voluptatibus ratione excepturi
          corporis animi aspernatur quisquam delectus, repudiandae laborum,
          obcaecati odio. Corrupti numquam sint ab maxime, ipsam error quam.
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet enim
          assumenda quidem iure quaerat ut, ad minus pariatur officia
          perferendis eos dolorum iste ipsam voluptatibus. Omnis a quaerat esse
          rerum. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Repudiandae vero vitae voluptas voluptatum ipsum, tempora aspernatur
          animi nobis quae tenetur quisquam doloremque praesentium dolores
          suscipit adipisci cumque recusandae veniam? Laborum!
        </p>
      </div>
      <div class="mt-8 flex justify-center">
        <!-- Agree and Cancel button -->
        <button
          class="
            text-lg
            font-semibold
            bg-green
            rounded-full
            border-2
            border-green
            active:border-green active:rounded-md
            hover:text-white
            py-1
            px-8
          "
        >
          Agree
        </button>
        <button
          class="
            text-lg
            font-semibold
            rounded-full
            border-2
            border-black
            active:rounded-md
            hover:text-white
            hover:bg-black
            py-1
            px-8
            ml-16
          "
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
