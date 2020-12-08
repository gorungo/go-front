<template>
    <div class="bd" @click="$emit('click')" :dusk="dusk">
        <button class="d4wefjx">
            <div class="hgs47m">
                <div class="ejfg4u">
                    <slot></slot>
                </div>
                <div class="ni9axhe">
                    <div class="iv8a4">
                        <div class="knc0o7" v-if="status === 'ok'">
                            <svg viewBox="0 0 52 52" fill="currentColor" fill-opacity="0" stroke="#008489" stroke-width="3" focusable="false" aria-label="Завершено" role="img" stroke-linecap="round" stroke-linejoin="round" style="height: 100%; width: 100%; display: block; overflow: visible;">
                                <path d="m19.1 25.2 4.7 6.2 12.1-11.2"></path>
                            </svg>
                        </div>
                        <div class="knc0o7" v-if="status === 'warning' || status === 'not-filled'" style="width: 20px; height: 20px; border-color: var(--orange); var(--orange);">
                            <svg viewBox="0 0 24 24" role="img" aria-label="Этап не завершен" focusable="false" style="height: 10px; width: 10px; display: block; fill: rgb(255, 180, 0);">
                                <path d="M10.47 16.03L10.07 2c-.03-.52.16-1.02.52-1.4.34-.36.83-.58 1.34-.6H12c1.07 0 1.94.87 1.94 1.94V2l-.4 14.03c-.03.54-.47.97-1 .97h-1.07c-.54 0-.98-.43-1-.97zM12 20c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                            </svg>
                        </div>
                        <div class="knc0o7" v-if="status === 'expanded'" style="width: 20px; height: 20px; border-color: rgb(176, 176, 176); color: rgb(176, 176, 176);"><svg viewBox="0 0 24 24" role="img" aria-label="Раздел развернут. Кликните, чтобы свернуть." focusable="false" style="height: 100%; width: 100%; display: block; fill: rgb(176, 176, 176);"><rect height="2" rx="1" width="12" x="6" y="11"></rect></svg></div>
                        <div class="knc0o7" v-if="status === 'locked'" style="width: 20px; height: 20px; border-color: rgb(176, 176, 176); color: rgb(176, 176, 176);"><svg viewBox="0 0 24 24" role="img" aria-label="Этот этап заблокирован" focusable="false" style="height: 75%; width: 75%; display: block; fill: rgb(176, 176, 176);"><path d="m17.1403105 10.3322131v-1.83599021c-.0044371-2.48293439-2.0786109-4.49407316-4.6371478-4.49622289h-1.0063254c-2.56010616.00215385-4.6349284 2.01566919-4.63714782 4.50012925v1.83208385c-1.0387857.0478557-1.85657082.8775506-1.85968948 1.886773v6.8825219c0 1.0485082.87586388 1.898492 1.95629672 1.898492h10.08740658c1.0804328 0 1.9562967-.8499838 1.9562967-1.898492v-6.8825219c-.0031187-1.0092224-.8209038-1.8389173-1.8596895-1.886773zm-7.90518974-1.83599021c.00267117-2.2124746 1.58801224-2.19412124 2.26171654-2.19488726h1.0063254c.7450523.00084715 2.2590036-.05221743 2.2617165 2.19488726v1.83599021h-5.52975844z"></path></svg></div>
                    </div>
                </div>
            </div>
        </button>
    </div>
</template>

<script>
    export default {
        name: "EditorSidebarActionItem",

        props: {
            status: String,
            dusk: {
                type: String,
                default: null,
            }
        }
    }
</script>

<style scoped lang="scss">
    // actions item
    .bd {
        min-height: 40px;
        display: flex;
        border-radius: 8px;
        padding: 12px;

        // button
        .d4wefjx {
            color: rgb(72, 72, 72);
            width: 100%;
            height: 100%;
            text-align: inherit;
            cursor: pointer;
            display: block;
            text-decoration: none;
            border: none;
            padding: 0;
            background: transparent;

            .hgs47m {
                display: table;
                width: 100%;
                border-spacing: 0;

                // text
                .ejfg4u {
                    display: table-cell;
                    width: 100%;
                    vertical-align: middle;
                }

                //icon
                .ni9axhe {
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
                margin: 0;
                padding: 0;
                text-decoration: none;

                // wrap
                .hgs47m {
                    display: table !important;
                    width: 100% !important;
                    border-spacing: 0px !important;

                    // text
                    .ejfg4u {
                        display: table-cell !important;
                        width: 100% !important;
                        vertical-align: middle !important;
                    }

                    // icon
                    .ni9axhe {
                        display: table-cell !important;
                        vertical-align: middle !important;
                    }
                }
            }
        }
    }
</style>
