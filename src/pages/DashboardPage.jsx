import { useMemo, useState } from "react";
import { Tag } from "primereact/tag";
import { Card } from "primereact/card";
import { Knob } from "primereact/knob";
import { Chart } from "primereact/chart";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";

import Authorized from "../components/Authorized";

const DashboardPage = () => {
  const [selectedTaskBreakdownType, setSelectedTaskBreakdownType] =
    useState("Priority");

  const tasksCompletedData = useMemo(() => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Tasks completed",
          data: [540, 325, 702, 620, 333, 100, 699, 560, 432, 190, 199, 87],
          borderWidth: 1,
        },
      ],
    };
  }, []);
  const tasksCompletedOptions = useMemo(() => {
    return {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "#0083B0");
        gradient.addColorStop(1, "#00B4DB");
        return gradient;
      },
    };
  }, []);
  const priorityTasksRatedata = useMemo(() => {
    return {
      labels: ["High", "Medium", "Low"],
      datasets: [
        {
          label: "Tasks completed",
          data: [14, 5, 12],
          backgroundColor: ["#dc2626", "#ea580c", "#16a34a"],
          hoverBackgroundColor: ["#f87171", "#fb923c", "#4ade80"],
        },
      ],
    };
  }, []);
  const doughnutChartOptions = useMemo(() => {
    return {
      cutout: "60%",
    };
  }, []);
  const statusTasksRatedata = useMemo(() => {
    return {
      labels: ["Todo", "In Progress", "Completed", "Overdue"],
      datasets: [
        {
          data: [22, 7, 5, 2],
          backgroundColor: ["#475569", "#0284c7", "#16a34a", "#dc2626"],
          hoverBackgroundColor: ["#94a3b8", "#38bdf8", "#4ade80", "#f87171"],
        },
      ],
    };
  }, []);
  const leaderBoard = useMemo(
    () => [
      { rank: 1, name: "Alice Walker", tasksCompleted: 87, status: "Online" },
      { rank: 2, name: "Bob Johnson", tasksCompleted: 62, status: "Offline" },
      { rank: 3, name: "Charlie Wilson", tasksCompleted: 95, status: "Online" },
      { rank: 4, name: "David Miller", tasksCompleted: 38, status: "Offline" },
      { rank: 5, name: "Emily Garcia", tasksCompleted: 79, status: "Online" },
      {
        rank: 6,
        name: "Frank Hernandez",
        tasksCompleted: 45,
        status: "Online",
      },
      { rank: 7, name: "Grace Thomas", tasksCompleted: 82, status: "Online" },
      { rank: 8, name: "Henry Lee", tasksCompleted: 57, status: "Offline" },
      { rank: 9, name: "Isabella Brown", tasksCompleted: 29, status: "Online" },
      { rank: 10, name: "Jack Robinson", tasksCompleted: 92, status: "Online" },
    ],
    []
  );

  const renderStatus = ({ status }) => {
    switch (status.toLowerCase()) {
      case "online":
        return <Tag severity="success" value="Online"></Tag>;
      case "offline":
        return <Tag severity="danger" value="Offline"></Tag>;
      default:
        return <Tag severity="secondary" value="Unknown"></Tag>;
    }
  };

  return (
    <>
      <Authorized>
        <div className="grid grid-cols-4 gap-3">
          <Card className="bg-gradient-to-br from-[#FF5F6D] to-[#FFC371] justify-center flex items-center">
            <div className="flex gap-3 items-center text-slate-50">
              <h1 className="text-3xl font-bold">89%</h1>
              <h1 className="font-semibold">Task Completion Rate</h1>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-[#EECDA3] to-[#EF629F] justify-center flex items-center">
            <div className="flex gap-3 items-center text-slate-50">
              <h1 className="text-3xl font-bold">32 Mins</h1>
              <h1 className="font-semibold w-1/2">Average Completion Time</h1>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-[#834d9b] to-[#d04ed6] justify-center flex items-center">
            <div className="flex gap-3 items-center text-slate-50">
              <h1 className="text-3xl font-bold">96%</h1>
              <h1 className="font-semibold">On time Completion Rate</h1>
            </div>
          </Card>
          <div className="flex justify-center items-center border rounded">
            <Knob value={92} valueTemplate={"{value}%"} size={200} />
            <h1 className="text-slate-500 font-semibold">
              Productive this week🔥
            </h1>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col border rounded p-3">
            <h1 className="text-slate-700 text-lg font-semibold">
              Total tasks completed in the last 12 months
            </h1>
            <Chart
              type="bar"
              data={tasksCompletedData}
              options={tasksCompletedOptions}
            />
          </div>
          <div className="flex-0 w-1/2 flex flex-col border rounded p-3 gap-8">
            <div className="flex justify-between items-center">
              <h1 className="text-slate-700 text-lg font-semibold">
                Task Completion Rate
              </h1>
              <div className="flex justify-end">
                <Dropdown
                  className="w-48"
                  value={selectedTaskBreakdownType}
                  onChange={(event) =>
                    setSelectedTaskBreakdownType(event.value)
                  }
                  options={["Priority", "Status"]}
                  placeholder="Select the task breakdown rate"
                />
              </div>
            </div>
            <div className="self-center">
              <Chart
                type="doughnut"
                data={
                  selectedTaskBreakdownType === "Priority"
                    ? priorityTasksRatedata
                    : statusTasksRatedata
                }
                options={doughnutChartOptions}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex-1 flex flex-col border rounded p-3">
            <h1 className="text-slate-700 text-lg font-semibold">
              Leaderboard
            </h1>
            <DataTable value={leaderBoard} size="small">
              <Column field="rank" header="Rank"></Column>
              <Column field="name" header="Name"></Column>
              <Column
                field="tasksCompleted"
                header="Total Tasks Completed"
              ></Column>
              <Column
                field="status"
                header="Status"
                body={renderStatus}
              ></Column>
            </DataTable>
          </div>
        </div>
      </Authorized>
    </>
  );
};

export default DashboardPage;
