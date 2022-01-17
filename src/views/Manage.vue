<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
       <Upload ref="upload" :addSong="addSong"></Upload>
      </div>
      <div class="col-span-2">
        <div class="relative flex flex-col bg-white border border-gray-200 rounded">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('home.songs') }}</span>
            <i class="float-right text-2xl text-green-400 fa fa-compact-disc"></i>
          </div>
          <div class="p-6">
            <CompositionItems v-for="(song, i) in songs" :key="song.docID"
          :song="song" 
          :updateSong="updateSong"
          :index="i"
          :removeSong ="removeSong"
          :updateUnsavedFlag="updateUnsavedFlag"></CompositionItems>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CompositionItems from '../components/Composition-items'
import Upload from '../components/Upload';
import {songsCollection,auth} from '@/includes/firebase';
// import store from '@/store';

export default {
  components: {
    CompositionItems, Upload },
  name:'manage',
  data () {
    return {
      songs:[],
      unsaveFlag:false,
    };
  },
    async created() {
    const snapshot = await songsCollection.where('uid','==',auth.currentUser.uid)
    .get();
    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values){
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },
    removeSong(i){
      this.songs.splice(i,1);
    },
    addSong(document){
      const song = {
          ...document.data(),
          docID: document.id,
        };
        this.songs.push(song);
    },
    updateUnsavedFlag(value){
      this.unsaveFlag = value;
      console.log(value);
    },
  },
  beforeRouteLeave(to,from,next){
    if(!this.unsaveFlag){
      next();
    }else{
      //eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure want to leave?');
      next(leave);
    }
  },
  // beforeRouteEnter(to,from,next){
  //   if(store.state.userLoggedIn){
  //     next();
  //   }
  //   else{
  //     next( { name : 'Home' } );
  //   }
  // }
}
</script>

<style>

</style>