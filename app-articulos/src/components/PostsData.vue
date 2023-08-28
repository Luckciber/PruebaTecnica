<script >
  import axios from 'axios'
  //import {useModalState} from '../stores/ModalValues'
  import { ref } from 'vue'
  import ModalData from './ModalData.vue'
  import {useArticleFilter} from '../stores/FilterStore.ts'
  import {useArticleDetail} from '../stores/ArticleDetailStore.ts'
  import { storeToRefs } from 'pinia'


  export default {
    components: { ModalData },
    setup(){
        const inputTitle = ref('')
        const storeFilters = useArticleFilter()
        const storeDetails = useArticleDetail()
        const { pageArticleList,idUser,idArticle } = storeToRefs(storeFilters)
        const {nextPage, prevPage, changeStoredUser, changeStoredArticle} = storeFilters
        const { userObject, articleObject} = storeToRefs(storeDetails)
        const { updateUserObject, updateArticleObject} = storeDetails
       
        const modalActive = ref(false)
        
        const toggleModal = () => {
            modalActive.value = !modalActive.value
        }

        return { 
                modalActive, 
                toggleModal, 
                nextPage, 
                prevPage, 
                pageArticleList, 
                changeStoredUser, 
                changeStoredArticle,
                idUser, 
                idArticle,
                userObject, 
                articleObject,
                updateUserObject,
                updateArticleObject,
                inputTitle
        }

    },
    name: 'PostsData',
    data () {
      return {
        article:[],
        articles: [],
        filteredArticles: [],
        user: [],
      }
    },
    methods: {
        async getArticles(){
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/?_page='+this.pageArticleList)
            this.articles = response.data
            this.filteredArticles = this.articles
        },
        async getUser(){
            const response = await axios.get('https://jsonplaceholder.typicode.com/users/'+this.idUser)
            this.user = response.data
            this.updateUserObject(this.user)
        },
        async getArticle(){
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/'+this.idArticle)
            this.article = response.data
            this.updateArticleObject(this.article)
        },
        changeState(){
        },
        filterArticles() {
            const filterText = this.inputTitle.toLowerCase();

            if (filterText === "") {
                this.filteredArticles = this.articles;
            } else {
                this.filteredArticles = this.articles.filter(article => {
                    return article.title.toLowerCase().includes(filterText);
                });
            }
        },
        nextPageData(){
            this.nextPage();
            this.getArticles()
        },
        prevPageData(){
            this.prevPage()
            this.getArticles()
        },
        changeStoredData(idArticle, idUser) {
            if (typeof idArticle === 'number' && typeof idUser === 'number') {
                this.toggleModal();
                this.changeStoredUser(idUser);
                this.changeStoredArticle(idArticle);
                this.getArticle();
                this.getUser();
            }
        },
    },
    created (){
      this.getArticles()
    }
  }
</script>

<template>
    <div class="container animate__fadeInUp transition-all">
        <ModalData @close="toggleModal" :modalActive="modalActive"></ModalData>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1 xl:grid-cols-2">
            <h3 class="text-3xl font-bold pb-4 pl-4 ">Articulos</h3>
            <form class="w-full max-w-sm">
                <div class="md:flex md:items-center mb-6">
                    <div class="md:w-1/3">
                        <label class="block font-bold md:text-right mb-1 md:mb-0 pr-4" for="inputTitle">
                            Filtrar Titulo
                        </label>
                    </div>
                    <div class="md:w-2/3">
                        <input 
                            class="bg-gray-200 appearance-none border-2 border-blue-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                            v-model="inputTitle"
                            @input="filterArticles"
                            id="inputTitle" 
                            type="text">
                    </div>
                </div>
            </form>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-10 xl:grid-cols-2 ">
            <div class="p-4 border-sky-700 rounded-3xl border-e border-t shadow-lg bg-zinc-50 line-clamp-3 animate__fadeInUp" v-for="article in filteredArticles" :key=article.id>
                <h1 class=" h-20 font-bold text-xl">{{article.title}}</h1>
                <div class="h-20 pt-2 line-clamp-3 ">
                    <p class="text-justify">{{article.body}}</p>
                </div>
                <div class='pt-2'>
                    <button class="bg-sky-600 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded" @click="changeStoredData(article.id, article.userId)" > <i class="fas fa-search-plus"></i> Ver Mas</button>
                </div>
            </div>
        </div>
        <div class="flex justify-between pt-4">
            <div>
                <button class="bg-sky-600 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded" @click="prevPageData" ><i class="fa-solid fa-arrow-left"></i>Pagina Anterior</button>
            </div>
            <div class="text-2xl font-bold ">
                {{ pageArticleList }}
            </div>
            <div class="">
                <button class="bg-sky-600 hover:bg-sky-400 text-white font-bold py-2 px-4 rounded" @click="nextPageData" > Pagina Siguiente<i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    </div>
</template>