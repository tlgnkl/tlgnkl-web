import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import "../components/styles/landing.scss"

// Типизация для карточек
interface Card {
  title: string;
  subtitle: string;
  className: string;
  href?: string;
  illustration?: string;
}

// Данные о карточках
const CARDS: Card[] = [
  {
    title: "Basics",
    subtitle: "ISSUE 001",
    href: "/basics",
    className: "card-1",
    illustration: "/static/1-illo.png",
  },
  {
    title: "Getting Started",
    subtitle: "ISSUE 002",
    href: "/getting-started",
    className: "card-2",
    illustration: "/static/2-illo.png",
  },
  {
    title: "Growing People",
    subtitle: "ISSUE 003",
    href: "/growing-people",
    className: "card-3",
    illustration: "/static/3-illo.png",
  },
  {
    title: "Superboosting Ideas",
    subtitle: "ISSUE 004",
    href: "/superboosting-ideas",
    className: "card-4",
    illustration: "/static/4-illo.png",
  },
  {
    title: "Maintenance",
    subtitle: "ISSUE 005",
    href: "/maintenance",
    className: "card-5",
    illustration: "/static/5-illo.png",
  },
  {
    title: "Demo Days",
    subtitle: "ISSUE 006",
    href: "/demo-days",
    className: "card-6",
    illustration: "/static/6-illo.png",
  },
]

// Количество всех карточек
const TOTAL_CARDS = 8

function LandingComponent() {
  // Создаем массив всех карточек с "Coming Soon" для пустых мест
  const allCards: Card[] = [
    ...CARDS,
    ...Array(TOTAL_CARDS - CARDS.length).fill(0).map(() => ({
      title: "Coming Soon",
      subtitle: "ISSUE XXX",
      className: "card-coming"
    }))
  ];

  return (
    <div className="landing-wrapper">
      <h1 className="landing-title">Welcome to tlgnkl</h1>
      <p className="landing-subtitle">
        THIS IS A HOME • <a href="https://www.linkedin.com/in/tlgnkl/">LINKEDIN</a> • <a href="https://t.me/tlgnklc">TG</a> • <a href="https://github.com/tlgnkl/tlgnkl-web">CONTRIBUTE</a> • <a href="/credits">CREDITS</a>
      </p>
      
      <div className="cards-grid">
        {allCards.map((card, index) => (
          <div key={`card-${index}`} className="card-wrapper">
            {card.href ? (
              <a href={card.href} className={`card ${card.className}`}>
                <div className="card-content">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-subtitle">{card.subtitle}</p>
                </div>
                {card.illustration && (
                  <div className="card-img-wrapper">
                    <img src={card.illustration} alt={card.title} className="card-img" />
                  </div>
                )}
              </a>
            ) : (
              <div className={`card ${card.className}`}>
                <div className="card-content">
                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-subtitle">{card.subtitle}</p>
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
