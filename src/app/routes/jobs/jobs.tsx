import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useJobs } from "@/modules/jobs/api";
import { JobsTable } from "@/modules/jobs/components";
import { JobsListBox } from "@/modules/jobs/components/JobsFilterListbox";
import { JobsInput } from "@/modules/jobs/components/JobsInput";
import { Job, JobFilter, JobFilterAndAll } from "@/modules/jobs/types";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";

export const JobsRoute = () => {
  const { isLoading, data: jobsData } = useJobs({
    queryConfig: {
      select: (data) =>
        data.map((job) => ({
          ...job,
          date: formatDate(job.date),
        })),
    },
  });

  const filterKeys: JobFilterAndAll[] = jobsData
    ? (["All", ...Object.keys(jobsData?.[0] || {})] as JobFilterAndAll[])
    : [];

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFilters, setSelectedFilters] = useState<JobFilterAndAll[]>(
    filterKeys || [],
  );

  const handleApplyToJob = (job: Job) => {
    alert(`Applying to job: ${job.title}`);
  };

  const handleFilterChange = (newFilters: JobFilterAndAll[]) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes("All") && newFilters.includes("All")) {
        return prevFilters.filter((filter) => !newFilters.includes(filter));
      }

      if (newFilters.length === filterKeys.length - 1) {
        if (newFilters.includes("All") && !prevFilters.includes("All")) {
          return filterKeys;
        }

        if (!newFilters.includes("All") && prevFilters.includes("All")) {
          return [];
        }

        return filterKeys;
      }

      if (newFilters.includes("All")) {
        return filterKeys;
      }

      return newFilters;
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const filteredJobs = jobsData?.filter((job) => {
    if (searchQuery === "") {
      return true;
    }

    if (selectedFilters.includes("All")) {
      return Object.values(job).some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return selectedFilters.some((filter) => {
      if (filter === "All") {
        return true;
      }

      return job[filter as JobFilter]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  });

  const tableFacets = selectedFilters.filter(
    (filter) => filter !== "All",
  ) as JobFilter[];

  return (
    <ContentLayout title="Job lists">
      <div className="flex flex-col gap-y-5">
        <div className="flex gap-x-5">
          <JobsInput onChange={handleSearchChange} />
          <JobsListBox
            filterKeys={filterKeys}
            onSelectionChange={handleFilterChange}
            selectedFilters={selectedFilters}
          />
        </div>
        {isLoading && <div>Loading...</div>}
        <JobsTable
          jobsData={filteredJobs}
          onApply={handleApplyToJob}
          facets={tableFacets}
        />
      </div>
    </ContentLayout>
  );
};
