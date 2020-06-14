# pasleto Hass.io Add-on: Network Notepad

Run network notepad on your Home Assistant instance

![Supports amd64 Architecture][amd64-shield] ![Supports armv7 Architecture][armv7-shield]

&nbsp;
<p align="center">
    <img src="https://raw.githubusercontent.com/pasleto/hass-addons/master/network_notepad/logo.png" alt="Logo"/>
</p>

## About

Network Notepad is application for memorizing your network data

## Installation

Follow these steps to get the add-on installed on your system:

1. Navigate in your Home Assistant frontend to **Supervisor** -> **Add-on Store**.
2. Ensure you have added the custom repository - ```https://github.com/pasleto/hass-addons```
3. Find the "Network Notepad" add-on and click on it.
4. Click on the "INSTALL" button - this will install and build the image locally.

## How to use

This add-on requires [MariaDB] addon to be configured on your HA instance and options to be set.

MariaDB configuration:
```
    databases:
      - <database>                      // default - network_notepad
    logins:
      - username: <username>            // default - network_notepad
        password: <password>            // default - network_notepad
    rights:
      - username: <username>            // default - network_notepad
        database: <database>            // default - network_notepad
``` 
Network Notepad Configuration:
```
    DATABASE_URL: <hassio_ip>,            // default - core-mariadb
    DATABASE_USER: <user>,                // default - network_notepad
    DATABASE_PASSWORD: <password>,        // default - network_notepad
    DATABASE_NAME: <database>             // default - network_notepad
```

1. Set the required MariaDB addon and its configuration attributes.
2. Start the add-on.
3. Check the add-on log output to see the result.
4. Set the required configuration attributes for this addon based on MariaDB configuration.
5. Start the add-on.
6. Check the add-on log output to see the result.
7. Enjoy.

&nbsp;

[![BMC](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://www.buymeacoffee.com/pasleto)

[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg?style=for-the-badge
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg?style=for-the-badge
[MariaDB]: https://github.com/home-assistant/hassio-addons/tree/master/mariadb