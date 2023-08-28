<script>
  import {useArticleDetail} from '../stores/ArticleDetailStore.ts'
  import { storeToRefs } from 'pinia'

  export default {
      props: ["modalActive"],
      setup(props, { emit }){

        const storeDetails = useArticleDetail()
        const { userObject, articleObject } = storeToRefs(storeDetails)

        const close = () => {
          emit('close')
        }
        return {close, userObject, articleObject}
      }
  }

</script>

<template>
  <div class="container mx-auto wrapper modal-inner animatemodal__fadeInUp" v-show="modalActive">
    <div class="flex justify-center">
      <div
        v-show="modalActive"
        class="
          fixed
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        ">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">

          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 xl:grid-cols-2">
            <div>
              <h3 class="text-2xl font-bold">{{this.articleObject.title}}</h3>
              <p class="mb-4 text-md pt-4">
                {{this.articleObject.body}}
              </p>
            </div>
            <div class="bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div class="flex items-center justify-between" v-if="userObject.address">
                    <span class="text-gray-400 text-sm">{{this.userObject.address.street + ', '+ this.userObject.address.suite+', ' +this.userObject.address.city}}</span>
                </div>
                <div class="mt-2 w-fit mx-auto">
                  <i class="fas fa-user fa-2xl"></i>
                </div>

                <div class="mt-8 ">
                    <h2 class="text-white font-bold text-2xl tracking-wide">{{this.userObject.name}}</h2>
                </div>
                <div class="text-emerald-400 font-semibold mt-0.5" >
                    {{this.userObject.email}}
                </div>
                <div class="text-emerald-400 font-semibold mt-0.5" >
                    {{this.userObject.username}}
                </div>
                <div class="text-emerald-400 font-semibold mt-0.5" >
                    {{this.userObject.phone}}
                </div>
            </div>
          </div>


          <div class="flex items-center justify-center py-2">
            <button @click="close" class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded" type="button">
             <i class="fas fa-thumbs-up"></i>  OK
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>