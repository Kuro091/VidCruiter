import { QueryConfig } from "@/libs/react-query";
import fakeJobs from "@/mock-data/jobs.json";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Job } from "../types";

const getJobs = (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeJobs);
    }, 2000);
  });
};

const initialData: Job[] = [
  {
    title: "Loading...",
    date: "Loading...",
    "apply-url": "Loading...",
    category: "Loading...",
    city: "Loading...",
    state: "Loading...",
  },
];

export const getJobsQueryOptions = () => {
  return queryOptions({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
};

interface UseJobsOptions {
  queryConfig?: QueryConfig<typeof getJobsQueryOptions>;
}

export const useJobs = ({ queryConfig }: UseJobsOptions = {}) => {
  return useQuery({
    ...getJobsQueryOptions(),
    placeholderData: initialData,
    ...queryConfig,
  });
};
