import React from 'react';
import { Switch } from '@headlessui/react';
import { BiMenuAltLeft } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../../store/actions/settings';

function OnLineNumbers() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
            <Switch
                checked={settings.isLineNums}
                onChange={() => dispatch(settingsUpdate({ isLineNums: !settings.isLineNums }))}
                className={`${
                    settings.isLineNums ? 'bg-green-500' : 'bg-gray-300 dark:bg-opacity-25'
                } relative inline-flex items-center flex-shrink-0 h-8 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
                <span className="sr-only">Line Numbers</span>
                <span
                    aria-hidden="true"
                    className={`${
                        settings.isLineNums ? 'translate-x-6' : 'translate-x-0'
                    } pointer-events-none inline-flex items-center justify-center h-7 w-7 text-black bg-white rounded-full transform ring-0 transition ease-in-out duration-200`}>
                    <BiMenuAltLeft className="text-lg" />
                </span>
            </Switch>
        </React.Fragment>
    );
}

export default OnLineNumbers;
