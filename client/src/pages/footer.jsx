import React from "react";
import { Globe } from "lucide-react"; // Icon ngôn ngữ
const Footer = () => {
    const footerData = [
        {
            title: "Chứng chỉ theo Tổ chức phát hành",
            links: [
                "Chứng chỉ Amazon Web Services (AWS)",
                "Chứng chỉ Six Sigma",
                "Chứng chỉ Microsoft",
                "Chứng chỉ Cisco",
                "Chứng chỉ Tableau",
                "Xem tất cả chứng chỉ"
            ]
        },
        {
            title: "Phát triển web",
            links: ["Phát triển web", "JavaScript", "React JS", "Angular", "Java"]
        },
        {
            title: "Chứng chỉ CNTT",
            links: [
                "Amazon AWS",
                "Chứng chỉ đám mây AWS cấp cơ bản",
                "AZ-900: Microsoft Azure Fundamentals",
                "Chứng chỉ kỹ sư giải pháp AWS cấp hội viên",
                "Kubernetes"
            ]
        },
        {
            title: "Năng lực lãnh đạo",
            links: [
                "Năng lực lãnh đạo",
                "Kỹ năng quản lý",
                "Quản lý dự án",
                "Năng suất cá nhân",
                "Trí tuệ cảm xúc"
            ]
        },
        {
            title: "Chứng chỉ theo Kỹ năng",
            links: [
                "Chứng chỉ an ninh mạng",
                "Chứng chỉ Quản lý dự án",
                "Chứng chỉ Đàm phán",
                "Chứng chỉ Khoa học phân tích dữ liệu thô",
                "Chứng chỉ Quản lý nguồn nhân lực",
                "Xem tất cả chứng chỉ"
            ]
        },
        {
            title: "Khoa học dữ liệu",
            links: ["Khoa học dữ liệu", "Python", "Học máy", "ChatGPT", "Học sâu"]
        },
        {
            title: "Giao tiếp",
            links: ["Kỹ năng giao tiếp", "Kỹ năng thuyết trình", "Diễn thuyết trước công chúng", "Viết", "PowerPoint"]
        },
        {
            title: "BI và phân tích dữ liệu kinh doanh",
            links: ["Microsoft Excel", "SQL", "Microsoft Power BI", "Phân tích dữ liệu", "Phân tích kinh doanh"]
        },
        {
            title: "Giới thiệu",
            links: ["Giới thiệu", "Nghề nghiệp", "Hãy liên hệ với chúng tôi", "Blog", "Nhà đầu tư"]
        },
        {
            title: "Khám phá Udemy",
            links: ["Tải ứng dụng", "Giảng dạy trên Udemy", "Gói và Giá cả", "Đơn vị liên kết", "Trợ giúp và Hỗ trợ"]
        },
        {
            title: "Udemy for Business",
            links: ["Udemy Business"]
        },
        {
            title: "Pháp lý & Khả năng tiếp cận",
            links: ["Tuyên bố về khả năng tiếp cận", "Chính sách về quyền riêng tư", "Sơ đồ trang web", "Điều khoản"]
        }
    ];

    return (
        <footer className="bg-gray-900 text-gray-200 py-10 px-6 md:px-12 transition-colors duration-300 mt-10">
            <div className="max-w-7xl mx-auto">
                {/* Phần chính của footer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {footerData.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-bold mb-3 text-white">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link, idx) => (
                                    <li key={idx} className="text-gray-400 hover:text-white cursor-pointer">
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Đường kẻ ngang */}
                <div className="border-t border-gray-700 my-6"></div>

                {/* Phần cuối cùng của footer */}
                <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    {/* Logo + Bản quyền */}
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-white">Ⓤ Udemy</span>
                        <span>© 2025 Udemy, Inc.</span>
                    </div>

                    {/* Cài đặt cookie */}
                    <div className="cursor-pointer hover:text-white">Cài đặt cookie</div>

                    {/* Ngôn ngữ */}
                    <div className="flex items-center space-x-2 cursor-pointer hover:text-white">
                        <Globe size={16} />
                        <span>Tiếng Việt</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;




