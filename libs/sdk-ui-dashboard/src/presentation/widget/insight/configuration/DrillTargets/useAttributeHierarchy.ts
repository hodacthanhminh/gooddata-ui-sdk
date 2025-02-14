// (C) 2023 GoodData Corporation
import { useRef, useState } from "react";
import { ICatalogAttributeHierarchy } from "@gooddata/sdk-model";

import { useDashboardDispatch, catalogActions } from "../../../../../model/index.js";

interface IUseAttributeHierarchy {
    onDeleteInteraction: () => void;
}

export const useAttributeHierarchy = (params: IUseAttributeHierarchy) => {
    const { onDeleteInteraction } = params;
    const dispatch = useDashboardDispatch();

    const [shouldDisplayAttributeHierarchyDialog, setDisplayAttributeHierarchyDialog] = useState(false);
    const editingAttributeHierarchyRef = useRef<ICatalogAttributeHierarchy>();

    const onOpenAttributeHierarchyDialog = (attributeHierarchy?: ICatalogAttributeHierarchy) => {
        editingAttributeHierarchyRef.current = attributeHierarchy;
        setDisplayAttributeHierarchyDialog(true);
    };

    const onCloseAttributeHierarchyDialog = () => {
        setDisplayAttributeHierarchyDialog(false);
    };

    const onSaveAttributeHierarchy = (attributeHierarchy?: ICatalogAttributeHierarchy) => {
        if (editingAttributeHierarchyRef.current && attributeHierarchy) {
            dispatch(catalogActions.updateAttributeHierarchy(attributeHierarchy));
            return;
        }

        if (attributeHierarchy) {
            onDeleteInteraction();
            dispatch(catalogActions.addAttributeHierarchy(attributeHierarchy));
        }
    };

    const onDeleteAttributeHierarchy = () => {
        if (editingAttributeHierarchyRef.current) {
            dispatch(catalogActions.deleteAttributeHierarchy(editingAttributeHierarchyRef.current));
        }
    };

    return {
        shouldDisplayAttributeHierarchyDialog,
        editingAttributeHierarchyRef,
        onOpenAttributeHierarchyDialog,
        onCloseAttributeHierarchyDialog,
        onSaveAttributeHierarchy,
        onDeleteAttributeHierarchy,
    };
};
