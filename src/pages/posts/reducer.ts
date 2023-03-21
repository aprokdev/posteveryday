export const actions = {
    EDIT_MODE: 'EDIT_MODE',
    READ_MODE: 'READ_MODE',
    PREVIEW_MODE: 'PREVIEW_MODE',
};

export const initialState = {
    read: true,
    preview: false,
    edit: false,
};

export const reducer = (state, action) => {
    if (action === 'EDIT_MODE') {
        return { read: false, preview: false, edit: true };
    }
    if (action === 'READ_MODE') {
        return {
            read: true,
            preview: false,
            edit: false,
        };
    }
    if (action === 'PREVIEW_MODE') {
        return {
            read: false,
            preview: true,
            edit: false,
        };
    }
    return state;
};
