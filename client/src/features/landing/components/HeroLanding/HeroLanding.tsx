import cx from "classnames";
import { Col, Row } from "reactstrap";

import { useLoginUrl } from "../../../../authentication/useLoginUrl.hook";
import { HomeHeader } from "../../AnonymousHome";
import heroGraphic from "../../assets/heroBoxes.svg";

export default function HeroLanding() {
  const loginUrl = useLoginUrl();

  return (
    <div id="rk-anon-home-hero" className="bg-navy">
      <HomeHeader />
      <div className={cx("container", "py-5", "px-3")}>
        <Row>
          <Col xs={12} lg={7}>
            <div className={cx("pe-0", "pe-lg-5")}>
              <h1
                className={cx("text-white", "d-flex", "align-items-center", "gap-2")}
              >
                DeSciL
                {/* Logo sized in em so its "renku" lowercase ≈ the "c" x-height of the
                    title; tweak the multiplier if it reads slightly big/small. */}
                <img
                  src="/static/public/img/logo.svg"
                  alt="Renku"
                  style={{ height: "0.9em" }}
                />
              </h1>
              <img
                src={heroGraphic}
                alt="Renku"
                className={cx("w-100", "d-block", "d-lg-none", "my-4")}
              />
              <p className={cx("fs-2", "text-white", "my-4")}>
                Reproducible, collaborative data science for the research
                groups of ETH Zürich D-GESS.
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
