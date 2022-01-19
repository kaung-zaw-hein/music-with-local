<template>
  <div class="mx-auto container123">
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true">
                    <h3>Design</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>Basic Html template got from <a href="https://www.udemy.com/user/andrei-neagoie/">Andrei Neagoie</a> .Others by me. New routes and some features are still under construction
                      some of the card style from <a href='https://freefrontend.com/'>FreeFrontEnd</a>
                      
                    </p>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/code_128.png?raw=true">
                    <h3>Code and Framework</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>This project is mainly used <a href="https://v3.vuejs.org/">vue3</a> and Css framework <a href="https://tailwindcss.com/">Tailwind</a>.Others library = vee-validate/rules, date-fns
                     howler, lodash, nrogress,vue-i18n </p>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/launch_128.png?raw=true">
                    <h3>Launch</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>using <a href="https://firebase.google.com/">firebase</a> as database and  host with <a href="https://vercel.com/">Vercel</a>
                    <a href="https://vercel.com/">github</a>
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-center min-h-screen">
          <div class="max-w-md px-2 md:max-w-2xl">
            <div class="overflow-hidden bg-white rounded-lg shadow-xl md:flex">
                <div class="h-56 bg-bottom bg-cover md:h-auto md:w-56" style="background-image: url(assets/img/kidgogu.jpg)">
                </div>
                <div>
                    <div class="p-4 md:p-5">
                        <p class="text-xl font-bold md:text-2xl">Kaung Zaw Hein</p>
                        <p class="text-gray-700 md:text-lg">This website was made by Kaung zaw Hein in 2022.</p>
                    </div>
                    <div class="p-4 bg-gray-100 md:p-5">
                        <div class="sm:flex sm:justify-between sm:items-center">
                            <div>
                                <div class="flex items-center">
                                    <div class="mt-1 ml-2 text-sm text-gray-600 md:text-base">Website made with the pourpose of study and try Vuejs and Vuex</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>  

   
</template>
<script>
import dummyModule from '../store/modules/dummy';
export default ({
  created() {
    this.$store.registerModule('dummy', dummyModule);
  },
})
</script>
<style >

.container123{
    width: 1000px;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
}

.container123 .card{
    position: relative;
    cursor: pointer;
}

.container123 .card .face{
    width: 300px;
    height: 200px;
    transition: 0.5s;
}

.container123 .card .face.face1{
    position: relative;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
}

.container123 .card:hover .face.face1{
    background: #059669;
    transform: translateY(0);
}

.container123 .card .face.face1 .content{
    opacity: 0.2;
    transition: 0.5s;
}

.container123 .card:hover .face.face1 .content{
    opacity: 1;
}

.container123 .card .face.face1 .content img{
    max-width: 100px;
}

.container123 .card .face.face1 .content h3{
    margin: 10px 0 0;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5em;
}

.container123 .card .face.face2{
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px);
}

.container123 .card:hover .face.face2{
    transform: translateY(0);
}

.container123 .card .face.face2 .content p{
    margin: 0;
    padding: 0;
}

.container123 .card .face.face2 .content a{
    margin: 15px 0 0;
    display:  inline-block;
    text-decoration: none;
    font-weight: 900;
    color: #333;
    padding: 5px;
    border: 1px solid #333;
}

.container123 .card .face.face2 .content a:hover{
    background: #333;
    color: #fff;
}
</style>

