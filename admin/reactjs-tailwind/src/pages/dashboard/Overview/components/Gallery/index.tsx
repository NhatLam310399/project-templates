interface IGalleryProps {
  title: string;
}

const Gallery: React.FC<IGalleryProps> = props => {
  const { children, title = "" } = props;
  return (
    <div className="mb-4">
      <div className="mb-1 text-black text-xl font-bold">{title}</div>
      <div className="phone:grid phone:grid-cols-2 laptop:grid-cols-4 gap-2">
        {children}
      </div>
    </div>
  );
};

export default Gallery;
