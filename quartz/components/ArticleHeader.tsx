import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function ArticleHeader({ fileData }: QuartzComponentProps) {
  const title = fileData.frontmatter?.title
  const description = fileData.description

  return (
    <div class="article-header">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}

export default (() => ArticleHeader) satisfies QuartzComponentConstructor
