import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from "@vkontakte/vk-mini-apps-router";
import { useGlobalValue } from "elum-state/react";
import { SNACKBAR, POPOUT, DEFAULT_VIEW, DEFAULT_PANELS } from "engine/state";

import {
  ModalRoot,
  ModalPage,
  SplitLayout,
  SplitCol,
  Root,
  View,
} from "@vkontakte/vkui";
import {
  Auth,
  Error,
  Favorite,
  Filter,
  Header,
  Navigation,
  Search,
  Watch,
} from "structure";

interface App extends React.HTMLAttributes<HTMLDivElement> {}

const App: React.FC<App> = () => {
  const routeNavigator = useRouteNavigator();
  const { modal: activeModal, view: activeView = DEFAULT_VIEW.auth } =
    useActiveVkuiLocation();

  const snackbar = useGlobalValue(SNACKBAR);
  const popout = useGlobalValue(POPOUT);

  const modal = (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => routeNavigator.hideModal()}
    >
      <ModalPage id="filter" dynamicContentHeight>
        <Filter />
      </ModalPage>
    </ModalRoot>
  );

  const isPrivateView = ["view-auth", "view-error", "view-watch"]?.includes(
    activeView
  );

  const modeSplitColMiddle = ["view-watch"]?.includes(activeView);

  const header = (!isPrivateView || modeSplitColMiddle) && <Header />;

  return (
    <SplitLayout
      popout={popout}
      modal={modal}
      style={{ justifyContent: "center" }}
    >
      {header}
      {!isPrivateView && (
        <SplitCol
          className={isPrivateView ? "" : "SplitCol--first"}
          width="100%"
          maxWidth={300}
          animate={false}
        >
          <Navigation />
        </SplitCol>
      )}
      <SplitCol
        className={
          modeSplitColMiddle
            ? "SplitCol--middle"
            : isPrivateView
            ? ""
            : "SplitCol--second"
        }
        animate={false}
        maxWidth={modeSplitColMiddle ? 1232 : 930}
      >
        <Root activeView={activeView}>
          <View
            nav={DEFAULT_VIEW.auth}
            activePanel={DEFAULT_PANELS.auth.DEFAULT_PANEL}
          >
            <Auth nav={DEFAULT_PANELS.auth.DEFAULT_PANEL} />
          </View>
          <View
            nav={DEFAULT_VIEW.search}
            activePanel={DEFAULT_PANELS.search.DEFAULT_PANEL}
          >
            <Search nav={DEFAULT_PANELS.search.DEFAULT_PANEL} />
          </View>
          <View
            nav={DEFAULT_VIEW.favorite}
            activePanel={DEFAULT_PANELS.favorite.DEFAULT_PANEL}
          >
            <Favorite nav={DEFAULT_PANELS.favorite.DEFAULT_PANEL} />
          </View>
          <View
            nav={DEFAULT_VIEW.watch}
            activePanel={DEFAULT_PANELS.watch.DEFAULT_PANEL}
          >
            <Watch nav={DEFAULT_PANELS.watch.DEFAULT_PANEL} />
          </View>
          <View
            nav={DEFAULT_VIEW.error}
            activePanel={DEFAULT_PANELS.error.DEFAULT_PANEL}
          >
            <Error nav={DEFAULT_PANELS.error.DEFAULT_PANEL} />
          </View>
        </Root>
      </SplitCol>
      {snackbar}
    </SplitLayout>
  );
};

export default App;
