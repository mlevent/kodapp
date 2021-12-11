const InitState = {
    isDarkMode: true,
    isLineNums: true,
    isAutoLanguage: true,
    appTheme: 'theme-fire',
    appLanguage: 'auto',
    appSelectedLanguage: 'auto',
    appCode: null,
    appEditor: null,
    markerActive: false,
    markerTools: false,
    markerRange: {},
};

const settingsReducer = (state = InitState, action) => {
    switch (action.type) {
        case 'SETTINGS_UPDATE':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default settingsReducer;
