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

import { defineConfig, devices } from '@playwright/test'

// Must match the port used by tests/nextcloud/start-nextcloud.sh.
const port = Number(process.env.NEXTCLOUD_PORT) || 8080

export default defineConfig({
	testDir: './e2e',
	// Must be larger than the app-start assertion timeout in CristalAppPage.
	timeout: 120_000,
	outputDir: './test-results',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: [
		['list'],
		['junit', { outputFile: 'e2e-tests.xml' }],
		['html', { open: 'never', outputFolder: './playwright-report' }],
	],
	use: {
		baseURL: `http://localhost:${port}`,
		trace: 'retain-on-failure',
		video: 'retain-on-failure',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
