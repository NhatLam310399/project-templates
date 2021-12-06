import React, { useState } from "react";

import IconButton from "designs/IconButton";

interface IAttachmentButtonProps {
  type: "image" | "file";
}

const AttachmentButton: React.FC<IAttachmentButtonProps> = props => {
  const { type } = props;
  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const title = type === "image" ? "Đính kèm hình ảnh" : "Đính kèm file zip";
  const accept = type === "image" ? "image/*" : ".zip,.rar,.7zip";
  return (
    <label
      htmlFor={`attachment-${type}`}
      className="w-3.5 h-3.5 rounded flex items-center justify-center bg-tertiary hover:bg-line cursor-pointer"
    >
      <IconButton
        title={title}
        svgName={`common/attachment-${type}`}
        className="w-2"
      />
      <input
        id={`attachment-${type}`}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
    </label>
  );
};

export default AttachmentButton;
