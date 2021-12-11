import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { BiCodeAlt, BiShow } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdate } from '../store/actions/settings';

require('codemirror/mode/php/php');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/python/python');
require('codemirror/mode/sql/sql');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/css/css');
require('codemirror/mode/sass/sass');

function Editor() {
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    const onMarkerClear = () => {
        settings.appEditor.getAllMarks().forEach(marker => marker.clear());
        dispatch(settingsUpdate({ markerActive: false }));
    };

    return (
        <React.Fragment>
            <div id="codeArea" className={settings.appTheme}>
                <div className="relative">
                    {!settings.markerTools && settings.markerActive && (
                        <button
                            onClick={() => onMarkerClear()}
                            className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 inline-flex items-center justify-self-end h-10 px-4 rounded-md text-white shadow bg-black bg-opacity-30 hover:bg-opacity-20">
                            <BiShow className="text-xl mr-1" /> Temizle
                        </button>
                    )}
                    <div className="titleBarWrapper">
                        <ul className="titleBarDots">
                            <li className="bg-green-400"></li>
                            <li className="bg-yellow-400"></li>
                            <li className="bg-red-400"></li>
                        </ul>
                        <div className="titleBarMeta">
                            <input placeholder="Untitled-1" />
                        </div>
                    </div>
                    <CodeMirror
                        value={settings.appCode}
                        options={{
                            mode: { name: settings.appLanguage, startOpen: true },
                            lineNumbers: settings.isLineNums,
                            lineWrapping: true,
                            styleSelectedText: true,
                            matchBrackets: true,
                        }}
                        editorDidMount={editor => {
                            dispatch(settingsUpdate({ appEditor: editor }));
                        }}
                        onViewportChange={(editor, from, to) => {
                            editor.focus();
                        }}
                        onBeforeChange={(editor, data, value) => {
                            dispatch(settingsUpdate({ appCode: value }));
                        }}
                        onChange={(editor, data, value) => {
                            //setEditorInfo({ line: editor.lineCount(), char: value.length });
                        }}
                    />
                    <div className="text-sm mt-1 opacity-80 flex items-center justify-end copytext">
                        created with <BiCodeAlt className="text-lg mx-1" /> <span className="underline">kood.in</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Editor;
