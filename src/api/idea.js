import axios from '@/axios'

/**
 * idea client server processing
 */
export const getIdea = (ideaHid, options = {}) => {
    const defaultOptions = {
        include: 'ideaDates,ideaPrice,ideaItineraries,photos',
    }
    const opt = { ...defaultOptions, ...options }

    return new Promise ((resolve, reject) => {
        axios.get(`/ideas/${ideaHid}`, {
            params: opt
        }).then(resp => {
            resolve(resp)
        }).catch(e => {
            reject(e)
        });
    });
}

/**
 * idea client server processing
 */
export const getIdeas = async (options = {}) => {
    const defaultOptions = {
        page: 1,
        limit: 40,
        filters: {},
        sort: 'default',
        sortDirection: 'default',
        include: 'price,author'
    }
    const opt = { ...defaultOptions, ...options }

    return new Promise ((resolve, reject) => {
        axios.get('/ideas', {
            params: opt
        }).then(resp => {
            resolve(resp)
        }).catch(e => {
            reject(e)
        });
    });
}
export const getSectionExamples = async (sectionSlug) => {
    return new Promise( (resolve, reject) => {
        axios.get(`/ideas/sectionExamples/${sectionSlug}`, {
            params: {
                sectionSlug
            }
        }).then( resp => {
            resolve(resp)
        }).catch ( e => {
            reject(e);
        });


    })
}

export const putIdea = async (idea) => {
    return new Promise( (resolve, reject) => {
        axios.patch(`/ideas/${idea.id}`, idea ).then( resp => {
            if (resp.status === 200 || resp.status === 201) {
                if(resp.data.data.id !== null ){
                    resolve(resp.data.data);
                }
            }
            reject()
        }).catch( e => {
            reject(e)
        })
    });
}

export const publish = async (idea) => {
    return new Promise( (resolve, reject) => {
        axios.patch(`/candidates/${idea.id}/publish`).then( resp => {
            resolve(resp)
        }).catch ( e => {
            reject(e)
        })
    })
}

export const unPublish = async (idea) => {
    return new Promise((resolve, reject) => {
        axios.patch(`/candidates/${idea.id}/un_publish`).then( resp => {
            resolve(resp)
        }).catch ( e => {
            reject(e)
        })
    })
}

export default  {
    getIdea,
    getIdeas,
    getSectionExamples,
    putIdea,
    publish,
    unPublish
}
