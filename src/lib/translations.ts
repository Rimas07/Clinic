export type Language = "en" | "cs" | "ru";

export interface Translations {
    // Header
    header: {
        clinic: string;
        consultation: string;
        laboratory: string;
        blog: string;
        insurances: string;
        signIn: string;
        signOut: string;
        privacyPolicy: string;
        termsOfUse: string;
    };

    // DNA Poster
    dnaPoster: {
        title: string;
        subtitle: string;
        scheduleNow: string;
        learnMore: string;
    };

    // Health Journey
    healthJourney: {
        title: string;
        description: string;
        primeLocation: string;
        primeLocationDesc: string;
        sameDayBooking: string;
        sameDayBookingDesc: string;
        allInOne: string;
        allInOneDesc: string;
        boardCertified: string;
        boardCertifiedDesc: string;
        extendedHours: string;
        freeParking: string;
        englishSpeaking: string;
        digitalRecords: string;
        bookNow: string;
        virtualTour: string;
        testimonial: string;
        testimonialAuthor: string;
    };

    // Consultation
    consultation: {
        title: string;
        description: string;
        flexibleHours: string;
        flexibleHoursDesc: string;
        expertTeam: string;
        expertTeamDesc: string;
        thoroughExams: string;
        thoroughExamsDesc: string;
        patientCare: string;
        patientCareDesc: string;
        clickToView: string;
        bookNow: string;
        cardiology: string;
        urology: string;
        generalPractitioner: string;
        endocrinology: string;
        orthopedics: string;
        ultrasound: string;
        // Doctor Modal
        about: string;
        experience: string;
        education: string;
        languages: string;
        bookAppointment: string;
        close: string;
    };

    // Insurance
    insurance: {
        title: string;
        description: string;
        instantCoverage: string;
        instantCoverageDesc: string;
        saveUpTo: string;
        saveUpToDesc: string;
        smartInsurance: string;
        smartInsuranceDesc: string;
        buyInsurance: string;
    };

    // Laboratory
    laboratory: {
        title: string;
        description: string;
        scheduleTest: string;
        sectionTitle: string;
        sectionDescription: string;
        bloodTests: string;
        bloodTestsDesc: string;
        urinalysis: string;
        urinalysisDesc: string;
        biochemistry: string;
        biochemistryDesc: string;
        microbiology: string;
        microbiologyDesc: string;
        hormonalTests: string;
        hormonalTestsDesc: string;
        diagnosticPanels: string;
        diagnosticPanelsDesc: string;
        fastResults: string;
        accurateTesting: string;
        modernEquipment: string;
        certifiedLab: string;
    };

    // Gallery
    gallery: {
        title: string;
        description: string;
    };

    // Blog
    blog: {
        title: string;
        intro: string;
        osteoArthritis: string;
        healthyHeart: string;
        avoidFlu: string;
        healthcareCzech: string;
        diabetesDetection: string;
        hypertensionDetection: string;
        closeArticle: string;
        by: string;
        read: string;
    };

    // Footer
    footer: {
        care: string;
        tagline: string;
        support: string;
        connect: string;
        yourName: string;
        submitInquiry: string;
        allRightsReserved: string;
    };
}

export const translations: Record<Language, Translations> = {
    en: {
        header: {
            clinic: "Clinic",
            consultation: "Consultation",
            laboratory: "Laboratory",
            blog: "Blog",
            insurances: "Insurances",
            signIn: "Sign In",
            signOut: "Sign Out",
            privacyPolicy: "Privacy Policy",
            termsOfUse: "Terms of Use",
        },
        dnaPoster: {
            title: "Committed to Your Health Journey",
            subtitle: "Compassionate care and expert services for your well-being.",
            scheduleNow: "Schedule Now",
            learnMore: "Learn More",
        },
        healthJourney: {
            title: "Committed to Your\nHealth Journey",
            description: "Zoryx Clinic is a modern medical center located in Ústí nad Labem, specializing in comprehensive prevention and treatment.\nThe key feature of our clinic is an individual approach to each patient and the use of high-tech equipment for accurate diagnostics, effective treatment, and recovery. All cutting-edge medical innovations are aimed solely at improving the health and well-being of our clients.",
            primeLocation: "Prime Location",
            primeLocationDesc: "City center, easy access",
            sameDayBooking: "Same-Day Booking",
            sameDayBookingDesc: "Get appointment today",
            allInOne: "All-in-One",
            allInOneDesc: "Lab, diagnostics, clinic",
            boardCertified: "Board-certified specialists",
            boardCertifiedDesc: "Expert doctors on-site",
            extendedHours: "Extended hours: 8 AM - 9 PM daily",
            freeParking: "Free parking & metro access (5 min walk)",
            englishSpeaking: "English-speaking staff available",
            digitalRecords: "Digital records & online test results",
            bookNow: "Book Now",
            virtualTour: "Take a Virtual Tour",
            testimonial: "Caring staff and excellent treatment!",
            testimonialAuthor: "Jane Doe",
        },
        consultation: {
            title: "Professional Doctor Consultations & Examinations",
            description: "Our experienced medical team provides comprehensive consultations and thorough examinations.\nWe take the time to understand your health concerns and develop personalized treatment plans.",
            flexibleHours: "Flexible Hours",
            flexibleHoursDesc: "Extended hours to fit your schedule",
            expertTeam: "Expert Team",
            expertTeamDesc: "Qualified and experienced specialists",
            thoroughExams: "Thorough Exams",
            thoroughExamsDesc: "Comprehensive health assessments",
            patientCare: "Patient Care",
            patientCareDesc: "Personalized attention and care",
            clickToView: "Click to view doctor",
            bookNow: "Book Now",
            cardiology: "Cardiology",
            urology: "Urology",
            generalPractitioner: "General Practitioner",
            endocrinology: "Endocrinology",
            orthopedics: "Orthopedics",
            ultrasound: "Ultrasound",
            about: "About",
            experience: "Experience",
            education: "Education",
            languages: "Languages",
            bookAppointment: "Book Appointment",
            close: "Close",
        },
        insurance: {
            title: "Insurance",
            description: "We specialize in selling private medical insurance for foreigners in the Czech Republic — with a focus on human health: from preventive care to complex surgeries. For over 10 years, we have been helping expats, families, and students obtain reliable protection in accordance with the Foreigners' Residence Act.",
            instantCoverage: "Instant Coverage",
            instantCoverageDesc: "Get your policy activated within 24 hours",
            saveUpTo: "Save up to 30%",
            saveUpToDesc: "Compare prices and get the best deal",
            smartInsurance: "Smart Insurance Solutions",
            smartInsuranceDesc: "Insurance made simple",
            buyInsurance: "Buy Insurance",
        },
        laboratory: {
            title: "Laboratory",
            description: "State-of-the-art diagnostic tests to ensure\naccurate health assessments.",
            scheduleTest: "Schedule for test",
            sectionTitle: "State-of-the-Art Laboratory Tests",
            sectionDescription: "Our modern laboratory facility is equipped with advanced technology to provide accurate and timely diagnostic testing. We offer a comprehensive range of laboratory services to support your healthcare needs.",
            bloodTests: "Blood Tests",
            bloodTestsDesc: "Complete blood count, lipid panel, glucose levels",
            urinalysis: "Urinalysis",
            urinalysisDesc: "Comprehensive urine testing and analysis",
            biochemistry: "Biochemistry",
            biochemistryDesc: "Liver function, kidney function, electrolytes",
            microbiology: "Microbiology",
            microbiologyDesc: "Bacterial cultures and sensitivity testing",
            hormonalTests: "Hormonal Tests",
            hormonalTestsDesc: "Thyroid, reproductive hormones, metabolic panels",
            diagnosticPanels: "Diagnostic Panels",
            diagnosticPanelsDesc: "Custom health screening packages",
            fastResults: "Fast Results",
            accurateTesting: "Accurate Testing",
            modernEquipment: "Modern Equipment",
            certifiedLab: "Certified Lab",
        },
        blog: {
            title: "Blog",
            intro: "Welcome to our blog dedicated to health and disease prevention. Here you'll find useful information about various illnesses, their diagnosis and treatment methods, as well as tips for maintaining your health and improving your quality of life.",
            osteoArthritis: "Osteoarthritis Prevention Tips",
            healthyHeart: "Tips for Maintaining a Healthy Heart",
            avoidFlu: "How to Avoid Flu",
            healthcareCzech: "Healthcare in the Czech Republic",
            diabetesDetection: "Early Diabetes Detection",
            hypertensionDetection: "Early Detection of Hypertension",
            closeArticle: "Close Article",
            by: "By",
            read: "read",
        },
        gallery: {
            title: "Gallery",
            description: "Explore our clinic and happy patients.",
        },
        footer: {
            care: "Care",
            tagline: "Your health is our priority.",
            support: "SUPPORT",
            connect: "CONNECT",
            yourName: "Your Name",
            submitInquiry: "Submit Your Inquiry",
            allRightsReserved: "© 2025. All rights reserved.",
        },
    },
    cs: {
        header: {
            clinic: "Klinika",
            consultation: "Konzultace",
            laboratory: "Laboratoř",
            blog: "Blog",
            insurances: "Pojištění",
            signIn: "Přihlásit se",
            signOut: "Odhlásit se",
            privacyPolicy: "Zásady ochrany osobních údajů",
            termsOfUse: "Podmínky použití",
        },
        dnaPoster: {
            title: "Zavázáni k Vaší zdravotní cestě",
            subtitle: "Soucitná péče a odborné služby pro Vaše zdraví.",
            scheduleNow: "Objednat se",
            learnMore: "Zjistit více",
        },
        healthJourney: {
            title: "Zavázáni k Vaší\nzdravotní cestě",
            description: "Klinika Zoryx je moderní lékařské centrum v Ústí nad Labem, specializující se na komplexní prevenci a léčbu.\nKlíčovou vlastností naší kliniky je individuální přístup ke každému pacientovi a použití hi-tech zařízení pro přesnou diagnostiku, efektivní léčbu a zotavení. Všechny nejmodernější lékařské inovace jsou zaměřeny výhradně na zlepšení zdraví a pohody našich klientů.",
            primeLocation: "Výhodná poloha",
            primeLocationDesc: "Centrum města, snadný přístup",
            sameDayBooking: "Objednání na tentýž den",
            sameDayBookingDesc: "Získejte návštěvu dnes",
            allInOne: "Vše v jednom",
            allInOneDesc: "Laboratoř, diagnostika, klinika",
            boardCertified: "Certifikovaní specialisté",
            boardCertifiedDesc: "Expertní lékaři na místě",
            extendedHours: "Prodloužená otevírací doba: 8:00 - 21:00 denně",
            freeParking: "Bezplatné parkování a přístup k metru (5 min chůze)",
            englishSpeaking: "Personál mluvící anglicky k dispozici",
            digitalRecords: "Digitální záznamy a online výsledky testů",
            bookNow: "Objednat se",
            virtualTour: "Prohlídka virtuální prohlídkou",
            testimonial: "Péčující personál a vynikající léčba!",
            testimonialAuthor: "Jane Doe",
        },
        consultation: {
            title: "Odborné lékařské konzultace a vyšetření",
            description: "Náš zkušený lékařský tým poskytuje komplexní konzultace a důkladná vyšetření.\nVěnujeme čas porozumění Vašim zdravotním obavám a vypracování personalizovaných léčebných plánů.",
            flexibleHours: "Flexibilní hodiny",
            flexibleHoursDesc: "Prodloužená otevírací doba podle Vašeho rozvrhu",
            expertTeam: "Expertní tým",
            expertTeamDesc: "Kvalifikovaní a zkušení specialisté",
            thoroughExams: "Důkladná vyšetření",
            thoroughExamsDesc: "Komplexní zdravotní posudky",
            patientCare: "Péče o pacienta",
            patientCareDesc: "Personalizovaná pozornost a péče",
            clickToView: "Klikněte pro zobrazení lékaře",
            bookNow: "Objednat se",
            cardiology: "Kardiologie",
            urology: "Urologie",
            generalPractitioner: "Praktický lékař",
            endocrinology: "Endokrinologie",
            orthopedics: "Ortopedie",
            ultrasound: "Ultrazvuk",
            about: "O doktorovi",
            experience: "Zkušenosti",
            education: "Vzdělání",
            languages: "Jazyky",
            bookAppointment: "Objednat se",
            close: "Zavřít",
        },
        insurance: {
            title: "Pojištění",
            description: "Specializujeme se na prodej privátního zdravotního pojištění pro cizince v České republice — s důrazem na lidské zdraví: od preventivní péče po složité operace. Více než 10 let pomáháme expatům, rodinám a studentům získat spolehlivou ochranu v souladu se zákonem o pobytu cizinců.",
            instantCoverage: "Okamžité krytí",
            instantCoverageDesc: "Získejte aktivaci pojistky do 24 hodin",
            saveUpTo: "Ušetřete až 30%",
            saveUpToDesc: "Porovnejte ceny a získejte nejlepší nabídku",
            smartInsurance: "Chytrá pojistná řešení",
            smartInsuranceDesc: "Pojištění jednoduše",
            buyInsurance: "Koupit pojištění",
        },
        laboratory: {
            title: "Laboratoř",
            description: "Nejmodernější diagnostické testy pro zajištění\npřesných zdravotních posouzení.",
            scheduleTest: "Objednat test",
            sectionTitle: "Nejmodernější laboratorní testy",
            sectionDescription: "Naše moderní laboratorní zařízení je vybaveno pokročilou technologií pro poskytování přesného a včasného diagnostického testování. Nabízíme komplexní řadu laboratorních služeb na podporu vašich zdravotních potřeb.",
            bloodTests: "Krevní testy",
            bloodTestsDesc: "Kompletní krevní obraz, lipidový panel, hladiny glukózy",
            urinalysis: "Analýza moči",
            urinalysisDesc: "Komplexní testování a analýza moči",
            biochemistry: "Biochemie",
            biochemistryDesc: "Funkce jater, funkce ledvin, elektrolyty",
            microbiology: "Mikrobiologie",
            microbiologyDesc: "Bakteriální kultury a testování citlivosti",
            hormonalTests: "Hormonální testy",
            hormonalTestsDesc: "Štítná žláza, reprodukční hormony, metabolické panely",
            diagnosticPanels: "Diagnostické panely",
            diagnosticPanelsDesc: "Vlastní balíčky zdravotního screeningu",
            fastResults: "Rychlé výsledky",
            accurateTesting: "Přesné testování",
            modernEquipment: "Moderní vybavení",
            certifiedLab: "Certifikovaná laboratoř",
        },
        blog: {
            title: "Blog",
            intro: "Vítejte na našem blogu věnovaném zdraví a prevenci nemocí. Zde najdete užitečné informace o různých nemocech, jejich diagnostice a léčebných metodách, stejně jako tipy pro udržení vašeho zdraví a zlepšení kvality života.",
            osteoArthritis: "Tipy na prevenci osteoartritidy",
            healthyHeart: "Tipy pro udržení zdravého srdce",
            avoidFlu: "Jak se vyhnout chřipce",
            healthcareCzech: "Zdravotní péče v České republice",
            diabetesDetection: "Včasná detekce diabetu",
            hypertensionDetection: "Včasná detekce hypertenze",
            closeArticle: "Zavřít článek",
            by: "Autor",
            read: "čtení",
        },
        gallery: {
            title: "Galerie",
            description: "Prozkoumejte naši kliniku a spokojené pacienty.",
        },
        footer: {
            care: "Care",
            tagline: "Vaše zdraví je naší prioritou.",
            support: "PODPORA",
            connect: "SPOJIT SE",
            yourName: "Vaše jméno",
            submitInquiry: "Odeslat dotaz",
            allRightsReserved: "© 2025. Všechna práva vyhrazena.",
        },
    },
    ru: {
        header: {
            clinic: "Клиника",
            consultation: "Консультация",
            laboratory: "Лаборатория",
            blog: "Блог",
            insurances: "Страхование",
            signIn: "Войти",
            signOut: "Выйти",
            privacyPolicy: "Политика конфиденциальности",
            termsOfUse: "Условия использования",
        },
        dnaPoster: {
            title: "Преданность вашему пути к здоровью",
            subtitle: "Заботливое обслуживание и профессиональные услуги для вашего благополучия.",
            scheduleNow: "Записаться",
            learnMore: "Узнать больше",
        },
        healthJourney: {
            title: "Преданность вашему\nпути к здоровью",
            description: "Клиника Zoryx — современный медицинский центр в Усти-над-Лабем, специализирующийся на комплексной профилактике и лечении.\nКлючевая особенность нашей клиники — индивидуальный подход к каждому пациенту и использование высокотехнологичного оборудования для точной диагностики, эффективного лечения и восстановления. Все передовые медицинские инновации направлены исключительно на улучшение здоровья и благополучия наших клиентов.",
            primeLocation: "Удобное расположение",
            primeLocationDesc: "Центр города, легкий доступ",
            sameDayBooking: "Запись в тот же день",
            sameDayBookingDesc: "Получите прием сегодня",
            allInOne: "Все в одном",
            allInOneDesc: "Лаборатория, диагностика, клиника",
            boardCertified: "Сертифицированные специалисты",
            boardCertifiedDesc: "Опытные врачи на месте",
            extendedHours: "Продленные часы: 8:00 - 21:00 ежедневно",
            freeParking: "Бесплатная парковка и доступ к метро (5 мин ходьбы)",
            englishSpeaking: "Доступен англоговорящий персонал",
            digitalRecords: "Цифровые записи и онлайн результаты анализов",
            bookNow: "Записаться",
            virtualTour: "Виртуальный тур",
            testimonial: "Заботливый персонал и отличное лечение!",
            testimonialAuthor: "Jane Doe",
        },
        consultation: {
            title: "Профессиональные консультации и обследования врачей",
            description: "Наша опытная медицинская команда предоставляет комплексные консультации и тщательные обследования.\nМы тратим время на понимание ваших проблем со здоровьем и разработку персонализированных планов лечения.",
            flexibleHours: "Гибкий график",
            flexibleHoursDesc: "Продленные часы работы под ваш график",
            expertTeam: "Команда экспертов",
            expertTeamDesc: "Квалифицированные и опытные специалисты",
            thoroughExams: "Тщательные обследования",
            thoroughExamsDesc: "Комплексная оценка здоровья",
            patientCare: "Уход за пациентами",
            patientCareDesc: "Персонализированное внимание и забота",
            clickToView: "Нажмите, чтобы посмотреть врача",
            bookNow: "Записаться",
            cardiology: "Кардиология",
            urology: "Урология",
            generalPractitioner: "Терапевт",
            endocrinology: "Эндокринология",
            orthopedics: "Ортопедия",
            ultrasound: "Ультразвук",
            about: "О враче",
            experience: "Опыт",
            education: "Образование",
            languages: "Языки",
            bookAppointment: "Записаться на прием",
            close: "Закрыть",
        },
        insurance: {
            title: "Страхование",
            description: "Мы специализируемся на продаже частного медицинского страхования для иностранцев в Чешской Республике — с акцентом на здоровье человека: от профилактической помощи до сложных операций. Более 10 лет мы помогаем экспатам, семьям и студентам получить надежную защиту в соответствии с Законом о пребывании иностранцев.",
            instantCoverage: "Мгновенное покрытие",
            instantCoverageDesc: "Получите активацию полиса в течение 24 часов",
            saveUpTo: "Сэкономьте до 30%",
            saveUpToDesc: "Сравните цены и получите лучшую сделку",
            smartInsurance: "Умные страховые решения",
            smartInsuranceDesc: "Страхование стало проще",
            buyInsurance: "Купить страховку",
        },
        laboratory: {
            title: "Лаборатория",
            description: "Современные диагностические тесты для обеспечения\nточной оценки здоровья.",
            scheduleTest: "Записаться на тест",
            sectionTitle: "Современные лабораторные тесты",
            sectionDescription: "Наша современная лаборатория оснащена передовыми технологиями для проведения точных и своевременных диагностических тестов. Мы предлагаем широкий спектр лабораторных услуг для поддержки ваших медицинских потребностей.",
            bloodTests: "Анализы крови",
            bloodTestsDesc: "Общий анализ крови, липидная панель, уровень глюкозы",
            urinalysis: "Анализ мочи",
            urinalysisDesc: "Комплексное тестирование и анализ мочи",
            biochemistry: "Биохимия",
            biochemistryDesc: "Функции печени, функции почек, электролиты",
            microbiology: "Микробиология",
            microbiologyDesc: "Бактериальные культуры и тестирование чувствительности",
            hormonalTests: "Гормональные тесты",
            hormonalTestsDesc: "Щитовидная железа, репродуктивные гормоны, метаболические панели",
            diagnosticPanels: "Диагностические панели",
            diagnosticPanelsDesc: "Индивидуальные пакеты медицинского скрининга",
            fastResults: "Быстрые результаты",
            accurateTesting: "Точное тестирование",
            modernEquipment: "Современное оборудование",
            certifiedLab: "Сертифицированная лаборатория",
        },
        blog: {
            title: "Блог",
            intro: "Добро пожаловать в наш блог, посвященный здоровью и профилактике заболеваний. Здесь вы найдете полезную информацию о различных заболеваниях, методах их диагностики и лечения, а также советы по поддержанию здоровья и улучшению качества жизни.",
            osteoArthritis: "Советы по профилактике остеоартрита",
            healthyHeart: "Советы по поддержанию здорового сердца",
            avoidFlu: "Как избежать гриппа",
            healthcareCzech: "Здравоохранение в Чешской Республике",
            diabetesDetection: "Раннее выявление диабета",
            hypertensionDetection: "Раннее выявление гипертонии",
            closeArticle: "Закрыть статью",
            by: "Автор",
            read: "чтение",
        },
        gallery: {
            title: "Галерея",
            description: "Изучите нашу клинику и довольных пациентов.",
        },
        footer: {
            care: "Care",
            tagline: "Ваше здоровье — наш приоритет.",
            support: "ПОДДЕРЖКА",
            connect: "СВЯЗАТЬСЯ",
            yourName: "Ваше имя",
            submitInquiry: "Отправить запрос",
            allRightsReserved: "© 2025. Все права защищены.",
        },
    },
};
