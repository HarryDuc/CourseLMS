import React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LearningUI = () => {
    const images = {
        training: "/img/1.jpg",
        certification: "/img/2.jpg",
        analytics: "/img/3.jpg",
        customContent: "/img/4.jpg",
    };
    const testimonials = [
        {
            quote: "Udemy được đánh giá là chương trình cấp chứng chỉ hoặc khóa học online phổ biến nhất...",
            author: "Stack Overflow",
            details: "Thu thập được 37.076 phản hồi",
            link: "Xem các khóa học Phát triển web →",
            logo: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg", // Thay bằng logo phù hợp
        },
        {
            quote: "Udemy thực sự là yếu tố mang tính đột phá và là nền tảng dạy học tuyệt vời...",
            author: "Alvin Lim",
            details: "Đồng sáng lập kỹ thuật, CTO tại Dimensional",
            link: "Xem khóa học iOS & Swift này →",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            quote: "Udemy cho bạn khả năng kiên trì. Tôi đã học được chính xác những gì tôi cần...",
            author: "William A. Wachlin",
            details: "Chuyên viên quản lý đối tác tại Amazon Web Services",
            link: "Xem khóa học AWS này →",
            image: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            quote: "Với Udemy Business, các nhân viên đã có thể kết hợp các kỹ năng mềm và tư vấn...",
            author: "Ian Stevens",
            details: "Head of Capability Development, North America tại Publicis Sapient",
            link: "Đọc toàn bộ câu chuyện →",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
        },
    ];


    const [selectedCard, setSelectedCard] = useState("training");
    return (
        <div className="p-8 space-y-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {/* Section 1: Learning Program */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold">Chương trình học tập hướng tới mục tiêu của bạn</h2>

                    {/** 🟣 Card 1 - Đào tạo thực hành */}
                    <Card
                        className={`p-4 mt-4 cursor-pointer transition-all duration-300 ${selectedCard === "training"
                            ? "border-purple-500 border-l-4 border-l-purple-700 shadow-md"
                            : "border-gray-300 dark:border-gray-700"
                            }`}
                        onClick={() => setSelectedCard("training")}
                    >
                        <CardContent>
                            <h3 className="font-semibold">Đào tạo thực hành</h3>
                            <p>Nâng cao kỹ năng một cách hiệu quả với các bài tập coding, bài kiểm tra thực hành, trắc nghiệm và workspace được hỗ trợ bởi AI.</p>
                        </CardContent>
                    </Card>

                    {/** 🟣 Card 2 - Luyện thi chứng chỉ */}
                    <Card
                        className={`p-4 mt-4 cursor-pointer transition-all duration-300 ${selectedCard === "certification"
                            ? "border-purple-500 border-l-4 border-l-purple-700 shadow-md"
                            : "border-gray-300 dark:border-gray-700"
                            }`}
                        onClick={() => setSelectedCard("certification")}
                    >
                        <CardContent>
                            <h3 className="font-semibold">Luyện thi chứng chỉ</h3>
                            <p>Luyện thi các chứng chỉ được công nhận trong ngành bằng cách giải quyết các thách thức thực tế.</p>
                            <Button variant="link" className="text-purple-600">Explore courses →</Button>
                        </CardContent>
                    </Card>

                    {/** 🟣 Card 3 - Khoa học dữ liệu */}
                    <Card
                        className={`p-4 mt-4 cursor-pointer transition-all duration-300 ${selectedCard === "analytics"
                            ? "border-purple-500 border-l-4 border-l-purple-700 shadow-md"
                            : "border-gray-300 dark:border-gray-700"
                            }`}
                        onClick={() => setSelectedCard("analytics")}
                    >
                        <CardContent>
                            <h3 className="font-semibold">Những hiểu biết và khoa học phân tích dữ liệu</h3>
                            <p>Theo dõi nhanh các mục tiêu bằng những hiểu biết sâu sắc giúp thúc đẩy quá trình học tập hiệu quả.</p>
                            <Button variant="link" className="text-purple-600">Explore courses →</Button>
                        </CardContent>
                    </Card>

                    {/** 🟣 Card 4 - Nội dung tùy chỉnh */}
                    <Card
                        className={`p-4 mt-4 cursor-pointer transition-all duration-300 ${selectedCard === "customContent"
                            ? "border-purple-500 border-l-4 border-l-purple-700 shadow-md"
                            : "border-gray-300 dark:border-gray-700"
                            }`}
                        onClick={() => setSelectedCard("customContent")}
                    >
                        <CardContent>
                            <h3 className="font-semibold">Nội dung có thể tùy chỉnh</h3>
                            <p>Tạo lộ trình học tập phù hợp cho các mục tiêu của nhóm và tổ chức.</p>
                            <Button variant="link" className="text-purple-600">Explore courses →</Button>
                        </CardContent>
                    </Card>
                </div>

                {/** 📌 Hiển thị hình ảnh tương ứng */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 flex justify-center items-center">
                    <img
                        src={images[selectedCard]}
                        alt="Selected Tab Image"
                        className="w-full max-w-md rounded-lg shadow-lg transition-all duration-300"
                    />
                </div>
            </section>

            {/* Section 2: Testimonials */}
            <section className="max-w-8xl bg-gray-50 dark:bg-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                        Xem những người khác đang đạt được gì thông qua học tập
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {testimonials.map((item, index) => (
                            <Card key={index} className="shadow-md border dark:border-gray-700 hover:shadow-lg transition-all">
                                <CardContent className="flex flex-col gap-4 p-6">
                                    <p className="italic text-gray-700 dark:text-gray-300">“{item.quote}”</p>
                                    <div className="flex items-center gap-3">
                                        {item.image ? (
                                            <img src={item.image} alt={item.author} className="w-12 h-12 rounded-full" />
                                        ) : (
                                            <img src={item.logo} alt="logo" className="w-16" />
                                        )}
                                        <div className="text-left">
                                            <p className="font-semibold">{item.author}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.details}</p>
                                        </div>
                                    </div>
                                    <a href="#" className="text-purple-600 font-medium hover:underline">{item.link}</a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LearningUI;
