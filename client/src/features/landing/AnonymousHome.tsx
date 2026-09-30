/*!
 * Copyright 2021 - Swiss Data Science Center (SDSC)
 * A partnership between École Polytechnique Fédérale de Lausanne (EPFL) and
 * Eidgenössische Technische Hochschule Zürich (ETHZ).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 *  incubator-renku-ui
 *
 *  Landing.present.js
 *  Presentational components.
 */

import { useContext, useEffect } from "react";

import LazyMarkdown from "~/components/markdown/LazyMarkdown";
import AppContext from "../../utils/context/appContext";
import { DEFAULT_APP_PARAMS } from "../../utils/context/appParams.constants";
import type { AnonymousHomeConfig } from "./anonymousHome.types";
import VisualHead from "./assets/Visual_Head.svg";
import { BottomNav, TopNav } from "./components/anonymousHomeNav";
import HeroLanding from "./components/HeroLanding/HeroLanding";

export default function AnonymousHome() {
  const { params } = useContext(AppContext);

  // DeSciL: paint the page background navy while on the landing so no white can show
  // through any residual gap (e.g. below the footer). Restored on unmount.
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#01192d";
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  return (
    <AnonymousHomeInner
      homeCustomized={params?.["HOMEPAGE"] ?? DEFAULT_APP_PARAMS.HOMEPAGE}
      params={{
        ...params,
        UI_SHORT_SHA: params?.UI_SHORT_SHA ?? DEFAULT_APP_PARAMS.UI_SHORT_SHA,
      }}
    />
  );
}

export function HomeHeader() {
  return <TopNav />;
}

function StandardHome() {
  // DeSciL: trimmed the SDSC/Renku marketing sections — minimal landing = hero + footer nav.
  return (
    <>
      <HeroLanding />
      <BottomNav />
    </>
  );
}

function CustomizedAnonymousHome(props: AnonymousHomeConfig) {
  let content = props.homeCustomized.custom.main.contentMd;
  if (content.length < 1)
    content = "[No content provided: please configure text to display here.]";
  let backgroundUrl = props.homeCustomized.custom.main.backgroundImage.url;
  let backgroundSize = "cover";
  if (backgroundUrl.length < 1) {
    backgroundUrl = VisualHead;
    backgroundSize = "cover";
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize,
          backgroundRepeat: "no-repeat",
        }}
      >
        <LazyMarkdown sanitize={false}>{content}</LazyMarkdown>
      </div>
      <BottomNav />
    </>
  );
}

function AnonymousHomeInner(props: AnonymousHomeConfig) {
  return (
    <div
      id="rk-anon-home-frame"
      // DeSciL: no min-height here — the frame just takes the slack that AppRoot's flex
      // column hands down (viewport minus home nav minus copyright bar). The previous
      // fixed min-height subtracted only the 3rem copyright bar, not the ~112px home nav,
      // and pushed the footer out of view. Hero grows and centers inside; BottomNav stays
      // pinned to the bottom by its own `mt-auto`.
      className="bg-navy d-flex flex-column flex-grow-1"
    >
      {props.homeCustomized.custom.enabled ? (
        <CustomizedAnonymousHome {...props} />
      ) : (
        <StandardHome />
      )}
    </div>
  );
}
