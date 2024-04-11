import { useState } from "react";
import dayjs from "dayjs";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";

const priorityList = ["High", "Medium", "Low"];

import Authorized from "../components/Authorized";

const TASKS = [
  {
    id: "3003A0000001",
    description: "Create the folder structure for the new project",
    status: "ACTIVE",
    createdOn: dayjs(),
    assignedBy: "John Doe",
    createdBy: "John Doe",
    priority: "HIGH",
    expectedCompletionDate: dayjs().add(5, "d"),
  },
  {
    id: "3003A0000002",
    description: "Create components needed for the project",
    status: "COMPLETED",
    assignedBy: "John Doe",
    createdBy: "John Doe",
    priority: "MEDIUM",
    createdOn: dayjs(),
    expectedCompletionDate: dayjs().add(5, "d"),
  },
  {
    id: "3003A0000003",
    description: "Divide work",
    status: "COMPLETED",
    assignedBy: "John Doe",
    createdBy: "John Doe",
    priority: "HIGH",
    createdOn: dayjs(),
    expectedCompletionDate: dayjs().add(5, "d"),
  },
  {
    id: "3003A0000004",
    description: "Update Project Tracker",
    status: "COMPLETED",
    createdBy: "John Doe",
    assignedBy: "John Doe",
    priority: "LOW",
    createdOn: dayjs(),
    expectedCompletionDate: dayjs().add(5, "d"),
  },
];

const MyTasksPage = () => {
  const [tasks, setTasks] = useState(TASKS);

  const renderDate = (date) => {
    return dayjs(date).format("MMM DD, YYYY");
  };

  const renderStatus = ({ status }) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Tag icon="pi pi-info-circle" value="Active" severity="info" />;
      case "paused":
        return <Tag icon="pi pi-pause" value="Paused" severity="warning" />;
      case "completed":
        return (
          <Tag icon="pi pi-check-circle" value="Completed" severity="success" />
        );
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
      case "Active":
        return "info";
      case "Paused":
        return "warning";
      case "Completed":
        return "success";
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "secondary";
    }
  };

  const priorityEditor = (options) => (
    <Dropdown
      value={options.value}
      options={priorityList}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Select a priority"
      itemTemplate={(option) => {
        return <Tag value={option} severity={getSeverity(option)}></Tag>;
      }}
    />
  );

  const updatePriorityHandler = ({ rowData, newValue, field }) => {
    rowData[field] = newValue.toUpperCase();
  };

  const loadAuditTrail = (taskId) => {
    alert(taskId);
  };

  const pauseTaskHandler = (taskId) => {
    setTasks((currentState) => {
      const tempTasks = [...currentState];
      const taskIndex = tempTasks.findIndex((task) => task.id === taskId);
      tempTasks[taskIndex].status = "PAUSED";
      return tempTasks;
    });
  };

  const resumeTaskHandler = (taskId) => {
    setTasks((currentState) => {
      const tempTasks = [...currentState];
      const taskIndex = tempTasks.findIndex((task) => task.id === taskId);
      tempTasks[taskIndex].status = "ACTIVE";
      return tempTasks;
    });
  };

  const renderActionCell = ({ id: taskId, status: taskStatus }) => {
    return (
      <div className="flex justify-center items-center">
        {taskStatus.toLowerCase() === "active" && (
          <Button
            tooltip="Pause Task"
            tooltipOptions={{
              position: "left",
            }}
            onClick={() => pauseTaskHandler(taskId)}
            severity="warning"
            outlined
            rounded
            text
            size="small"
            icon="pi pi-pause"
          />
        )}
        {taskStatus.toLowerCase() === "paused" && (
          <Button
            tooltip="Resume Task"
            tooltipOptions={{
              position: "left",
            }}
            onClick={() => resumeTaskHandler(taskId)}
            severity="success"
            outlined
            rounded
            text
            size="small"
            icon="pi pi-play"
          />
        )}
        <Button
          tooltip="Audit Trail"
          tooltipOptions={{
            position: "left",
          }}
          onClick={() => loadAuditTrail(taskId)}
          severity="secondary"
          outlined
          rounded
          size="small"
          text
          icon="pi pi-history"
        />
      </div>
    );
  };

  return (
    <>
      <Authorized>
        <div className="flex justify-between">
          <div className="float-start">
            <Button label="Create Task" outlined icon="pi pi-plus"></Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              label="Get Next Task"
              outlined
              icon="pi pi-chevron-circle-down"
            ></Button>
            <Button label="Pick Task" outlined icon="pi pi-file"></Button>
          </div>
        </div>
        <DataTable
          className="bg-red-500"
          showGridlines
          paginator
          rows={10}
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
            editor={priorityEditor}
            onCellEditComplete={updatePriorityHandler}
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
          ></Column>
          <Column field="action" body={renderActionCell}></Column>
        </DataTable>
      </Authorized>
    </>
  );
};

export default MyTasksPage;
