<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <error />
      <div class="mt-5">
        <router-view />
      </div>
    </div>
    <footer class="bg-light text-center p-3 d-flex align-items-center justify-content-center">
      <p>
        Project created by <a href="https://github.com/jwizerd">Jeremiah Wodke</a>
      </p>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>

<style lang="scss">
  a {
    &:hover {
      cursor: pointer;
    }
  }
</style>
