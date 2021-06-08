export interface Iworkspace {
    input: string;
    createWorkspace: void;
    workspaceList: workspaceListType
}
export type workspaceListType = {
    id: number;
    name: string
} | {}


export interface Iprops {
    onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    workspaceList: workspaceListType[];
}

export interface InewWorkspace {
    input: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void
}


