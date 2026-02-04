
// Language Switcher Logic
document.addEventListener('DOMContentLoaded', () => {
    const defaultLang = 'ja';
    let currentLang = localStorage.getItem('site_lang') || defaultLang;

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site_lang', lang);

        // Update active state in switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                if (element.innerHTML.includes('<') && !element.tagName.match(/^H[1-6]$|^P$/)) {
                    // Safety check for complex HTML, though our structure is simple
                    element.innerHTML = translations[lang][key];
                } else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    // Bind click events
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            updateLanguage(e.target.dataset.lang);
        });
    });

    // Initial load
    updateLanguage(currentLang);
});
