<?php

declare(strict_types=1);

use OCP\Util;

Util::addScript(OCA\Cristal\AppInfo\Application::APP_ID, OCA\Cristal\AppInfo\Application::APP_ID . '-main');
Util::addStyle(OCA\Cristal\AppInfo\Application::APP_ID, OCA\Cristal\AppInfo\Application::APP_ID . '-main');

?>
<div id="xwCristalApp" class="xw-cristal"></div>
