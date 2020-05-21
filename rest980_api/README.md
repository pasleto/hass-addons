# pasleto Hass.io Add-on: Roomba rest980 API

Run the rest980 API on Hass.io locally

![Supports amd64 Architecture][amd64-shield] ![Supports armv7 Architecture][armv7-shield]

&nbsp;
<p align="center">
    <img src="https://raw.githubusercontent.com/pasleto/hass-addons/master/rest980_api/logo.png" alt="Logo"/>
</p>

## About

[rest980][rest980] exposes [dorita980][dorita980] which is an Unofficial iRobot Roomba (i7/i7+, 980, 960, e5, 690, 675, etc) node.js SDK.

## Installation

Follow these steps to get the add-on installed on your system:

1. Navigate in your Home Assistant frontend to **Supervisor** -> **Add-on Store**.
2. Ensure you have added the custom repository - ```https://github.com/pasleto/hass-addons```
3. Find the "Roomba rest980 API" add-on and click on it.
4. Click on the "INSTALL" button - this will install a build the image locally.

## How to use

This add-on requires configuration options to be set.

BLID/Password - refer [here][blid] for help in obtaining these details.

1. Set the required configuration attributes.
2. Start the add-on.
3. Check the add-on log output to see the result.

## Credits

- [Facu ZAK](https://github.com/koalazak) for creating dorita980 and rest980 !
- [Jeremy Willans](https://github.com/jeremywillans) for creating the docker image from which my addon is shamelessly derived from!

&nbsp;

[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://www.buymeacoffee.com/pasleto)

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg?style=for-the-badge
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg?style=for-the-badge
[blid]: https://github.com/koalazak/dorita980#how-to-get-your-usernameblid-and-password
[rest980]: https://github.com/koalazak/rest980
[dorita980]: https://github.com/koalazak/rest980
[facuzak]: https://github.com/koalazak