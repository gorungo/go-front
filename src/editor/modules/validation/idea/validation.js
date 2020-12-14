import messages from './validation-messages'
export default function isValidAttribute(sectionSlug, item) {

    switch (sectionSlug) {
        case 'title':
            if(item.attributes.title == null || item.attributes.title === ''){
                return [messages.notFilled];
            }
            if(item.attributes.title.length < 10){
                return [messages.min10];
            }
            if(item.attributes.title.length > 100){
                return [messages.max100];
            }

            return [];

        case 'description':
            if(item.attributes.description == null || item.attributes.description === ''){
                return [messages.notFilled];
            }
            if(item.attributes.description.length < 100){
                return [messages.min100];
            }

            return [];

        case 'city':
            if(item.attributes.city_id == null || item.attributes.city_id === 0){
                return [messages.notFilled];
            }
            return [];

        case 'deadline':
            if(item.attributes.localised_deadline !== null){
                const from = item.attributes.localised_deadline.split(".")
                const f = new Date(from[2], from[1] - 1, from[0])
                if(f < Date.now()){
                    return [messages.notFilled];
                }
            }else{
                return [messages.notFilled];
            }
            return [];


        case 'job-positions':
            if (item.relationships.jobPositions != null && item.relationships.jobPositions.length > 0) {
                return [];
            }
            return [messages.notFilled];
        case 'contacts':
            return item.relationships.profile.attributes.phone != null ? [] : [messages.notFilled];

        case 'parameters':
            if(item.relationships.meta == null){
                return [messages.notFilled];
            }
            if( item.relationships.meta.attributes.job_type === 0
                || item.relationships.meta.attributes.industry === 0
            ){
                return [messages.notFilled];
            }

            return [];

        case 'recruiter-profile':
            if(item.attributes.recruiter_candidate === 1){
                if(item.relationships.candidateProfile == null){
                    return [messages.notFilled];
                }
                if(item.relationships.candidateProfile.attributes.email == null){
                    return [messages.notFilled];
                }
                if(item.relationships.candidateProfile.attributes.first_name == null){
                    return [messages.notFilled];
                }
                if(item.relationships.candidateProfile.attributes.last_name == null){
                    return [messages.notFilled];
                }
                if(item.relationships.candidateProfile.attributes.b_date == null){
                    //return [messages.notFilled];
                }

                if(item.relationships.candidateProfile.attributes.phone == null){
                    //return [messages.notFilled];
                }

                return [];
            }else{
                return [messages.notFilled];
            }

        case 'profile':
            if(item.attributes.recruiter_candidate === 0){
                if(item.relationships.user.relationships.profile == null){
                    return [messages.notFilled];
                }
                if(item.relationships.user.attributes.email == null){
                    //return [messages.notFilled];
                }
                if(item.relationships.user.relationships.profile.attributes.first_name === ''){
                    return [messages.notFilled];
                }
                if(item.relationships.user.relationships.profile.attributes.last_name === ''){
                    return [messages.notFilled];
                }
                // if(item.relationships.user.relationships.profile.attributes.b_date == null){
                //     return [messages.notFilled];
                // }
                //
                // if(item.relationships.user.relationships.profile.attributes.phone == null){
                //     return [messages.notFilled];
                // }

                if(item.relationships.meta.attributes.gender === 0
                    && item.relationships.meta.attributes.age === 0
                    && item.relationships.meta.attributes.qualification === 0
                    && item.relationships.meta.attributes.experience === 0
                ){
                    return [messages.notFilled];
                }
                if(item.attributes.isStudent == 1){
                    if(item.relationships.candidateStudentMeta.attributes.job_type_id === 0 ){
                        return [messages.notFilled];
                    }
                    if(item.relationships.candidateStudentMeta.attributes.education_institute_id === 0){
                        return [messages.notFilled];
                    }
                    if(item.relationships.candidateStudentMeta.attributes.education_institute_id === 'other'){
                        if(item.relationships.candidateStudentMeta.attributes.other_institute === null){
                            return [messages.notFilled];
                        }
                    }
                    if(item.relationships.candidateStudentMeta.attributes.course_study === null){
                        return [messages.notFilled];
                    }
                }

                return [];
            }else{
                return [messages.notFilled];
            }

        case 'job':
            if(item.attributes.recruiter_candidate === 1){
                if(item.relationships.candidateProfile == null){
                    return [messages.notFilled];
                }

                if(item.relationships.candidateProfile.attributes.company_id == null){
                    return [messages.notFilled];
                }
                if(item.relationships.candidateProfile.attributes.job_id == null){
                    return [messages.notFilled];
                }

                return [];
            }else{
                return [messages.notFilled];
            }


        case 'education':
            return item.attributes.education != null ? [] : [messages.notFilled];

        case 'hobby':
            return item.attributes.hobby != null ? [] : [messages.notFilled];

        case 'achievements':
            return item.attributes.achievements != null ? [] : [messages.notFilled];

        case 'conditions':
            return item.attributes.conditions != null ? [] : [messages.notFilled];

        case 'dreams':
            return item.attributes.dreams != null ? [] : [messages.notFilled];

        case 'youtube':
            return item.attributes.youtube != null ? [] : [messages.notFilled];

        case 'experience':
            return item.relationships.experience !== null && item.relationships.experience.length > 0 ? [] : [messages.notFilled];

        case 'personal-qualities':
            return item.relationships.personalities !== null && item.relationships.personalities.length > 0 ? [] : [messages.notFilled];

        case 'competencies':
            return item.relationships.competencies !== null && item.relationships.competencies.length > 0 ? [] : [messages.notFilled];

        case 'photos':
            return item.relationships.photos !== null && item.relationships.photos.length > 0 ? [] : [messages.notFilled];

        default:
            return [];

    }
}
