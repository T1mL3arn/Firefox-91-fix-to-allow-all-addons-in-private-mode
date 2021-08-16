# About

This is a script to allow all(*) extensions to run in firefox private mode.

(*) not all actually, see below

## Why

Some time ago Fiefox disallowed to run extensions in private mode by default. Since then user must explicitly set such permission for each extension in FF settings. It is not a problem for every new addon installation, but if you had a lot of addons before this and you wanted to all them work in private mode, you get a "very interesting" clicker game. 

There was `extensions.allowPrivateBrowsingByDefault` setting to allow extensions to run in private mode at-mass, but it is [removed in FF 91](https://bugzilla.mozilla.org/show_bug.cgi?id=1661517). Now people who relied on this setting has no option except a tedious clicker game (or this script)

## Script

The script reads extensions data and updates extensions to allow them in private mode. Not all extensions are affected - only those that are active (not disabled completely by user) and those that are user installed (not mozzila's extensions).

## How to use

1. Install [node.js](https://nodejs.org/en/download/)
2. Download `addons-pw-fix.js` 
3. Go to `about:profiles`
4. Find your current profile (profile in use) and copy its `Root Directory` location
5. Run the script and pass your `Root Directory` locaton as a second argument, e.g.:
    ```
    node addons-pw-fix.js C:\Users\JohnDoe\AppData\Roaming\Mozilla\Firefox\Profiles\18ks6687.JohnDoe
    ```
6. Carefuly read the instructions

## License

[WTFPL v2](http://www.wtfpl.net/txt/copying/)