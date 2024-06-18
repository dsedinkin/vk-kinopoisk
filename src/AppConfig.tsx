import vkBridge from "@vkontakte/vk-bridge";
import {
  createHashRouter,
  RoutesConfig,
  createRoot,
  createView,
  createPanel,
  RouterProvider,
} from "@vkontakte/vk-mini-apps-router";

import { DEFAULT_VIEW, DEFAULT_PANELS } from "engine/state";

import {
  usePlatform,
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
} from "@vkontakte/vkui";
import { ErrorBoundary } from "engine/fragments";

import App from "./App";

interface IAppConfig extends React.HTMLAttributes<HTMLDivElement> {}

const AppConfig: React.FC<IAppConfig> = () => {
  const platform = usePlatform();

  const routes = RoutesConfig.create([
    createRoot("default_root", [
      createView(DEFAULT_VIEW.auth, [
        createPanel(DEFAULT_PANELS.auth.DEFAULT_PANEL, "/"),
      ]),
      createView(DEFAULT_VIEW.search, [
        createPanel(DEFAULT_PANELS.search.DEFAULT_PANEL, "/search"),
      ]),
      createView(DEFAULT_VIEW.favorite, [
        createPanel(DEFAULT_PANELS.favorite.DEFAULT_PANEL, "/favorite"),
      ]),
      createView(DEFAULT_VIEW.watch, [
        createPanel(DEFAULT_PANELS.watch.DEFAULT_PANEL, "/watch/:id"),
      ]),
      createView(DEFAULT_VIEW.error, [
        createPanel(DEFAULT_PANELS.error.DEFAULT_PANEL, "/error/404/"),
      ]),
    ]),
  ]);

  const router = createHashRouter(routes.getRoutes());

  return (
    <ConfigProvider
      platform={platform}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={false}
    >
      <AdaptivityProvider>
        <AppRoot mode="full">
          <RouterProvider router={router} notFoundRedirectPath="/error/404/">
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default AppConfig;
