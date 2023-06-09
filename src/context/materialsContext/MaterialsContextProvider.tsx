import React from "react";
import { IMaterial } from "../../models/Material";
import { MaterialsContext } from "../materialsContext";

type Props = {
    children: React.ReactNode;
};

const MaterialsContextProvider: React.FC<Props> = ({ children }) => {
    const [materials, setMaterials] = React.useState<IMaterial[]>([]);

    const deleteMaterial = (fileName: string) => {
        setMaterials((materials) => materials.filter((material) => material.fileName !== fileName));
    };

    return <MaterialsContext.Provider value={{ materials, setMaterials, deleteMaterial }}>{children}</MaterialsContext.Provider>;
};

export default MaterialsContextProvider;
