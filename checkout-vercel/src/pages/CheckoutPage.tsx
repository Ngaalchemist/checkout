import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

/* ── Slim glowing CTA button ── */
function GlowButton({
  onClick,
  children,
  "data-testid": testId,
  className = "",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  "data-testid"?: string;
  className?: string;
}) {
  return (
    <motion.button
      data-testid={testId}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))]
        bg-transparent font-bold uppercase tracking-widest
        text-sm px-10 py-4
        shadow-[0_0_18px_0_hsl(var(--primary)/0.45)]
        hover:shadow-[0_0_32px_4px_hsl(var(--primary)/0.7)]
        hover:bg-[hsl(var(--primary)/0.08)]
        transition-[box-shadow,background-color] duration-300
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}

export default function CheckoutPage() {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPayment = () => {
    document.getElementById("payment-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const qrImageUrl = "/qr-payment.jpg";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 pb-20 md:pb-0">

      {/* 1. Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-serif font-semibold text-primary text-sm tracking-widest uppercase">
            NGA ALCHEMIST
          </span>
          <div className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            ✦ Giá ra mắt đặc biệt 444.000đ
          </div>
        </div>
      </header>

      {/* 2. Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground leading-tight mb-6">
              Bạn chỉ còn cách phiên bản<br />
              <span className="italic text-primary">"Không thể bị bỏ rơi"</span><br />
              đúng một bước chân.
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              Chuyển khoản ngay hôm nay để kích hoạt{" "}
              <strong className="text-foreground font-bold">
                Lộ Trình 7 Ngày Thoát Khỏi Vòng Lặp
              </strong>{" "}
              — nơi bạn chính thức bắt đầu hành trình chọn lấy chính mình.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GlowButton data-testid="button-hero-cta" onClick={scrollToPayment}>
              THANH TOÁN NGAY — 444.000Đ →
            </GlowButton>
            <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3 text-xs font-medium text-muted-foreground">
              {["Học online", "Truy cập ngay", "Cộng đồng riêng", "Hoàn tiền 7 ngày"].map(p => (
                <span key={p} className="bg-secondary border border-border px-3 py-1 rounded-full">{p}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-xl mx-auto px-4">
        <div className="border-t border-border/50" />
      </div>

      {/* 3. Order Summary */}
      <section className="py-14 px-4">
        <div className="max-w-xl mx-auto">
          <FadeIn>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Đơn hàng của bạn</p>
              <h2 className="font-serif text-xl md:text-2xl text-foreground mb-8 leading-snug">
                Hành trình 7 Ngày Thoát Khỏi Vòng Lặp Bị Bỏ Rơi & Tìm Lại Giá Trị Nội Tâm
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Giá trị 01 phiên đồng hành trực tiếp cùng Nga</span>
                  <span className="text-sm text-muted-foreground line-through">2.000.000đ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Mức đầu tư trợ lực (Ưu đãi ra mắt)</span>
                  <span className="text-sm text-foreground font-semibold">444.000đ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tiết kiệm</span>
                  <span className="bg-foreground/10 text-foreground text-xs font-bold px-2.5 py-1 rounded-full">1.556.000đ</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-bold text-foreground text-base">Tổng thanh toán</span>
                  <span className="font-serif text-3xl font-bold text-primary">444.000đ</span>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground mb-6">
                Một lần duy nhất · Không phí định kỳ · Truy cập trọn đời
              </p>

              <motion.button
                onClick={scrollToPayment}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest text-sm py-4 px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-[box-shadow,background-color] duration-300"
              >
                ĐĂNG KÝ NGAY — CHỈ 444.000Đ →
              </motion.button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Chuyển khoản Vietcombank · Truy cập ngay sau thanh toán · Hoàn tiền 7 ngày
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. What You Get */}
      <section className="py-20 px-4 bg-secondary/40">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Hành Trình Chuyển Hóa Cốt Lõi</p>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground">
                Bạn sẽ nhận được gì hôm nay?
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { title: "7 Bài học chuyên sâu theo từng ngày", desc: "Lộ trình video đi thẳng vào tầng tiềm thức để bẻ gãy kịch bản tổn thương từ gốc đến ngọn." },
                { title: "Workbook / Bài tập chiêm nghiệm sau mỗi ngày", desc: "Công cụ thực hành giúp bạn tự đối thoại và thấu suốt vấn đề ngay sau khi học." },
                { title: "Bộ câu hỏi Journaling (Viết lách chữa lành)", desc: "Chỉ dẫn từng bước để bóc tách các mô thức bỏ rơi đang âm thầm điều khiển cảm xúc bạn." },
                { title: "Thư viện Audio thực hành", desc: "Các bài nghe làm dịu hệ thần kinh và hạ báo động hoảng loạn khi lo sợ bị bỏ rơi." },
                { title: "Kế hoạch 7 ngày quay về với bản thân", desc: "Lộ trình hành động chi tiết để neo giữ sự bình an tự thân." },
                { title: "Quyền tham gia cộng đồng Pattern Breakers (nhóm kín)", desc: "Không gian an toàn để bạn được hỏi, được nhìn thấy, và không đi một mình." },
                { title: "Kế hoạch duy trì sau khóa học", desc: "Lộ trình dài hạn để bạn vững vàng trên đôi chân của mình sau khi hoàn thành 7 ngày." },
              ].map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6 flex gap-4 items-start">
                  <div className="shrink-0 w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. Bonus Stack */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 px-4 py-1.5 rounded-full mb-5">
                Quà Tặng Đặc Biệt
              </span>
              <h2 className="font-serif text-2xl md:text-4xl text-foreground leading-tight">
                🎁 Dành cho{" "}
                <span className="text-primary">100 học viên đầu tiên</span>
              </h2>
              <p className="text-muted-foreground mt-3 text-sm max-w-lg mx-auto">
                Bộ quà tặng này không bán riêng lẻ — chỉ dành cho ai đăng ký trong giai đoạn ra mắt.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { title: "Audio thôi miên khẩn cấp 5 phút", desc: "Khi bị ghost / bị im lặng / panic attachment — dùng ngay để hạ nhiệt tức thôi." },
                { title: "Sleep Hypnosis", desc: "Ngủ tái lập trình self-worth — cài đặt lại tầng tiêm thức trong giấc ngủ." },
                { title: "Hypnotic Journaling Workbook", desc: "Kỹ thuật viết chuyên sâu để hóa giải các khối tắc nghẽn cảm xúc tầng sâu." },
                { title: "Bộ Subconscious Affirmations", desc: "Nghe khi ngủ — cài đặt lại niềm tin \"Tôi là đủ\" vào tiềm thức." },
                { title: "Ritual \"Return to Self\"", desc: "Nghi thức 7 phút kết nối nội tâm mỗi buổi sáng — trở về với chính mình trước khi ra thế giới." },
              ].map((bonus, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6 flex gap-4 items-start">
                  <div className="shrink-0 w-9 h-9 rounded-full border border-primary/40 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1">{bonus.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{bonus.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. Why 444k */}
      <section className="py-24 px-4 bg-secondary/40 overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary text-center mb-4">Minh Bạch Về Giá</p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-16 leading-tight">
              Tại sao mức giá chỉ là{" "}
              <span className="text-primary italic">444.000đ</span>?
            </h2>

            {/* Visual comparison */}
            <div className="grid md:grid-cols-2 gap-6 mb-14">
              {/* Left: 1 session */}
              <div className="relative bg-card border border-border/60 rounded-2xl p-7 flex flex-col gap-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">🪑</div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Một phiên 1:1</p>
                    <p className="font-bold text-foreground text-sm">Thôi miên trị liệu trực tiếp</p>
                  </div>
                </div>
                <div className="border-t border-border/40 pt-4">
                  <p className="text-3xl font-serif font-bold text-muted-foreground line-through">2.000.000đ</p>
                  <p className="text-xs text-muted-foreground mt-1">Một buổi · Không tái sử dụng · Theo lịch Nga</p>
                </div>
              </div>

              {/* Right: The course — highlighted */}
              <div className="relative bg-card border-2 border-primary/50 rounded-2xl p-7 flex flex-col gap-4 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.25)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 uppercase tracking-wider whitespace-nowrap">
                  Bạn đang chọn điều này ✦
                </div>
                <div className="flex items-center gap-3 mb-1 mt-2">
                  <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-xl">🔑</div>
                  <div>
                    <p className="text-xs text-primary uppercase tracking-wider">Lộ trình 7 ngày</p>
                    <p className="font-bold text-foreground text-sm">Toàn bộ phương pháp · Tự làm chủ</p>
                  </div>
                </div>
                <div className="border-t border-primary/20 pt-4">
                  <p className="text-3xl font-serif font-bold text-primary">444.000đ</p>
                  <p className="text-xs text-muted-foreground mt-1">Truy cập trọn đời · Học bất cứ lúc nào · Tự làm chủ hệ thần kinh</p>
                </div>
              </div>
            </div>

            {/* Quote / reason */}
            <div className="relative border-l-2 border-primary/50 pl-6 py-2 max-w-2xl mx-auto mb-12">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed italic">
                "Nga không muốn sự chuyển hóa chỉ dừng lại ở một phiên làm việc đơn lẻ. Mức giá{" "}
                <span className="text-primary not-italic font-semibold">444.000đ</span> là một khoản đầu tư trợ lực — để bất kỳ người phụ nữ nào, dù đang ở đâu, cũng có thể bắt đầu hành trình tái sinh mà không phải lo rào cản tài chính."
              </p>
              <p className="text-sm text-primary font-semibold mt-4 not-italic">— Nga Alchemist</p>
            </div>

            <div className="text-center">
              <GlowButton data-testid="button-why-cta" onClick={scrollToPayment}>
                CHUYỂN KHOẢN NGAY — 444.000Đ →
              </GlowButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7. Payment / QR Code */}
      <section id="payment-section" className="py-20 px-4">
        <div className="max-w-xl mx-auto">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
                Thanh Toán Bằng Chuyển Khoản
              </h2>
              <p className="text-muted-foreground">Quét mã QR để chuyển khoản — không cần nhập tay</p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl shadow-black/40 p-6 md:p-8 mb-8">
              <div className="max-w-xs mx-auto mb-6 rounded-xl overflow-hidden border border-gray-100">
                <img
                  src={qrImageUrl}
                  alt="VietQR Code thanh toán"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Ngân hàng</span>
                  <span className="font-bold text-gray-900">Vietcombank (VCB)</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Chủ tài khoản</span>
                  <span className="font-bold text-gray-900">Nguyễn Thanh Nga</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Số tiền</span>
                  <span className="font-bold text-amber-600 text-xl">444.000 VNĐ</span>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-gray-500 text-sm">Nội dung chuyển khoản</span>
                  <span className="font-mono bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-lg text-gray-800 text-center text-sm break-all">
                    [Họ tên] + [Số điện thoại] + đăng ký
                  </span>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground italic leading-relaxed max-w-md mx-auto mb-8">
              "Nga Alchemist sẽ gửi thông tin tài khoản học và bộ quà tặng đến bạn qua Số điện thoại/Email đăng ký ngay sau khi hệ thống nhận được chuyển khoản này. Chào mừng bạn đến với hành trình chọn lấy chính mình."
            </p>

            {/* Contact Support */}
            <div className="bg-primary/8 border border-primary/20 rounded-xl p-4 text-center">
              <p className="text-sm text-foreground/80 mb-3 leading-relaxed">
                Nếu gặp khó khăn khi thanh toán hoặc cần hỗ trợ gấp, hãy nhắn cho Nga tại đây:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://zalo.me/0762793886"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#0068FF] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 48 48" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm8.3 28.1c-.4.4-.9.6-1.4.6-.3 0-.6-.1-.9-.2l-4.6-2.7c-.5-.3-.8-.8-.8-1.4v-9.7c0-.9.7-1.6 1.6-1.6s1.6.7 1.6 1.6v9l4.1 2.4c.8.5 1 1.5.6 2.1l-.2-.1zm-14.5-.5c-5.1-1.8-8.5-6.6-8.5-12 0-7.2 5.8-13 13-13 5.6 0 10.5 3.6 12.3 8.9.2.5 0 1.1-.5 1.4-.5.2-1.1 0-1.4-.5-1.5-4.4-5.6-7.4-10.4-7.4-6 0-10.8 4.8-10.8 10.8 0 4.6 2.9 8.7 7.3 10.2.5.2.8.7.7 1.3-.2.5-.7.8-1.2.8-.2 0-.4 0-.5-.1v-.4z"/>
                  </svg>
                  Zalo · 0762 793 886
                </a>
                <a
                  href="https://m.me/ngaalchemist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#0084FF] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.905 1.408 5.504 3.617 7.24V22l3.305-1.814c.883.244 1.818.376 2.78.376 5.522 0 10-4.145 10-9.243S17.523 2 12 2zm1.007 12.445l-2.548-2.718-4.97 2.718 5.467-5.803 2.611 2.718 4.907-2.718-5.467 5.803z"/>
                  </svg>
                  Messenger
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 8. Guarantee */}
      <section className="py-16 px-4 bg-secondary/40">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-primary/15 rounded-full flex items-center justify-center mb-4">
                <Shield size={32} strokeWidth={1.5} className="text-primary" />
              </div>
              <h2 className="font-serif text-xl md:text-2xl text-foreground uppercase tracking-wide">
                Cam Kết Hoàn Tiền 100% Trong 7 Ngày
              </h2>
              <p className="text-primary font-semibold mt-2 text-sm tracking-wide">Rủi ro gần như bằng 0</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              {[
                { title: "Thời Hạn", desc: "Trong vòng 7 ngày kể từ khi thanh toán thành công" },
                { title: "Điều Kiện", desc: "Áp dụng cho mọi lý do — không cần giải thích" },
                { title: "Cách Thực Hiện", desc: "Gửi email kèm tên và email đăng ký. Xử lý 3-5 ngày làm việc." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-card border border-border p-6 rounded-xl">
                  <h3 className="font-bold text-primary mb-2 text-xs uppercase tracking-wider">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="font-serif text-primary text-2xl md:text-3xl text-center mb-12">
              Chia Sẻ Từ Những Người Đã Đồng Hành Cùng Nga Alchemist
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Trước đây em luôn sống trong nỗi sợ 'liệu anh ấy có chọn mình không?'. Sau khi làm việc với chị, em bừng tỉnh và không còn đợi để được chọn, em trở thành người thẩm định xem ai đủ tiêu chuẩn để bước vào không gian thiêng liêng của mình. Cảm giác từ người đi cầu xin trở thành người cầm lái cuộc đời thực sự rất quyền năng.",
                  name: "Loan Nguyễn",
                  role: "Nhân viên văn phòng · Hà Nội",
                },
                {
                  quote: "Điều thay đổi lớn nhất là khả năng giữ được bình tĩnh của em. Trước đây, một tin nhắn chậm rep cũng khiến em hoảng loạn. Bây giờ, em biết phải làm gì khi cơn hoảng loạn đến... nhờ những bài tập chị Nga hướng dẫn, em giữ được tâm trí bình tĩnh hơn. Em nhận ra giá trị của mình là bẩm sinh, và em không bao giờ còn đánh đổi lòng tự tôn để lấy một chút quan tâm hờ hững nữa.",
                  name: "Huyền Nguyễn",
                  role: "Kinh doanh tự do · Hà Nội",
                },
                {
                  quote: "Em từng nghĩ mình phải gồng lên, phải hoàn hảo thì mới có giá trị. Nhưng chị Nga đã giúp em chạm vào phiên bản đủ đầy bên trong — phiên bản biết rõ mình là đủ mà không cần bất kỳ điều kiện nào. Em bắt đầu cảm thấy tự tin và thấy yêu chính mình, yêu cả sự nhạy cảm và những khiếm khuyết của mình và nhận ra đó chính là sự độc đáo của mình chứ không phải là điểm yếu.",
                  name: "Na Na",
                  role: "Content Creator · Hà Nội",
                },
              ].map((t, i) => (
                <div key={i} className="bg-card border border-border p-6 md:p-8 rounded-2xl flex flex-col">
                  <div className="flex gap-0.5 text-primary mb-4 text-lg">
                    {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
                  </div>
                  <p className="text-foreground/75 text-sm leading-relaxed mb-6 italic flex-grow">"{t.quote}"</p>
                  <div>
                    <span className="font-bold text-foreground block">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 10. FAQs */}
      <section className="py-20 px-4 bg-secondary/40">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl text-foreground text-center mb-10">Câu Hỏi Thường Gặp</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "Tôi sẽ nhận khóa học như thế nào sau khi chuyển khoản?",
                  a: "Nga Alchemist sẽ gửi link truy cập và tài khoản học qua số điện thoại/email trong nội dung chuyển khoản. Thường trong vòng 24 giờ làm việc.",
                },
                {
                  q: "Tôi có được truy cập vĩnh viễn không?",
                  a: "Có. Một lần thanh toán, truy cập trọn đời. Bạn có thể xem lại bất kỳ lúc nào, kể cả khi khóa học có cập nhật.",
                },
                {
                  q: "Học trên điện thoại có được không?",
                  a: "Có. Khóa học được tối ưu hoàn toàn cho điện thoại di động. Bạn có thể học mọi lúc, mọi nơi.",
                },
                {
                  q: "Nếu tôi không thấy phù hợp thì sao?",
                  a: "Có bảo hành 7 ngày hoàn tiền 100%, không cần giải thích chi tiết. Chỉ cần gửi email với tên và email đăng ký.",
                },
                {
                  q: "Hành trình này có phù hợp nếu tôi không đang trong mối quan hệ nào không?",
                  a: "Rất phù hợp. Hành trình này là về việc xây dựng lại mối quan hệ với chính mình — không phụ thuộc vào việc bạn đang độc thân hay đang yêu.",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-5 leading-tight">
              Bạn đã chịu đựng đủ rồi.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Nếu bạn cảm thấy đã đến lúc ngừng yêu trong thiếu thốn, ngừng chờ một tín hiệu để thấy mình đủ, và bắt đầu xây lại cảm giác an toàn từ bên trong…
            </p>
            <GlowButton data-testid="button-final-cta" onClick={scrollToPayment}>
              TÔI MUỐN BẮT ĐẦU HỌC NGAY →
            </GlowButton>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-2 md:gap-4 text-sm text-muted-foreground mb-4">
              <span>Học online</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Truy cập ngay</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Cộng đồng riêng</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Hoàn tiền 7 ngày</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="py-14 px-6 md:px-12 text-center border-t border-border">
        <div className="space-y-3">
          <p className="font-serif text-primary text-xl tracking-widest uppercase">Nga Alchemist</p>
          <p className="text-muted-foreground text-sm tracking-wide">Chữa Lành · Chuyển Hóa · Thức Tỉnh</p>
          <p className="text-muted-foreground/60 text-xs leading-relaxed pt-2 border-t border-border/50">
            <span className="font-semibold text-muted-foreground/80 uppercase tracking-wider text-[10px]">Disclaimer</span><br />
            Kết quả có thể khác nhau tùy từng người và phụ thuộc vào nhiều yếu tố. Nội dung trong khóa học không thể thay thế cho sự hỗ trợ của chuyên gia sức khỏe tâm thần có chuyên môn.
          </p>
          <p className="text-muted-foreground/50 text-xs pt-1">© 2026 Nga Alchemist. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky Bottom Bar — mobile only */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={showStickyBar ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button
          data-testid="button-sticky-bar"
          onClick={scrollToPayment}
          className="w-full bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between font-bold uppercase tracking-wide text-sm shadow-2xl"
        >
          <span className="text-primary-foreground/80 font-normal text-xs">🔥 Giá ra mắt · 444.000đ</span>
          <span className="flex items-center gap-2">THANH TOÁN NGAY <span className="text-lg">→</span></span>
        </button>
      </motion.div>

    </div>
  );
}
