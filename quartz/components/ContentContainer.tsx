import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function ContentContainer(props: QuartzComponentProps) {
  // Проверяем, если это главная страница, применяем специальный класс
  const containerClass = `content-container ${props.fileData.slug === "index" ? "index-container" : ""}`
  return <div class={containerClass}>{props.children}</div>
}

export default (() => ContentContainer) satisfies QuartzComponentConstructor
