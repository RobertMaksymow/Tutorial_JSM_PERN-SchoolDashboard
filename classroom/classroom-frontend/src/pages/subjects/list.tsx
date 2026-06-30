import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import React from "react";

const SubjectsList = () => {
  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Subjects List</h1>
    </ListView>
  );
};

export default SubjectsList;
