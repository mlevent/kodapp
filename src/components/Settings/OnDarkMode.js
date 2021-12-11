import React, { useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { BiSun } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../../store/actions/settings';

function OnDarkMode() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    useEffect(() => {
        settings.isDarkMode
            ? document.querySelector('html').classList.add('dark')
            : document.querySelector('html').classList.remove('dark');
    }, [settings.isDarkMode]);

    return (
        <React.Fragment>
            <Switch
                checked={settings.isDarkMode}
                onChange={() => dispatch(settingsUpdate({ isDarkMode: !settings.isDarkMode }))}
                className={`${
                    settings.isDarkMode ? 'bg-black' : 'bg-yellow-100'
                } relative inline-flex items-center flex-shrink-0 h-8 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                <span className="sr-only">Dark Mode</span>
                <span
                    aria-hidden="true"
                    className={`${
                        settings.isDarkMode ? 'translate-x-6 text-white' : 'translate-x-0 bg-yellow-300'
                    } pointer-events-none inline-flex items-center justify-center h-7 w-7 rounded-full transform ring-0 transition ease-in-out duration-200`}>
                    <BiSun className="text-lg" />
                </span>
            </Switch>
        </React.Fragment>
    );
}

export default OnDarkMode;
