<template>
    <footer class="ef">
        <div class="efp">
            <div class="footer_progress__base-line"></div>
            <div class="footer_progress__progress-line" :style="`width: ${progress}%;`"></div>
        </div>
        <div class="efco">
            <div class="btn-left" @click="$emit('toPreviousSection')">
                Назад
            </div>
            <div class="eft">
                <div class="eftw">
                    <button class="eftb" @click="$emit('toFirstNotFilledSection')">{{footerTitle}}</button>
                </div>
            </div>
            <div class="btn-right" @click="$emit('toNextSection')">
                Далее
            </div>
        </div>
    </footer>
</template>

<script>

    import {pluralize} from '@/js/go';

    export default {
        name: "EditorFooter",

        props: {
            title: String,
            activeSection: Object,
            totalSectionsCount: Number,
            requiredSectionsCount: Number,
            notFilledSectionsCount: Number,
            notFilledRequiredSectionsCount: Number,
        },

        data() {
            return {}
        },

        computed: {
            progress() {
                if (this.notFilledRequiredSectionsCount) {
                    return parseInt((this.requiredSectionsCount - this.notFilledRequiredSectionsCount) / this.requiredSectionsCount  * 100);
                }
                if (this.notFilledSectionsCount) {
                    return parseInt((this.totalSectionsCount - this.notFilledSectionsCount) / this.totalSectionsCount  * 100);
                }
                return 0;
            },

            footerTitle(){
                if (!this.title){
                    if(this.notFilledRequiredSectionsCount > 0){
                        return `Заполните ${pluralize(this.notFilledRequiredSectionsCount, ['раздел', 'раздела', 'разделов'])} основной секции для публикации`;
                    } else {
                        //
                    }
                    return `Вы можете заполнить еще ${pluralize(this.notFilledSectionsCount, ['раздел', 'раздела', 'разделов'])}`;
                }

                return this.title;
            }
        },

        methods: {
            //
        }
    }
</script>

<style scoped lang="scss">

    // ufusb29
    .ef {
        -webkit-box-pack: center;
        -webkit-box-direction: normal;
        -webkit-box-orient: vertical;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 8px;
        height: 70px;
        background-color: rgb(255, 255, 255);
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        padding: 1rem;
        width: 100%;
        transition: background 0.3s ease 0s, left 0.5s ease 0s;

    }
    @media (min-width: 744px) {
        .ef{
            padding: 2rem !important;
        }
    }

    .efp {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;

        .footer_progress__base-line {
            width: 100%;
            height: 2px;
            border-top: 2px solid #e3e3e3;
        }

        .footer_progress__progress-line {
            width: 10%;
            height: 2px;
            margin-top: -2px;
            border-top: 2px solid #007aff;
        }
    }

    .efco {
        -webkit-box-align: center;
        -webkit-box-pack: justify;
        -webkit-box-direction: normal;
        -webkit-box-orient: horizontal;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        // left button r3mz4x3
        .btn-left {
            cursor: pointer !important;
            display: inline-block !important;
            position: relative !important;
            text-align: center !important;
            width: auto !important;
            font-size: 14px !important;
            line-height: 18px !important;
            font-weight: 600 !important;
            padding: 7px 15px !important;
            color: rgb(34, 34, 34) !important;
            margin: 0 !important;
            text-decoration: none !important;
            border-radius: 8px !important;
            border-width: 1px !important;
            border-style: solid !important;
            outline: none !important;
            transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
            border-color: rgb(34, 34, 34) !important;
            background: rgb(255, 255, 255) !important;
        }

        // right button y3vfv
        .btn-right {
            cursor: pointer;
            display: inline-block;
            position: relative;
            text-align: center;
            width: auto;
            font-size: 14px;
            line-height: 18px;
            font-weight: 600;
            padding: 8px 16px;
            color: rgb(255, 255, 255);
            margin: 0;
            text-decoration: none ;
            border-radius: 8px;
            outline: none;
            transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
            border-width: initial;
            border-style: none;
            border-color: initial;
            border-image: initial;
            background: rgb(34, 34, 34) ;
        }

        // meddle text wrap x0fg6n
        .eft {
            padding: 16px;
            text-align: center;
            .eftw {
                font-size: 12px !important;
                color: rgb(118, 118, 118) !important;
                line-height: 1rem;
                .eftb {
                    font-size: inherit;
                    font-family: inherit;
                    font-style: inherit;
                    line-height: inherit;
                    -webkit-appearance: none;
                    cursor: pointer;
                    user-select: auto;
                    color: rgb(113, 113, 113);
                    font-weight: 100;
                    font-variant: inherit;
                    background: transparent;
                    border: none;
                    margin: 0;
                    padding: 0;
                    text-decoration: none;
                }
            }
        }
    }
</style>
