import React from "react";

const ProjectCatalog = () => {
  return (
    <div className="flex items-center gap-10">
      <div className="w-48 self-start flex flex-col gap-3">
        <div>Project Catalog &trade; </div>
        <p className="text-sm">
          Browse and buy projects that have a clear scope and price.
        </p>
        <a href="https://youtube.com" className="text-green-500">
          <span className="text-sm underline hover:no-underline">
            Browse Project Catalog
          </span>{" "}
          &gt;
        </a>
      </div>
      <div className="flex gap-2 w-60 flex-wrap">
        <div className="w-16 h-20 border border-slate-400 text-center">
          Card
        </div>
        <div className="w-16 h-20 border border-slate-400 text-center">
          Card
        </div>
        <div className="w-16 h-20 border border-slate-400 text-center">
          Card
        </div>
        <div className="w-16 h-20 border border-slate-400 text-center">
          Card
        </div>
        <div className="w-16 h-20 border border-slate-400 text-center">
          Card
        </div>
        <div className="w-16 h-20 border border-slate-400 text-center">
          Card
        </div>
      </div>
    </div>
  );
};

export default ProjectCatalog;
