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
 * ideas resource
 */
export const getIdeas = async (options = {}) => {
    const defaultOptions = {
        page: 1,
        limit: 40,
        filters: {},
        sort: 'default',
        sortDirection: 'default',
        include: 'price,author,futureDates'
    }
    const opt = { ...defaultOptions, ...options }
    return axios.get('/ideas', {params: opt})
}

/**
 * ideas resource
 */
export const getIdeasOfUser = async (userId, options = {}) => {
    const defaultOptions = {
        page: 1,
        limit: 40,
        filters: {},
        sort: 'default',
        sortDirection: 'default',
        include: 'price,author'
    }
    const opt = { ...defaultOptions, ...options }
    return axios.get(`/users/${userId}/ideas`, {params: opt})
}


/**
 * ideas resource
 */
export const createAndGetEmptyIdea = async (userId, options = {}) => {
    const defaultOptions = {
        page: 1,
        limit: 40,
        filters: {},
        sort: 'default',
        sortDirection: 'default',
        include: 'price,author'
    }
    const opt = { ...defaultOptions, ...options }
    return axios.get(`/users/${userId}/ideas/createAndGetEmpty`, {params: opt})
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

export const putIdea = async (idea, options = {}) => {
    const defaultOptions = {}
    const opt = { ...defaultOptions, ...options }
    return  axios.patch(`/ideas/${idea.hid}`, idea, {params: opt} );
}

/**
 * delete idea
 */
export const deleteIdea = async (ideaHid, options = {}) => {
    const defaultOptions = {}
    const opt = { ...defaultOptions, ...options }
    return axios.delete(`/ideas/${ideaHid}`, {params: opt})
}

export const publish = async (ideaHid) => {
    return axios.patch(`/ideas/${ideaHid}/publish`)
}

export const unPublish = async (ideaHid) => {
    return axios.patch(`/ideas/${ideaHid}/unPublish`)
}

export default  {
    getIdea,
    getIdeas,
    getIdeasOfUser,
    createAndGetEmptyIdea,
    deleteIdea,
    getSectionExamples,
    putIdea,
    publish,
    unPublish
}
