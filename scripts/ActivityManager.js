//Activity Manager - Controls the activity loop. Singleton class.
class ActivityManager {
    currentActivity = null;
    #statManager = null;
    #uiManager = null;
    timeout = null;
    #activityMulti = 0.1;
    #xpIncrement = 1;
    #apDecrement = 1;
    #resourceMulti = 0.1;

    constructor(statManager, uiManager) {
        //Instance check to ensure to stop creation of a second instance
        if (ActivityManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        ActivityManager.instance = this;

        //Ref to stat manager class
        this.#statManager = statManager;

        //Ref to ui manager class
        this.#uiManager = uiManager;
        uiManager.setup(this, statManager);
    }

    canStartActivity() {
        switch (this.currentActivity) {
            case "foraging":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "logging":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "fishing":
                if (this.#statManager.player.hp > 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "mining":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "alchemy":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0 && this.#statManager.foraging.resource > 1 && this.#statManager.logging.resource > 1) {
                    return true;
                }
                else {
                    return false;
                }
            case "armor":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0 && this.#statManager.logging.resource > 1 && this.#statManager.mining.resource > 1) {
                    return true;
                }
                else {
                    return false;
                }
            case "weapons":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0 && this.#statManager.logging.resource > 1 && this.#statManager.mining.resource > 1) {
                    return true;
                }
                else {
                    return false;
                }
            case "combat":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0) {
                    return true;
                }
                else {
                    return false;
                }
            default:
                return false;
        }
    }

    //Start running a new activity if one is not running.
    startActivity() {
        if (this.timeout === null) {
            let activityTime;
            switch (this.currentActivity) {
                case "foraging":
                    activityTime = (12 - (this.#statManager.foraging.level * this.#activityMulti)) * 1000;
                    break;
                case "logging":
                    activityTime = (12 - (this.#statManager.logging.level * this.#activityMulti)) * 1000;
                    break;
                case "fishing":
                    activityTime = (12 - (this.#statManager.fishing.level * this.#activityMulti)) * 1000;
                    break;
                case "mining":
                    activityTime = (12 - (this.#statManager.mining.level * this.#activityMulti)) * 1000;
                    break;
                case "alchemy":
                    activityTime = (12 - (this.#statManager.alchemy.level * this.#activityMulti)) * 1000;
                    break;
                case "armor":
                    activityTime = (12 - (this.#statManager.armor.level * this.#activityMulti)) * 1000;
                    break;
                case "weapons":
                    activityTime = (12 - (this.#statManager.weapons.level * this.#activityMulti)) * 1000;
                    break;
                case "combat":
                    activityTime = (12 - (this.#statManager.combat.level * this.#activityMulti)) * 1000;
                    break;
            }
            this.timeout = setTimeout(() => this.#completeActivity(), activityTime + 1);
            this.#uiManager.activityBarStart(activityTime);
        }
    }

    //When an activity finishes
    #completeActivity() {
        if (this.currentActivity != null) {
            switch (this.currentActivity) {
                case "foraging":
                    if (this.#statManager.foraging.xp + this.#xpIncrement >= 100 && this.#statManager.foraging.level < 100) {
                        this.#statManager.foraging.xp = this.#xpIncrement;
                        this.#statManager.foraging.level += 1;
                    }
                    else if (this.#statManager.foraging.xp + this.#xpIncrement < 100 && this.#statManager.foraging.level < 100) {
                        this.#statManager.foraging.xp += this.#xpIncrement;
                    }
                    this.#statManager.foraging.resource += Math.floor(this.#resourceMulti * this.#statManager.foraging.level) + 1;
                    this.#statManager.player.ap -= this.#apDecrement;
                    break;
                case "logging":
                    if (this.#statManager.logging.xp + this.#xpIncrement >= 100 && this.#statManager.logging.level < 100) {
                        this.#statManager.logging.xp = this.#xpIncrement;
                        this.#statManager.logging.level += 1;
                    }
                    else if (this.#statManager.logging.xp + this.#xpIncrement < 100 && this.#statManager.logging.level < 100) {
                        this.#statManager.logging.xp += this.#xpIncrement;
                    }
                    this.#statManager.logging.resource += Math.floor(this.#resourceMulti * this.#statManager.logging.level) + 1;
                    this.#statManager.player.ap -= this.#apDecrement;
                    break;
                case "fishing":
                    if (this.#statManager.fishing.xp + this.#xpIncrement >= 100 && this.#statManager.fishing.level < 100) {
                        this.#statManager.fishing.xp = this.#xpIncrement;
                        this.#statManager.fishing.level += 1;
                    }
                    else if (this.#statManager.fishing.xp + this.#xpIncrement < 100 && this.#statManager.fishing.level < 100) {
                        this.#statManager.fishing.xp += this.#xpIncrement;
                    }
                    this.#statManager.fishing.resource += Math.floor(this.#resourceMulti * this.#statManager.fishing.level) + 1;
                    break;
                case "mining":
                    if (this.#statManager.mining.xp + this.#xpIncrement >= 100 && this.#statManager.mining.level < 100) {
                        this.#statManager.mining.xp = this.#xpIncrement;
                        this.#statManager.mining.level += 1;
                    }
                    else if (this.#statManager.mining.xp + this.#xpIncrement < 100 && this.#statManager.mining.level < 100) {
                        this.#statManager.mining.xp += this.#xpIncrement;
                    }
                    this.#statManager.mining.resource += Math.floor(this.#resourceMulti * this.#statManager.mining.level) + 1;
                    this.#statManager.player.ap -= this.#apDecrement;
                    break;
                case "alchemy":
                    if (this.#statManager.alchemy.xp + this.#xpIncrement >= 100 && this.#statManager.alchemy.level < 100) {
                        this.#statManager.alchemy.xp = this.#xpIncrement;
                        this.#statManager.alchemy.level += 1;
                    }
                    else if (this.#statManager.alchemy.xp + this.#xpIncrement < 100 && this.#statManager.alchemy.level < 100) {
                        this.#statManager.alchemy.xp += this.#xpIncrement;
                    }
                    this.#statManager.alchemy.resource += Math.floor(this.#resourceMulti * this.#statManager.alchemy.level) + 1;
                    this.#statManager.player.ap -= this.#apDecrement;
                    this.#statManager.foraging.resource -= 1;
                    this.#statManager.logging.resource -= 1;
                    break;
                case "armor":
                    if (this.#statManager.armor.xp + this.#xpIncrement >= 100 && this.#statManager.armor.level < 100) {
                        this.#statManager.armor.xp = this.#xpIncrement;
                        this.#statManager.armor.level += 1;
                    }
                    else if (this.#statManager.armor.xp + this.#xpIncrement < 100 && this.#statManager.armor.level < 100) {
                        this.#statManager.armor.xp += this.#xpIncrement;
                    }
                    this.#statManager.armor.resource += Math.floor(this.#resourceMulti * this.#statManager.armor.level) + 1;
                    this.#statManager.player.ap -= this.#apDecrement;
                    this.#statManager.mining.resource -= 1;
                    this.#statManager.logging.resource -= 1;
                    break;
                case "weapons":
                    if (this.#statManager.weapons.xp + this.#xpIncrement >= 100 && this.#statManager.weapons.level < 100) {
                        this.#statManager.weapons.xp = this.#xpIncrement;
                        this.#statManager.weapons.level += 1;
                    }
                    else if (this.#statManager.weapons.xp + this.#xpIncrement < 100 && this.#statManager.weapons.level < 100) {
                        this.#statManager.weapons.xp += this.#xpIncrement;
                    }
                    this.#statManager.weapons.resource += Math.floor(this.#resourceMulti * this.#statManager.weapons.level) + 1;
                    this.#statManager.player.ap -= this.#apDecrement;
                    this.#statManager.mining.resource -= 1;
                    this.#statManager.logging.resource -= 1;
                    break;
                case "combat":
                    if (this.#statManager.combat.xp + this.#xpIncrement >= 100 && this.#statManager.combat.level < 100) {
                        this.#statManager.combat.xp = this.#xpIncrement;
                        this.#statManager.combat.level += 1;
                    }
                    else if (this.#statManager.combat.xp + this.#xpIncrement < 100 && this.#statManager.combat.level < 100) {
                        this.#statManager.combat.xp += this.#xpIncrement;
                    }
                    this.#statManager.combat.resource += Math.floor(this.#resourceMulti * this.#statManager.combat.level) + 1;
                    this.#statManager.player.ap -= 5;
                    this.#statManager.player.hp -= 10;
                    break;
            }
            this.#uiManager.uiUpdate();
            //this.#statManager.saveAll();
            this.timeout = null;
            this.startActivity();
        }
    }

    stopActivity() {
        if (this.currentActivity != null) {
            //this.currentActivity = null;
            clearTimeout(this.timeout);
            this.timeout = null;
            this.#uiManager.activityBarReset();
        }
    }

    playerEat() {
        if (this.#statManager.fishing.resource >= 1 && this.#statManager.player.ap < 100) {
            this.#statManager.fishing.resource -= 1;
            if (this.#statManager.player.ap <= 90) {
                this.#statManager.player.ap += 10;
            }
            else {
                this.#statManager.player.ap = 100;
            }
            this.#uiManager.uiUpdate();
        }
    }

    playerHeal() {
        if (this.#statManager.alchemy.resource >= 1 && this.#statManager.player.hp < 100) {
            this.#statManager.alchemy.resource -= 1;
            if (this.#statManager.player.hp <= 90) {
                this.#statManager.player.hp += 10;
            }
            else {
                this.#statManager.player.hp = 100;
            }
            this.#uiManager.uiUpdate();
        }
    }
}