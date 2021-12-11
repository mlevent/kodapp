import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../../store/actions/settings';

const languages = [
    { value: 'theme-fire', name: 'Ateş' },
    { value: 'theme-squid', name: 'Squid' },
    { value: 'theme-matrix', name: 'Matrix' },
];

function OnLanguage() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <select
                className="h-8 px-3 rounded-md border border-gray-600 bg-transparent dark:text-white"
                value={settings.appTheme}
                onChange={e => dispatch(settingsUpdate({ appTheme: e.target.value }))}>
                {languages.map((theme, index) => (
                    <option key={index} value={theme.value}>
                        {theme.name}
                    </option>
                ))}
            </select>
        </React.Fragment>
    );
}

export default OnLanguage;
