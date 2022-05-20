//Activity Manager - Controls the activity loop. Singleton class.
class ActivityManager {
    currentActivity = null;
    #statManager = null;
    #uiManager = null;
    #timeout = null;
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
        uiManager.setup(this);
    }

    canStartActivity(activity) {
        switch (activity) {
            case "foraging":
                if (this.#statManager.player.ap >= this.#apDecrement && this.#statManager.player.hp > 0) {
                    return true;
                }
                else {
                    return false;
                }
            case "logging":
                break;
            case "fishing":
                break;
            case "mining":
                break;
            case "alchemy":
                break;
            case "armor":
                break;
            case "weapons":
                break;
            case "combat":
                break;
        }
    }

    //Start running a new activity if one is not running.
    startActivity(activity) {
        if (this.#timeout === null) {
            switch (activity) {
                case "foraging":
                    let activityTime = 12 - (0.1 * this.#activityMulti);
                    this.#timeout = setTimeout(this.#completeActivity, activityTime);
                    this.#uiManager.activityBarStart(activityTime);
                    break;
                case "logging":
                    break;
                case "fishing":
                    break;
                case "mining":
                    break;
                case "alchemy":
                    break;
                case "armor":
                    break;
                case "weapons":
                    break;
                case "combat":
                    break;
            }
        }
    }

    //When an activity finishes
    #completeActivity() {
        if (this.currentActivity != null) {
            switch (this.currentActivity) {
                case "foraging":
                    if (this.statManager.foraging.xp + this.#xpIncrement >= 100 && this.statManager.foraging.level < 100) {
                        this.statManager.foraging.xp = this.#xpIncrement;
                        this.statManager.foraging.level += 1;
                    }
                    else if (this.statManager.foraging.xp + this.#xpIncrement < 100 && this.statManager.foraging.level < 100) {
                        this.statManager.foraging.xp = this.#xpIncrement;
                    }
                    this.statManager.foraging.resource += Math.floor(this.#resourceMulti * this.statManager.foraging.level) + 1;
                    this.statManager.player.ap -= this.#apDecrement;
                    break;
                case "logging":
                    break;
                case "fishing":
                    break;
                case "mining":
                    break;
                case "alchemy":
                    break;
                case "armor":
                    break;
                case "weapons":
                    break;
                case "combat":
                    break;
            }
            this.#uiManager.uiUpdate();
            this.#timeout = null;
            this.startActivity(this.currentActivity);
        }
    }

    stopActivity() {
        if (this.currentActivity != null) {
            this.currentActivity = null;
            clearTimeout(this.#timeout);
            this.#timeout = null;
            this.#uiManager.activityBarReset();
        }
    }
}