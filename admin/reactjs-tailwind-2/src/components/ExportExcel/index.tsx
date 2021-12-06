/* eslint-disable no-prototype-builtins */
/* eslint-disable no-underscore-dangle */
import React from "react";
import XLSX from "xlsx";
import { t } from "language";
import Button from "designs/Button";

interface IExportExcel {
    onFetchApi: (text: string) => Promise<Record<any, any>[]>;
    fileName?: string;
}

const ExportExcel: React.FC<IExportExcel> = ({ onFetchApi, fileName = "" }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const handleExport = async () => {
        const data = await onFetchApi?.("");
        if (!data || data.length < 1) return;

        const nameData = data[0].__typename
            ? `${data[0].__typename}-data`
            : `data}`;

        const headerSheet = Object.keys(data[0]).flatMap((key: string) => {
            return [key];
        });

        const jsonData = data.map(row => {
            const newObject = { ...row };
            Object.entries(row).forEach(([key, value]) => {
                if (typeof value === "object") {
                    const field = JSON.stringify(value);
                    newObject[key] = field;
                } else {
                    newObject[key] = value;
                }
            });
            return newObject;
        });
        const ws = XLSX.utils.json_to_sheet(jsonData, {
            header: headerSheet,
        });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `${nameData + fileExtension}`, {
            bookType: "xlsx",
        });
    };
    return (
        <Button
            onClick={handleExport}
            innerClassName="normal-case text-lg font-medium hover:bg-line"
            className="w-full"
        >
            {t("job.export-excel")}
        </Button>
    );
};

export default ExportExcel;
