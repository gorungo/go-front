<template>
  <div class="card card-body card-auth" :class="{'has-error': shake}" key="AuthLoginPhone">
    <h1 class="mb-2">{{ $t('auth.pageTitle') }}</h1>
    <template v-if="!authenticated">
      <div v-if="!phoneVerification" key="authPhone">
        <div class="phone" v-if="country">
          <button type="button" @click="showDialog" class="btn phone__code-btn">{{country ? country.code : $t('text.select')}}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.9895 9.70193L11.9999 15.7123L18.0103 9.70193L16.5961 8.28772L11.9999 12.8839L7.40372 8.28772L5.9895 9.70193Z" fill="#2E3A59"/>
            </svg>
          </button>
          <div class="phone__number">
            <span class="phone__dial-code">{{country.dial_code}}</span>
            <input
                type="phone"
                max="1"
                class="form-control phone__input"
                name="phone"
                :value="phone"
                @input="handlePhoneInput"
                @keypress="isNumber"
            />
          </div>
        </div>
        <div class="mt-2 form-group">
          <button id="buttonContinue1" :disabled="!readyToSubmit" type="button" @click="handleContinue" class="btn btn-primary auth__submit">
            {{$t('auth.btnContinue')}}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.7929 14.7929L18.5 15.5L22 12L18.5 8.5L17.7929 9.20711L20.0858 11.5L2 11.5L2 12.5L20.0857 12.5L17.7929 14.7929Z"/>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="phoneVerification && attempts < maxCodeAttempts" key="authPhoneCode">
        <p>{{$t('auth.phoneEnterYourCode')}} {{phone ? phone : '+7**********'}}</p>
        <p v-if="phoneVerification.attributes.code">Ваш код {{phoneVerification.attributes.code}}</p>
        <p v-if="wrongCode" class="wrong-code">{{$t('auth.phoneWrongCode')}}</p>
        <div class="phone-code">
          <input :value="code.c1" class="form-control phone-code__input" maxlength="1" @keypress="handleDigitInput" id="c1" name="c1"/>
          <input :value="code.c2" class="form-control phone-code__input" maxlength="1" @keypress="handleDigitInput" id="c2" name="c2"/>
          <input :value="code.c3" class="form-control phone-code__input" maxlength="1" @keypress="handleDigitInput" id="c3" name="c3"/>
          <input :value="code.c4" class="form-control phone-code__input" maxlength="1" @keypress="handleDigitInput" id="c4" name="c4"/>
          <input :value="code.c5" class="form-control phone-code__input" maxlength="1" @keypress="handleDigitInput" id="c5" name="c5"/>
          <input :value="code.c6" class="form-control phone-code__input" maxlength="1" @keypress="handleDigitInput" id="c6" name="c6"/>
        </div>
        <div class="mt-2 form-group">
          <button id="buttonSendCode" :disabled="!readyToSendCode" type="button" @click="handleCheckCode" class="btn btn-primary auth__submit">
            <span class="button-content" v-if="!loading">
              {{$t('auth.btnContinue')}}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7929 14.7929L18.5 15.5L22 12L18.5 8.5L17.7929 9.20711L20.0858 11.5L2 11.5L2 12.5L20.0857 12.5L17.7929 14.7929Z"/>
              </svg>
            </span>
            <loading smallest v-else/>
          </button>
        </div>
      </div>
      <div v-if="attempts === maxCodeAttempts" key="authResendCode">
        <p>{{$t('auth.phoneMaxCodeAttempts')}}</p>
        <div class="mt-2 form-group">
          <button id="buttonResendCode" :disabled="loading" type="button" @click="handleReSendCode" class="btn btn-primary auth__submit">
            <span class="button-content" v-if="!loading">
              {{$t('auth.phoneSendCodeAgain')}}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7929 14.7929L18.5 15.5L22 12L18.5 8.5L17.7929 9.20711L20.0858 11.5L2 11.5L2 12.5L20.0857 12.5L17.7929 14.7929Z"/>
              </svg>
            </span>
            <loading smallest v-else />
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <success/>
    </template>
    <app-dialog
        :title="$t('filter.dateDialogTitle')"
        :visible.sync="dialogIsVisible"
        @closed="handleDialogClosed"
        v-if="dialogIsVisible"
        fullscreen
    >
      <input v-model="filter" class="form-control" :placeholder="$t('text.typeInCountry')"/>
      <div class="list" v-if="filteredCounties.length > 0">
        <button @click="handleSelectCountry(country)" class="list__item" v-for="country in filteredCounties" :key="country.code">
          <span>
              <span class="list__item--flag">{{country.flag}}</span><span class="list__item--code">{{country.dial_code}}</span><span class="list__item--title">{{country.name}}</span>
          </span>
        </button>
      </div>
      <div class="mt-2 text-secondary" v-else>
        {{$t('text.notFound')}}
      </div>
    </app-dialog>
  </div>
</template>

<script>
import {countries} from "@/js/country-codes"
import AppDialog from "@/app/components/app/AppDialog"
import {firstToUpperCase} from "@/js/go"
import {mapActions, mapState, mapGetters} from 'vuex'
import Logger from "@/js/Logger";
import Loading from "@/app/components/app/Loading";
import Success from "@/app/components/app/Success";


export default {
  name: "PhoneVerification",
  components: {Success, Loading, AppDialog},
  props: {
    mode: {
      type: String,
      default: 'check',
      loading: false,
    }
  },

  data(){
    return {
      defaultCountryName: 'Russia',
      filter: '',
      country: null,
      phone: '',
      code: {
        c1: null,
        c2: null,
        c3: null,
        c4: null,
        c5: null,
        c6: null,
      },

      dialogIsVisible: false,
      shake: false,
      attempts: 0,
      maxCodeAttempts: 3,
      wrongCode: false,
      loading: false,
    }
  },

  async mounted(){
    this.setDefaultCountry(this.defaultCountryName)
  },

  computed: {
    ...mapState('Auth', ['phoneVerification']),
    ...mapGetters('Auth', ['authenticated']),

    countries(){
      return countries
    },

    readyToSubmit(){
      return this.phone.length > 9 && !this.loading
    },

    readyToSendCode(){
      return this.verificationCode.length === 6 && !this.loading
    },

    filteredCounties(){
      return countries.filter( c => {
        return c.name.indexOf(firstToUpperCase(this.filter)) === 0
      })
    },

    clearedPhone(){
      return this.country.dial_code.replace('+', '') + this.phone
    },

    verificationCode(){
      return '' + this.code.c1 + this.code.c2 + this.code.c3 + this.code.c4 + this.code.c5 + this.code.c6
    }

  },

  methods: {
    ...mapActions('Auth', [
      'getActiveVerification',
      'sendVerificationCode',
      'checkVerificationCode',
      'clearPhoneVerification',
    ]),

    showDialog(){
      this.dialogIsVisible = true
    },

    hideDialog(){
      this.dialogIsVisible = false
    },

    handleSelectCountry(country){
      this.country = country
      this.hideDialog()
    },

    handleDialogClosed(){

    },

    clearCode(){
      this.code = {
        c1: null,
            c2: null,
            c3: null,
            c4: null,
            c5: null,
            c6: null,
      }
      this.wrongCode = false
      this.attempts = 0
    },

    async sendCode(){
      this.clearCode()
      try {
        this.loading = true
        this.sendVerificationCode({
          data: {
            phone: this.clearedPhone,
            mode: this.mode,
          }
        }).then( res => {
          res.data?.type === 'old' ?
              this.attempts = this.phoneVerification.attributes.attempts :
              this.attempts = 0
        })
        this.loading = false

      } catch (e) {
        Logger.log(e)
        this.loading = false
      }
    },


    handleContinue(){
      this.sendCode()
    },

    async handleCheckCode(){
      if (this.attempts >= this.maxCodeAttempts) return
      try {
        this.loading = true
        let res = await this.checkVerificationCode({
          data: {
            phone: this.clearedPhone,
            code: this.verificationCode,
            mode: this.mode,
            wrongCode: false,
          }
        })
        if(res.data.status === 'ok'){
          this.$emit('verified', res.data)
        } else {
          this.wrongCode = true
          this.$emit('notVerified')
          this.shake = true
          this.wrongCode = true
          this.attempts++;
          setTimeout(() => {
            this.shake = false
          }, 1000)
        }
        this.loading = false
      } catch (e) {
        Logger.log(e)
        this.loading = false
      }
    },

    async handleReSendCode(){
      this.clearCode()
      await this.clearPhoneVerification()
      await this.sendCode()
    },

    setDefaultCountry(country){
      this.filter = country
      this.country = countries.find( c => {
        return c.name.indexOf(firstToUpperCase(country)) === 0
      })
    },

    clearPhone(phone){
      return phone.replace(this.country.dial_code, '').replaceAll('-', '').replaceAll(' ', '').
      replace('(', '').replace(')', '')
    },

    handlePhoneInput(e){
      this.phone = this.clearPhone(e.target.value)
    },

    handleDigitInput(e){
      if(!this.isNumber(e)) return

      this.code[e.target.name] = e.key
      this.wrongCode = false

      switch (e.target.name){
        case 'c1':
          document.getElementById('c2').focus()
          break;
        case 'c2':
          document.getElementById('c3').focus()
          break;
        case 'c3':
          document.getElementById('c4').focus()
          break;
        case 'c4':
          document.getElementById('c5').focus()
          break;
        case 'c5':
          document.getElementById('c6').focus()
          break;
        case 'c6':
          document.getElementById('buttonSendCode').focus()
          break;

      }
    },

    isNumber: function(e) {
      e = (e) ? e : window.event;
      let charCode = (e.which) ? e.which : e.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        e.preventDefault();
      } else {
        return true;
      }
    }
  }
}
</script>

<style lang="scss">
.phone{
  display: flex;
  align-items: center;
  .phone__number{
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--border-color-dark);
    font-size: 18px;
    width: 100%;
    &:focus-within{
      border-color: var(--primary);
    }

    .phone__input{
      border: none;
      font-size: 18px;
      font-weight: bold;
      background-color: white !important;

      &:focus{
        outline: none;
      }
    }

  }

  .phone__dial-code{
    padding: 0.25rem;
    font-weight: bold;

  }
  .phone__code-btn{
    padding: 0;
  }




}

.phone-code{
  display: flex;
  column-gap: 0.5rem;
  justify-content: center;
  .phone-code__input{
    width: 3rem;
    padding: 0.5em 0.1em;
    text-align: center;
    font-weight: bold;
    font-size: 28px;
  }
}


.el-dialog__body{
  overflow: auto;
  height: 90%;
}

.list__item--flag, .list__item--code{
  margin-right: 0.75rem;
}

.list__item--code{
  font-weight: bold;
}


</style>
