import React, { useEffect } from 'react';
import { BiHide, BiPaintRoll } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../../store/actions/settings';

function OnMarker() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    useEffect(() => {
        if (settings.appEditor) {
            settings.appEditor.on('beforeSelectionChange', function (editor, data) {
                dispatch(settingsUpdate({ markerTools: false }));
                const range = {
                    sLine: data.ranges[0].anchor.line,
                    sChar: data.ranges[0].anchor.ch,
                    eLine: data.ranges[0].head.line,
                    eChar: data.ranges[0].head.ch,
                };
                if (range.sLine !== range.eLine || range.sChar !== range.eChar) {
                    dispatch(settingsUpdate({ markerTools: true, markerRange: range }));
                }
            });
        }
    }, [settings.appEditor]);

    const onMarker = isDraw => {
        settings.appEditor.markText(
            { line: settings.markerRange.sLine, ch: settings.markerRange.sChar },
            { line: settings.markerRange.eLine, ch: settings.markerRange.eChar },
            { readOnly: true, className: isDraw ? 'line-draw' : 'line-blur' }
        );
        dispatch(settingsUpdate({ markerActive: settings.appEditor.getAllMarks().length ? true : false }));
        settings.appEditor.setCursor({ line: settings.appEditor.lastLine() + 1 });
    };

    return (
        <React.Fragment>
            <div className="flex space-x-2">
                {settings.markerTools && (
                    <React.Fragment>
                        <button
                            className="inline-flex items-center justify-self-end h-12 px-4 rounded-md text-white text-xl shadow bg-gradient-to-tr from-yellow-300 to-green-600 hover:from-green-600 hover:to-yellow-300"
                            onClick={() => onMarker(true)}>
                            <BiPaintRoll />
                        </button>
                        <button
                            className="inline-flex items-center justify-self-end h-12 px-4 rounded-md text-white text-xl shadow bg-gradient-to-tr from-gray-400 to-gray-800 hover:from-gray-800 hover:to-gray-400"
                            onClick={() => onMarker()}>
                            <BiHide />
                        </button>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
}

export default OnMarker;
