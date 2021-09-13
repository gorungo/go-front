<template>
  <footer id="footer" class="footer sections-gap-vertical">
    <div class="footer__logo">
      <span class="footer__logo_dropdown" @click="isVisible = !isVisible">
      <span>{{$t('text.allRights')}}</span>
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.9895 9.70193L11.9999 15.7123L18.0103 9.70193L16.5961 8.28772L11.9999 12.8839L7.40372 8.28772L5.9895 9.70193Z"/>
      </svg>
    </span>
    </div>
  <div v-if="isVisible" class="container footer__content">
    <h2>Приветствуем вас в Gorungo</h2>
    <p>Проект находится в разработке, но мы надеемся, что это не помешает вам уже сейчас находить какие-то идеи, и делать жизнь более наполненной.</p>
    <p>Если вы являетесь автором идей, и хотите разместить их, то напишите на email: gorungo.ru@gmail.com</p>
    <p>Хорошего времяпровождения!</p>
    <a href="https://sobe.ru/na/gorungo_project" class="btn btn-outline-primary">
      Помоги проекту в развитии!
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.7929 14.7929L18.5 15.5L22 12L18.5 8.5L17.7929 9.20711L20.0858 11.5L2 11.5L2 12.5L20.0857 12.5L17.7929 14.7929Z"/>
      </svg>
    </a>
  </div>
  </footer>
</template>

<script>

export default {
  name: "AppFooter",
  data(){
    return {
      isVisible: false,
    }
  }

}
</script>

<style scoped lang="scss">
  #footer{
    border-top: 1px solid var(--border-color);
    background-color: var(--background-color);
  }

  .footer__logo{
    display: flex;
    justify-content: center;
    padding: 3rem 0;
  }

  .footer__logo_dropdown{
    display: inline-flex;
    padding: 0.5rem 1rem;
    align-items: center;
    border-radius: 1rem;
    background: var(--border-color);
    font-weight: bold;
    column-gap: 0.5rem;
    transition: all 200ms ease;
    cursor: pointer;
    svg{
      fill: var(--border-color-dark);
    }
    &:hover{
      transform: scale(1.05);
      svg{
        fill: var(--text-color);
      }
    }


  }
  .footer__content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
    width: 100%;
    height: 300px;
    z-index: 1000;

  }

</style>
