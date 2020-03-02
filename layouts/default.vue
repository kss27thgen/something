<template>
  <div>
    <transition name="page">
      <nuxt />
    </transition>
  </div>
</template>

<script>
export default {

}
</script>

<style>
:root {
  --color-white: #fff;
  --color-black: 	#091116;
  --color-beige: #ddb16b;
  --color-blue: #245ca0;
  --color-lightblue: #3879c7;
  --color-red: rgb(212, 77, 77);
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 62.5%;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.btn {
	border-radius: 4px;
	display: block;
	cursor: pointer;
	outline: none;
}

/* page transition */
.page-enter, .page-leave-active {
  opacity: 0;
  transform: scale(1.1)
}
.page-enter-active,
.page-leave-active {
  transition: all 1s;
}



@media (min-width:576px) {
    
}
@media (min-width:768px) {
  
}
@media (min-width:992px) {
  
}
@media (min-width:1200px) {
  
}


</style>
