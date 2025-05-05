import { QuartzComponentConstructor } from "./types"

function Marquee() {
  return (
    <div class="marquee">
      <p>TLGNKL - Digital Garden × Playground × Notebook × Research Lab × Library × Workshop × Toolbox × App Launcher × Archive × Cabinet of Curiosities × Portfolio × Gallery × Almanac × Wiki × Encyclopedia</p>
    </div>
  )
}

export default (() => Marquee) satisfies QuartzComponentConstructor
