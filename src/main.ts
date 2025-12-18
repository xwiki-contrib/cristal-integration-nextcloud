/**
 * See the LICENSE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

import "./main.css";
import "./vuetify.css";
import { ComponentInit as NextcloudAuthenticationComponentInit } from "./components/NextcloudAuthenticationManager";
import { ComponentInit as NextcloudRouterComponentInit } from "./components/NextcloudRouterFactory";
import { ComponentInit as NextcloudNavigationTreeComponentInit } from "./components/NextcloudNavigationTreeSource";
import { NextcloudStorage } from "./components/NextcloudStorage";
import { ComponentInit as BrowserComponentInit } from "@xwiki/cristal-browser-default";
import { ComponentInit as VuetifyDSComponentInit } from "@xwiki/cristal-dsvuetify";
import { ComponentInit as BlocknoteEditorComponentInit } from "@xwiki/cristal-editors-blocknote";
import { ComponentInit as NextcloudPageHierarchyComponentInit } from "@xwiki/cristal-hierarchy-nextcloud";
import { CristalAppLoader, defaultComponentsList } from "@xwiki/cristal-lib";
import { ComponentInit as NextcloudLinkSuggestComponentInit } from "@xwiki/cristal-link-suggest-nextcloud";
import { ComponentInit as ModelReferenceNextcloudComponentInit } from "@xwiki/cristal-model-reference-nextcloud";
import { ComponentInit as ModelRemoteURLNextcloudComponentInit } from "@xwiki/cristal-model-remote-url-nextcloud";
import { ComponentInit as BrowserSettingsComponentInit } from "@xwiki/cristal-settings-browser";

CristalAppLoader.init(
    [],
    async () => {
        return {
            "apps": {
                name: "apps",
                configType: "Nextcloud",
                designSystem: "vuetify",
                baseURL: window.location.origin,
                baseRestURL: `${window.location.origin}/remote.php/dav`,
                editor: "blocknote",
            }
        }
    },
    true,
    false,
    "apps",
    async (container) => {
        await defaultComponentsList(container);

        container
          .rebindSync<Storage>("Storage")
          .to(NextcloudStorage)
          .whenNamed("Nextcloud");

        new BrowserComponentInit(container);
        new BrowserSettingsComponentInit(container)
        new VuetifyDSComponentInit(container);
        new NextcloudAuthenticationComponentInit(container);
        new NextcloudLinkSuggestComponentInit(container);
        new NextcloudPageHierarchyComponentInit(container);
        new NextcloudNavigationTreeComponentInit(container);
        new ModelRemoteURLNextcloudComponentInit(container);
        new ModelReferenceNextcloudComponentInit(container);
        new NextcloudRouterComponentInit(container);
        new BlocknoteEditorComponentInit(container);
    },
    async () => { },
)
