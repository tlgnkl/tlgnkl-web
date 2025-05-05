import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import "../components/styles/landing.scss"
import { useEffect, useRef, useState } from "preact/hooks"

// Типизация для карточек
interface Card {
  title: string;
  subtitle: string;
  className: string;
  href?: string;
  illustration?: string;
  description?: string;
}

// Функция для вычисления 3D-эффекта наклона карточки при движении мыши
const calculateTilt = (e: MouseEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const x = e.clientX - rect.left; 
  const y = e.clientY - rect.top;
  
  // Относительные координаты от центра элемента
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  // Угол наклона (меньшие значения = более выраженный эффект)
  const tiltX = (centerY - y) / 15;
  const tiltY = (x - centerX) / 15;
  
  return { tiltX, tiltY };
};

// Данные о карточках с добавленными описаниями
const CARDS: Card[] = [
  {
    title: "Basics",
    subtitle: "ISSUE 001",
    href: "/basics",
    className: "card-1",
    illustration: "/static/1-illo.png",
    description: "The fundamental principles and concepts"
  },
  {
    title: "Getting Started",
    subtitle: "ISSUE 002",
    href: "/getting-started",
    className: "card-2",
    illustration: "/static/2-illo.png",
    description: "First steps and introduction to the platform"
  },
  {
    title: "Growing People",
    subtitle: "ISSUE 003",
    href: "/growing-people",
    className: "card-3",
    illustration: "/static/3-illo.png",
    description: "Development and nurturing of human potential"
  },
  {
    title: "Superboosting Ideas",
    subtitle: "ISSUE 004",
    href: "/superboosting-ideas",
    className: "card-4",
    illustration: "/static/4-illo.png",
    description: "Amplify your creative thinking process"
  },
  {
    title: "Maintenance",
    subtitle: "ISSUE 005",
    href: "/maintenance",
    className: "card-5",
    illustration: "/static/5-illo.png",
    description: "Keeping systems running smoothly and efficiently"
  },
  {
    title: "Demo Days",
    subtitle: "ISSUE 006",
    href: "/demo-days",
    className: "card-6",
    illustration: "/static/6-illo.png",
    description: "Showcasing projects and innovations"
  },
]

// Количество всех карточек
const TOTAL_CARDS = 8

function LandingComponent() {
  // Создаем ref для наблюдения за карточками и секцией
  const cardsRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Состояния для отслеживания прокрутки и мыши
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Refs для отслеживания состояний карточек
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Эффект для определения предпочтений пользователя по снижению движения
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduceMotion(prefersReducedMotion);
  }, []);
  
  // Обработчик прокрутки для добавления параллакс-эффекта
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Обработчик движения мыши для создания эффекта 3D-перспективы
  useEffect(() => {
    if (reduceMotion) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Эффект движения всей сетки карточек
      if (cardsRef.current) {
        const cardsRect = cardsRef.current.getBoundingClientRect();
        const centerX = cardsRect.left + cardsRect.width / 2;
        const centerY = cardsRect.top + cardsRect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        // Установка CSS переменных для использования в стилях
        cardsRef.current.style.setProperty('--mouse-x', `${deltaX}px`);
        cardsRef.current.style.setProperty('--mouse-y', `${deltaY}px`);
      }
      
      // Эффект 3D-наклона для каждой карточки при наведении
      cardRefs.current.forEach((card) => {
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        // Проверка, находится ли курсор над карточкой
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const { tiltX, tiltY } = calculateTilt(e, card);
          card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        } else {
          // Плавное возвращение в исходное положение
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      });
    };
    
    const handleMouseLeave = () => {
      // Возвращаем все карточки в исходное положение при уходе мыши
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    cardsRef.current?.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cardsRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reduceMotion]);
  
  // Создаем массив всех карточек с "Coming Soon" для пустых мест
  const allCards: Card[] = [
    ...CARDS,
    ...Array(TOTAL_CARDS - CARDS.length).fill(0).map(() => ({
      title: "Coming Soon",
      subtitle: "ISSUE XXX",
      className: "card-coming",
      description: "New content will be available soon"
    }))
  ];

  return (
    <div className="landing-wrapper" ref={wrapperRef}>
      <h1 className="landing-title">Welcome to tlgnkl</h1>
      <p className="landing-subtitle">
        THIS IS A HOME • <a href="https://www.linkedin.com/in/tlgnkl/">LINKEDIN</a> • <a href="https://t.me/tlgnklc">TG</a> • <a href="https://github.com/tlgnkl/tlgnkl-web">CONTRIBUTE</a> • <a href="/credits">CREDITS</a>
      </p>
      
      <div 
        className="cards-grid" 
        ref={cardsRef}
        style={{
          transform: !reduceMotion 
            ? `translateX(-50%) translateY(${scrollPosition * 0.03}px) translateX(calc(var(--mouse-x, 0px) * -0.2)) translateY(calc(var(--mouse-y, 0px) * -0.2))`
            : 'translateX(-50%)'
        }}
      >
        {allCards.map((card, index) => (
          <div 
            key={`card-${index}`} 
            className="card-wrapper"
            ref={el => cardRefs.current[index] = el}
            style={{
              // Эффект каскадного появления и смещения при прокрутке
              animationDelay: `${0.1 + index * 0.05}s`,
              transform: !reduceMotion 
                ? `translateY(${Math.sin(index * 0.8) * (scrollPosition * 0.01)}px)`
                : 'none'
            }}
          >
            {card.href ? (
              <a 
                href={card.href} 
                className={`card ${card.className}`}
                onMouseEnter={(e) => {
                  // Дополнительный эффект при наведении на ссылку
                  const target = e.currentTarget;
                  target.style.transition = 'transform 0.2s ease-out';
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.transition = 'transform 0.4s ease-out';
                }}
              >
                <div className="card-content">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-subtitle">{card.subtitle}</p>
                  {card.description && (
                    <p className="card-description">{card.description}</p>
                  )}
                </div>
                {card.illustration && (
                  <div className="card-img-wrapper">
                    <img src={card.illustration} alt={card.title} className="card-img" loading="lazy" />
                  </div>
                )}
              </a>
            ) : (
              <div className={`card ${card.className}`}>
                <div className="card-content">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-subtitle">{card.subtitle}</p>
                  {card.description && (
                    <p className="card-description">{card.description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default (() => {
  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    // Отображаем только на главной странице
    if (props.fileData.slug !== "index") {
      return null
    }
    
    return <LandingComponent />
  }
  
  return Component
}) satisfies QuartzComponentConstructor
