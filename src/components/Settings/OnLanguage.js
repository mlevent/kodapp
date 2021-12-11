import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../../store/actions/settings';

const languages = [
    { value: 'auto', name: 'Dili Algıla' },
    { value: 'php', name: 'Php' },
    { value: 'python', name: 'Python' },
    { value: 'javascript', name: 'Javascript' },
    { value: 'htmlmixed', name: 'Html' },
    { value: 'css', name: 'Css' },
    { value: 'sass', name: 'Sass' },
    { value: 'sql', name: 'Sql' },
    { value: 'ruby', name: 'Ruby' },
];

function OnLanguage() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <select
                className="h-8 px-3 rounded-md border border-gray-600 bg-transparent dark:text-white"
                value={settings.appSelectedLanguage}
                onChange={e => dispatch(settingsUpdate({ appSelectedLanguage: e.target.value }))}>
                {languages.map((language, index) => (
                    <option key={index} value={language.value}>
                        {settings.appSelectedLanguage === 'auto' && settings.appSelectedLanguage === language.value
                            ? language.name +
                              ' (' +
                              settings.appLanguage.charAt(0).toUpperCase() +
                              settings.appLanguage.slice(1) +
                              ')'
                            : language.name}
                    </option>
                ))}
            </select>
        </React.Fragment>
    );
}

export default OnLanguage;
