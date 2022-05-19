//Activity Manager - Controls the activity loop. Singleton class.
class ActivityManager {
    currentActivity = null;
    #statManager = null;
    #timeout = null;
    #activityLength = 3000;
    #xpIncrement = 1;
    #apDecrement = 1;

    constructor(statManager) {
        //Instance check to ensure to stop creation of a second instance
        if (ActivityManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        ActivityManager.instance = this;

        //Ref to stat manager class
        this.statManager = statManager;
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
                    this.#timeout = setTimeout(this.#completeActivity, this.#activityLength);
                    //start activity bar
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
                    this.statManager.foraging.resource += this.statManager.foraging.level;
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
            //update ui
            this.#timeout = null;
            this.startActivity(this.currentActivity);
        }
    }

    stopActivity() {
        if (this.currentActivity != null) {
            this.currentActivity = null;
            clearTimeout(this.#timeout);
            this.#timeout = null;
            //reset activity bar
        }
    }
}