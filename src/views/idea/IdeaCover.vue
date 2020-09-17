<template>
  <div class="idea-cover mb-5">
    <div class="idea-cover__box-wrap">
      <div class="idea-cover__tmb">
        <div class="idea-cover__tmb-container vertical">
          <a href="">
            <img :src="idea.attributes.imageUrl" :id="'i' + idea.hid" alt="idea cover"/>
          </a>
        </div>
      </div>
      <div class="idea-cover__content text-first-uppercase">

      </div>
      <div class="list-item-dropdown">

      </div>
    </div>
    <div class="idea-cover__footer mt-2">
      <div>
        <span class="idea-cover__title">{{idea.attributes.title}}</span>
      </div>

      <span class="price">{{}} <span class="price-currency">{{}}</span></span>

      <div class="author">
        <img class="author-tmb mr-1" src="" alt="">
        <span class="author-title">{{}}</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
name: "IdeaCover",
  props: {
    idea: Object,
  },

  mounted(){
    window.addEventListener('resize', this.resize);
    this.resize();
  },

  methods: {
    resize(){
      const coverImage = document.getElementById('i' + this.idea.hid)
      coverImage.style.height = coverImage.offsetWidth * 1.33 + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
$border-radius-base:10px;
.idea-cover{
  overflow: hidden;
  border-radius: $border-radius-base;

.idea-cover__box-wrap{
  position: relative;
  overflow: hidden;

.idea-cover__tmb{
  overflow: hidden;
  z-index: 0;
  border-radius: $border-radius-base;

.idea-cover__tmb-container{
  display: block;
  background: #f7f7f7;
  background-position: 50%;
  background-size: cover;
  position: relative;
  overflow: hidden;
  z-index: 0;

  img {
    transition: .8s;
    width: 100%;
    object-fit: cover;
    z-index: -1;
    border-radius: $border-radius-base;

  }
}
}

.list-item-dropdown{
  position: absolute;
  top: 0;
  right: 0;
}
}

.idea-cover__content{
  padding: 1rem;
  position: absolute;
  width: 100%;
  bottom: 0;
  color: white;
  opacity: 0;
  background: linear-gradient(180deg,transparent 0,rgba(0,0,0,.65) 80%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#a6000000",GradientType=0);
  border-radius: $border-radius-base;

.content-first{

}
.content-secondary{
  opacity: 0;
}

a{
  color: #fff;
}
}
.idea-cover__footer{
}
.author{
  img.author-tmb{
    height: 1.5rem;
    border-radius: 1rem;
  }
  span.author-title{
    font-weight: bold;
  }
}

}

.size-715{
  padding-bottom: 71.5%;
}

.idea-cover:hover {
.idea-cover__tmb-container img{
  transform: scale(1.05);
  transition: .8s;
}
.idea-cover__content{
  opacity: 1;
}
}
</style>