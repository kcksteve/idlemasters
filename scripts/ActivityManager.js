//Activity Manager - Controls the activity loop. Singleton class.
class ActivityManager {
    currentActivity = null;
    #timeout = null;
    #activityLength = 3000;
    #xpIncrement = 1;

    constructor() {
        //Instance check to ensure to stop creation of a second instance
        if (ActivityManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        ActivityManager.instance = this;
    }

    //Start running a new activity if one is not running.
    startActivity(activity) {
        if (this.#timeout === null) {
            switch (activity) {
                case "foraging":
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
                    if (StatManager.foraging.xp + this.#xpIncrement >= 100 && StatManager.foraging.level < 100) {
                        StatManager.foraging.xp = this.#xpIncrement;
                        StatManager.foraging.level += 1;
                    }
                    else if (StatManager.foraging.xp + this.#xpIncrement < 100 && StatManager.foraging.level < 100) {
                        StatManager.foraging.xp = this.#xpIncrement;
                    }
                    StatManager.foraging.resource += StatManager.foraging.level;
                    //-Stamina
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
            this.#timeout = null;
            this.startActivity(this.currentActivity);
        }
    }

    stopActivity() {
        if (this.currentActivity != null) {
            this.currentActivity = null;
            clearTimeout(this.#timeout);
            this.#timeout = null;
        }
    }
}