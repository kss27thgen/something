<template>
    <div class="container">
        <header></header>

        <main>
            <form @submit.prevent="enterRoom">
                <div class="form-group">
                    <label for="nickname">Enter your nickname</label>
                    <input id="nickname" type="text" v-model="name">
                </div>
                <button class="btn btn--enterRoom" type="submit">Enter Room</button>
            </form>
        </main>

        <footer></footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: null
        }
    },
    methods: {
        enterRoom() {
            if (this.name === null) {
                return
            }
            localStorage.setItem('nickname', this.name);
            this.$router.push('/chat')
        }
    }
}
</script>

<style lang="scss" scoped>
header {
	background: var(--color-beige);
	height: 25vh;
}

main {
	height: 50vh;
	background: var(--color-white);
    display: flex;
    justify-content: center;
    align-items: center;
}

footer {
	background: var(--color-black);
	height: 25vh;
}



form {
    display: flex;
    flex-direction: column;
    align-items: center;
    .form-group {
        display: flex;
        flex-direction: column;
        label {
            font-size: 1.5rem;
        }
        input {
            width: 30rem;
            padding: 1rem 2rem;
            font-size: 2rem;
            outline: none;
            margin-top: 1rem;
        }

    }
    .btn--enterRoom {
        font-size: 2rem;
        border-radius: 6px;
        padding: 1rem 2rem;
        cursor: pointer;
        outline: none;

        margin-top: 3rem;
        background: var(--color-red);
        color: var(--color-white);
    }
}

</style>