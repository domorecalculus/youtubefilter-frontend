
<template>
  <div class="home">
    <div class="logo">
      <img src="../assets/Title.png" >
    </div>
    <div class="login">
      <div class="card">
        <form> 
        <div class="form-outline ">
          <input type="email" id="typeEmail" class="form-control" />
          <label class="form-label" for="typeEmail">Email input</label>
        </div>
        <div class="form-outline login-input">
          <input type="password" id="typePassword" class="form-control" />
          <label class="form-label" for="typePassword">Password input</label>
        </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    components: {
    }

}
</script>

<style >
.home {
  height: 100%;
  display: flex;
  margin: auto 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

.logo {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login {
  background: #efefef;
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
}

form > div {
  width: 20ch;
  margin: 0 auto;
  margin-top: 20px;
}
</style>