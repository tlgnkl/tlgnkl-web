import { QuartzComponentConstructor } from "./types"
import landingStyle from "./styles/landing.scss"

export const TOTAL_CARDS = 8
export const CARDS = {
  basics: (
    <a href={"/basics"}>
      <div class="card card-1">
        <p class="card-title">The Basics</p>
        <p class="card-subhead">Issue 001</p>
        <img src="/static/1-illo.png" class="card-illustration-1" />
      </div>
    </a>
  ),
  "getting-started": (
    <a href={"/getting-started"}>
      <div class="card card-2">
        <p class="card-title">Getting Started</p>
        <p class="card-subhead">Issue 002</p>
        <img src="/static/2-illo.png" class="card-illustration-2" />
      </div>
    </a>
  ),
  "growing-people": (
    <a href={"/growing-people"}>
      <div class="card card-3">
        <p class="card-title">Growing People</p>
        <p class="card-subhead">Issue 003</p>
        <img src="/static/3-illo.png" class="card-illustration-3" />
      </div>
    </a>
  ),
  "superboosting-ideas": (
    <a href={"/superboosting-ideas"}>
      <div class="card card-4">
        <p class="card-title">Super- boosting Ideas</p>
        <p class="card-subhead">Issue 004</p>
        <img src="/static/4-illo.png" class="card-illustration-4" />
      </div>
    </a>
  ),
  maintenance: (
    <a href={"/maintenance"}>
      <div class="card card-5">
        <p class="card-title">Maintenance</p>
        <p class="card-subhead">Issue 005</p>
        <img src="/static/5-illo.png" class="card-illustration-5" />
      </div>
    </a>
  ),
  "demo-days": (
    <a href={"/demo-days"}>
      <div class="card card-6">
        <p class="card-title">Demo Days</p>
        <p class="card-subhead">Issue 006</p>
        <img src="/static/6-illo.png" class="card-illustration-6" />
      </div>
    </a>
  ),
}

export default (() => {
  function LandingComponent() {
    return (
      <div>
        <div class="content-container">
          <p class="landing-header">Welcome to tlgnkl</p>
          <p class="page-subhead">
            This is a guide •{" "}
            <a href="https://www.linkedin.com/in/tlgnkl/" target="_blank">
              Go to LinkedIn
            </a>{" "}
            •{" "}
            <a href="https://t.me/tlgnklc" target="_self">
              TG Channel
            </a>
            •{" "}
            <a href="https://github.com/tlgnkl/tlgnkl-web" target="_blank">
              Contribute
            </a>{" "}
            •{" "}
            <a href="https://tlgnkl-web.vercel.app/credits" target="_self">
              Credits
            </a>
          </p>

          <div class="issue-container">
            {Object.values(CARDS)}
            {Array(TOTAL_CARDS - Object.keys(CARDS).length)
              .fill(0)
              .map(() => (
                <div class="card card-coming">
                  <p class="card-title">Coming Soon</p>
                  <p class="card-subhead">Issue XXX</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  LandingComponent.css = landingStyle
  return LandingComponent
}) satisfies QuartzComponentConstructor