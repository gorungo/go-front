export default {
    meta: {
        title: 'Gorungo',
        description: 'Ideas for a great time. Travel, self-develop, make the world a better place',

        titles: {
            'Home' : '1000 ideas how to spend free time',
            'Confidential' : 'Privacy policy',
            'Login': 'Login',
            'Register': 'Register',
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
        title: 'Idea',
        description: 'Description',
        itinerary: 'Itinerary',
        author: 'Author',
        bookingInfo: 'How to book',
        bookingInfoDefault: 'Call us on the contact phone or write to Whatsapp',
        bookingContacts: 'Contacts',
        noBookingContacts: 'No contacts',
        siteIntroText: '1000 ideas how to spend free time',
        notFound: 'Nothing was found',
        noTitle: 'No title',
        noDescription: 'No description',
        published: 'Published',
        notPublished: 'Not published',
        defaultAuthorIntro: 'Welcome to the world of adventure!',
        dates: 'Dates',
        noDates: 'No nearest dates',
        showContacts: 'Show contacts',
        priceFrom: 'From ',
        allIdeas: 'All ideas',
    },

    auth: {
        pageTitle: 'Sign in',
        labelEmail: 'Email',
        labelPassword: 'Password',
        labelPasswordConfirmation: 'Repeat password',
        labelInvite: 'Invite',
        btnSignIn: 'Sign in',
        btnRegister: 'Register',
        btnContinue: 'Continue',
        login: 'Login',
        register: 'Register',
        loginAction: 'Login',
        logout: 'Logout',
        logoutAction: 'Logout',
        welcome: 'Welcome',
        passwordSetSuccess: 'Password changed successfully',
        logoutSuccess: 'you have successfully logged out!',
        error: {
            badCredentials: 'Bad credentials'
        },
        byMail: 'Enter by email',
        byPhone: 'Enter by phone',

        phoneEnterYourCode: 'Enter you code:',
        phoneWrongCode: 'You entered an incorrect code',
        phoneMaxCodeAttempts: 'You have exceeded the maximum number of code attempts',
        phoneSendCodeAgain: 'Send new code',
        notRegistered: 'Not registered?',
        authTypeNotAvailable: 'This authorization type is currently not available'
    },

    actionResults: {
        loginSuccess: 'welcome',
        logoutSuccess: 'you have successfully logged out',
        createSuccess: 'successfully created',
        saveSuccess: 'successfully saved',
        deleteSuccess: 'successfully deleted',
        error: 'there was an error',
    },

    itemActions: {
        edit: 'edit'
    },

    text: {
        from: 'from',
        showMore: 'show more',
        day: 'day',
        loading: 'loading',
        select: 'select',
        notFound: 'nothing is found, please change request',
        clear: 'clear',
        apply: 'apply',
        remove: 'remove',
        notification: 'notification',
        status: 'status',
        published: 'published',
        draft: 'draft',
        create: 'create',
        at: 'at',
        startAt: 'Starting at',
        cancel: 'Cancel',
        toCancel: 'Cancel',
        close: 'Close',
        typeInCountry: 'Start search in countries list',
        allRights: 'Gorungo 2021',
        more: 'more',
        updateAvailable: 'Есть обновление для приложения Gorungo',
        updateApp: 'Установить',
    },

    filter: {
        selectCategory: 'Select category',
        placeBtnTitle: 'select place',
        placeDialogTitle: 'select place',
        nearby: 'nearby',
        typePlaceName: 'type in place name',

        dateBtnTitle: 'select date',
        dateDialogTitle: 'select date',
    },

    datePicker: {
        direction: 'ltr',
        format: 'dd/mm/yyyy',
        separator: ' - ',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        clearLabel: 'Clear',
        weekLabel: 'W',
        customRangeLabel: 'Custom Range',
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        firstDay: 1
    },

    office: {
        'manageIdeas': 'Ideas managing',
        'noIdeas': 'No ideas',
    },

    account: {
        titles: {
            // route names
            Account: 'Account settings',
            AccountShort: 'Profile',
            AccountMain: 'User information',
            AccountPassword: 'Password',
            AccountBookingInfo: 'For booking'
        },

        labelPhoto: 'User photo',
        labelPhotoChange: 'Change user photo',
        labelName: 'Name',
        labelNameDescription: 'Имя',
        labelUserName: 'User name (login)',
        labelUserNameDescription: 'User name (login)',
        labelEmail: 'Email',
        labelSite: 'Site',
        labelPhone: 'Phone',
        labelDescription: 'Description',

        labelPasswordOld: 'Old password',
        labelPasswordNew: 'New password',
        labelPasswordConfirmation: 'Confirm new password',

        labelSex: 'Sex',
        labelSexNotSelected: 'Not selected',
        labelSexMale: 'Male',
        labelSexFemale: 'Female',

        booking: {
            infoTitle: 'Booking information',
            infoPlaceholder: 'Расскажите, какие действия нужно произвести, чтобы записаться на участие',
            contactsTitle: 'Contacts',
            contactsPlaceholder: 'Контактные данные для записи',
        }
    },

    tapNav: {
        home: 'Home',
        account: 'Account',
        login: 'Login',
    },

    errors: {
        notFound404: 'Page not found',
        noInternetConnection: 'No internet connection',
    }

}
