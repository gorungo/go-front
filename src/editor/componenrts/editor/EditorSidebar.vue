<template>
    <div>
        <div class="sidebar__title">
            {{title}}
        </div>
        <div class="sidebar__actions-wrap">
            <editor-sidebar-active
                @click="setActiveSection(null)"
                :active="sectionIsActive(null)"
            />
            <div v-for="(section) in sections" :key="section.slug">
                <editor-sidebar-action-item
                    @click="toggleExpandSection(section)"
                    :status="section.status"
                    :dusk="'section-' + section.slug"
                >{{section.title}}</editor-sidebar-action-item>
                <div v-if="sectionIsExpanded(section) && section.sections.length > 0">
                    <ul class="aiu">
                        <editor-sidebar-action-list-item
                            @click="setActiveSection(subSection)"
                            v-for="(subSection) in section.sections"
                            :key="subSection.slug"
                            :active="sectionIsActive(subSection)"
                            :status="subSection.status"
                            :dusk="'section-' + subSection.slug"
                        >{{subSection.title}}</editor-sidebar-action-list-item>
                    </ul>
                </div>
            </div>
            <div class="lis" v-if="links.length">
                <hr/>
                <editor-sidebar-link
                    v-for="link in links"
                    :link="link"
                    :key="link.title"
                    :dusk="'section-' + link.dusk ? link.dusk: ''"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import EditorSidebarActionItem from "./EditorSidebarActionItem";
    import EditorSidebarActionListItem from "./EditorSidebarActionListItem";
    import EditorSidebarLink from "./EditorSidebarLink";
    import EditorSidebarActive from "./EditorSidebarActive";


    export default {
        name: "EditorSidebar",

        components: {EditorSidebarActive, EditorSidebarLink, EditorSidebarActionItem, EditorSidebarActionListItem},

        props: {
            title: String,
            sections: Array,
            expandedSections: Array,
            activeSection: Object,
            links: {
                type: Array,
                default: () => {
                  return []
                },
            },
        },

        data(){
            return {}
        },

        computed: {

        },

        methods: {
            toggleExpandSection(section){
                this.$emit('toggleExpandSection', section);
            },

            setActiveSection(section){
                this.$emit('setActiveSection', section);
            },

            sectionIsExpanded(section){
                return this.expandedSections.indexOf(section.slug) > -1;
            },

            sectionIsActive(section){
                if(section){
                    return this.activeSection ? section.slug === this.activeSection.slug : false;
                }else{
                    return this.activeSection ? false : true;
                }

            },

        }
    }
</script>

<style scoped lang="scss">

    // sidebar title zo7v
    .sidebar__title {
        color: rgb(34, 34, 34);
        font-weight: 800;
        font-size: 26px;
        line-height: 1.6rem;
        padding: 1.5rem 1.5rem 2rem;
    }

    // actions wrap gj8hr
    .sidebar__actions-wrap {
        position: relative;
        padding-bottom: 24px;
        padding-right: 12px;
        padding-left: 12px;
    }
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
            border-width: initial;
            border-style: none;
            border-color: initial;
            border-image: initial;
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
                            border-color: rgb(0, 132, 137);
                            color: rgb(0, 132, 137);
                        }
                    }

                }
            }
        }
    }

    // actions item ul qnm18
    .aiu {
        padding-left: 0px;
        margin-block-start: 0px;
        margin-bottom: 0px;
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

    .lis{
        .lisl{
            -webkit-box-align: center;
            min-height: 40px;
            display: flex;
            align-items: center;
            border-radius: 8px;
            padding: 8px 12px;
        }
        .lisll{
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
        }
    }
</style>
