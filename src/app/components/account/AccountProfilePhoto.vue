<template>
  <div class="form-group">
    <div class="label-column-spacer">
      <img class="account__user-photo" :src="profile.attributes.image_url"  style="height:4rem;" alt=""/>
    </div>
    <div class="w-100">
      <div>{{user.attributes.name}}</div>
      <label for="file-uploader" tabindex="0" @keydown.enter.space.prevent="handleAddFileClick" class="file-upload">{{$t('account.labelPhotoChange')}}</label>
      <input type="file" name="image" id="file-uploader" accept="image/*" @change="handleFileInputChange" />
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "AccountProfilePhoto",

  props: {
    profile:{
      type: Object,
    },
    user:{
      type: Object,
    }
  },

  data(){
    return {
      fileProgress: 0,
      filesOrder: [],
      fileCurrent: '',
      files: [],
    }
  },

  methods: {
    handleAddFileClick(){
      document.getElementById("file-uploader").click();
    },
    async handleFileInputChange(){

      let files = Array.from(event.target.files);
      this.filesOrder = files.slice();
      files.forEach(file => this.addImage(file));
      for( let file of files){
        await this.uploadFile(file);
      }

    },
    async uploadFile(file){
      let form = new FormData();
      form.append('image', file);
      this.loading = true;

      await axios.post('/profiles/' + this.profile.hid + '/photos', form, {
        onUploadProgress: (itemUpload) => {
          this.fileProgress = Math.round((itemUpload.loaded / itemUpload.total) * 100);
          this.fileCurrent = file.name + ' ' + this.fileProgress;
        }
      }).then(resp => {
        if (resp.status === 200 || resp.status === 201) {
          this.fileProgress = 0;
          this.$emit('uploaded', resp.data.file)
          this.$emit('change', resp.data.file)
        }

        this.loading = false;

      }).catch(() => {
        this.loading = false;
      }).finally(() => {
        this.loading = false;
      })
    },
    addImage(file){
      if(!file.type.match('image.*')){
        return;
      }
      this.filesOrder.push(file);
      const reader = new FileReader();
      reader.onload = (e) => this.imagesOrder.push(e.target.result);
      reader.readAsDataURL(file);
    },
  }
}
</script>

<style scoped>
.account__user-photo{
  height: 4rem;
  width: 4rem;
  object-fit: cover;
}

input[type="file"] {
  display: none;
}
.file-upload {
  display: inline;
  cursor: pointer;
  line-height: 1.5rem;
}
</style>
