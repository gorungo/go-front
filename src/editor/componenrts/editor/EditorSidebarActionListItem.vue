<template>
    <div class="ai" :class="{active}" @click="$emit('click')" :dusk="dusk">
        <button class="aib">
            <div class="aibw">
                <div class="aibt">
                    <slot></slot>
                </div>
                <div class="iconw">
                    <div class="iv8a4">
                        <div v-if="status === 'ok'">
                            <svg viewBox="0 0 32 32" role="img" aria-label="Завершено" focusable="false" style="height: 20px; width: 20px; display: block; fill: var(--primary);">
                                <path d="m21.71 13.71-6 6c-.39.39-1.02.39-1.41 0l-3-3c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l2.29 2.29 5.29-5.29c.39-.39 1.02-.39 1.41 0s .39 1.02 0 1.41m-5.71-13.71c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16-7.16-16-16-16"></path>
                            </svg>
                        </div>
                        <div v-if="status === 'warning' || status === 'not-filled'" style="width: 20px; height: 20px; color: rgb(255, 180, 0);">
                            <svg viewBox="0 0 24 24" role="img" aria-label="Этап не завершен" focusable="false" style="height: 20px; width: 20px; display: block; fill: var(--orange);">
                                <path d="m12 24c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12z"></path>
                                <path d="m12 16.13c.62 0 1.13.5 1.13 1.13s-.5 1.13-1.13 1.13-1.13-.5-1.13-1.13.5-1.13 1.13-1.13zm-.06-11.12c-.65.03-1.14.58-1.11 1.23l.38 7.41c.01.2.17.36.37.36h.83c.2 0 .36-.16.37-.36l.38-7.41c0-.03 0-.03 0-.06 0-.65-.52-1.17-1.17-1.17-.03 0-.03 0-.06 0z" fill="#fff"></path></svg>
                        </div>
                        <div v-if="status === 'locked'" style="width: 20px; height: 20px; color: rgb(176, 176, 176);">
                            <svg viewBox="0 0 24 24" role="img" aria-label="Этот этап заблокирован" focusable="false" style="height: 75%; width: 75%; display: block; fill: rgb(176, 176, 176);">
                                <path d="m17.1403105 10.3322131v-1.83599021c-.0044371-2.48293439-2.0786109-4.49407316-4.6371478-4.49622289h-1.0063254c-2.56010616.00215385-4.6349284 2.01566919-4.63714782 4.50012925v1.83208385c-1.0387857.0478557-1.85657082.8775506-1.85968948 1.886773v6.8825219c0 1.0485082.87586388 1.898492 1.95629672 1.898492h10.08740658c1.0804328 0 1.9562967-.8499838 1.9562967-1.898492v-6.8825219c-.0031187-1.0092224-.8209038-1.8389173-1.8596895-1.886773zm-7.90518974-1.83599021c.00267117-2.2124746 1.58801224-2.19412124 2.26171654-2.19488726h1.0063254c.7450523.00084715 2.2590036-.05221743 2.2617165 2.19488726v1.83599021h-5.52975844z"></path>
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
        name: "EditorSidebarActionListItem",

        props: {
            status: String,
            active: {
                type: Boolean,
                default: false,
            },
            dusk: {
                type: String,
                default: null,
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
