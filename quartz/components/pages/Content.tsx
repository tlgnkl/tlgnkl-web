import { ComponentChildren } from "preact"
import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree) as ComponentChildren
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  
  // Для главной страницы отображаем только содержимое без навигационных кнопок,
  // так как они теперь добавляются через компонент Landing
  if (fileData.slug === "index") {
    return (
      <article class={classString}>
        {content}
      </article>
    )
  }
  
  // Для обычных страниц, проверяем, нужно ли показывать специальные элементы
  return (
    <article class={classString}>
      {content}
      {fileData.slug === "basics" && (
        <div class="end-message">
          <h1>Ready to begin!</h1>
          <p>Let's get started with building your own system.</p>
          <a href="/getting-started" class="cta-button">
            Continue to Getting Started
          </a>
        </div>
      )}
      {fileData.slug === "getting-started" && (
        <div class="end-message">
          <h1>Next steps!</h1>
          <p>Now that you've got your system set up, let's grow it.</p>
          <a href="/growing-people" class="cta-button">
            Continue to Growing People
          </a>
        </div>
      )}
      {fileData.slug === "growing-people" && (
        <div class="end-message">
          <h1>Fantastic!</h1>
          <p>Now let's look at how to superboost ideas.</p>
          <a href="/superboosting-ideas" class="cta-button">
            Continue to Superboosting Ideas
          </a>
        </div>
      )}
      {fileData.slug === "superboosting-ideas" && (
        <div class="end-message">
          <h1>Almost there!</h1>
          <p>Finally, let's make sure your system keeps running smoothly.</p>
          <a href="/maintenance" class="cta-button">
            Continue to Maintenance
          </a>
        </div>
      )}
      {fileData.slug === "maintenance" && (
        <div class="end-message">
          <h1>Congratulations!</h1>
          <p>You've completed the full guide. Time to demo your work.</p>
          <a href="/demo-days" class="cta-button">
            Continue to Demo Days
          </a>
        </div>
      )}
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor
