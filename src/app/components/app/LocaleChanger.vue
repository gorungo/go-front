<template>
  <div class="locale-changer">
    <select :value="locale" @input="handleLocaleSelect">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
import {validLocales} from '@/js/locale'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'LocaleChanger',
  data () {
    return {
      langs: validLocales,
      lang: '',
    }
  },

  mounted(){
    this.lang = this.locale;
  },

  computed: {
    ...mapState('App', ['locale'])
  },

  watch: {
    locale(val){
      this.lang = val;
    }
  },

  methods: {
    ...mapActions('App', ['setLocale']),
    handleLocaleSelect(e){
      this.lang = e.target.value
      this.$root.$i18n.locale  = this.lang
      this.setLocale(this.lang)
    }
  }
}
</script>