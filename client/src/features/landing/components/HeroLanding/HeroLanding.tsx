import cx from "classnames";
import { Col, Row } from "reactstrap";

import { useLoginUrl } from "../../../../authentication/useLoginUrl.hook";
import heroGraphic from "../../assets/heroBoxes.svg";

/*
 * DeSciL: size the renku wordmark off the heading font's OWN x-height, so the lockup
 * "DeSciL renku" reads as one word at any font or size. Measured from logo.svg
 * (viewBox "0 0 398.95 160.71"):
 *   - "renku" x-height band: y 74.17 -> 123.69 (49.52 units) — taken from the flat-topped
 *     `u`/`n` stems and the flat `r`/`n`/`k` baseline; the round `e`/`u` overshoot is
 *     ignored, as it should be for an optical match.
 *   - letter baseline: y 123.69, i.e. 76.97% down the box.
 * The wordmark is only ~31% of the box height (the rest is the pixel-cross motif, which
 * runs the full height and bleeds above/below the text), hence the >3x multiplier.
 *   height       =  1ex * 160.71/49.52          -> renku x-height == font x-height
 *   marginBottom = -(1 - 123.69/160.71) * scale -> renku baseline == text baseline
 * `1ex` IS the font's x-height, so this carries no Inter-specific magic numbers and
 * survives a font change. The negative bottom margin (rather than position/top) keeps the
 * drop honest in layout, so the logo can't overlap the tagline below.
 */
const LOGO_VB_HEIGHT = 160.71;
const LOGO_BASELINE = 123.69;
const LOGO_X_HEIGHT = LOGO_BASELINE - 74.17;
const LOGO_SCALE = LOGO_VB_HEIGHT / LOGO_X_HEIGHT; // 3.2453
const LOGO_BELOW_BASELINE = (1 - LOGO_BASELINE / LOGO_VB_HEIGHT) * LOGO_SCALE; // 0.7474

export default function HeroLanding() {
  const loginUrl = useLoginUrl();

  return (
    // DeSciL: absorb the slack handed down by #rk-anon-home-frame and center the hero in
    // it, so leftover height reads as balanced padding instead of one gap above the footer.
    <div
      id="rk-anon-home-hero"
      className={cx("bg-navy", "flex-grow-1", "d-flex", "align-items-center")}
    >
      {/* w-100: as a flex item the container would otherwise shrink to its content width */}
      <div className={cx("container", "w-100", "py-5", "px-3")}>
        <Row>
          <Col xs={12} lg={7}>
            <div className={cx("pe-0", "pe-lg-5")}>
              <h1
                className={cx(
                  "text-white",
                  "d-flex",
                  "align-items-baseline",
                  "gap-2",
                )}
              >
                DeSciL
                <img
                  src="/static/public/img/logo.svg"
                  alt="renku"
                  style={{
                    height: `calc(1ex * ${LOGO_SCALE.toFixed(4)})`,
                    marginBottom: `calc(-1ex * ${LOGO_BELOW_BASELINE.toFixed(4)})`,
                  }}
                />
              </h1>
              <img
                src={heroGraphic}
                alt="Renku"
                className={cx("w-100", "d-block", "d-lg-none", "my-4")}
              />
              <p className={cx("fs-2", "text-white", "my-4")}>
                Reproducible, collaborative data science for the research groups
                of ETH Zürich D-GESS.
              </p>
              <div
                className={cx(
                  "d-flex",
                  "gap-3",
                  "mt-3",
                  "mt-md-4",
                  "flex-sm-row",
                  "flex-column",
                )}
              >
                <a
                  className={cx("btn", "btn-primary", "btn-lg")}
                  id="hero_link-sign_up"
                  href={loginUrl.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Create an account
                </a>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={5} className={cx("text-center", "text-lg-end")}>
            <img
              src={heroGraphic}
              alt="Renku"
              className={cx("w-100", "d-none", "d-lg-block")}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
