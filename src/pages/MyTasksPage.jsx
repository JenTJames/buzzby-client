import { useState } from "react";
import dayjs from "dayjs";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";

const statusList = ["Todo", "In Progress", "Overdue", "Completed"];

import Authorized from "../components/Authorized";
import { useNavigate } from "react-router-dom";

const TASKS = [
  {
    id: "3003A0000001",
    description: "Create the folder structure for the new project",
    status: "TODO",
    createdOn: dayjs(),
    assignedBy: "John Doe",
    createdBy: "John Doe",
    priority: "HIGH",
    expectedCompletionDate: dayjs().add(5, "d"),
  },
  {
    id: "3003A0000002",
    description: "Create components needed for the project",
    status: "TODO",
    assignedBy: "John Doe",
    createdBy: "John Doe",
    priority: "MEDIUM",
    createdOn: dayjs(),
    expectedCompletionDate: dayjs().add(5, "d"),
  },
  {
    id: "3003A0000003",
    description: "Divide work",
    status: "TODO",
    assignedBy: "John Doe",
    createdBy: "John Doe",
    priority: "HIGH",
    createdOn: dayjs(),
    expectedCompletionDate: dayjs().add(5, "d"),
  },
  {
    id: "3003A0000004",
    description: "Update Project Tracker",
    status: "TODO",
    createdBy: "John Doe",
    assignedBy: "John Doe",
    priority: "LOW",
    createdOn: dayjs(),
    expectedCompletionDate: dayjs().add(5, "d"),
  },
];

const MyTasksPage = () => {
  const [tasks] = useState(TASKS);

  const navigate = useNavigate();

  const renderDate = (date) => {
    return dayjs(date).format("MMM DD, YYYY");
  };

  const renderStatus = ({ status }) => {
    switch (status.toLowerCase()) {
      case "todo":
        return <Tag value="Todo" severity="info" />;
      case "in_progress":
        return <Tag value="In Progress" severity="warning" />;
      case "in progress":
        return <Tag value="In Progress" severity="warning" />;
      case "completed":
        return <Tag value="Completed" severity="success" />;
      case "overdue":
        return <Tag value="Overdue" severity="danger" />;
      default:
        return <Tag value="Unknown" severity="secondary" />;
    }
  };

  const renderPriority = (priority) => {
    if (priority === "HIGH") return <Tag value="High" severity="danger" />;
    if (priority === "MEDIUM") return <Tag value="Medium" severity="warning" />;
    return <Tag value="Low" severity="success" />;
  };

  const getSeverity = (status) => {
    switch (status) {
      case "Todo":
        return "info";
      case "In Progress":
        return "warning";
      case "Completed":
        return "success";
      case "Overdue":
        return "danger";
      default:
        return "secondary";
    }
  };

  const statusEditor = (options) => (
    <Dropdown
      value={options.value}
      options={statusList}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Select a Status"
      itemTemplate={(option) => {
        return <Tag value={option} severity={getSeverity(option)}></Tag>;
      }}
    />
  );

  const updateStatusHandler = ({ rowData, newValue, field }) => {
    rowData[field] = newValue;
  };

  const openAddTaskPage = () => {
    navigate("/my-tasks/new");
  };

  return (
    <>
      <Authorized>
        <div className="self-end">
          <Button
            onClick={openAddTaskPage}
            label="Add Task"
            icon="pi pi-plus"
          ></Button>
        </div>
        <DataTable
          showGridlines
          resizableColumns
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          value={tasks}
          size="small"
          sortMode="multiple"
          editMode="cell"
          removableSort
        >
          <Column sortable field="id" header="Task ID"></Column>
          <Column field="description" header="Description"></Column>
          <Column
            field="priority"
            sortable
            header="Priority"
            body={({ priority }) => renderPriority(priority)}
          ></Column>
          <Column field="createdBy" header="Created By"></Column>
          <Column field="assignedBy" header="Assigned By"></Column>
          <Column
            sortable
            field="createdOn"
            header="Created On"
            body={({ createdOn }) => renderDate(createdOn)}
          ></Column>
          <Column
            sortable
            field="expectedCompletionDate"
            header="Expected Completion Date"
            body={({ expectedCompletionDate }) =>
              renderDate(expectedCompletionDate)
            }
          ></Column>
          <Column
            sortable
            field="status"
            header="Status"
            body={renderStatus}
            editor={statusEditor}
            onCellEditComplete={updateStatusHandler}
          ></Column>
        </DataTable>
      </Authorized>
    </>
  );
};

export default MyTasksPage;
