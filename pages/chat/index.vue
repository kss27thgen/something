<template>
    <div class="container">
        <header>
            <nuxt-link to="/">Back</nuxt-link>
        </header>

        <main>
            <transition-group tag="ul" class="posts">

                <li :class="{'mine': post.nickname === nickname, post}" v-for="post in posts" :key="post.timestamp">
                    <div class="post-info">
                        <h4 class="post-info__name">{{ post.nickname }}</h4>
                        <p class="post-info__time">( {{ post.time }} )</p>
                    </div>
                    <div class="post-body">
                        <p class="image-wrapper">
                            <img :src="post.file" class="post-body__file" v-lazy-load>
                        </p>
                        <p class="post-body__content">{{ post.content }}</p>
                    </div>
                </li>

            </transition-group>
        </main>

        <footer>
            <form @submit.prevent="iamChatting" class="form">
                <div class="form-group">
                    <input class="form-group--text" type="text" v-model="chat.text">
                    <label for="file">
                        <i class="far fa-images"></i>
                    </label>
                    <input id="file" class="form-group--file" type="file" @change.prevent="selectFile">
                </div>
                <button type="submit" class="btn btn-submit">
                    <i class="fas fa-comment-dots"></i>
                </button>
            </form>
        </footer>
    </div>
</template>

<script>
import moment from 'moment'
import { storageRef, db } from '~/plugins/firebase'

export default {
    data() {
        return {
            nickname: null,
            chat: {
                text: null,
                file: null
            },
            posts: []
        }
    },
    methods: {
        iamChatting() {
            if (this.chat.text === null && this.chat.file === null) {
                return 
            }
            db.collection('chat').add({
                nickname: this.nickname,
                content: this.chat.text,
                timestamp: Date.now(),
                time: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
            })
            .then(res => {
                this.chat.id = res.id
                db.collection('chat').doc(res.id).update({
                    id: res.id
                })
                this.chat.text = null
            })
            .then(() => {
                if (this.chat.file !== null) {
                    storageRef.child('images/' + this.chat.id).put(this.chat.file)
                    .then(() => {
                        storageRef.child('images/' + this.chat.id).getDownloadURL()
                        .then(url => {
                            db.collection('chat').doc(this.chat.id).update({
                                file: url
                            })
                            .then(() => {
                                this.chat.file = null
                            })
                        })
                    })
                }
            })

            

        },
        selectFile() {
            this.chat.file = event.target.files[0]
        },

        scroll() {
            let scrollHeight = document.querySelector('.posts').offsetHeight;
            document.querySelector('main').scroll({
                top: scrollHeight,
                behavior: 'smooth'
            });
        }
    },
    mounted() {
        this.nickname = localStorage.getItem('nickname')

        db.collection('chat').orderBy("timestamp").onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if (change.type === "added") {
                    this.posts.push(change.doc.data())

                    setTimeout(() => {
                        this.scroll()
                    }, 800)
                }
            })
        })
    }
    
}
</script>

<style lang="scss" scoped>
header {
	background: var(--color-beige);
	height: 10vh;
}

main {
	height: 75vh;
    padding: 3rem 8rem;
	background: var(--color-white);
    overflow-y: scroll;
}

footer {
	background: var(--color-black);
	height: 15vh;
    padding: 0 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.posts {
    display: flex;
    flex-direction: column;
}
.mine {
    align-self: flex-end;
}

.post {
    border-bottom: 1px solid gray;
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    width: 60%;
    

    &-info {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        &__name {
            font-size: 2.3rem;
            margin-right: 1rem;
            font-family: fantasy;
        }
        &__time {
            font-size: 1.2rem;
        }
    }

    &-body {
        padding: 0 2rem 1rem;

        &__content {
            font-size: 2rem;
            margin-top: 1rem;

        }
        &__file {
            margin-top: 1rem;
            width: 15rem;
        }
    }
    
}


/* Animation */
.v-enter {
    transform: translateY(-100px);
    opacity: 0;
}
.v-enter-active {
    transition: all 2s;
}

.v-move {
    transition: all 1.5s;
}




.form {
    display: flex;
    width: 100%;
    align-items: center;

    &-group {
        width: 80vw;
        position: relative;

        &--text {
            width: 100%;
            padding: 1rem 2rem;
            font-size: 2.5rem;
            border-radius: 5px;
        }

        .fa-images {
            font-size: 4rem;
            color: var(--color-lightblue);
            position: absolute;
            right: 3%;
            top: 15%;
            cursor: pointer;
        }
        &--file {
            display: none;
        }
        
    }
    .btn-submit {
        padding: 1rem;
        background: var(--color-lightblue);
        color: var(--color-white);
        font-size: 3rem;
        margin-left: 2rem;
        border: none;
    }



}

@media (min-width:576px) {

}

@media (min-width:768px) {


    .form {
        .form-group {
            width: 90vw;
        }
        .btn-submit {
            margin-left: 3rem;
        }
    }
}

@media (min-width:992px) {

}

</style>

