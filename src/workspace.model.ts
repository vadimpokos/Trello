export interface Iworkspace {
    input: string;
    createWorkspace: void;
    workspaceList: workspaceListType
}
export type workspaceListType = {
    id: number;
    name: string;
    uid: string
}[]


export interface Iprops {
    input: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    workspaceList: workspaceListType;
    open: boolean;
    handleClickOpen: () => void;
    handleClose: () => void;
    uid: string
}


export interface Iname {
    name: string;
    id: string;
    uid: string;
  }
  
  export type ITaskBoards = {
    id: number;
    name: string;
    description: string;
    status: string;
    uid: string;
  };
  
  export type INewTask = {
    id: number;
    name: string;
    description: string;
    status: string;
    Dashboard: string;
    uid: string;
  };
  
  export interface ITasks {
    taskBoards: ITaskBoards[];
    create: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
    description: string;
    status: string;
    handleTitle: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleDescription: React.ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    >;
    handleStatus: (e: React.ChangeEvent<{ value: unknown }>) => void;
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleUpdate: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    openTask: boolean;
    handleClickOpenTask: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    handleCloseTask: () => void;
    openMove: boolean;
    handleClickOpenMove: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    handleCloseMove: () => void;
    handleMove: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    currentStatus: { status: string; id: string };
    handleMoveUpdate: (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
    uid: string;
  }