<?php
namespace Craft;

class EmailValidator_GetAllowedEmailsService extends BaseApplicationComponent
{
    public function getAllowedEmails()
		{
				$plugin = craft()->plugins->getPlugin('emailValidator');
				$settings = $plugin->getSettings();

				return $settings->allowedEmails;
		}
}