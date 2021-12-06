import Slide from "components/Slide";
import { VideosContainer } from "./styles";
interface IVideosProps {}

const Videos: React.FC<IVideosProps> = props => {
  return (
    <VideosContainer>
      <Slide numberStep={listVideo.length} gap={310}>
        {listVideo.map(value => {
          return (
            <iframe width={400} height={200} src={value.link} frameBorder={1} />
          );
        })}
      </Slide>
    </VideosContainer>
  );
};

const listVideo: any[] = [
  {
    link: "//www.youtube.com/embed/Qpu-hg52Bww",
  },
  {
    link: "//www.youtube.com/embed/ZxfapDDdgf4",
  },
  {
    link: "//www.youtube.com/embed/eHMTG4dp48s",
  },
  {
    link: "//www.youtube.com/embed/dXFwv3MSmHM",
  },
  {
    link: "//www.youtube.com/embed/2ozxS250FIQ",
  },
];
export default Videos;
