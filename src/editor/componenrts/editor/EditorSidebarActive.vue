<template>
    <div class="ai" :class="{active}" dusk="section-active">
        <button class="aib" @click="$emit('click')">
            <div class="aibw">
                <div class="aibt">
                    {{title}}
                </div>
                <div class="iconw">
                    <div class="iv8a4">
                        <div class="knc0o7" v-if="visibleAndPublished">
                            <svg viewBox="0 0 52 52" fill="currentColor" fill-opacity="0" stroke="var(--success)" stroke-width="3" focusable="false" aria-label="Завершено" role="img" stroke-linecap="round" stroke-linejoin="round" style="height: 100%; width: 100%; display: block; overflow: visible;">
                                <path d="m19.1 25.2 4.7 6.2 12.1-11.2"></path>
                            </svg>
                        </div>
                        <div class="knc0o7" v-if="!visibleAndPublished" style="width: 20px; height: 20px; border-color: var(--orange); var(--orange);">
                            <svg viewBox="0 0 24 24" role="img" aria-label="Резюме не опубликовано" focusable="false" style="height: 10px; width: 10px; display: block; fill: rgb(255, 180, 0);">
                                <path d="M10.47 16.03L10.07 2c-.03-.52.16-1.02.52-1.4.34-.36.83-.58 1.34-.6H12c1.07 0 1.94.87 1.94 1.94V2l-.4 14.03c-.03.54-.47.97-1 .97h-1.07c-.54 0-.98-.43-1-.97zM12 20c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
    export default {
        name: "EditorSidebarActive",

        props: {
            active: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            title(){
                return this.$t('text.status') + ' :' + this.visibleAndPublished ? this.$t('text.published') : this.$t('text.draft');
            },

            visibleAndPublished(){
                return this.item ? this.item.attributes.published && this.item.attributes.active : false;
            },

            ...mapGetters('IdeaEditor', ['item', 'readyToPublish']),

        },


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
        margin-bottom: 20px;
        border: 2px solid #ebebeb;

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
                    line-height: 16px;
                    font-size: 12px;
                    font-weight: bold;
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
                            border-color: var(--success);
                            color: var(--success);
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
