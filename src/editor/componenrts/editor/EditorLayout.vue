<template>
    <div class="editor">
        <div class="editor-wrap">
            <div class="sbr">
                <div>
                    <div class="sbrw">
                        <div id="editor-sidebar" class="vside">
                            <div class="t95nj1">
                                <slot name="aside"></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <main>
                <div id="editor-main" class="ndz4je3">
                    <div id="editor-main-content" :class="classes.mainContent">
                        <div id="editor-main-header" class="oajvy7h">
                            <div class="ctt5">
                                <button @click="navToggle" id="side-nav-toggle" aria-expanded="true" type="button" class="q9vjik">
                                <span class="hmsj">
                                    <svg viewBox="0 0 16 16" role="img" aria-label="Переключить навигацию" focusable="false" style="height: 14px; width: 14px; display: block; fill: var(--blue);">
                                        <path d="m15.25 12.5a.75.75 0 01-.75.75h-13a .75.75 0 010-1.5h13a .75.75 0 01 .75.75zm-.75-5.75h-13a .75.75 0 100 1.5h13a .75.75 0 000-1.5zm-13-3.5h13a .75.75 0 000-1.5h-13a .75.75 0 100 1.5z" fill-rule="evenodd"></path>
                                    </svg>
                                </span>
                                </button>
                            </div>
                            <div class="lfv8">
                                <slot name="default-title"></slot>
                            </div>
                        </div>
                        <div class="bavikz">
                            <div class="ctz3yu">
                                <div class="ad89yyb">
                                    <div class="xdzmr2">
                                        <slot name="default"></slot>
                                    </div>
                                </div>
                                <slot name="footer"></slot>
                            </div>
                        </div>
                    </div>
                    <div id="editor-examples" :class="classes.examples">
                        <div class="eexw">
                            <div>
                                <div class="exhe">
                                    <div class="exheco">Примеры</div>
                                </div>
                            </div>
                            <div class="c143gl">
                                <div class="exitemw">
                                    <slot name="examples"></slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    </div>
</template>

<script>

    export default {
        name: "EditorLayout",
        props: {
            hasExamples: {
                type: Boolean,
                sidebar: Boolean,
                default: false,
            }
        },

        data() {
            return {
                breakPoints: {
                    lg: 1128,
                    md: 744
                },
                mobileMode: false,
                classes: {
                    examples: 'pjq3gx', // examples panel
                    mainContent: 'mct', // center main content
                },

                modalContent: 'null',
            }
        },
        created() {
            window.addEventListener("resize", this.resizeHandler);
        },
        destroyed() {
            window.removeEventListener("resize", this.resizeHandler);
        },
        mounted(){
            this.resizeHandler();
            this.toggleExamplesClasses();
        },

        watch: {
            mobileMode(mobileMode){
                if(mobileMode){
                    this.toMobileMode();
                }else{
                    this.toNormalMode();
                }
            },

            sidebar(visible){
              if(visible){
                this.showSidebar();
              }else{
                this.hideSidebar();
              }
            },


            hasExamples(){
                this.toggleExamplesClasses();
            }
        },

        methods: {
            resizeHandler(){
                if(window.innerWidth < this.breakPoints.lg){
                    this.mobileMode = true;
                    this.$emit('toMobileMode', true);
                }else{
                    this.mobileMode = false;
                    this.$emit('toMobileMode', false);
                }

                // use hiddenSidebarMenuMode to handle classes update
            },

            toNormalMode(){
                this.hideMobileHeaderBtn();
                this.showSidebar();
            },

            toMobileMode(){
                this.showMobileHeaderBtn();
                this.hideSidebar();

            },

            showMobileHeaderBtn(){
                const mainHeader = document.getElementById('editor-main-header');
                // show mobile menu btn
                mainHeader.classList.add('oajvy7h');
                mainHeader.classList.remove('ukv23f');
            },

            hideMobileHeaderBtn(){
                const mainHeader = document.getElementById('editor-main-header');
                // hide mobile menu btn
                // ukv when
                mainHeader.classList.add('ukv23f');
                mainHeader.classList.remove('oajvy7h');
            },

            hideSidebar(){
                const sidebar = document.getElementById('editor-sidebar');
                sidebar.classList.add('hside');
                sidebar.classList.remove('vside');

                const editor = document.getElementById('editor-main');
                editor.classList.add('fwlph');
                editor.classList.remove('ndz4je3');

                this.$emit('sidebarVisibility', false);
            },

            showSidebar(){
                const sidebar = document.getElementById('editor-sidebar');
                //const mainHeader = document.getElementById('editor-main-header');
                sidebar.classList.add('vside');
                sidebar.classList.remove('hside');


                const editor = document.getElementById('editor-main');
                editor.classList.add('ndz4je3');
                editor.classList.remove('fwlph');

                this.showMobileHeaderBtn();
                this.$emit('sidebarVisibility', true);
            },

            navToggle(){
                const sidebar = document.getElementById('editor-sidebar');
                if(sidebar.classList.contains('vside')){
                    this.hideSidebar();
                }else{
                    this.showSidebar();
                }
            },

            toggleExamplesClasses(){
                if(this.hasExamples){
                    this.classes.examples = 'ehd1ie1';
                    this.classes.mainContent = 'mct';

                }else{
                    this.classes.examples = 'pjq3gx';
                    this.classes.mainContent = 'h27d6';

                }
            },

            showExamplesModal(){
              //
            },

        }
    }
</script>

<style scoped lang="scss">

    @media (min-width: 744px) {
        .editor{
            .gjnbsm {
            }
            .bavikz {
                overflow-x: unset !important;
            }
            .ehd1ie1 {
                left: calc(100vw - 320px) !important;
            }
            .ndz4je3 {
                display: flex !important;
                width: calc(100vw - 230px) !important;
            }
        }

    }
    @media (min-width: 1128px){
        .editor {
            .vside {
                top: 0px !important;
                height: 100% !important;
                width: 230px !important;
                background-color: rgb(247, 247, 247) !important;
                box-shadow: rgba(0, 0, 0, 0.05) -4px 0px 20px inset !important;
                transition: left 0.5s ease 0s !important;
            }

            .t95nj1 {
                animation-name: keyframe_1dl9c3r !important;
                animation-duration: 800ms !important;
                animation-timing-function: ease !important;
                animation-fill-mode: forwards !important;
            }

            .ndz4je3 {
                display: flex !important;
                width: calc(100vw - 230px) !important;
            }

            .ehd1ie1 {
                left: calc((100vw - 230px) - 320px) !important;
            }

        }
    }

    //
    .editor{
        position: relative !important;
        min-height: calc(100vh - 560px) !important;


        .editor-wrap{
            height: calc(100vh - 70px) !important;
            position: relative !important;
            color: rgb(34, 34, 34) !important;
            overflow: hidden !important;
        }
        //sidebar gjnbsm
        .sbr{
            left: 0;
            transition: left 300ms ease 0s;

            // fzuy66
            .sbrw{
                width: 230px;
                z-index: 3001;
                color: rgb(0, 0, 0);
                // visible sidebar
                .vside{
                    left: 0;
                    position: absolute;
                    margin-top: 1px;
                    z-index: 11;
                    top: 0;
                    height: 100%;
                    width: 230px;
                    background-color: rgb(247, 247, 247);
                    box-shadow: rgba(0, 0, 0, 0.05) -4px 0px 20px inset;
                    border-width: 0;
                    border-style: initial;
                    border-color: initial;
                    border-image: initial;
                    transition: left 0.5s ease 0s;
                }
                .hside{
                    position: absolute;
                    margin-top: 1px;
                    z-index: 11;
                    top: 0;
                    height: 100%;
                    width: 230px;
                    background-color: rgb(247, 247, 247) ;
                    box-shadow: rgba(0, 0, 0, 0.05) -4px 0px 20px inset;
                    left: -230px;
                    border-width: 0;
                    border-style: initial;
                    border-color: initial;
                    border-image: initial;
                    transition: left 0.5s ease 0s;
                }
                // hidden sidebar
                .wc2b1h6{
                    position: absolute;
                    margin-top: 1px;
                    z-index: 11;
                    top: 0;
                    height: 100%;
                    width: 230px;
                    background-color: rgb(247, 247, 247);
                    box-shadow: rgba(0, 0, 0, 0.05) -4px 0px 20px inset;
                    left: -230px;
                    border-width: 0;
                    border-style: initial;
                    border-color: initial;
                    border-image: initial;
                    transition: left 0.5s ease 0s;

                }
                //t95nj1
                .t95nj1{
                    height: 100%;
                    overflow-x: hidden;
                    overflow-y: scroll;
                }
            }
        }
        // content --------------
        // content with examples dig64q4
        .mct{
            left: 0;
            position: relative;
            width: 100vw;
            height: 100%;
            overflow: hidden;
            transition: width 0.5s ease 0s;
        }
        // content no examples
        .h27d6 {
            left: 0;
            position: relative;
            width: 100vw;
            height: 100%;
            overflow: hidden;
            transition: width 0.5s ease 0s;
        }
        @media (min-width: 744px){
            .h27d6 {
                width: calc(100vw) !important;
            }
            .mct{
                width: calc(100vw - 320px) !important;
            }
        }
        @media (min-width: 1128px){
            .h27d6 {
                width: calc(100vw - 230px) !important;
            }
            .mct{
                width: calc((100vw - 230px) - 320px) !important;
            }
        }

        // main content inside
        @media (min-width: 744px){
            .xdzmr2 {
                max-width: 480px;
            }
        }
        @media (min-width: 1128px){
            .xdzmr2 {
                max-width: 600px;
            }
        }

        .xdzmr2 {
            width: 100%;
            height: max-content;
        }

        // end content --------------

        .ndz4je3{
            position: absolute;
            display: flex;
            height: 100%;
            width: 100vw;
            left: 230px;
            overflow: hidden;
            transition: left 0.5s ease 0s;
        }
        .fwlph{
            position: absolute;
            display: flex;
            left: 0px;
            height: 100%;
            width: 100vw;
            overflow: hidden;
            transition: left 0.5s ease 0s;
        }

        // main header
        .oajvy7h {
            -webkit-box-align: center;
            display: flex;
            align-items: center;
            text-align: left;
            height: 71px;
            top: 0;
            z-index: 9;
            background-color: rgb(255, 255, 255);
            width: 100%;
            left: 230px;
            padding: 12px;
            transition: left 0.5s ease 0s;
        }
        @media (min-width: 744px){
            .oajvy7h {
                position: absolute !important;
                left: 0px !important;
            }
        }
        @media (min-width: 1128px){
            .ctt5 {
                display: none !important;
            }
        }

        // main header mobile
        .ukv23f {
            -webkit-box-align: center;
            display: flex;
            align-items: center;
            text-align: left;
            height: 71px;
            left: 0;
            z-index: 9;
            background-color: rgb(255, 255, 255);
            width: 100%;
            position: fixed;
            padding: 12px;
            transition: left 0.5s ease 0s;
        }
        .q9vjik {
            -webkit-appearance: none;
            display: inline-block;
            color: rgb(34, 34, 34);
            cursor: pointer;
            border-radius: 8px;
            border-image: initial;
            outline: 0;
            margin: 0;
            padding: 10px;
            background: rgb(255, 255, 255);
            border-style: solid;
            border-width: 1px;
            border-color: rgb(221, 221, 221);
        }
        // header title wrap
        .lfv8 {
            float: left;
            margin-left: 12px;
            margin-right: 12px;
            line-height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: rgb(34, 34, 34);
            font-weight: 800;
            font-size: 16px;
        }
        //main content
        .bavikz{
            top: 70px;
            position: absolute;
            width: 100%;
            height: calc(100% - 70px);
            overflow-x: scroll;
            .ctz3yu{
                height: 100%;
                width: 100%;
                .ad89yyb{
                    -webkit-box-pack: center;
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    height: calc(100% - 70px);
                    overflow-y: scroll;
                    padding: 40px 24px 94px;
                    background: white;
                }
            }
        }



        //examples ehd1ie1
        .ehd1ie1{
            position: absolute;
            left: 100vw ;
            display: inline;
            width: 320px;
            height: 100%;
            transition: left 0.5s ease 0s;
        }
        // hiden examples pjq3gx
        .pjq3gx {
            position: absolute !important;
            left: 100vw !important;
            display: inline !important;
            width: 320px !important;
            height: 100% !important;
            transition: left 0.5s ease 0s !important;
        }

        // examples header ha6v47
        .exhe{
            -webkit-box-align: center ;
            display: flex;
            align-items: center;
            text-align: left;
            height: 70px;
            background-color: rgb(255, 255, 255);
            width: 100%;
            padding: 24px;

            .exheco {
                float: left;
                line-height: 20px;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: rgb(34, 34, 34);
                font-weight: 800;
                font-size: 16px;
            }

        }

        // editor examples eqmd9g
        .eexw{
            width: 100%;
            height: 100%;
            border-left: 4px solid rgb(247, 247, 247);
            background-color: white;
            .c143gl{
                -webkit-box-pack: center ;
                display: flex;
                justify-content: center;
                position: absolute;
                width: 100%;
                top: 70px;
                height: calc(100% - 70px);
                overflow-y: scroll;

                // loigjs
                .exitemw{
                    height: max-content;
                    width: 280px;
                    margin: 40px 0px;
                }
            }
        }
        .eb{
            -webkit-box-align: center;
            font-size: 12px;
            line-height: 16px;
            align-items: center;
            height: 50px;
            bottom: 90px;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
            color: rgb(0, 0, 0);
            font-weight: 800;
            left: 50%;
            position: absolute;
            text-align: center;
            white-space: nowrap;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.95);
            border-radius: 100px;
            border-style: none;
            padding: 8px;
            transition: bottom 0.2s ease 0s;
        }
        .ebh {
            bottom: 0;
            transition: bottom 0.2s ease 0s;
        }
        @media (min-width: 744px){
            .eb {
                bottom: 0;
                transition: bottom 0.2s ease 0s;
            }
        }
        .wlymrds {
            cursor: pointer;
            position: relative;
            touch-action: manipulation;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            font-weight: inherit;
            color: inherit;
            display: block;
            text-align: inherit;
            height: 100%;
            width: 100%;
            border-radius: 0;
            outline: none;
            transition: box-shadow 0.2s ease 0s, transform 0.1s ease 0s;
            background: transparent;
            margin: 0;
            padding: 0;
            text-decoration: none;
        }

        .hgs47m {
            display: table;
            width: 100%;
            border-spacing: 0;
        }

        .yl6 {
            -webkit-box-pack: center;
            -webkit-box-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        .ni9axhe {
            display: table-cell;
            vertical-align: middle;
        }
        .ejfg4u {
            display: table-cell;
            width: 100%;
            vertical-align: middle;
        }
        .w4q4qv {
            font-weight: 600;
            font-size: 12px;
            line-height: 16px;
            padding: 0 16px;
        }
    }

</style>
