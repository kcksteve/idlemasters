//Stat Manager - Manages the player stats. Saving, Loading, Clearing and accessing. Singleton class.
class StatManager {
    //public stat objects
    foraging = {level:1, xp:0, resource:0};
    logging = {level:1, xp:0, resource:0};
    fishing = {level:1, xp:0, resource:0};
    mining = {level:1, xp:0, resource:0};
    alchemy = {level:1, xp:0, resource:0};
    armor = {level:1, xp:0};
    weapon = {level:1, xp:0};
    combat = {level:1, xp:0};
    player = {hp:100, ap:100};

    constructor() {
        //Instance check to ensure to stop creation of a second instance
        if (StatManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        StatManager.instance = this;
        this.loadAll();
    }

    //Save all stats to web storage - yucky should be programatic
    saveAll() {
        localStorage.setItem("foragingLevel", this.foraging.level);
        localStorage.setItem("foragingXP", this.foraging.xp);
        localStorage.setItem("foragingResource", this.foraging.resource);

        localStorage.setItem("loggingLevel", this.logging.level);
        localStorage.setItem("loggingXP", this.logging.xp);
        localStorage.setItem("loggingResource", this.logging.resource);

        localStorage.setItem("fishingLevel", this.fishing.level);
        localStorage.setItem("fishingXP", this.fishing.xp);
        localStorage.setItem("fishingResource", this.fishing.resource);

        localStorage.setItem("miningLevel", this.mining.level);
        localStorage.setItem("miningXP", this.mining.xp);
        localStorage.setItem("miningResource", this.mining.resource);

        localStorage.setItem("alchemyLevel", this.alchemy.level);
        localStorage.setItem("alchemyXP", this.alchemy.xp);
        localStorage.setItem("alchemyResource", this.alchemy.resource);

        localStorage.setItem("armorLevel", this.armor.level);
        localStorage.setItem("armorXP", this.armor.xp);

        localStorage.setItem("weaponLevel", this.weapon.level);
        localStorage.setItem("weaponXP", this.weapon.xp);

        localStorage.setItem("combatLevel", this.combat.level);
        localStorage.setItem("combatXP", this.combat.xp);

        localStorage.setItem("playerHP", this.player.hp);
        localStorage.setItem("playerAP", this.player.ap);
    }

    //Load all stats from webstorage
    loadAll() {
        this.foraging.level = parseInt(localStorage.getItem("foragingLevel"));
        this.foraging.xp = parseInt(localStorage.getItem("foragingXP"));
        this.foraging.resource = parseInt(localStorage.getItem("foragingResource"));

        this.logging.level = parseInt(localStorage.getItem("loggingLevel"));
        this.logging.xp = parseInt(localStorage.getItem("loggingXP"));
        this.logging.resource = parseInt(localStorage.getItem("loggingResource"));

        this.fishing.level = parseInt(localStorage.getItem("fishingLevel"));
        this.fishing.xp = parseInt(localStorage.getItem("fishingXP"));
        this.fishing.resource = parseInt(localStorage.getItem("fishingResource"));

        this.mining.level = parseInt(localStorage.getItem("miningLevel"));
        this.mining.xp = parseInt(localStorage.getItem("miningXP"));
        this.mining.resource = parseInt(localStorage.getItem("miningResource"));

        this.alchemy.level = parseInt(localStorage.getItem("alchemyLevel"));
        this.alchemy.xp = parseInt(localStorage.getItem("alchemyXP"));
        this.alchemy.resource = parseInt(localStorage.getItem("alchemyResource"));

        this.armor.level = parseInt(localStorage.getItem("armorLevel"));
        this.armor.xp = parseInt(localStorage.getItem("armorXP"));

        this.weapon.level = parseInt(localStorage.getItem("weaponLevel"));
        this.weapon.xp = parseInt(localStorage.getItem("weaponXP"));

        this.combat.level = parseInt(localStorage.getItem("combatLevel"));
        this.combat.xp = parseInt(localStorage.getItem("combatXP"));

        this.player.hp = parseInt(localStorage.getItem("playerHP"));
        this.player.ap = parseInt(localStorage.getItem("playerAP"));
    }

    //Clear all session and saved stats
    ClearAll() {
        Window.localStorage.clear();
    }
}