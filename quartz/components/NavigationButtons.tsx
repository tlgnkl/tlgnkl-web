import { QuartzComponentConstructor } from "./types"

function NavigationButtons() {
  return (
    <div class="index-container">
      <div class="navigation-container">
        <a href="/basics" class="navigation-button">
          <p>Basics</p>
        </a>
        <a href="/getting-started" class="navigation-button">
          <p>Getting Started</p>
        </a>
        <a href="/growing-people" class="navigation-button">
          <p>Growing People</p>
        </a>
        <a href="/superboosting-ideas" class="navigation-button">
          <p>Superboosting Ideas</p>
        </a>
        <a href="/maintenance" class="navigation-button">
          <p>Maintenance</p>
        </a>
        <a href="/demo-days" class="navigation-button">
          <p>Demo Days</p>
        </a>
      </div>
    </div>
  )
}

export default (() => NavigationButtons) satisfies QuartzComponentConstructor
