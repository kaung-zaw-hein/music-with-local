<template>
  <main>
      <!-- Introduction -->
    <section class="relative py-20 text-white h-96">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"></div>
      <div class="container">
        <div class="text-white main-header-content">
          <h1 class="float-right mb-5 text-5xl font-bold">{{ $t('home.listen') }}</h1>
          <!-- <p class="w-full mx-auto mb-18 md:w-8/12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus et dolor mollis, congue augue non, venenatis elit.
            Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget,
            ullamcorper urna.
          </p> -->
        </div>
      </div>

      <!-- <img class="relative block w-auto max-w-full mx-auto mt-5 -mb-20"
        src="assets/img/introduction-music.png" /> -->
    </section>

    <!-- Main Content -->
    <section class="w-full">
      <div class="relative flex flex-col w-full bg-gray-800 ">
        <div class="flex items-center justify-between px-6 pt-6 pb-5 font-bold border-b border-gray-500" 
        v-icon-secondary ="{icon: 'comment-alt', right:true}"
        v-icon.right.yellow ="'stream'"
        >
          <span class="w-3/6 text-white card-title">{{ $t('home.songs') }}</span>
          <i class="mr-10 text-2xl text-yellow-400 fas fa-upload"></i>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs" :key="song.docID"
            :song="song" ></SongItem>
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>

</template>

<script>
import SongItem from '../components/SongItem'
import{songsCollection} from '@/includes/firebase';
import IconSecondary from '@/directives/icon-secondary';
export default {
  components: { SongItem },
  directives: {
    'icon-secondary' :IconSecondary,
  },
  data(){
    return{
      songs:[],
      maxPerpage:4,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount(){
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {

    handleScroll(){
      const { scrollTop, offsetHeight} = document.documentElement;
      const {innerHeight} = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
      if (bottomOfWindow){
       
        this.getSongs();
      }

    },

    async getSongs(){
      if(this.pendingRequest){
        return;
      }
      
      this.pendingRequest= true;

      let snapshots;
     if(this.songs.length){
        const lastDoc = await songsCollection
        .doc(this.songs[this.songs.length-1].docID)
        .get();
        snapshots = await songsCollection
        .orderBy("modified_name")
        .startAfter(lastDoc)
        .limit(this.maxPerpage)
        .get();
     }else{
       snapshots = await songsCollection
        .orderBy("modified_name")
        .limit(this.maxPerpage)
        .get();
     }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest= false;
    },
  },
};
</script>
