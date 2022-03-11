<template>
  <div id="app">
    <nav>
      <router-link to="/">WeToolbar+WeEditable</router-link> |
      <router-link to="/editor">WeEditor</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
    text-align: center;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .container {
    border: 1px solid #e5e5e5;
  }
  .toolbar {
    border-bottom: 1px solid #e5e5e5;
  }
  .editable {
    height: 500px;
  }
</style>
