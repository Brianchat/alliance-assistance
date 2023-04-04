<script>
    let modal;
    let isOpen = false;
 
    const toggleModal = ()=> isOpen=!isOpen;
 
    $: {
     modal?.setAttribute('open',isOpen);
    }
 </script>
 
<article>
    <header>
        Modal title
    </header>
    <!-- Grid -->
    <div class="grid">

        <!-- Markup example 1: input is inside label -->
        <label for="firstname">
        First name
        <input type="text" id="firstname" name="firstname" placeholder="First name" required>
        </label>

        <label for="lastname">
        Last name
        <input type="text" id="lastname" name="lastname" placeholder="Last name" required>
        </label>

    </div>

    <!-- Markup example 2: input is after label -->
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" placeholder="Email address" required>
    <small>We'll never share your email with anyone else.</small>

    <footer>
        <button class="button" on:click={toggleModal} ><i class="fa-solid fa-shirt fa-xs"></i>Small</button>
        <button class="button" on:click={toggleModal} ><i class="fa-solid fa-shirt"></i>Medium</button>
        <button class="button" on:click={toggleModal} ><i class="fa-solid fa-shirt fa-xl"></i>Large</button>
    </footer>
</article>

 <style>
    article {
        max-width: 1500px;
        margin: 5px auto;
    }

    footer {
        display: flex;
        justify-content: center;
        overflow: auto;
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