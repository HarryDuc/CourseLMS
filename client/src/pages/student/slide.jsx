import React from "react";

const PromoSection = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between">
        <div className="text-left md:w-1/2">
          <h1 className="text-2xl font-bold">Tham gia học tập với chi phí thấp hơn</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Nếu bạn là người mới sử dụng Udemy thì đây là một tin vui dành cho bạn: Trong thời gian có hạn, các khóa học có giá chỉ từ 279.000₫ cho học viên mới! Mua ngay.
          </p>
        </div>
        <div className="md:w-1/2 mt-4 md:mt-0">
          <img src="slide.jpg" alt="Hình ảnh khuyến mãi" className="w-full rounded-lg" />
        </div>
      </div>
      <div className="text-gray-600 dark:text-gray-400 mt-8">Được hơn 16.000 công ty và hàng triệu học viên trên khắp thế giới tin dùng</div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-4 items-center">
        <img src="1.svg" alt="Company 1" className="h-10 mx-auto" />
        <img src="2.svg" alt="Company 2" className="h-10 mx-auto" />
        <img src="3.svg" alt="Company 3" className="h-10 mx-auto" />
        <img src="4.svg" alt="Company 4" className="h-10 mx-auto" />
        <img src="5.svg" alt="Company 5" className="h-10 mx-auto" />
      </div>
    </div>
  );
};

export default PromoSection;