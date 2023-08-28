import { defineStore } from 'pinia'

export const useArticleFilter = defineStore( 'articleFilter', {
    state:() => ({
        stringFilter: '',
        pageArticleList: 1,
        idUser: 0,
        idArticle: 0
    }),
    actions:{
        nextPage(){
            if(this.pageArticleList < 10){
                this.pageArticleList = this.pageArticleList + 1
            }

        },
        prevPage(){
            if(this.pageArticleList > 1){
                this.pageArticleList = this.pageArticleList - 1
            }

        },
        changeStoredUser(id: number){
            this.idUser = id
        },
        changeStoredArticle(id: number){
            this.idArticle = id
        }
    }
})