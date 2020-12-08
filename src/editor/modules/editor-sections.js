export default {
    /**
     * Get parent of active section
     * @param sections
     * @param activeSection
     * @returns {null|*}
     */
    getParentSection(sections, activeSection) {
        if (sections && activeSection) {
            for (let i = 0; i < sections.length; i++) {
                for (let m = 0; m < sections[i].sections.length; m++) {
                    if (activeSection.slug === sections[i].sections[m].slug) {
                        return sections[i];
                    }
                }
            }
        }
        return null;
    },

    /**
     * Get parent of section by chuld slug
     * @param sections
     * @param slug
     * @returns {null|*}
     */
    getParentSectionBySlug(sections, slug) {
        if (sections && slug) {
            for (let i = 0; i < sections.length; i++) {
                for (let m = 0; m < sections[i].sections.length; m++) {
                    if (slug === sections[i].sections[m].slug) {
                        return sections[i];
                    }
                }
            }
        }
        return null;
    },

    /**
     * Get parent index of active section
     * @param sections
     * @param activeSection
     * @returns {null|number}
     */
    getParentSectionIndex(sections, activeSection) {
        if (sections && activeSection) {
            for (let i = 0; i < sections.length; i++) {
                for (let m = 0; m < sections[i].sections.length; m++) {
                    if (activeSection.slug === sections[i].sections[m].slug) {
                        return i;
                    }
                }
            }
        }
        return null;
    },

    /**
     * Get [parentIndex, childIndex] array from active section
     * @param sections
     * @param activeSection
     * @returns {number[]|*[]}
     */
    getParentChildSectionIndex(sections, activeSection) {
        if (sections && activeSection) {
            for (let i = 0; i < sections.length; i++) {
                for (let m = 0; m < sections[i].sections.length; m++) {
                    if (activeSection.slug === sections[i].sections[m].slug) {
                        return [i, m];
                    }
                }
            }
        }

        return [null, null];
    },

    /**
     * Return section before active section
     * @param sections
     * @param activeSection
     * @returns {number[]|*[]}
     */
    previousSection(sections, activeSection) {
        const [parentSectionIndex, childSectionIndex] = this.getParentChildSectionIndex(sections, activeSection);
        if (activeSection && parentSectionIndex !== null && childSectionIndex !== null) {
            if (childSectionIndex > 0) {
                return sections[parentSectionIndex].sections[childSectionIndex - 1];
            }
            if (childSectionIndex === 0) {
                if (parentSectionIndex > 0 && sections[parentSectionIndex - 1].sections.length) {
                    return sections[parentSectionIndex - 1].sections[sections[parentSectionIndex - 1].sections.length - 1];
                }
                if (parentSectionIndex === 0) {
                    return null;
                }
            }

        }
        return null;
    },

    /**
     * Return section after active section
     * @param sections
     * @param activeSection
     * @returns {number[]|*[]}
     */
    nextSection(sections, activeSection) {
        const [parentSectionIndex, childSectionIndex] = this.getParentChildSectionIndex(sections, activeSection);
        if (activeSection && parentSectionIndex !== null && childSectionIndex !== null) {
            if (childSectionIndex < sections[parentSectionIndex].sections.length - 1) {
                return sections[parentSectionIndex].sections[childSectionIndex + 1];
            }
            if (childSectionIndex === sections[parentSectionIndex].sections.length - 1) {
                if (parentSectionIndex < sections.length - 1 && sections[parentSectionIndex + 1].sections.length) {
                    return sections[parentSectionIndex + 1].sections[0];
                }
                if (parentSectionIndex === sections.length - 1) {
                    return null;
                }
            }

        }
        return null;
    },

    /**
     * Return section after active section
     * @param sections
     * @param slug
     * @returns {number[]|*[]}
     */
    findSectionBySlug(sections, slug) {
        if (sections && slug) {
            for (let i = 0; i < sections.length; i++) {
                for (let m = 0; m < sections[i].sections.length; m++) {
                    if (slug === sections[i].sections[m].slug) {
                        return sections[i].sections[m];
                    }
                }
            }
        }
        return null;
    },

    firstNotFilledSection(sections){
        for (let i = 0; i < sections.length; i++) {
            for (let m = 0; m < sections[i].sections.length; m++) {
                if (sections[i].sections[m].status !== 'ok') {
                    return sections[i].sections[m];
                }
            }
        }
    },

    /**
     * Count of not filled sections
     * @param sections
     * @returns {number}
     */
    notFilledSectionsCount(sections) {
        let count = 0;
        for (let i = 0; i < sections.length; i++) {
            for (let m = 0; m < sections[i].sections.length; m++) {
                if (sections[i].sections[m].status !== 'ok') {
                    count++;
                }
            }
        }
        return count;
    },

    /**
     * Count of not filled required sections
     * @param sections
     * @returns {number}
     */
    notFilledRequiredSectionsCount(sections) {
        let count = 0;
        for (let i = 0; i < sections.length; i++) {
            for (let m = 0; m < sections[i].sections.length; m++) {
                if (sections[i].sections[m].status !== 'ok' && sections[i].sections[m].rules.indexOf('required') > -1) {
                    count++;
                }
            }
        }
        return count;
    },

    /**
     * Count of all sections
     * @param sections
     * @returns {number}
     */
    totalSectionsCount(sections) {
        let count = 0;
        for (let i = 0; i < sections.length; i++) {
            for (let m = 0; m < sections[i].sections.length; m++) {
                count++;
            }
        }
        return count;
    },

    /**
     * Count of all sections
     * @param sections
     * @returns {number}
     */
    requiredSectionsCount(sections) {
        let count = 0;
        for (let i = 0; i < sections.length; i++) {
            for (let m = 0; m < sections[i].sections.length; m++) {
                if(sections[i].sections[m].rules.indexOf('required') > -1) {
                    count++;
                }
            }
        }
        return count;
    },


    /**
     *
     * @param sections
     * @param item
     * @param validateFn
     */
    validatedSections(sections, item, validateFn) {
        for (let i = 0; i < sections.length; i++) {

            let validSubSectionsCount = 0;
            for (let m = 0; m < sections[i].sections.length; m++) {
                const errors = validateFn(sections[i].sections[m].slug, item);
                sections[i].sections[m].errors = errors;
                sections[i].sections[m].status = errors.length ? 'not-filled' : 'ok'
                if (sections[i].sections[m].status === 'ok') {
                    validSubSectionsCount++;
                }
            }
            if (sections[i].sections.length === validSubSectionsCount) {
                sections[i].status = 'ok';
            } else{
                sections[i].status = 'not-filled'
            }

            if (i > 0 && sections[i].lockIfNotFilledPrevious && sections[i - 1].status !== 'ok') {
                sections[i].status = 'locked';
            }else if (i > 0 && sections[i].lockIfNotFilledPrevious && sections[i - 1].status === 'ok'){
                //sections[i].status = 'not-filled'
            }

        }

        return sections;
    },
}

