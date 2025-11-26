import AdminLayout from "@/components/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import React from "react";

const page = () => {
  return (
    <div>
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    </div>
  );
};

export default page;
