export type BoardData = {
  id: string;
  title: string;
  columns: Column[];
};

export type Column = {
  id: string;
  accent: string;
  isDefault: boolean;
  name: string;
  tasks: Task[];
};

export type Task = {
  title: string;
  subtitle: string;
  columnId: string;
  boardId: string;
  id: string;
};

export async function getBoardDetails(
  boardId: string,
  abortController?: AbortController
): Promise<BoardData> {
  return {
    id: "platform-launch",
    title: "Platform Launch",
    columns: [
      {
        id: "Todo",
        accent: "rgba(60, 188, 224)",
        name: "Todo",
        isDefault: true,
        tasks: [
          {
            title: "A",
            subtitle: "b",
            columnId: "Todo",
            id: "a",
            boardId: "platform-launch",
          },
        ],
      },
      {
        id: "Doing",
        accent: "rgba(119, 100, 238)",
        name: "Doing",
        isDefault: false,
        tasks: [
          {
            title: "B",
            subtitle: "",
            columnId: "Doing",
            id: "b",
            boardId: "platform-launch",
          },
        ],
      },
      {
        id: "Done",
        accent: "rgba(91, 221, 165)",
        name: "Done",
        isDefault: false,
        tasks: [
          {
            title: "C",
            subtitle: "",
            columnId: "Done",
            id: "c",
            boardId: "platform-launch",
          },
        ],
      },
    ],
  };
}
