import { PropsWithChildren } from "react";

type ContentLayoutProps = {
  title: string;
};

export const ContentLayout = ({
  children,
  title,
}: PropsWithChildren<ContentLayoutProps>) => {
  return (
    <>
      <div className="p-5 min-h-screen flex flex-col pt-20 bg-slate-800 text-white">
        <h1 className="w-full text-2xl font-semibold  bg-slate-700 p-3 hover:bg-slate-600">
          {title}
        </h1>
        <div className="px-4 py-6 sm:px-6 md:px-8">{children}</div>
      </div>
    </>
  );
};
