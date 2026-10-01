import cx from "classnames";

import ContainerWrap from "~/components/container/ContainerWrap";
import LazyDashboardV2 from "~/features/dashboardV2/LazyDashboardV2";
import GroupNew from "~/features/groupsV2/new/GroupNew";
import LazyAnonymousHome from "~/features/landing/LazyAnonymousHome";
import ProjectV2New from "~/features/projectsV2/new/ProjectV2New";
import { useGetUserQueryState } from "~/features/usersV2/api/users.api";

export default function IndexPage() {
  const { data: user } = useGetUserQueryState();
  const isUserLoggedIn = !!user?.isLoggedIn;

  if (isUserLoggedIn) {
    return (
      <div className="w-100">
        <ProjectV2New />
        <GroupNew />

        <div className={cx("d-flex", "flex-grow-1")}>
          <ContainerWrap fullSize={true}>
            <LazyDashboardV2 />
          </ContainerWrap>
        </div>
      </div>
    );
  }

  // DeSciL: flex column so the landing frame's flex-grow-1 actually receives AppRoot's
  // slack; with a plain block wrapper the slack collected below the footer links.
  return (
    <div className={cx("w-100", "d-flex", "flex-column", "flex-grow-1")}>
      <LazyAnonymousHome />
    </div>
  );
}
