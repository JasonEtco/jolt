<?php
namespace Craft;

class EmailValidatorVariable
{
    public function getAllowedEmails()
		{
				return craft()->emailValidator_getAllowedEmails->getAllowedEmails();
		}
}