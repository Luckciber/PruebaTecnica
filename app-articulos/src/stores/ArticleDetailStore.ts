import { defineStore } from 'pinia'
import { type UserModel } from '../models/user.interface'
import { type Article} from '../models/article.interface'

export const useArticleDetail = defineStore( 'articleDetail', {
    state: () => ({
        userObject: {},
        articleObject: {}
    }),
    actions: {
        updateUserObject(user: UserModel) {
          this.userObject = user;
        },
        updateArticleObject(article: Article){
            this.articleObject = article;

        }
    }
})