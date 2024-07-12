import { Table, TableColumn } from "@/components/ui/Table";
import { formatDate } from "@/utils/formatDate";
import { JobsButton } from "./JobsButton";
import { Job, JobFilter } from "../types";

interface JobsTableProps {
  jobsData?: Job[];
  onApply: (job: Job) => void;
  facets?: JobFilter[];
}

export const JobsTable = ({ jobsData, onApply, facets }: JobsTableProps) => {
  if (!jobsData) {
    return null;
  }

  const dataColumns: TableColumn<Job>[] = [
    {
      title: "Title",
      field: "title",
      Cell({ entry }) {
        return <span className="font-bold">{entry.title}</span>;
      },
    },
    {
      title: "Category",
      field: "category",
    },
    {
      title: "City",
      field: "city",
    },
    {
      title: "State",
      field: "state",
    },
    {
      title: "Date",
      field: "date",
      Cell({ entry }) {
        return <span>{formatDate(entry.date)}</span>;
      },
    },
    {
      title: "Apply URL",
      field: "apply-url",
    },
  ];

  const actionsColumns: TableColumn<Job>[] = [
    {
      title: "Actions",
      Cell({ entry }) {
        return (
          <JobsButton onClick={() => onApply(entry)}>Apply Now</JobsButton>
        );
      },
    },
  ];

  const filteredColumns = dataColumns.filter((column) => {
    return facets?.includes(column.field as JobFilter);
  });

  const columns = filteredColumns.length
    ? [...filteredColumns, ...actionsColumns]
    : filteredColumns;

  return <Table<Job> data={jobsData || []} columns={columns}></Table>;
};
