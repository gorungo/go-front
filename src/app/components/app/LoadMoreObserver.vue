<template>
    <div id="load-more"></div>
</template>

<script>
    export default {
        name: "LoadMoreObserver",

        data(){
            return {
                observer: null,
            }
        },

        mounted(){
            this.observer = new IntersectionObserver(([entry]) => {
                if(entry && entry.isIntersecting){
                    this.$emit('intersect')
                }
            })

            this.observer.observe(this.$el)
        }
    }
</script>

<style scoped>
    #load-more{
        height: 200px;
    }
</style>