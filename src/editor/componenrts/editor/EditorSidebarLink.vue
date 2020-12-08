<template>
    <div class="ai">
        <button class="aib" @click="goUrl(link.url)" :dusk="dusk">
            <div class="aibw">
                <div class="aibt">
                    {{link.title}}
                </div>
                <div class="iconw">
                    <div class="iv8a4">
                        <div>
                            <svg viewBox="0 0 24 24" role="img" aria-label="Этап не завершен" focusable="false" style="height: 24px; width: 24px; display: block; fill: var(--blue);">
                                <path d="M13.17 13H7V11H13.17L10.59 8.41L12 7L17 12L12 17L10.59 15.59L13.17 13Z"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>

<script>
    export default {
        name: "EditorSidebarLink",

        props: {
            link: Object,
            dusk: {
                type: String,
                default: null,
            }
        },

        methods: {
            goUrl(url){
                window.location.href = url;
            }
        }
    }
</script>

<style scoped lang="scss">
    // actions item .esali
    .ai {
        -webkit-box-align: center;
        min-height: 40px;
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 8px 12px;

        &.active{
            background-color: rgb(235, 235, 235) !important;
        }

        // button .esalib
        .aib {
            color: inherit;
            cursor: pointer;
            display: block;
            text-align: inherit;
            height: 100%;
            width: 100%;
            border: none;
            background: transparent;
            margin: 0;
            padding: 0;
            text-decoration: none;


            .aibw {
                display: table ;
                width: 100% ;
                border-spacing: 0;

                // text
                .aibt {
                    display: table-cell;
                    width: 100%;
                    vertical-align: middle;

                    font-size: 12px;
                    font-weight: bold;
                    line-height: 16px;
                }

                //icon
                .iconw {
                    display: table-cell;
                    vertical-align: middle;

                    .iv8a4 {
                        -webkit-box-align: center;
                        -webkit-box-direction: normal;
                        -webkit-box-orient: horizontal;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .knc0o7 {
                            -webkit-box-pack: center;
                            -webkit-box-align: center;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                            border-width: 2px;
                            border-style: solid;
                            border-image: initial;

                            width: 20px;
                            height: 20px;
                            border-color: var(--primary);
                            color: var(--primary);
                        }
                    }

                }
            }
        }
    }

    // actions item ul
    .qnm18 {
        padding-left: 0;
        margin-block-start: 0;
        margin-bottom: 0;
        list-style: none;
        // ul action item
        .h4l3phe {
            -webkit-box-align: center;
            min-height: 40px;
            display: flex;
            align-items: center;
            background-color: rgb(235, 235, 235);
            border-radius: 8px;
            padding: 8px 12px;

            // button
            ._6lth7f {
                color: inherit;
                cursor: pointer;
                display: block;
                text-align: inherit;
                height: 100%;
                width: 100%;
                background: transparent;
                border-width: initial;
                border-style: none;
                border-color: initial;
                border-image: initial;
                margin: 0;
                padding: 0;
                text-decoration: none;

                // wrap
                .hgs47m {
                    display: table ;
                    width: 100% ;
                    border-spacing: 0;

                    // text
                    .ejfg4u {
                        display: table-cell;
                        width: 100%;
                        vertical-align: middle;
                    }

                    // icon
                    .ni9axhe {
                        display: table-cell;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
