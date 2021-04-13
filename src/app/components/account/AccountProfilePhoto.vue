<template>
  <div class="form-group row">
    <div class="col-4 col-form-label text-right">
      <img class="account__user-photo" :src="profile.attributes.image_url"  style="height:2.5rem;"/>
    </div>
    <div class="col-8">
      <div>{{user.attributes.name}}</div>
      <div class="file-upload bs">
        <a>{{$t('account.labelPhotoChange')}}</a>
        <input type="file" name="image" id="file-uploader" accept="image/*" @change="handleFileInputChange" />
      </div>
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
  height: 2.5rem;
  width: 2.5rem;
  object-fit: cover;
}

.file-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: white;
  text-indent: 0;
  color: var(--primary);
  font-size: 14px;
  height: 2rem;
  line-height: 2rem;
  text-decoration: none;
  white-space: nowrap;

}

.file-upload input[type=file] {
  /* Позиционируем правый верхний край
     input поверх нашего контейнера.
     Правый верхний потому как именно там
     у нас кнопка. */
  position: absolute;
  top: 0;
  right: 0;

  /* Делаем input побольше, чтобы он точно
     перекрыл контейнер. */
  font-size: 200px;

  /* Делаем input невидимым. По-другому нельзя,
     иначе браузер не будет на него реагировать. */
  opacity: 0;
  filter: alpha(opacity=0);

  /*  Украшательства: */
  cursor: pointer;
}
</style>
