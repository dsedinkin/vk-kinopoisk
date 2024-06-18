import vkBridge from "@vkontakte/vk-bridge";
import {
  useAppearance,
  useInsets,
  useAdaptivity,
} from "@vkontakte/vk-bridge-react";
import {
  createHashRouter,
  RoutesConfig,
  createRoot,
  createView,
  createPanel,
  RouterProvider,
} from "@vkontakte/vk-mini-apps-router";
import { transformVKBridgeAdaptivity } from "engine/utils";

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
  // const vkBridgeAppearance = useAppearance() || undefined;
  // const vkBridgeInsets = useInsets() || undefined;
  // const vkBridgeAdaptivityProps = transformVKBridgeAdaptivity(useAdaptivity());

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

  // <AdaptivityProvider {...vkBridgeAdaptivityProps}>
  // <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
  return (
    <ConfigProvider
      // appearance="light"
      // appearance={vkBridgeAppearance}
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
}; // Examples

export default AppConfig;
