import { useRef } from "react";
import {
  useRouteNavigator,
  useActiveVkuiLocation,
} from "@vkontakte/vk-mini-apps-router";
import { scrollToRef } from "engine/utils";

import { useGlobalValue } from "elum-state/react";
import { SNACKBAR, POPOUT, DEFAULT_VIEW, DEFAULT_PANELS } from "engine/state";

import {
  useAdaptivityWithJSMediaQueries,
  ViewWidth,
  ModalRoot,
  ModalPage,
  SplitLayout,
  SplitCol,
  Epic,
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
  navigationMode,
} from "structure";

interface App extends React.HTMLAttributes<HTMLDivElement> {}

const App: React.FC<App> = () => {
  const routeNavigator = useRouteNavigator();
  const { viewWidth } = useAdaptivityWithJSMediaQueries();
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

  const isPrivateView = ["view-auth", "view-error"]?.includes(activeView);

  const modeSplitColMiddle = ["view-watch"]?.includes(activeView);
  const modeDesktop = viewWidth >= ViewWidth.SMALL_TABLET;

  const header = (!isPrivateView || modeSplitColMiddle) && modeDesktop && (
    <Header />
  );

  const contentRef = useRef<React.Ref<HTMLDivElement>>();

  const scrollTop = () => {
    scrollToRef(contentRef);
  };

  return (
    <SplitLayout
      popout={popout}
      modal={modal}
      style={{ justifyContent: "center" }}
    >
      {header}
      {!isPrivateView && !modeSplitColMiddle && modeDesktop && (
        <SplitCol
          className={
            isPrivateView || modeSplitColMiddle ? "" : "SplitCol--first"
          }
          width="100%"
          maxWidth={300}
          animate={false}
        >
          <Navigation mode={navigationMode.DESKTOP} />
        </SplitCol>
      )}
      <SplitCol
        className={
          isPrivateView || !modeDesktop
            ? ""
            : modeSplitColMiddle
            ? "SplitCol--middle"
            : "SplitCol--second"
        }
        animate={false}
        maxWidth={modeSplitColMiddle ? 1232 : 930}
        getRootRef={contentRef as any}
      >
        <Epic
          activeStory={activeView}
          tabbar={
            !isPrivateView &&
            !modeSplitColMiddle &&
            !modeDesktop && <Navigation mode={navigationMode.MOBILE} />
          }
        >
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
            <Search
              nav={DEFAULT_PANELS.search.DEFAULT_PANEL}
              modeDesktop={modeDesktop}
              scrollTop={scrollTop}
            />
          </View>
          <View
            nav={DEFAULT_VIEW.favorite}
            activePanel={DEFAULT_PANELS.favorite.DEFAULT_PANEL}
          >
            <Favorite
              nav={DEFAULT_PANELS.favorite.DEFAULT_PANEL}
              modeDesktop={modeDesktop}
              scrollTop={scrollTop}
            />
          </View>
          <View
            nav={DEFAULT_VIEW.watch}
            activePanel={DEFAULT_PANELS.watch.DEFAULT_PANEL}
          >
            <Watch
              nav={DEFAULT_PANELS.watch.DEFAULT_PANEL}
              modeDesktop={modeDesktop}
            />
          </View>
          <View
            nav={DEFAULT_VIEW.error}
            activePanel={DEFAULT_PANELS.error.DEFAULT_PANEL}
          >
            <Error nav={DEFAULT_PANELS.error.DEFAULT_PANEL} />
          </View>
        </Epic>
      </SplitCol>
      {snackbar}
    </SplitLayout>
  );
};

export default App;
