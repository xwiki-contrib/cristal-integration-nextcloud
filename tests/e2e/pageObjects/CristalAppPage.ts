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

import type { Locator, Page } from '@playwright/test'

import { expect } from '@playwright/test'

/**
 * Page object for the Cristal app embedded in Nextcloud.
 */
export class CristalAppPage {
	constructor(private readonly page: Page) {}

	async goto(): Promise<void> {
		await this.page.goto('/index.php/apps/cristal/')
	}

	/**
   * The empty div rendered by templates/index.php, before the JS bundle
   * takes over.
   */
	mountPoint(): Locator {
		return this.page.locator('#xwCristalApp')
	}

	/**
   * The page content area rendered by the Cristal front-end once booted.
   */
	content(): Locator {
		return this.mountPoint().locator('#xwikicontent')
	}

	async waitForAppStarted(): Promise<void> {
		await expect(this.mountPoint()).toBeAttached()
		// An empty mount point means the JS bundle failed to boot: only a running
		// Cristal renders the content area inside it.
		await expect(this.content()).toBeVisible({ timeout: 60_000 })
	}
}
