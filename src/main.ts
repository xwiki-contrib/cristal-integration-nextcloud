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

import type { InternalLinksSerializer } from '@xwiki/platform-uniast-markdown/dist/markdown/internal-links/serializer/internal-links-serializer-resolver'
import type { Container, Factory, Newable, ResolutionContext } from 'inversify'

import { ComponentInit as BrowserComponentInit } from '@xwiki/cristal-browser-default'
import { ComponentInit as BlocknoteEditorComponentInit } from '@xwiki/cristal-editors-blocknote'
import { ComponentInit as NextcloudPageHierarchyComponentInit } from '@xwiki/cristal-hierarchy-nextcloud'
import { CristalAppLoader, defaultComponentsList } from '@xwiki/cristal-lib'
import { ComponentInit as NextcloudLinkSuggestComponentInit } from '@xwiki/cristal-link-suggest-nextcloud'
import { ComponentInit as ModelReferenceNextcloudComponentInit } from '@xwiki/cristal-model-reference-nextcloud'
import { ComponentInit as ModelRemoteURLNextcloudComponentInit } from '@xwiki/cristal-model-remote-url-nextcloud'
import { ComponentInit as NextcloudNavigationTreeComponentInit } from '@xwiki/cristal-navigation-tree-nextcloud'
import { ComponentInit as NextcloudHTTPHeadersComponentInit } from '@xwiki/cristal-nextcloud-http-headers'
import { ComponentInit as BrowserSettingsComponentInit } from '@xwiki/cristal-settings-browser'
import { ComponentInit as NextcloudAuthenticationComponentInit } from './components/NextcloudAuthenticationManager.ts'
import { ComponentInit as NextcloudRouterComponentInit } from './components/NextcloudRouterFactory.ts'
import { ComponentInit as NextcloudDSComponentInit } from './ds/index.ts'

import './main.css'
import './vuetify.css'

CristalAppLoader.init(
	[],
	async () => {
		return {
			apps: {
				name: 'apps',
				configType: 'Nextcloud',
				designSystem: 'nextcloud',
				baseURL: window.location.origin,
				baseRestURL: `${window.location.origin}/remote.php/dav`,
				editor: 'blocknote',
				homePage: 'home',
			},
		}
	},
	true,
	false,
	'apps',
	async (container) => {
		await defaultComponentsList(container)

		new BrowserComponentInit(container)
		new BrowserSettingsComponentInit(container)
		new NextcloudDSComponentInit(container)
		new NextcloudAuthenticationComponentInit(container)
		new NextcloudLinkSuggestComponentInit(container)
		new NextcloudPageHierarchyComponentInit(container)
		new NextcloudNavigationTreeComponentInit(container)
		new ModelRemoteURLNextcloudComponentInit(container)
		new ModelReferenceNextcloudComponentInit(container)
		new NextcloudRouterComponentInit(container)
		new BlocknoteEditorComponentInit(container)
		new NextcloudHTTPHeadersComponentInit(container)

		patchCSSSetProperty()
		await patchNextcloudMarkdownInternalLinksResolution(container)
	},
	async () => {},
)

// TODO: remove when CRISTAL-779 is closed
async function patchNextcloudMarkdownInternalLinksResolution(container: Container) {
	// TODO: remove when CRISTAL-779 is closed
	const name = 'Nextcloud';
	(
		await container.rebind<Factory<Promise<InternalLinksSerializer>>>('Factory<InternalLinksSerializer>')
	)
		.toFactory((context) => {
			return async () => {
				const component = (await import('./components/NextcloudInternalLinks.ts'))
					.NextcloudInternalLinkSerializer
				return bindAndLoad(container, name, component, context)
			}
		})
		.whenNamed(name)
}

// TODO: remove when CRISTAL-779 is closed
function bindAndLoad<T extends InternalLinksSerializer>(
	container: Container,
	name: string,
	component: Newable<T>,
	context: ResolutionContext,
) {
	if (!container.isBound('InternalLinksSerializer', { name })) {
		container
			.bind<InternalLinksSerializer>('InternalLinksSerializer')
			.to(component)
			.whenNamed(name)
	}
	return context.get<InternalLinksSerializer>('InternalLinksSerializer', {
		name,
	})
}

/**
 * Nextcloud scopes Cristal's root to an inner div, which conflicts with our use of
 * setProperty on the root document. So we override the related methods to the proper
 * root element that Nextcloud gives us.
 */
function patchCSSSetProperty() {
	const scopedRoot = document.querySelector<HTMLElement>('div#xwCristalApp')
	const nativeSetProperty = CSSStyleDeclaration.prototype.setProperty
	const nativeRemoveProperty = CSSStyleDeclaration.prototype.removeProperty

	document.documentElement.style.setProperty = function(name, value, priority) {
		nativeSetProperty.call(this, name, value, priority)
		if (scopedRoot) {
			nativeSetProperty.call(scopedRoot.style, name, value, priority)
		}
	}

	document.documentElement.style.removeProperty = function(name) {
		const result = nativeRemoveProperty.call(this, name)
		if (scopedRoot) {
			nativeRemoveProperty.call(scopedRoot.style, name)
		}
		return result
	}
}
