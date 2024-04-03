import React, { createContext, useReducer, ReactNode, } from "react";

interface ApplicationAction {
    type: string;
    payload: any; // Replace 'any' with the actual payload type
}


interface ApplicationContextProps {
    loading: boolean;
    sidebarToggle: boolean;
    userinfo: any; // Replace 'any' with the actual type of userinfo
    isUserLoggedIn: boolean;
    userItems: any; // Replace 'any' with the actual type of userItems
    refreshUserItems: boolean;
    searchTerm: string;
    folder_id: string;
    loadFolders: boolean;
    showDeleteModal: boolean;
    fileIdToDelete: string;
    fileTypetoDelete: string;
    CreateKeyModal: boolean;
    dispatch: React.Dispatch<ApplicationAction>;
}

const INITIAL_STATE: ApplicationContextProps = {
    loading: false,
    sidebarToggle: false,
    userinfo: null, // Replace 'null' with the initial type of userinfo
    isUserLoggedIn: false,
    userItems: null, // Replace 'null' with the initial type of userItems
    refreshUserItems: false,
    searchTerm: "",
    folder_id: "",
    loadFolders: false,
    showDeleteModal: false,
    fileIdToDelete: "",
    fileTypetoDelete: "",
    CreateKeyModal: false,
    dispatch: () => { } 

};

export const ApplicationContext = createContext<ApplicationContextProps>(
    INITIAL_STATE
);

const ApplicationReducer = (
    state: ApplicationContextProps,
    action: ApplicationAction
): ApplicationContextProps => {
    switch (action.type) {
        case "SET_USERINFO":
            return { ...state, userinfo: action.payload };
        case "SET_LOADING":
            return { ...state, loading: action.payload }
        case "SET_ISUSERLOGGEDIN":
            return { ...state, isUserLoggedIn: action.payload };
        case "SET_USERITEMS":
            return { ...state, userItems: action.payload };
        case "SET_REFRESHUSERITEMS":
            return { ...state, refreshUserItems: action.payload };
        case "SET_SEARCHTERM":
            return { ...state, searchTerm: action.payload };
        case "SET_FOLDERID":
            return { ...state, folder_id: action.payload };
        case "SET_LOADFOLDERS":
            return { ...state, loadFolders: action.payload };
        case "SET_SHOWDELETEMODAL":
            return { ...state, showDeleteModal: action.payload };
        case "SET_FILEIDTODELETE":
            return { ...state, fileIdToDelete: action.payload };
        case "SET_FILETYPETODELETE":
            return { ...state, fileTypetoDelete: action.payload };
        case "SET_CREATEKEYMODAL":
            return { ...state, CreateKeyModal: action.payload }
        default:
            return state;
    }
};

interface ApplicationContextProviderProps {
    children: ReactNode;
}

export const ApplicationContextProvider = ({
    children,
}: ApplicationContextProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(
        ApplicationReducer,
        INITIAL_STATE
    );

    return (
        <ApplicationContext.Provider
            value={{
                loading: state.loading,
                sidebarToggle: state.sidebarToggle,
                userinfo: state.userinfo,
                isUserLoggedIn: state.isUserLoggedIn,
                userItems: state.userItems,
                refreshUserItems: state.refreshUserItems,
                searchTerm: state.searchTerm,
                folder_id: state.folder_id,
                loadFolders: state.loadFolders,
                showDeleteModal: state.showDeleteModal,
                fileIdToDelete: state.fileIdToDelete,
                fileTypetoDelete: state.fileTypetoDelete,
                CreateKeyModal: state.CreateKeyModal,
                dispatch,
            }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};
