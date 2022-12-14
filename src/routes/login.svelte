<script>
  import { user, logIn, register } from "$lib/stores/db";
  import { fade } from 'svelte/transition';

  let username;
  let password;

  function handleLogIn() {
    logIn(username, password);
  }

  function handleRegister() {
    register(username, password);
    handleLogIn();
  }
</script>

<div id="login" in:fade={{ duration: 1000, delay: 1000 }} out:fade={{ duration: 900 }} >
  {#if $user.err}
    <div class="error"><span class="title" >{ $user.err.error}:</span> {$user.err.reason}</div>
  {/if}

  <div class="form__group field">
    <input
      bind:value={username}
      type="text"
      name="username"
      placeholder="Username"
      class="form__field"
    />
    <label for="username" class="form__label">Name</label>
  </div>
  <div class="form__group field">
    <input
      bind:value={password}
      type="password"
      name="password"
      placeholder="Password"
      class="form__field"
    />
    <label for="password" class="form__label">Password</label>
  </div>
  <div class="form__buttons">
    <button type="submit" class="button-85" on:click={handleLogIn}>Login</button>
    <button type="submit" class="button-85" on:click={handleRegister}>Register</button>
  </div>
</div>
  
<style>
  #login {
    position: fixed;
 		top: calc(50vh);
		left: calc(50vw - 125px);
		width: 250px;
		margin-right: auto;
		margin-left: auto;
		border: solid 1px #808080;
		border-radius: 10px;
		padding: 5px 5px 5px 5px;
		box-shadow: 0px 0px 10px #999;
    background-color: #fff;
  }

  input, div.error, button {
    margin: 3px 5px;
  }

  input {
    width: 230px;
  }

  div.error {
    border: solid 1px maroon;
    background-color: rgba(185, 19, 19, 0.9);
    color:white;
    padding: 3px 5px;
    border-radius: 5px;
  }

  div.error span.title {
    text-transform: capitalize;
    font-weight: bold;
  }

.button-85 {
  padding: 0.5em 1.5em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  border: solid 1px #bc07bc;
  font-size: 1rem;
}

.button-85:hover:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
}

.form__group {
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
}

.form__field {
  font-family: inherit;
  border: 0;
  border-bottom: 2px solid #808080;
  outline: 0;
  font-size: 1rem;
  color: #808080;
  padding: 5px 3px;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}
.form__field:placeholder-shown ~ .form__label {
  cursor: text;
  top: 20px;
}

.form__label,
.form__field:-webkit-autofill ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  color: #808080;
  font-size: 0.8rem;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-color: #bc07bc;
  border-image-slice: 1;
  transition: opacity 0.3s ease-in-out;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: #bc07bc;
  font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
  box-shadow: none;
}

.form__buttons {
  padding-top: 3px;
  display: flex;
  justify-content: center;
}


</style>