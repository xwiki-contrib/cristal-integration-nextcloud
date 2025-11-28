import "./main.scss";
import {CristalAppLoader, defaultComponentsList} from "@xwiki/cristal-lib";
import {ComponentInit as BrowserComponentInit} from "@xwiki/cristal-browser-default";
import { ComponentInit as ShoelaceDSComponentInit } from "@xwiki/cristal-dsshoelace";
import { ComponentInit as NextcloudAuthenticationUIComponentInit } from "@xwiki/cristal-authentication-nextcloud-ui";
import { ComponentInit as NextcloudPageHierarchyComponentInit } from "@xwiki/cristal-hierarchy-nextcloud";
import { ComponentInit as NextcloudLinkSuggestComponentInit } from "@xwiki/cristal-link-suggest-nextcloud";
import { ComponentInit as ModelReferenceNextcloudComponentInit } from "@xwiki/cristal-model-reference-nextcloud";
import { ComponentInit as ModelRemoteURLNextcloudComponentInit } from "@xwiki/cristal-model-remote-url-nextcloud";
import { ComponentInit as NextcloudNavigationTreeComponentInit } from "@xwiki/cristal-navigation-tree-nextcloud";
import { ComponentInit as BrowserSettingsComponentInit } from "@xwiki/cristal-settings-browser";

CristalAppLoader.init(
    [],
    async () => {
        return {
            "Nextcloud": {
                name: "apps/cristal/",
                configType: "Nextcloud",
                "designSystem": "shoelace"
            }
        }
    },
    true,
    false,
    "Nextcloud",
    async (container) => {
        await defaultComponentsList(container);
        new BrowserComponentInit(container);
        new BrowserSettingsComponentInit(container)
        new ShoelaceDSComponentInit(container);
        new NextcloudAuthenticationUIComponentInit(container);
        new NextcloudLinkSuggestComponentInit(container);
        new NextcloudPageHierarchyComponentInit(container);
        new NextcloudNavigationTreeComponentInit(container);
        new ModelRemoteURLNextcloudComponentInit(container);
        new ModelReferenceNextcloudComponentInit(container);
    },
    async (container, configuration) => {

    },
)
