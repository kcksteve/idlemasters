//Manages the player stats. Saving, Loading, Clearing and accessing. Singleton class.
class StatManager {
    foraging = {level:0, xp:0, resource:0};
    logging = {level:0, xp:0, resource:0};
    fishing = {level:0, xp:0, resource:0};
    mining = {level:0, xp:0, resource:0};
    alchemy = {level:0, xp:0, resource:0};
    armor = {level:0, xp:0};
    weapon = {level:0, xp:0};
    combat = {level:0, xp:0};
    #allStats = [];

    constructor() {
        //Instance check to ensure to stop creation of a second instance
        if (StatManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        StatManager.instance = this;
        this.loadAll();
    }

    //Save all stats to web storage
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
    }

    //Load all stats from webstorage
    loadAll() {
        this.foraging.Level = parseInt(localStorage.getItem("foragingLevel"));
        this.foraging.Level = parseInt(localStorage.getItem("foragingXP"));
        this.foraging.Level = parseInt(localStorage.getItem("foragingResource"));

        this.logging.Level = parseInt(localStorage.getItem("loggingLevel"));
        this.logging.Level = parseInt(localStorage.getItem("loggingXP"));
        this.logging.Level = parseInt(localStorage.getItem("loggingResource"));

        this.fishing.Level = parseInt(localStorage.getItem("fishingLevel"));
        this.fishing.Level = parseInt(localStorage.getItem("fishingXP"));
        this.fishing.Level = parseInt(localStorage.getItem("fishingResource"));

        this.mining.Level = parseInt(localStorage.getItem("miningLevel"));
        this.mining.Level = parseInt(localStorage.getItem("miningXP"));
        this.mining.Level = parseInt(localStorage.getItem("miningResource"));

        this.alchemy.Level = parseInt(localStorage.getItem("alchemyLevel"));
        this.alchemy.Level = parseInt(localStorage.getItem("alchemyXP"));
        this.alchemy.Level = parseInt(localStorage.getItem("alchemyResource"));

        this.armor.Level = parseInt(localStorage.getItem("armorLevel"));
        this.armor.Level = parseInt(localStorage.getItem("armorXP"));
        this.armor.Level = parseInt(localStorage.getItem("armorResource"));

        this.weapon.Level = parseInt(localStorage.getItem("weaponLevel"));
        this.weapon.Level = parseInt(localStorage.getItem("weaponXP"));
        this.weapon.Level = parseInt(localStorage.getItem("weaponResource"));

        this.combat.Level = parseInt(localStorage.getItem("combatLevel"));
        this.combat.Level = parseInt(localStorage.getItem("combatXP"));
        this.combat.Level = parseInt(localStorage.getItem("combatResource"));
    }

    //Clear all session and saved stats
    ClearAll() {
        Window.localStorage.clear();
    }
}