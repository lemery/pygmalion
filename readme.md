# Pygmalion

Pygmalion is a web-based campaign and character sheet manager for role-playing games. At any given time, the current live version can be found at http://pygmalion.herokuapp.com/.

## Systems

While Pygmalion was designed to be quite modular, currently it only supports [Evil Hat's](http://www.evilhat.com/home/) Fate RPG (the SRD for the Fate Core can be found [here](http://fate-srd.com/)). The next addition will likely be [Arc Dream's](http://www.arcdream.com/) Wild Talents system.

## Games

The basic block of Pygmalion's structure are its games. Any logged-in user can create a game, setting its basic traits (the ones that will apply to all player characters, or in the case of modular systems like Fate, the details of the specific ruleset being used), and add GMs and Players. Invalid usernames will not be added to the list of either players or GMs, and GMs have access to the (partially-implemented) ability to edit games. Anyone can currently view a created game. **Warning!: Editing game traits is only partially-implemented, and Players and GMs _cannot_ currently be edited - if you need to edit a game you do not have permission for, for the time-being you can add the "/force-edit" to the end of the url to view the relevant game.** 

Note: Occasionally Heroku throws an error upon successfully creating a game. It _appears_ to be a server-side error, and does not appear to impact the saving of the game itself; if this occurs, simply reload the page and go to the view games page, and your game should be present.
 
* ### Fate Games
Detailing the meanings of all the traits to be selected would be quite time-consuming, and better-answered by accessing the Fate SRD linked above. However, a quick overview:
 ##### Presets
Sometimes, you just want to use an already existent set of rules; three preset rule arrangements are already included, and more can be implemented relatively trivially. Fate Core is the default rules for making characters out of the Fate Core rulebook, Kriegzeppelin Valkyrie is the ruleset for the Evil Hat official setting of the same name (zeppelins and WW1 and fighter pilots, oh my),  and Firefly is a home-brewed ruleset (that I found on the internet) for games in the Firefly/Serenity shared universe, for those with stories much like that of the Firefly series.

 ##### Aspects
Specific Aspects are the important narrative traits of a character - "Things Don't Go Smooth," "Not So Subtle, Still Quick To Anger," and the like. In the Fate system, they may be leveraged both to the benefit and detriment of characters that have them. As a result, selecting the _types_ of Aspects player characters will have in a game is a way of determining what kind of narrative roles the game's story will hinge on.
 ##### Skills
 The meaning of the word "skill" is quite straightforward; selecting the skill list for use in a Fate game is directly selecting what kinds of skills will be used to solve problems in the story, and set the mood for challenges and obstacles.
 ##### Skill Arrangement
 The skill arrangement reflects the rules players can used to apply their skill points. Pyramid, the default rule for character creation in Fate, requires a character to have at least two skills at [+1] before they can have a skill at [+2], three skills at [+2] before they can have two at [+3], and so on. Column, the rule for the Dresden Files RPG (another Fate variant), simply requires a character to have at least as many skills at [+2] as they do at [+3], and so on down the line. Free removes all rules entirely; characters may place skills however they desire, provided they don't go over their number of skill points.
 ##### Stress Tracks
 Stress Tracks are a rough equivalent to your "health" in the Fate system; their length determines how much punishment a character can suffer without injury. The _types_ of stress tracks, therefore select what _kind_ of injuries will be narratively important to track - a Call of Cthulhu game would likely want to add a "Sanity" track (or rename the Mental one to Sanity), while a courtly intrigue game might remove the Physical track entirely, and use a Mental, Social, and Reputation track instead. For each track there is a related skill, whose ranking determines the size of the stress tracks of individual characters.
 ##### Consequences
 Where stress tracks measure how much damage a character can take without injury, Consequences represent how much injury they can take. The more consequences (and the larger their magnitude), the more injury can be absorbed (though this can be used against the injured party later). Splitting them into types can be important for some games (a GM might want to separate Consequences suffered harming one's political status from those representing one's broken arm in a fistfight), but not for others (those in a game about knightly honor and chivalry might well find it appropriate that a loss in honor is related to physical prowess).
 ##### Refresh
 Refresh, along with skill points, is the primary determiner of character power, as it governs how many stunts and extras a character can have, as well as how many Fate Points they start each game with. 6 is the default for Fate Core characters. 
 ##### Stunts
 Stunts are, in effect, important aptitudes or extraordinary tricks a character can do with their skills. The Minimum Stunts entry represents the minimum number of stunts all characters must have, while the Max Stunts entry represents the maximum  they _can_ have (if no number is entered, they may take as many as they have the Refresh for).
 
 
## Characters
Each game has a number of characters attached to it (when complete, characters will be made via a button when viewing a relevant game), which follow the rules for characters laid out in the Game tab. Characters will only be able to be added to a game by players in that game, and may be edited only by the user who created them. 
* ### Fate Characters
While characters cannot currently be made, the page for making characters is available, in its partial functionality. Rules, when complete, will be taken directly from the game they are made in; for the moment they are hard-coded to use the Fate Core rules.

 ##### Image
Eventually, images will be directly hostable. For the moment, simply enter the URL for a desired character image in the relevant box and press enter, and the displayed image will change. The URL will be saved to the character's database table.
##### Skills
The Skills table allows one to visually build their character's skill list and its ranks. It will automatically exclude from the dropdown any already-selected skills, and will not allow the player to select skills they have insufficient points for or are not allowed by the game's skill arrangement rules (a third [+3] skill before the fourth [+2] skill in the Pyramid arrangement, for example). 
##### Stunts and Extras
Stunts and Extras may be dynamically added (though not, at the moment, removed) via the [+] button, and will adjust the character's remaining refresh accordingly, as displayed above (if adding a stunt or entering the cost for an extra would reduce remaining refresh below 1, or if more stunts than the maximum would be added, the player will be prevented from doing so and alerted to what the problem was). Extra costs, and names for both types of entry, will update the appropriate areas when the user de-selects the field.

## General Notes
#### Scripts
Pygmalion uses a great deal of JavaScript and JQuery. If you attempt to access the page with noscript or some equivalent active, it will not function.
#### UI
Pygmalion primarily uses Bootstrap for its UI; enormous thanks to the Bootstrap Team for the excellent resource. Bootstrap, however, is designed to be smart, and I am a mere mortal who has not yet modified the layout to function on smaller screens. Pygmalion was designed to (and should) function and display properly on a 1920x1080p window. Viewing it in a smaller window may result in columns doing Very Strange Things as they wrap (this should not affect actual _functionality,_ but may make it far more frustrating to use).

