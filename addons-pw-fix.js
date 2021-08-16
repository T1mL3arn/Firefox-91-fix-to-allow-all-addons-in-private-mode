const fs = require('fs');
const { exit } = require('node:process');

// read profile dir argument
const profileDir = process.argv[2];

if (!profileDir) {
    console.log(`ERROR: Profile dir is empty`);
    exit(1);
}

if (!fs.existsSync(profileDir)) {
    console.log(`ERROR: Profile dir "${profileDir}" does not exist`);
    exit(1)
}

// set current working directory to be profile directory
process.chdir(profileDir);

// read file with extensions data
const extensions = JSON.parse(fs.readFileSync('extensions.json', 'utf8'));

// Read preferences file.
// It keeps data like permission to allow extension to run in private mode
const prefs = JSON.parse(fs.readFileSync('extension-preferences.json', 'utf8'));

// filter which extensions to be allowed to run in private mode
const addons = extensions.addons.filter(a => {
    // such extension must be enabled and also must not be mozilla's extension
    return !a.id.endsWith("@mozilla.org") && a.active;
})

console.log(addons.map(a => a.defaultLocale.name));
console.log(`Set ${addons.length} extensions to be allowed in private mode?`);

// asking user to continue
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout})
readline.question('Input Y to continue or anything else to abort: ', answer => {

    answer = answer.toLowerCase();
    
    if (answer !== 'y') {
        // handle abortion
        console.log('Aborted by user');
    } else {
        console.log('Making things...');
        allowAddonsInPrivateMode();
        console.log('Completed. Go to "about:support and press "Clear startup cache"');
    }
    
    readline.close()
    exit();
})

function allowAddonsInPrivateMode() {
    addons.forEach(a => {
        // create extension record in prefs if it is not there
        if (!(a.id in prefs)) {
            prefs[a.id] = { permissions: [], origins: [] };
        }
    
        // set permission (only if it is not set yet)
        if (prefs[a.id].permissions.indexOf("internal:privateBrowsingAllowed") == -1) {
            prefs[a.id].permissions.push("internal:privateBrowsingAllowed");
        }
    })

    // making a backup for original 'extension-preferences.json' file
    fs.renameSync('extension-preferences.json', 'extension-preferences.json.backup')

    // writing new prefs to disk
    fs.writeFileSync('extension-preferences.json', JSON.stringify(prefs));
}