import IconButton from "designs/IconButton";

interface IIconButtonProps {
    className?: string;
}

export const EditButton: React.FC<IIconButtonProps> = props => (
    <IconButton svgName="common/edit" title="Chỉnh sửa" {...props} />
);

export const DeleteButton: React.FC<IIconButtonProps> = props => (
    <IconButton svgName="common/delete" title="Xoá" {...props} />
);
