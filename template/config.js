module.exports = {
    /* the port that app listening to */
    port: 3000,
    /* your bot application id */
    clientID: '',
    /* array of owner id, that can run owner-category command */
    ownerID: [''],
    /* array of bot prefix */
    prefix: ['!'],
    /* embed color */
    embedColor: 'Random',
    /* should show the owner command list at help menu? */
    showOwnerCommandsAtHelpMenu: false,
    /* misc error/warn message */
    messageContent: {
        /* warn message when user in cooldown */
        inCooldown: '{username}, You are in cooldown... Ended {timestamp}',
        /* error message when user use help command that command doesnt exists, e.g !help abc (command abc doesnt exists) */
        commandNotFound: '{username}, Command {command} not found! try using the command name instead of command aliases!'
    }
}