export default {
    meta: {
        title: 'Gorungo',
        description: 'Идеи для отличного времяпровождения. Путешествуем, учимся, развиваемся, делаем мир лучше!',

        titles: {
            Home : '1000 идей как провести время!',
            Confidential : 'Политика конфиденциальности',
            Login : 'Вход',
            Register : 'Регистрация',

            // account
            Account: 'Настройки аккаунта',
            AccountMenu: 'Меню',
            AccountMain: 'Личная информация',
            AccountBookingInfo: 'Для бронирования',
            AccountPassword: 'Пароль',
        },
    },

    home: {
        sections: {
            art: 'Заниматься творчеством',
            nature: 'Побывать на природе',
            nearby: 'В ближайшее время'
        }
    },

    idea: {
        title: 'Идея',
        itinerary: 'План мероприятия',
        description: 'Чем будем заниматься?',
        author: 'Автор',
        bookingInfo: 'Как участвовать',
        dates: 'Ближайшие даты',
        bookingInfoDefault: 'Позвоните нам по контактному телефону или напишите в Whatsapp',
        bookingContacts: 'Контакты',
        noBookingContacts: 'Контакты не указаны',
        siteIntroText: '1000 идей как провести время',
        notFound: 'Ничего не нашли',
        noTitle: 'Нет заголовка',
        noDescription: 'Нет описания',
        published: 'Опубликовано',
        notPublished: 'Не опубликовано',
        defaultAuthorIntro: 'Добро пожаловать в мир приключений!',
        showContacts: 'Показать контакты',
        noDates: 'Нет ближайших дат',
        priceFrom: 'От ',
        ideaNotFound: 'Нет информации об идее',
        allIdeas: 'Все идеи',
    },

    auth: {
        pageTitle: 'Вход',
        labelEmail: 'Емэил',
        labelPassword: 'Пароль',
        labelPasswordConfirmation: 'Подтвердите пароль',
        labelInvite: 'Инвайт',
        btnSignIn: 'Войти',
        btnRegister: 'Зарегистрироваться',
        btnContinue: 'Продолжить',
        login: 'Вход',
        register: 'Регистрация',
        notRegistered: 'Ещё не зарегистрарованы?',
        loginAction: 'Войти',
        logout: 'Выход',
        logoutAction: 'выйти',
        welcome: 'Добро пожаловать',
        logoutSuccess: 'Вы успешно вышли с сайта',
        passwordSetSuccess: 'Пароль успешно изменен',
        error: {
            badCredentials: 'Некорректные данные для входа'
        },
        byMail: 'Вход по email',
        byPhone: 'Вход по номеру телефона',

        phoneEnterYourCode: 'Введите код, который мы выслали на номер:',
        phoneLoginInfo: 'После того как вы нажмёте «Продолжить», Gorungo отправит вам сообщение с кодом подтверждения. За отправку сообщения или передачу данных может взиматься плата. После подтверждения номера телефона вы сможете использовать его для входа в Gorungo.',
        phoneWrongCode: 'Вы ввели неправильный код',
        phoneMaxCodeAttempts: 'Вы превысили максимальное количество попыток ввода кода',
        phoneSendCodeAgain: 'Выслать новый код',
        authTypeNotAvailable: 'Данный вид входа на сайт сейчас недоступен'
    },

    actionResults: {
        loginSuccess: 'добро пожаловать',
        logoutSuccess: 'вы успешно вышли с сайта',
        createSuccess: 'успешно создано',
        saveSuccess: 'успешно сохранено',
        deleteSuccess: 'успешно удалено',
        error: 'произошла ошибка',
    },

    itemActions: {
        edit: 'редактировать'
    },

    text: {
        from: 'от',
        showMore: 'подробнее',
        day: 'День',
        loading: 'Загрузка',
        select: 'Выбрать',
        notFound: 'Ничего не найдено, измените запрос',
        clear: 'Очистить',
        apply: 'Применить',
        remove: 'Удалить',
        notification: 'Уведомление',
        status: 'Статус',
        published: 'Опубликовано',
        draft: 'Черновик',
        create: 'Создать',
        place: 'Место',
        allRights: 'Gorungo 2021',
        goBack: 'Перейти назад',
        at: 'в',
        startAt: 'Начало в',
        cancel: 'Отмена',
        toCancel: 'Отменить',
        close: 'Закрыть',
        typeInCountry: 'Начните поиск по списку стран'

    },

    filter: {
        selectCategory: 'Выберите категорию',
        placeBtnTitle: 'Выберите место',
        placeDialogTitle: 'Выберите место',
        nearby: 'Рядом со мной',
        typePlaceName: 'Введите название места',

        dateBtnTitle: 'Выберите дату',
        dateDialogTitle: 'Выберите дату',
    },

    datePicker: {
        direction: 'ltr',
        format: 'dd/mm/yyyy',
        separator: ' - ',
        applyLabel: 'Применить',
        cancelLabel: 'Отменить',
        clearLabel: 'Очистить',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        monthNames: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        firstDay: 1
    },

    office: {
        'manageIdeas': 'Управление идеями',
        'noIdeas': 'Нет идей',
    },

    account: {
        titles: {
            // route names
            Account: 'Настройки аккаунта',
            AccountShort: 'Аккаунт',
            AccountMain: 'Личная информация',
            AccountPassword: 'Пароль',
            AccountBookingInfo: 'Для бронирования',
        },

        labelPhoto: 'Фотография профиля',
        labelPhotoChange: 'Сменить фото профиля',
        labelName: 'Имя',
        labelNameDescription: 'Имя',
        labelUserName: 'Имя пользователя',
        labelUserNameDescription: 'Имя пользователя',
        labelEmail: 'Email',
        labelSite: 'Сайт',
        labelPhone: 'Телефон',
        labelDescription: 'Описание',
        labelPasswordOld: 'Старый пароль',
        labelPasswordNew: 'Новый пароль',
        labelPasswordConfirmation: 'Повторите новый пароль',
        labelSex: 'Пол',
        labelSexNotSelected: 'Не указан',
        labelSexMale: 'Мужчина',
        labelSexFemale: 'Женщина',

        booking: {
            infoTitle: 'Информация',
            infoPlaceholder: 'Расскажите, какие действия нужно произвести, чтобы записаться на участие',
            contactsTitle: 'Контакты',
            contactsPlaceholder: 'Контактные данные для записи',
            whatsappTitle: 'WhatsApp',
            whatsappMask: '7XXXXXXXXXX (только цифры)',
            whatsappPlaceholder: 'Укажите номер в приложении Whatsapp. Сюда будет приходить информация о бронировании'
        }
    },

    tapNav: {
        home: 'Главная',
        account: 'Профиль',
        login: 'Войти'
    },

    booking: {
        modalTitle: 'Бронирование',
        bookingPlaceIn: 'Бронирование места в',
        labelPeopleCount: 'Количество участников',
        bookingDateTime: 'Дата и время',
        buttonBook: 'Забронировать',
        bookingDescription: ''
    },

    errors: {
        noInternetConnection: 'Нет подключения к интернету',
        notFound404: 'Запрашиваемая страница не найдена'
    }
}
