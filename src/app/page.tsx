"use client";

import React, { useEffect, useState } from "react";
import { 
  ArrowRight, 
  Award, 
  Cpu, 
  GraduationCap, 
  Handshake, 
  ShieldAlert, 
  Wrench,
  CheckCircle,
  Menu,
  X
} from "lucide-react";
import ShaderBackground from "@/components/ShaderBackground";
import OilRigCanvas from "@/components/OilRigCanvas";
import DonationCard from "@/components/DonationCard";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "programs", "gallery", "partnerships"];
      let current = "home";

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0d1321] text-[#dde2f6] overflow-x-hidden selection:bg-[#b3c5ff]/30 selection:text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1321]/80 backdrop-blur-md border-b border-[#eac34a]/30 shadow-md">
        <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto py-4">
          <div className="font-heading text-xl md:text-2xl font-bold text-[#b3c5ff] flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("home")}>
            <img 
              alt="Yayasan Delta Mahakam Logo" 
              className="w-10 h-10 object-contain drop-shadow-md hover:drop-shadow-[0_4px_12px_rgba(234,195,74,0.4)] hover:-translate-y-1 transition-all duration-300" 
              src="/icon.png"
            />
            <span className="hidden sm:inline font-bold">Yayasan Delta Mahakam</span>
            <span className="sm:hidden font-bold">YDM</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {["home", "about", "programs", "gallery", "partnerships"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`text-[#c5c6d2] font-semibold text-sm hover:text-[#b3c5ff] transition-all duration-300 capitalize cursor-pointer ${
                  activeSection === sec ? "text-[#b3c5ff] border-b-2 border-[#b3c5ff] pb-1" : ""
                }`}
              >
                {sec === "partnerships" ? "Dukungan" : sec === "programs" ? "Program" : sec === "gallery" ? "Galeri" : sec}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="btn-primary-3d px-6 py-2 rounded-lg font-semibold text-sm cursor-pointer">
              Portal Akses
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#dde2f6] hover:text-[#b3c5ff] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d1321] border-b border-[#eac34a]/30 px-6 py-4 flex flex-col gap-4">
            {["home", "about", "programs", "gallery", "partnerships"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`text-left text-[#c5c6d2] font-semibold text-sm hover:text-[#b3c5ff] transition-all duration-300 capitalize py-2 ${
                  activeSection === sec ? "text-[#b3c5ff]" : ""
                }`}
              >
                {sec === "partnerships" ? "Dukungan" : sec === "programs" ? "Program" : sec === "gallery" ? "Galeri" : sec}
              </button>
            ))}
            <button className="btn-primary-3d w-full py-2.5 rounded-lg font-semibold text-sm mt-2">
              Portal Akses
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Dynamic Shader Background */}
        <ShaderBackground />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none drop-shadow-lg">
              YAYASAN DELTA MAHAKAM
            </h1>
            <p className="font-sans text-lg md:text-xl text-[#c5c6d2] mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              Membangun Kompetensi, Menciptakan Profesionalisme, Menuju Industri Energi Masa Depan.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection("programs")} 
                className="btn-primary-3d px-8 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 cursor-pointer shadow-lg"
              >
                Jelajahi Program <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => scrollToSection("about")} 
                className="bg-transparent text-white border border-white/20 hover:bg-white/5 transition-all duration-300 px-8 py-3 rounded-lg font-semibold text-sm cursor-pointer"
              >
                Tentang Kami
              </button>
            </div>
          </div>
          
          <div className="md:col-span-5 h-[350px] md:h-[550px] relative w-full flex items-center justify-center">
            {/* 3D Oil Rig revolving component */}
            <OilRigCanvas />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#161b2a] relative border-y border-[#eac34a]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="glass-card rounded-xl p-1.5 absolute -top-6 -left-6 z-20 shadow-xl border border-[#eac34a]/30">
              <div className="flex items-center gap-2 bg-[#002366]/50 px-4 py-2 rounded-lg border border-[#eac34a]/20">
                <Award className="text-[#eac34a]" size={18} />
                <span className="font-heading text-xs font-bold text-[#eac34a] tracking-wider uppercase">Sejak 2012</span>
              </div>
            </div>
            <div 
              className="aspect-square rounded-2xl overflow-hidden border border-white/10 relative z-10 bg-[#242a39] shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAciB4c7n_QFypZ8X-J6C8P9oEd9pVdi_y5_mb5eRoSvUYLNKis4QYQyG7JZ9fLxHYW9rYPcueZ_iSSpgJy3IEkTZ6gr6XSKz0s0xz1n0wU-MQVG6XZ5DkhWMMDHqugtWOayRCxTQBIKIZPeaIjKZ_3veM_ESYAccO9zLd344Q0zVFbujhjNfe7OEum6XiQaxhkB-G3d_KVGYZ7evVs9kInngevpyGqiCQfAGYfvl-ULlaj-1QF1nr25_GcxmWjJvm2UxNRzkZOtws')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          <div className="md:col-span-7 md:pl-6 text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Sejarah Singkat Yayasan Delta Mahakam
            </h2>
            <p className="font-sans text-base md:text-lg text-[#c5c6d2] mb-6 leading-relaxed">
              Didirikan pada tahun 2012, Yayasan Delta Mahakam lahir dari komitmen kuat untuk menjembatani kesenjangan antara kebutuhan industri minyak dan gas bumi dengan ketersediaan sumber daya manusia yang kompeten di Indonesia.
            </p>
            <p className="font-sans text-base md:text-lg text-[#c5c6d2] leading-relaxed">
              Kami berfokus pada pengembangan HR yang tersertifikasi, mengadopsi standar internasional, dan membekali tenaga kerja lokal dengan keterampilan teknis dan soft skill yang esensial untuk memimpin masa depan industri energi yang berkelanjutan.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Mission Section */}
      <section className="py-24 bg-[#0d1321] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#b3c5ff]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#eac34a]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Visi & Misi</h2>
            <p className="font-sans text-lg md:text-xl text-[#c5c6d2] max-w-3xl mx-auto italic">
              &ldquo;Menjadi lembaga pendidikan dan pelatihan kerja perminyakan yang unggul, berstandar global, dan berkontribusi nyata pada kemandirian energi nasional.&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Kualitas Industri",
                desc: "Menyediakan kurikulum yang selaras dengan standar operasi industri migas terkini.",
                icon: Wrench
              },
              {
                title: "Teknologi Terkini",
                desc: "Mengintegrasikan simulasi dan teknologi digital terbaru dalam proses pembelajaran.",
                icon: Cpu
              },
              {
                title: "Budaya HSE",
                desc: "Menanamkan prinsip Health, Safety, and Environment sebagai dasar setiap tindakan.",
                icon: ShieldAlert
              },
              {
                title: "Kemitraan Industri",
                desc: "Membangun sinergi kuat dengan perusahaan multinasional untuk penempatan kerja.",
                icon: Handshake
              },
              {
                title: "Sertifikasi Kompetensi",
                desc: "Memfasilitasi sertifikasi profesi yang diakui secara nasional maupun internasional.",
                icon: Award
              },
              {
                title: "Pengembangan SDM",
                desc: "Memberikan kesempatan merata bagi putra-putri daerah untuk maju di sektor energi.",
                icon: GraduationCap
              }
            ].map((mission, index) => {
              const IconComp = mission.icon;
              return (
                <div 
                  key={index}
                  className="glass-card rounded-xl p-6 hover:-translate-y-2 transition-transform duration-300 text-left border border-white/5"
                >
                  <div className="w-12 h-12 bg-[#1a1f2e] rounded-lg flex items-center justify-center mb-4 border border-[#eac34a]/20 shadow-md">
                    <IconComp className="text-[#eac34a]" size={24} />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">{mission.title}</h3>
                  <p className="font-sans text-sm text-[#c5c6d2] leading-relaxed">{mission.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Programs Section */}
      <section id="programs" className="py-24 bg-[#161b2a] border-y border-[#eac34a]/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-12 text-left">
            Program Pendidikan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Teknik Pengeboran",
                desc: "Pelatihan intensif operasi rig, mud engineering, dan well control.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfC8pTcACmfFFwrCGI-_PSsrzszCaUB3TbfwVCu3IwOLqfEPIQTShigUPWQR5-vPD5io3uBR_NHIE9_2k0ALQV8TPGfAnZYEwaRskzfgWAVWm2m1cP8jYvfvoPgABV3kbo2vwA-ZFdLi8eSiPN7jCMLk2G3UVHgk0TvXtwVdYOQTBfdval76xUeGhE3qa9s3g_ZpK2hln1IBUHRCg4y2UpQmAiWwGPhoqzOcLI_RvAicrTJ57y61-_Py5YYp0aCo1SFC8p_OHPdqI"
              },
              {
                title: "HSE Migas",
                desc: "Sertifikasi keselamatan kerja spesifik untuk lingkungan operasional berisiko tinggi.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeEIHA0-yw4LqE6S3kr_O-wCfxvfSekSpJUKvQ7fn9qXPxaGi6MDd3A4xEhKH6T1qg-pB4JoOAkWtDNf6WjMoXOmEfbJ6fE0fI_v3xmvXn8p3KYDN0_Siu9K6Jx-wHRt2lcmEBQrIG2SUTG8rzavsMGx0UaKBHSgYHFhrRdIALTAtmo15XqrTUU3E7x5kweXd1bnLCK0sZ4QPXdmrC8qAGHdcUIcs1bZTBBjIGHfXGL1plhF_Ihj6f6aAX1Yho8hlHM9OydzzyrsY"
              },
              {
                title: "Produksi Migas",
                desc: "Manajemen fasilitas produksi, separasi fluida, dan operasi pemeliharaan.",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzRkwy08EhdrTuxoIpPoI6k04SiiitbsfazBOz2xpluDTtJCh0i9KG3iyJHlynfGJKYL5bVNodjl_O795OeAkxLFkdG52BqJ6pTjE950iqeZzY2m-Dyz6WRHGwGLloIGsL5OI4H7vR5iJkQ8PZZV_iAL8shpOODbpt7Uj-xwLtPd1FfifU8ySBly1jN8I6LYoeoCi5XjyxpDYTMlubW4wiIU6j_RRD18AyWWgfpNRRSpMF6CxJcys0gXeNtZMTlMaIz7S2AH03Dd0"
              }
            ].map((prog, index) => (
              <div 
                key={index}
                className="group relative bg-[#1a1f2e] rounded-xl overflow-hidden border border-white/5 hover:border-[#b3c5ff]/40 transition-all duration-300 flex flex-col shadow-lg"
              >
                <div 
                  className="h-48 w-full bg-[#242a39] relative overflow-hidden transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${prog.img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="font-heading text-xl font-bold text-white mb-2">{prog.title}</h3>
                  <p className="font-sans text-sm text-[#c5c6d2] mb-6 flex-grow leading-relaxed">{prog.desc}</p>
                  <a 
                    className="text-[#b3c5ff] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer self-start"
                    onClick={() => scrollToSection("partnerships")}
                  >
                    Detail Selengkapnya <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-[#0d1321] relative">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#b3c5ff]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-12 text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Galeri Kegiatan</h2>
            <p className="font-sans text-base text-[#c5c6d2] max-w-2xl leading-relaxed">
              Dokumentasi pelatihan, simulasi lapangan, dan kunjungan industri Yayasan Delta Mahakam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { ratio: "aspect-video", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCV9x4XtFrdGAhItwZNaOlbJo6S5TJ1mqSionPjHzmFPwCt7VyCPpEZrMztJNh9XkiMfje6JlMywhiyjdu1-VLgYCLIXmW5gamFJOItAJ_mIODUrnWWmPfAHgRU2HN4D8bO78mpgn9wwk8LWnGipe1am4rfhkTUXOtex-5RZLknCT7L15xjHF50_4GJw4gSrb6o2WaHsfWm1wzRpP-StJM3UuVuO1LVIPHT11SEBA3vXFPs1hME-pnrkrH0inxCBbY3qnJvI_CfHSY" },
              { ratio: "aspect-square", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9AdTxwEFK0aC0PV1bzps6WzrM_2lVTF9nBmpNbnZZi0owmBN6qkkWeVRtgcdrHQ9SYqcRLyRfyC5xaPkh6dktrpsnzl3VgOv0WD3pasbyyymZqgKTfj7IR3QbfuKkFU6Z0eJWDS199Ipt3Y3_tG9tyzlVz6RC_zdT4gIUPQzj1sA3Ue2rhmeRSe3h5ITSTWeMYq3LKCd4Fmfc2o4zTU6ahjs8_Z-a7WkiA_H43TiUVt5qgd37U2YTfSW5rBTa4EXv7PoKYLI8xto" },
              { ratio: "aspect-video", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCV5MihcA_JEhOGLKSwi5H0giTIqn0vYWhYqjvU4RBOyWjEFaO5kWCHuHUR0vW34BP9__NFZtMwMgMV80eV2JfSKUkefnVo_FbsYfD-k51oFasH-s0iIL_AsEJdGi5J9aS3Bzh0N6Ed7Rvr2sIahI2s_o2ETQxR2NIIIf1L9Bd_zMdx2auLFKuum_NzlcdWSv1kvgYn_Xwz8lvjc5r9dmQLJr60qU_aUnK6-xN0x1d1pt4O1bDtZA0jXEobG2BOy6_ff4tZNypRl3w" },
              { ratio: "aspect-square", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCb4jx1Qo0bePKWLZgq-zSND1ZhZyLr27IhDEANwgDlstvAiIabIzWaCLYiokYbMJCAenPsIRQRtKDwNPSKxVbA44R_EzOi-f7FMVOP35Q0nlOLGwFJlsHsyK-1Qb83rN2ORVdOsuPvX1yoIRv_NVKJLSsr_QvrAchB-9AiC0E0foKAIw9pQSst4wGVeVIFPxco1ocBc0WxypLPmmAkv41GZ6NvQO__W5-VRiWNGDONYSsZ0naM_r9OkysQ69kvn4uFwuHMkxW8PWo" },
              { ratio: "aspect-video", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZWV5tcEcNxEIsq8DHTMQhR5jRMvuLD8YcirttDBaj8O8AwfKMY1t_kYtBPMfwNxnh5dytGs-4JtosmZZ7QuAio8suPLn-Nb8lPqSiSVrAU_tMZ1Nmav3sklYs7KsDm4tbg4nqFceU2Le1HkMdjve4p2zZiHzp4VDIaZroCYQ9HURREpolD7RI0yZn1DHei3VdPWcvcngF71zZYWhYpG5xk8u0MINmsoBN5FaEvhMBWUmiDEVkUiiuG1vBzfBzn7FA0UljQg3eqwE" },
              { ratio: "aspect-square", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBptabzceiH_kXT-mNV2H3Qy6yoXoEBxIgDh7GY9DosK-m2IQAmbAHPBcubxzQHzZYyPrtCMEKBnpfwbx5TEo_zuXlinNvjQXtfDRZdmWDUF3G8_vBDekjc4P_iio-jbHaw_S-9C7ybQnljbzkURt8yCKzUb5MFrqCD-8TxoxFTW7R2wgD94yUM79GXgzupAvAxeGbNOfipoVfLYB4vC-8bReD1Z_3OmXZFsWl-gMvpdOU6HRjX-GOnleTppWqqhfmxYEHYPw3pzQA" }
            ].map((item, index) => (
              <div 
                key={index}
                className={`glass-card rounded-xl overflow-hidden border border-[#eac34a]/20 ${item.ratio} group cursor-pointer shadow-lg`}
              >
                <div 
                  className="w-full h-full transition-transform duration-500 group-hover:scale-110" 
                  style={{
                    backgroundImage: `url('${item.img}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation & Partnerships Section */}
      <section id="partnerships" className="py-24 bg-[#161b2a] border-t border-[#eac34a]/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Dukungan Pendidikan
            </h2>
            <p className="font-sans text-base md:text-lg text-[#c5c6d2] mb-6 leading-relaxed">
              Kami percaya bahwa pendidikan berkualitas harus dapat diakses oleh semua pihak. Dukungan Anda membantu memfasilitasi beasiswa dan pelatihan bagi siswa kurang mampu yang berpotensi memimpin industri energi di masa depan.
            </p>
            <div className="flex items-center gap-4 text-[#eac34a] font-semibold text-base mb-4">
              <CheckCircle size={20} />
              <span>Mitra Institusi Terpercaya</span>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            {/* Elegant BRI Corporate Bank Card with 3D Tilt */}
            <DonationCard />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080e1c] border-t border-[#eac34a]/20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-heading text-lg font-bold text-[#eac34a] flex items-center gap-3">
            <img 
              alt="Yayasan Delta Mahakam Logo" 
              className="w-8 h-8 object-contain drop-shadow-md hover:drop-shadow-[0_4px_8px_rgba(234,195,74,0.3)] hover:-translate-y-1 transition-all duration-300" 
              src="/icon.png"
            />
            <span>Yayasan Delta Mahakam</span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end text-sm text-[#c5c6d2]">
              <a className="hover:text-[#eac34a] transition-colors cursor-pointer" onClick={() => scrollToSection("about")}>Tentang Kami</a>
              <a className="hover:text-[#eac34a] transition-colors cursor-pointer" onClick={() => scrollToSection("programs")}>Program</a>
              <a className="hover:text-[#eac34a] transition-colors cursor-pointer" onClick={() => scrollToSection("gallery")}>Galeri</a>
              <a className="hover:text-[#eac34a] transition-colors cursor-pointer" onClick={() => scrollToSection("partnerships")}>Dukungan</a>
            </div>
            <div className="text-xs text-[#c5c6d2]/60">
              © 2026 Yayasan Delta Mahakam. Industrial Excellence & Academic Progress.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
