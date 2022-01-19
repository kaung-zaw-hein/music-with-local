<template>
   <div class="relative flex flex-col bg-white rounded">
          <div class="px-6 pt-6 pb-5 font-bold ">
            <span class="card-title">{{ $t('manage.upload') }}</span>
            <i class="float-right text-2xl text-green-400 fas fa-upload"></i>
          </div>
          <div class="p-6">
            <div
              class="w-full px-10 py-20 text-center text-gray-400 transition duration-500 border border-gray-400 rounded cursor-pointer hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
               :class="{'bg-green-400 hover:border-green-400 hover:border-solid' : isDragover}"
              @drag.prevent.stop="isDragover = true"
              @dragstart.prevent.stop="isDragover = true"
              @dragend.prevent.stop="isDragover = false"
              @dragover.prevent.stop="isDragover = true"
              @dragenter.prevent.stop="isDragover = true"
              @dragleave.prevent.stop="isDragover = false"
              @drop.prevent.stop="upload($event)"
              >
              <h5>{{ $t('manage.DUFH')}}</h5>
            </div>
            <label
              class="flex flex-col items-center px-4 py-6 tracking-wide text-green-600 uppercase transition-all duration-150 ease-linear bg-white border rounded-md shadow-md cursor-pointer border-blue hover:bg-green-600 hover:text-white">
              <i class="fas fa-cloud-upload-alt fa-2x animate-bounce"></i>
              <span class="mt-2 text-sm leading-normal">Select a file</span>
              <input class="hidden " type="file" multiple @change="upload($event)" />
            </label>
            <hr class="my-6" />
            <div class="mb-4" v-for =" upload in uploads " :key ="upload.name">
              <div class="text-sm font-bold" :class="upload.text_class" ><i :class="upload.icon"></i> {{upload.name}}</div>
              <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                <div class="transition-all bg-blue-400 progress-bar" 
                :class ="upload.variant"
                :style="{width : upload.current_progress + '%'}"></div>
              </div>
            </div>
            
          </div>
        </div>
</template>

<script>
import {storage, auth, songsCollection} from '@/includes/firebase';
export default {
  data(){
    return{
      isDragover:false,
      uploads:[],
    };
  },
  props:["addSong"],
  methods:{
    upload($event){
      this.isDragover = false;

      const files = $event.dataTransfer?
       [...$event.dataTransfer.files] :
       [...$event.target.files] ;

      files.forEach((file) => {
        if(file.type !== 'audio/mpeg'){
          return;
        }
        if(!navigator.onLine){
          this.uploads.push({
            task:{},
            current_progress: 100,
            name:file.name,
            variant:'bg-red-400',
            icon: 'fas fa-times',
            text_class: 'text-red-400',
          });
          return;
        }
        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${file.name}`);
        const task =  songsRef.put(file);

        const uploadIndex = this.uploads.push({
          task,
          current_progress : 0,
          name:file.name,
          variant:'bg-blue-400',
          icon: 'fas fa-spinner fa-spin', 
          text_class: '',
        }) - 1;
        task.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploads[uploadIndex].current_progress = progress;
        }, (error) => {
          this.uploads[uploadIndex].variant = 'bg-red-400' ;
          this.uploads[uploadIndex].icon = 'fas fa-times' ;
          this.uploads[uploadIndex].text_class = 'text-red-400';
          console.log(error)
        },async () => {
          const song = {
            uid: auth.currentUser.uid,
            display_name: auth.currentUser.displayName,
            original_name: task.snapshot.ref.name,
            modified_name: task.snapshot.ref.name,
            genre: '',
            comment_count: 0,
          };
          
          song.url = await task.snapshot.ref.getDownloadURL();
          const songRef = await songsCollection.add(song);
          const songSnapshot = await songRef.get();
          
          this.addSong(songSnapshot);

          this.uploads[uploadIndex].variant = 'bg-green-400' ;
          this.uploads[uploadIndex].icon = 'fas fa-check' ;
          this.uploads[uploadIndex].text_class = 'text-green-400';
        });
      });
      
    }, 
    // cancelUpload() {
    //   this.uploads.forEach((upload) => {
    //   upload.task.cancel();
    // });
    // }
  },
  beforeUnmount(){
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },
}
</script>

<style>

</style>