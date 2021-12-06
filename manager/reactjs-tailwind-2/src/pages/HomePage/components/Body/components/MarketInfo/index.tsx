import MarketBackground from "assets/images/body-market-image.jpg";

const MarketInfo: React.FC = () => {
  return (
    <div
      className="relative w-full "
      style={{
        backgroundImage: `url(${MarketBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="z-20 w-full px-2 py-5 overflow-hidden text-lg text-justify text-white home-market-info_content phone:px-5 phone:py-7 desktop:px-15 phone:text-xl">
        <h4 className="mb-3 font-bold text-center text-mxl phone:text-2xl laptop:text-4xl">
          THỊ TRƯỜNG NGÁCH KARAOKE TÌNH HÌNH CHUNG
        </h4>
        <p className="h-full text-lg font-normal leading-relaxed laptop:py-4 desktop:leading-loose">
          Karaoke là một trong những loại hình kinh doanh tiềm năng, có thể mang
          đến thành công và lợi nhuận cho chủ đầu tư, nếu như họ biết nắm bắt cơ
          hội, vượt qua thách thức và có cách vận hành, quản lý phù hợp. Sau
          đây, hãy cùng KTV-APP tìm hiểu rõ hơn về lĩnh vực kinh doanh này tại
          thị trường Việt Nam nhé!
          <br />
          <br /> Cơ hội phát triển của ngành Karaoke Một trong những lợi thế lớn
          nhất của ngành kinh doanh Karaoke chính là sở thích ca hát và yêu âm
          nhạc của người Việt. Dù là nam hay nữ, bất kỳ độ tuổi, ngành nghề nào
          đều có nhu cầu ca hát để thỏa đam mê, tạo không khí vui vẻ hoặc đơn
          giản chỉ là gạt bỏ những điều lo toan trong cuộc sống.Khắp mọi miền
          quê, từ thành thị đến nông thôn, không khó để chúng ta bắt gặp hình
          ảnh dàn nhạc, kèn trống và những ca sĩ “cây nhà lá vườn” xuất hiện
          trong các buổi tiệc, từ tiệc cưới, thôi nôi, tiệc sinh nhật… Hơn thế
          nữa, các chương trình truyền hình về âm nhạc hoặc có yếu tố liên quan
          đến âm nhạc đều được công chúng đón nhận và ủng hộ trong một thời gian
          dài. Người Việt thích ca hát là lợi thế lớn nhất cho ngành kinh doanh
          Karaoke.
          <br />
          <br /> Khi nói về thị trường kinh doanh một lĩnh vực nào đó, điều quan
          trọng vẫn là xác định tuổi thọ của ngành nghề. Có những ngành sẽ bị
          bão hòa hoặc lụi tàn khi nó không đáp ứng được sự phát triển của xã
          hội, đặc biệt là trong thời đại công nghệ 4.0 như hiện nay. Tuy nhiên,
          Karaoke lại là một trường hợp ngoại lệ. Đây không phải là ngành dễ
          “chết” mà nó có thể thích nghi, thay đổi và phát triển phù hợp với
          từng thời điểm của xã hội.Nhìn lại thời điểm từ lúc xuất hiện ở Nhật
          Bản năm 1971, karaoke chỉ là một hình thức giải trí thô sơ, dần dần nó
          lan rộng sang các quốc gia châu Âu và phát triển mạnh mẽ với hệ thống
          âm thanh, dàn nhạc hiện đại. Tính đến nay, Karaoke đã được nâng cấp
          thêm một bậc với kỹ thuật tìm kiếm bài hát trên Youtube, bài hát mới
          cập nhật thường xuyên. Từ đó, đủ để thấy rằng, đây là một ngành nghề
          không dễ bị bão hòa và sẽ mãi đi cùng với nhu cầu giải trí của con
          người. Mặt khác, dịch vụ Karaoke sẽ còn phát triển hơn nữa khi Nhà
          nước hiện đang có những chính sách phát triển “kinh tế ban đêm”.
          <br />
          <br /> Thách thức lớn trong lĩnh vực kinh doanh karaoke song song với
          những lợi thế tiềm năng như trên, ngành kinh doanh dịch vụ Karaoke
          cũng gặp phải nhiều thách thức lớn, gây trở ngại cho những chủ đầu tư
          khi mới bắt đầu. Trở ngại lớn nhất được đặt ra chính là đạo đức nghề
          nghiệp. Việc xây dựng định hướng kinh doanh Karaoke nhằm mục đích phục
          vụ nhu cầu giải trí của công chúng phải luôn đặt lên hàng đầu, không
          vì lợi nhuận mà có những hành vi vi phạm pháp luật hay đi ngược với
          thuần phong mỹ tục của dân tộc.Hơn nữa, khi xem xét khía cạnh chuyên
          sâu hơn trong kinh doanh, thì khả năng quản lý và vận hành Karaoke khá
          phức tạp. Là ngành nghề đặc biệt khi kết hợp giữa 3 ngành Âm nhạc, F&B
          và Giải trí, nên Karaoke rất khó để vận hành, quản lý và kiểm soát các
          vấn đề phát sinh
        </p>
      </div>
    </div>
  );
};

export default MarketInfo;
