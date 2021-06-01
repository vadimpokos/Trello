export interface Iworkspace {
    input: string;
    createWorkspace: void;
    workspaceList: workspaceListType
}
export type workspaceListType = {
    id: number;
    name: string
}[]


export interface Iprops {
    input: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    workspaceList: workspaceListType;
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void
}


