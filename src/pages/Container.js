import React, { useEffect, useState } from 'react';
import detectLanguage from 'lang-detector';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../store/actions/settings';

import Editor from '../components/Editor';
import OnLanguage from '../components/Settings/OnLanguage';
import OnTheme from '../components/Settings/OnTheme';
import OnDarkMode from '../components/Settings/OnDarkMode';
import OnExport from '../components/Settings/OnExport';
import OnMarker from '../components/Settings/OnMarker';
import OnLineNumbers from '../components/Settings/OnLineNumbers';

import Login from '../components/Auth/Login';

import Logo from '../assets/logo.png';

function Container() {
    const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    // Başlangıç
    useEffect(() => {
        if (!settings.appCode) {
            let urlParams = new URLSearchParams(window.location.search);
            let defaultCode = urlParams.has('code')
                ? decodeURIComponent(escape(atob(urlParams.get('code'))))
                : '// Hello World!';
            dispatch(settingsUpdate({ appCode: defaultCode }));
        } else {
            dispatch(
                settingsUpdate({
                    appLanguage:
                        settings.appSelectedLanguage === 'auto'
                            ? detectLanguage(settings.appCode).toLowerCase()
                            : settings.appSelectedLanguage,
                })
            );
        }
    }, [settings.appCode, settings.appSelectedLanguage]);

    return (
        <React.Fragment>
            <div className="mainWrapper">
                <h1 className="logo" onClick={() => setAuthModalIsOpen(true)}>
                    <img src={Logo} width="200" alt="Logo" />
                </h1>
                <Editor />
                <Login isOpen={authModalIsOpen} setIsOpen={setAuthModalIsOpen} />
                <div className="flex items-center justify-between mt-4 font-semibold shadow rounded-md py-5 px-7 bg-white dark:bg-black dark:bg-opacity-25 dark:text-white transition ease-in-out duration-200">
                    <div className="flex space-x-5 text-sm">
                        <div className="flex-initial space-y-2">
                            <span className="block">Dil</span>
                            <OnLanguage />
                        </div>
                        <div className="flex-initial space-y-2">
                            <span className="block">Görünüm</span>
                            <OnTheme />
                        </div>
                        <div className="flex-initial space-y-2">
                            <span className="block">Karanlık</span>
                            <OnDarkMode />
                        </div>
                        <div className="flex-initial space-y-2">
                            <span className="block">Satır</span>
                            <OnLineNumbers />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-initial space-y-2">
                            <OnMarker />
                        </div>
                        <div className="flex-initial space-y-2">
                            <OnExport />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Container;
