import IphoneX from "assets/images/body-general-situation-image.png";

const GeneralSituation: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full gap-1 px-2 py-5 phone:py-6 phone:px-5 laptop:px-10">
      <div className="justify-center hidden w-1/2 desktop:block">
        <img src={IphoneX} alt="Iphone X" className="w-7/12 mx-auto" />
      </div>
      <div className="w-full text-justify laptop:px-5 desktop:pl-0 desktop:w-1/2">
        <h4 className="mb-3 font-bold text-center text-mxl phone:text-2xl laptop:text-4xl text-secondary desktop:text-left">
          TÌNH TRẠNG CHUNG CỦA CÁC CƠ SỞ KINH DOANH DỊCH VỤ GIẢI TRÍ BAR KARAOKE
        </h4>
        <p className="text-lg font-normal leading-relaxed text-black laptop:leading-loose desktop:leading-normal ">
          Trong các ngành nghề kinh doanh thì kinh doanh karaoke là ngành nghề
          kinh doanh không khó. Tuy nhiên bạn cần phải có những quy tắc, quy
          định và quy trình quản lý phù hợp để quán karaoke của bạn thật sự
          chuyên nghiệp. Tuy nhiên tất cả đơn giản thôi... Các bạn cần ý thức
          được quy trình quản lý chuyên nghiệp tất cả mọi thứ sẽ oke… Nếu bạn
          biết cách hoặc có phương án quản lý hợp lý thậm chí bạn có thể điều
          hành quản lý được nhiều cơ sở kinh doanh karaoke cùng một lúc. bất kể
          lĩnh vực ngành nghề nào đều có những khó khăn nhất định, nhưng "lĩnh
          vực nào khó khăn càng nhiều sẽ tạo ra cơ hội và thành công càng lớn"
          cho chủ đầu tư. Quan trọng để đi tới thành công cuối cùng là chủ đầu
          tư phải biết vượt qua khó khăn… thậm chí biến khó khăn thành lợi thế
          cho chính mình. Kinh doanh karaoke là một lĩnh vực kinh doanh không
          bao giờ lỗi thời bởi nhu cầu hát của con người là Vĩnh cửu.
          <br />
          <br /> Những cơ sở kinh doanh karaoke không biết cách đầu tư, không
          định hướng được kế hoạch kinh doanh, kinh doanh bay lắc trá hình… tất
          cả những cơ sở kinh doanh karaoke như vậy đang ngày càng suy tàn… suy
          tàn trên chính những định hướng chiến lược sai lầm của họ.
          <br />
          <br /> Tóm lại ở thời điểm này… để tạo ra một cơ sở kinh doanh karaoke
          lành mạnh, đẳng cấp, bền vững... dễ thành cônghơn nhiều nếu bạn định
          hướng cho Cơ sở kinh doanh của bạn phục vụ theo mô hình bay lắc, tệ
          nạn trá hình… Mô hình tệ nạn có thể tạo cho bạn doanh thu ban đầu rất
          tốt, nhưng cái giá phải trả cho bạn là vô cùng lớn… bạn sẽ mất toàn bộ
          khách hát gia đình, thời gian kinh doanh của bạn chắc chắn sẽ không
          dài. Và chi bằng có thể để doanh thu của bạn kém hơn một chút nhưng
          bền vững và nhẹ nhàng, dễ đầu tư, dễ quản lý…
        </p>
      </div>
    </div>
  );
};

export default GeneralSituation;
