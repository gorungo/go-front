export const sections = [
    {
        title: 'Основное',
        slug: 'main',
        status: 'not-filled',
        lockIfNotFilledPrevious: false,
        sections: [
            {
                title: 'Срок публикации',
                slug: 'deadline',
                status: 'not-filled',
                rules: ['required'],
            },
            {
                title: 'Контакты',
                slug: 'contacts',
                status: 'not-filled',
                rules: ['required'],
            },
        ],
    },
    {
        title: 'Подробнее',
        slug: 'more',
        status: 'not-filled',
        lockIfNotFilledPrevious: true,
        sections: [
            {
                title: 'Видео-резюме',
                slug: 'youtube',
                status: 'not-filled',
                rules: [],
            },
        ],
    },

];
