import React, { useEffect } from "react";
import firebase from "../database";
import { WorkspaceView } from "./WorkspaceView";
import { Iname, INewTask, ITaskBoards } from "../workspace.model";

export const Workspace: React.FC<Iname> = ({ name, id, uid }) => {
  const [taskBoadrs, setTaskBoadrs] = React.useState<ITaskBoards[]>([]);
  const [titleInput, setTitleInput] = React.useState<string>("");
  const [descriptionInput, setDescriptionInput] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("todo");
  const [open, setOpen] = React.useState(false);
  const [newTask, setNewTask] = React.useState<INewTask>({
    id: 0,
    name: "",
    description: "",
    status: "",
    Dashboard: "",
    uid: "",
  });
  const [openTask, setOpenTask] = React.useState(false);
  const [idToUpdate, setIdToUpdate] = React.useState("");
  const [openMove, setOpenMove] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState({
    status: "",
    id: "",
  });

  const handleClickOpenMove = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    let current = taskBoadrs.find((item) => item.id === +e.currentTarget.id);
    if (current === undefined) {
      current = { name: "", description: "", id: 0, status: "", uid: "" };
    }
    setCurrentStatus({ status: current?.status, id: `${current.id}` });
    setOpenMove(true);
  };

  const handleCloseMove = () => {
    setOpenMove(false);
  };

  const handleMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.currentTarget.id);
  };

  const handleClickOpenTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOpenTask(true);
    console.log(taskBoadrs.find((item) => item.id === +e.currentTarget.id));
    let current = taskBoadrs.find((item) => item.id === +e.currentTarget.id);
    if (current === undefined) {
      current = { name: "", description: "", id: 0, status: "", uid: "" };
    }
    setTitleInput(current.name);
    setDescriptionInput(current.description);
    setIdToUpdate(e.currentTarget.id);
  };

  const handleCloseTask = () => {
    setOpenTask(false);
    setTitleInput("");
    setDescriptionInput("");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateTask = () => {
    if (titleInput && descriptionInput && status) {
      let createdTask = {
        id: new Date().getTime(),
        name: titleInput,
        description: descriptionInput,
        status: status,
        uid: uid,
      };
      setTaskBoadrs((prev) => [...prev, createdTask]);
      setNewTask({ ...createdTask, Dashboard: id });
      handleClose();
    }
  };

  const handleDeleteTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    deleteDocument(e.currentTarget.id);
  };

  const handleUpdateTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    updateData(idToUpdate);
    setTitleInput("");
    setDescriptionInput("");
    handleCloseTask();
  };

  const handleMoveUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    updateStatus(currentStatus.id, e.currentTarget.id);
    handleCloseMove();
  };

  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitleInput(e.target.value);
  };

  const handleDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescriptionInput(e.target.value);
  };

  const handleStatus = (e: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(e.target.value as string);
  };

  const getData = async () => {
    let db = firebase.firestore().collection("Taskboards").orderBy("id");
    await db
      .get()
      .then((res) => {
        let newState: ITaskBoards[] = [];
        res.forEach((doc) => {
          console.log(doc.data().Dashboard, id);
          if (doc.data().Dashboard === id) {
            newState.push({
              id: doc.data().id,
              name: doc.data().name,
              description: doc.data().description,
              status: doc.data().status,
              uid: doc.data().uid,
            });
          }
          setTaskBoadrs([...newState]);
        });
      })
      .catch((error) => {
        console.log("Error getting cached document:", error);
      });
  };

  const addData = () => {
    let docref = firebase
      .firestore()
      .collection("Taskboards")
      .doc(`${newTask.id}`);
    docref
      .set({ ...newTask })
      .then(() => {
        console.log("Document written");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const deleteDocument = async (docname: string) => {
    await firebase
      .firestore()
      .collection("Taskboards")
      .doc(docname)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    await getData();
  };

  const updateData = async (docname: string) => {
    console.log(docname);
    await firebase
      .firestore()
      .collection("Taskboards")
      .doc(docname)
      .update({ name: titleInput, description: descriptionInput });
    await getData();
  };

  const updateStatus = async (docname: string, status: string) => {
    console.log(docname);
    await firebase
      .firestore()
      .collection("Taskboards")
      .doc(docname)
      .update({ status: status });
    await getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newTask.name !== "") {
      addData();
      setTitleInput("");
      setDescriptionInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTask]);

  return (
    <WorkspaceView
      taskBoards={taskBoadrs}
      title={titleInput}
      description={descriptionInput}
      status={status}
      create={handleCreateTask}
      handleTitle={handleTitle}
      handleDescription={handleDescription}
      handleStatus={handleStatus}
      open={open}
      handleOpen={handleClickOpen}
      handleClose={handleClose}
      handleDelete={handleDeleteTask}
      handleUpdate={handleUpdateTask}
      openTask={openTask}
      handleClickOpenTask={handleClickOpenTask}
      handleCloseTask={handleCloseTask}
      openMove={openMove}
      handleClickOpenMove={handleClickOpenMove}
      handleCloseMove={handleCloseMove}
      handleMove={handleMove}
      currentStatus={currentStatus}
      handleMoveUpdate={handleMoveUpdate}
      uid={uid}
    />
  );
};
