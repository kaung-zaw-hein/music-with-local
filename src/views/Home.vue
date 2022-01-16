<template>
  <main>
      <!-- Introduction -->
    <section class="relative py-20 mb-8 text-center text-white">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="mb-5 text-5xl font-bold">Listen to Great Music!</h1>
          <p class="w-full mx-auto md:w-8/12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus et dolor mollis, congue augue non, venenatis elit.
            Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
            sapien. Duis sed magna pulvinar, fringilla lorem eget,
            ullamcorper urna.
          </p>
        </div>
      </div>

      <img class="relative block w-auto max-w-full mx-auto mt-5 -mb-20"
        src="assets/img/introduction-music.png" />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="relative flex flex-col bg-white border border-gray-200 rounded">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title">Songs</span>
          <i class="float-right text-2xl text-green-400 fa fa-headphones-alt"></i>
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
export default {
  components: { SongItem },
  data(){
    return{
      songs:[],
      maxPerpage:3,
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
