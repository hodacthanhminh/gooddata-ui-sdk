// (C) 2023 GoodData Corporation
import React from "react";
import { Dashboard } from "@gooddata/sdk-ui-dashboard";
import { idRef } from "@gooddata/sdk-model";
import { Dashboards } from "../../../../../reference_workspace/workspace_objects/goodsales/current_reference_workspace_objects_tiger";

export const DependentFiltersScenario: React.FC = () => {
    return (
        <Dashboard
            dashboard={idRef(Dashboards.DashboardWithDependentFilters)}
            config={{ settings: { enableKDDependentFilters: true } }}
        />
    );
};
