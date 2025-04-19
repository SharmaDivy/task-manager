import { useEffect, useRef, useState } from "react";
import { BoardData, Column, getBoardDetails, Task } from "@/lib/client/api";
import DialogPaper from "../Dialog";

export default function TaskBoard({ boardId }: { boardId: string }) {
  const [loadingBoardDetails, setLoadingBoardDetails] = useState(true);
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [error, setError] = useState("");

  const [openAddNewTaskDialog, setOpenAddNewTaskDialog] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setLoadingBoardDetails(true);
        const boardData = await getBoardDetails(boardId, abortController);
        setBoardData(boardData);
      } catch (e) {
        setError("Something went wrong! Please try again later!");
        console.log(e);
      } finally {
        setLoadingBoardDetails(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [boardId]);

  if (loadingBoardDetails) {
    return (
      <div className="grow flex h-full items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!boardData) {
    return null;
  }

  return (
    <div className="grow flex flex-col min-w-0">
      <BoardHeader
        title={boardData.title}
        onAddNewTask={() => setOpenAddNewTaskDialog(true)}
      />

      <div className="overflow-scroll bg-background-dark flex p-5 gap-5 grow">
        {boardData.columns.map((c) => {
          return <ColumnComponent {...c} key={c?.id} />;
        })}

        <div className="self-stretch flex items-center ml-6 text-2xl text-accent font-bold shrink-0 cursor-pointer">
          + New Column
        </div>
      </div>

      <TaskEditorDialog
        onRequestClose={() => setOpenAddNewTaskDialog(false)}
        open={openAddNewTaskDialog}
      />
    </div>
  );
}

function BoardHeader({
  title,
  onAddNewTask,
}: {
  title: string;
  onAddNewTask: () => void;
}) {
  return (
    <div className="flex justify-between p-5 bg-background border-b border-solid border-accent">
      <h1 className="text-4xl text-white font-semibold">{title}</h1>

      <div className="flex items-center">
        <Button onClick={onAddNewTask}>+ Add New Task</Button>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  className,
  style,
}: React.PropsWithChildren<{
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
}>) {
  return (
    <button
      style={style}
      onClick={onClick}
      className={`${className} cursor-pointer bg-theme rounded-full px-5 py-3 text-white font-semibold`}
    >
      {children}
    </button>
  );
}

function ColumnComponent({ accent, id, name, tasks }: Column) {
  return (
    <div className="w-80 shrink-0">
      <p className="flex items-center gap-2 mb-4">
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: accent }}
        ></span>
        <span className="font-semibold uppercase text-accent ">
          {name} {` (${tasks.length}) `}
        </span>
      </p>

      <div className="flex flex-col gap-5">
        {tasks?.map((t) => {
          return <TaskComponent key={t?.id} {...t} />;
        })}
      </div>
    </div>
  );
}

function TaskComponent(t: Task) {
  const [openTaskEditDialog, setOpenTaskEditDialog] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpenTaskEditDialog(true)}
        className="w-full py-5 px-4 bg-background rounded-2xl"
      >
        <p className="font-bold">{t?.title}</p>
        {t?.subtitle ? (
          <p className="font-medium text-accent">{t?.subtitle}</p>
        ) : null}
      </div>
      {/*TODO: Make it a singleton */}
      <TaskEditorDialog
        onRequestClose={() => setOpenTaskEditDialog(false)}
        open={openTaskEditDialog}
        task={t}
      />
    </>
  );
}

function TaskEditorDialog({
  task,
  open,
  onRequestClose,
}: {
  task?: Task;
  open: boolean;
  onRequestClose: () => void;
}) {
  return (
    <DialogPaper open={open} onRequestClose={onRequestClose}>
      <div></div>
    </DialogPaper>
  );
}
