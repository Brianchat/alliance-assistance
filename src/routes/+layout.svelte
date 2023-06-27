<script>
    import { writable } from 'svelte/store'

    export const enabled = writable(JSON.parse(localStorage.getItem('user')));
    const carReg=writable('');

    enabled.subscribe((value) => localStorage.user = JSON.stringify(value));
</script>

<header>
    <img src="/Alliance_assistance.png" alt="Alliance Assistance" />
</header>
<main>
    {#if $enabled}
        <div class="card">
            <div class="card-warning">
                <h2 class="card-heading">
                    Warning: Early Release 
                    <small>This service is currently only available for select customers who have an active policy with
                        Alliance Insurance.</small>
                </h2>
            </div>
            <form class="card-form">
                <h2 class="card-heading">Login:</h2>
                <div class="input">
                    <input name="carReg" type="text" class="input-field" required  bind:value={$carReg}/>
                    <label for="carReg" class="input-label">Car Registration</label>
                </div>
                <div class="action">
                    <button class="action-button" on:click={check}>Next</button>
                </div>
            </form>
            <div class="card-info">
                <p>By signing up you are agreeing to our <a href="/t&c">Terms and Conditions</a></p>
            </div>
        </div>
    {:else}
        <slot />
    {/if}
</main>
<footer>
    <div class="logos">
        <img src="/alliance-logo.png" alt="Alliance Assistance" />
        <img src="/Help24seven.svg" alt="Help 24 Seven" />
        <img src="/new-eNQue.svg" alt="eNQue" />        
    </div>
</footer>

<style>
    :global(body) {
        background-color: #3f1113;
        padding: 0px;
        margin: 0px;
    }

    main {
        padding: 80px 0px 40px 0px;
        max-width: 100%; 
        margin: 0 auto !important; 
        float: none !important; 
        overflow: auto;
    }

    header, footer {
        width: 100%;
        position: fixed;
        left: 0px;
        right: 0px;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        transition: height 2s;
    }

    header {
        top: 0px;
        height: 80px;
        border-bottom: solid 1px #555;
        box-shadow: 0px 0px 5px #555;
        z-index: 10;
    }

    header img {
        max-width: 100vw;
        object-fit: scale-down;
    }

    footer {
        bottom: 0px;
        border-top: solid 1px #555;
        box-shadow: 0px 0px -5px #555;
        z-index: 10;
        height: 40px;
    }

    div.logos {
        height: 35px;
        margin: 3px;
        max-width: 100vw;
        display: inline-flex;
        justify-content: space-evenly;
        align-items: center;
    }
    
    div.logos img {
        height: 35px;
        max-width: 30%;
        max-height: 35px;
        object-fit: scale-down;
    }

    @media (max-height: 400px) {
        footer, div.logos img {
            height: 0px;
            transition: height 1s;
        }

        main {
            padding-bottom: 0px;
            transition: padding 2s;
        }
    }

    @media (max-height: 350px) {
        header {
            height: 0px;
            transition: height 2s;
        }

        main {
            padding: 0px;
            transition: padding 2s;
        }
    }



</style>