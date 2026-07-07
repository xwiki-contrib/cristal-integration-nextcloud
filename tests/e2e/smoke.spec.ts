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

import { expect, test } from '@playwright/test'
import { CristalAppPage } from './pageObjects/CristalAppPage'
import { LoginPage } from './pageObjects/LoginPage'

test('the Cristal app starts and renders content', async ({ page }) => {
	await new LoginPage(page).login('admin', 'admin')

	// Uncaught exceptions on the Cristal page fail the test; console.error
	// messages are only logged, as failing on them would be flaky (Cristal
	// loads many modules with recoverable errors).
	const pageErrors: Error[] = []
	page.on('pageerror', (error) => pageErrors.push(error))
	page.on('console', (message) => {
		if (message.type() === 'error') {
			console.log(`[browser console.error] ${message.text()}`)
		}
	})

	const app = new CristalAppPage(page)
	await app.goto()
	await app.waitForAppStarted()

	expect(
		pageErrors.map((error) => error.message),
		'Uncaught exceptions were thrown while loading Cristal',
	).toEqual([])
})
