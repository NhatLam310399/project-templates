interface IViewField {
    label?: string;
    isTextArea?: boolean;
    className?: string;
    content?: string;
}

const ViewField: React.FC<IViewField> = props => {
    const { label, isTextArea, className, content } = props;

    return (
        <div className={className}>
            <p className="text-lg font-medium leading-none mb-0.5">{label}</p>
            <div
                className={`bg-gray py-1.5 px-2 text-body text-md ${
                    isTextArea ? "h-14 overflow-y-auto" : "h-5"
                }`}
            >
                {content}
            </div>
        </div>
    );
};

export default ViewField;
