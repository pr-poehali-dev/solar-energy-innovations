import { LiquidMetalBackground } from "@/components/LiquidMetalBackground"
import { FloatingNavbar } from "@/components/FloatingNavbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Feature } from "@/components/ui/feature-with-advantages"
import { BentoPricing } from "@/components/ui/bento-pricing"
import { ContactCard } from "@/components/ui/contact-card"
import { AboutQuote } from "@/components/ui/about-quote"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const BOOKING_URL = "https://functions.poehali.dev/8c8f4b4c-0dd7-41f0-bf38-e1093076765b"

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const pricingSectionRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({ name: "", phone: "", email: "", dates: "", guests: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", email: "", dates: "", guests: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY
      const currentScroll = scrollContainer.scrollLeft
      const containerWidth = scrollContainer.offsetWidth
      const currentSection = Math.round(currentScroll / containerWidth)

      if (currentSection === 3 && pricingSectionRef.current) {
        const pricingSection = pricingSectionRef.current
        const isAtTop = pricingSection.scrollTop === 0
        const isAtBottom = pricingSection.scrollTop + pricingSection.clientHeight >= pricingSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 2 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 4 * containerWidth,
            behavior: "smooth",
          })
          return
        }
      }

      if (currentSection === 4 && aboutSectionRef.current) {
        const aboutSection = aboutSectionRef.current
        const isAtTop = aboutSection.scrollTop === 0
        const isAtBottom = aboutSection.scrollTop + aboutSection.clientHeight >= aboutSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 3 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 5 * containerWidth,
            behavior: "smooth",
          })
          return
        }
      }

      if (currentSection === 5 && contactSectionRef.current) {
        const contactSection = contactSectionRef.current
        const isAtTop = contactSection.scrollTop === 0
        const isAtBottom = contactSection.scrollTop + contactSection.clientHeight >= contactSection.scrollHeight - 1

        if (delta > 0 && !isAtBottom) {
          return
        }

        if (delta < 0 && !isAtTop) {
          return
        }

        if (delta < 0 && isAtTop) {
          e.preventDefault()
          scrollContainer.scrollTo({
            left: 4 * containerWidth,
            behavior: "smooth",
          })
          return
        }

        if (delta > 0 && isAtBottom) {
          e.preventDefault()
          return
        }
      }

      e.preventDefault()

      if (Math.abs(delta) > 10) {
        let targetSection = currentSection
        if (delta > 0) {
          targetSection = Math.min(currentSection + 1, 5)
        } else {
          targetSection = Math.max(currentSection - 1, 0)
        }

        scrollContainer.scrollTo({
          left: targetSection * containerWidth,
          behavior: "smooth",
        })
      }
    }

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    return () => scrollContainer.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <main className="relative h-screen overflow-hidden">
      <LiquidMetalBackground />

      <div className="fixed inset-0 z-[5] bg-black/50" />

      <FloatingNavbar />

      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen w-full overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <section id="home" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center px-0 leading-5">
              <h1 className="mb-8 text-balance text-5xl tracking-tight text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] md:text-6xl lg:text-8xl">
                <span className="font-open-sans-custom not-italic">Ваш дом.</span>{" "}
                <span className="font-serif italic">Ваш отдых.</span>{" "}
                <span className="font-open-sans-custom not-italic">Без хлопот.</span>
              </h1>

              <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-thin font-open-sans-custom tracking-wide leading-7 text-xl">
                Уютные дома посуточно и помесячно — выбирайте{" "}
                <span className="font-serif italic">идеальное место</span> и заезжайте в любой день
              </p>

              <div className="flex justify-center">
                <ShinyButton className="px-8 py-3 text-base">выбрать дом</ShinyButton>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-7xl w-full">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-5xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] mb-3">
                Наши дома
              </h2>
              <p className="text-gray-300 font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Бревенчатые коттеджи в окружении природы — уют с первого взгляда
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-[55vh]">
              <div className="relative overflow-hidden rounded-xl row-span-2 group">
                <img
                  src="https://cdn.poehali.dev/projects/b605fdb4-9ae9-4ef2-9174-223743121f6b/bucket/653a516e-3357-440e-813e-689e51432cb9.jpg"
                  alt="Коттедж в лесу"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-xl group">
                <img
                  src="https://cdn.poehali.dev/projects/b605fdb4-9ae9-4ef2-9174-223743121f6b/bucket/79f4c24d-15fe-4fde-8007-1544002864a9.jpg"
                  alt="Вечерний коттедж"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-xl group">
                <img
                  src="https://cdn.poehali.dev/projects/b605fdb4-9ae9-4ef2-9174-223743121f6b/bucket/da602743-062a-4d0a-8a53-c1947dfe2b09.jpg"
                  alt="Вид на участок с бассейном"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-xl group">
                <img
                  src="https://cdn.poehali.dev/projects/b605fdb4-9ae9-4ef2-9174-223743121f6b/bucket/b6903626-2b79-469f-829e-84bdb6451883.jpg"
                  alt="Интерьер со светильником"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="relative overflow-hidden rounded-xl group">
                <img
                  src="https://cdn.poehali.dev/projects/b605fdb4-9ae9-4ef2-9174-223743121f6b/bucket/9fb4b215-5253-4a69-8706-dda82bbb4afe.jpg"
                  alt="Терраса с цветами"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="flex min-w-full snap-start items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-7xl w-full">
            <Feature />
          </div>
        </section>

        <section
          id="pricing"
          ref={pricingSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                Наши объекты
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Дома на любой вкус и бюджет — от уютных домиков для двоих до просторных коттеджей для всей семьи.
              </p>
            </div>
            <BentoPricing />
          </div>
        </section>

        <section
          id="about"
          ref={aboutSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)] font-open-sans-custom">
                О нас
              </h1>
              <p className="text-gray-300 mt-4 text-sm md:text-base font-open-sans-custom [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)]">
                Мы помогаем найти идеальный дом для отдыха — быстро, удобно и без лишних хлопот.
              </p>
            </div>
            <AboutQuote />
          </div>
        </section>

        <section
          id="contact"
          ref={contactSectionRef}
          className="relative min-w-full snap-start overflow-y-auto px-4 pt-24 pb-20"
        >
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 z-0 size-full pointer-events-none",
              "bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]",
              "bg-[size:12px_12px]",
              "opacity-30",
            )}
          />

          <div className="relative z-10 mx-auto w-full max-w-5xl mt-[5vh]">
            <ContactCard
              title="Забронируйте дом"
              description="Хотите узнать о свободных датах или задать вопрос? Заполните форму — ответим в течение нескольких часов и поможем с выбором."
              contactInfo={[
                {
                  icon: MailIcon,
                  label: "Почта",
                  value: "info@domrent.ru",
                },
                {
                  icon: PhoneIcon,
                  label: "Телефон",
                  value: "+7 (800) 555-00-00",
                },
                {
                  icon: MapPinIcon,
                  label: "Работаем по всей России",
                  value: "Москва, Подмосковье и регионы",
                  className: "col-span-2",
                },
              ]}
            >
              <form onSubmit={handleSubmit} className="w-full space-y-3">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center">
                    <div className="text-4xl">🏡</div>
                    <p className="text-white font-open-sans-custom text-lg font-semibold">Заявка отправлена!</p>
                    <p className="text-gray-300 font-open-sans-custom text-sm">Мы свяжемся с вами в ближайшее время.</p>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 font-open-sans-custom"
                      onClick={() => setStatus("idle")}
                    >
                      Отправить ещё
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-1">
                      <Label className="text-white text-xs [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">Имя *</Label>
                      <Input name="name" value={form.name} onChange={handleChange} required
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-8 text-sm" placeholder="Ваше имя" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-white text-xs [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">Телефон *</Label>
                      <Input name="phone" value={form.phone} onChange={handleChange} required type="tel"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-8 text-sm" placeholder="+7 (___) ___-__-__" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-white text-xs [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">Email</Label>
                      <Input name="email" value={form.email} onChange={handleChange} type="email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-8 text-sm" placeholder="email@example.com" />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1 flex-1">
                        <Label className="text-white text-xs [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">Даты</Label>
                        <Input name="dates" value={form.dates} onChange={handleChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-8 text-sm" placeholder="1–5 июня" />
                      </div>
                      <div className="flex flex-col gap-1 w-20">
                        <Label className="text-white text-xs [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">Гостей</Label>
                        <Input name="guests" value={form.guests} onChange={handleChange} type="number" min="1"
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-8 text-sm" placeholder="2" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label className="text-white text-xs [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">Пожелания</Label>
                      <Textarea name="message" value={form.message} onChange={handleChange} rows={2}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm resize-none" placeholder="Баня, мангал, детская кроватка..." />
                    </div>
                    {status === "error" && (
                      <p className="text-red-400 text-xs font-open-sans-custom">Ошибка отправки. Попробуйте позже.</p>
                    )}
                    <Button
                      className="w-full bg-white text-black hover:bg-gray-100 font-open-sans-custom"
                      type="submit"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Отправляем..." : "Забронировать"}
                    </Button>
                  </>
                )}
              </form>
            </ContactCard>
          </div>
        </section>
      </div>
    </main>
  )
}