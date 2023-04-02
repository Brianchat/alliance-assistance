<script>
   let modal;
   let isOpen = false;

   const toggleModal = ()=> isOpen=!isOpen;

   $: {
    modal?.setAttribute('open',isOpen);
   }
</script>

<button class="button"
  data-target="modal-example"
  on:click={toggleModal}>
  Launch demo modal
</button>

<!-- Modal -->
<dialog id="modal-example" bind:this={modal}>
  <article>
    <header>
        <a class="close"  on:click|preventDefault={toggleModal}>
            <svg class="icon-clear s-xk2Y1N2GqcfD" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" ></path></svg>
        </a>
        Modal title
      </header>
    <h3>Confirm your action!</h3>
    <p>
      Cras sit amet maximus risus. 
      Pellentesque sodales odio sit amet augue finibus pellentesque. 
      Nullam finibus risus non semper euismod.
    </p>
    <footer>
        <button class="button" on:click={toggleModal} ><i class="fa-solid fa-shirt fa-xs"></i>Small</button>
        <button class="button" on:click={toggleModal} ><i class="fa-solid fa-shirt"></i>Medium</button>
        <button class="button" on:click={toggleModal} ><i class="fa-solid fa-shirt fa-xl"></i>Large</button>
        <button class="button" on:click={toggleModal} >
            Confirm
        </button>
    </footer>
  </article>
</dialog>
<style>
    footer {
        display: flex;
        justify-content: center;
    }

    footer .button {
        width: auto;
        display: flex;
        align-items: center;
    }

    footer .button i {
        margin-right: 0.6rem;
    }
    
</style>