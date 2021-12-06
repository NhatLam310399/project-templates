interface ITag {
    active?: boolean;
}

const Tag: React.FC<ITag> = props => {
    const { active, children } = props;
    return (
        <div
            className={`w-10 h-3 font-normal text-white leading-none  flex items-center justify-center ${
                active ? "bg-pink" : "bg-body"
            }`}
        >
            {children}
        </div>
    );
};

export default Tag;
