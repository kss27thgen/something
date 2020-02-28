<template>
	<div class="container">
		<header></header>

		<main>
			<div class="login">
				<div class="login--email">
					<div>
						<div class="form-group">
							<input type="email" placeholder="E-mail">
						</div>
						<div class="form-group">
							<input type="password" placeholder="Password">
						</div>
						<div class="login__bottom">
							<button class="btn btn__login__email" @click.prevent="loginWithEamil">Log in</button>
							<button class="btn btn__signUp__email" @click.prevent="signUpWithEamil">Sign up</button>
						</div>
					</div>
				</div>

				<div class="login--google">
					<h5 class="or">OR</h5>
					<button class="btn btn__login__google" @click.prevent="loginWithGoogle">
						Login with Google
					</button>
				</div>
			</div>
		</main>

		<footer></footer>
	</div>
</template>

<script>
import firebase from '~/plugins/firebase'
import auth from '~/plugins/firebase'

export default {
	data() {
		return {
			email: null,
			password: null
		}
	},
	methods: {
		loginWithEamil() {
			// 1. signUp & Login with email
			// 2. use google user-photoURL as icon
		},
		signUpWithEamil() {

		},
		loginWithGoogle() {
			var provider = new firebase.auth.GoogleAuthProvider()

			firebase.auth().signInWithPopup(provider)
			.then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			console.log(user)
			
			}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
			});
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
	padding: 0 20rem;
}

footer {
	background: var(--color-black);
	height: 25vh;

}

.login {
	display: flex;
	width: 100%;
	height: 100%;

	&--email {
		flex: 0 0 60%;
		padding: 5rem;

		input {
			width: 100%;
			font-size: 1.8rem;
			padding: 1rem 2rem;

			&:nth-of-type(1) {
				margin-top: 1rem;
			}
		}
	}
	&__bottom {
		margin-top: 5rem;
		display: flex;
		justify-content: space-evenly;
	}

	&--google {
		flex: 0 0 40%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.or {
			font-size: 3rem;
			font-weight: 300;
		}
	}
}

.btn {
	

	&:hover {
		opacity: .9;
	}

	&__login {
		&__email {
			background: var(--color-blue);
			color: var(--color-white);

		}

		&__google {
			background: var(--color-lightblue);
			color: var(--color-white);
		}

	}
	&__signUp__email {
		background: var(--color-red);
		color: var(--color-white);

	}

}



</style>

