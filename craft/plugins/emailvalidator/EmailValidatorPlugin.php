<?php
namespace Craft;

class EmailValidatorPlugin extends BasePlugin
{
	public function getName()
	{
		return Craft::t('Email Validator');
	}

	public function getVersion()
	{
		return '1.0';
	}

	public function getDeveloper()
	{
		return 'Jason Etcovitch';
	}

	public function getDeveloperUrl()
	{
		return 'https://jasonet.co';
	}

	public function getSettingsHtml()
	{
		return craft()->templates->render('emailvalidator/_settings', array(
				'settings' => $this->getSettings()
		));
  }

	protected function defineSettings()
	{
		return array(
			'allowedEmails' => array(AttributeType::String, 'label' => 'Speedbump Text')
		);
	}

	public function init()
	{
		craft()->on('users.beforeSaveUser', function(Event $event)
		{
			// Retrieve the userModel from the event
			$user = $event->params['user'];
			$isNewUser = $event->params['isNewUser'];

			// Check if this is a front end request and that we are dealing with a new user
			if (craft()->request->isSiteRequest() && $isNewUser)
			{
				$email = $user->name;

				// Check for valid email address
				if ($email !== 'jasonetco@gmail2.com')
				{
					// Cancel user save
					$event->performAction = false;
				}
			}
		});
	}
}