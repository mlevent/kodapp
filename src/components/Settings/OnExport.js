import React from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { BiCloudDownload, BiLink } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../../store/actions/settings';

function OnExport() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    const saveAsPng = markerIsActive => {
        if (markerIsActive) dispatch(settingsUpdate({ markerActive: false }));
        domtoimage.toBlob(document.getElementById('codeArea')).then(function (blob) {
            saveAs(blob, 'untitled.png');
        });
        if (markerIsActive)
            setTimeout(function () {
                dispatch(settingsUpdate({ markerActive: true }));
            }, 1000);
    };

    const createLink = () => {
        navigator.clipboard.writeText(btoa(unescape(encodeURIComponent(settings.appCode))));
    };

    return (
        <React.Fragment>
            <div className="flex items-center space-x-2">
                <button
                    className="inline-flex items-center justify-self-end h-12 px-4 shadow text-white rounded-md bg-gradient-to-br from-blue-600 to-green-300 hover:from-green-300 hover:to-blue-600"
                    onClick={createLink}>
                    <BiLink className="text-2xl" />
                </button>
                <button
                    className="inline-flex items-center justify-self-end h-12 px-4 shadow text-white rounded-md bg-gradient-to-br from-red-600 to-purple-800 hover:from-purple-800 hover:to-red-600"
                    onClick={() => saveAsPng(settings.markerActive)}>
                    <BiCloudDownload className="text-2xl" />
                </button>
            </div>
        </React.Fragment>
    );
}

export default OnExport;
