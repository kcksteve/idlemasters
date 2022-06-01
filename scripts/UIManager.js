//UI Manager - Handles calls from activities to update the ui, also handles transition between activity tabs
class UIManager {
    //vars
    #activityManager = null;
    #statManager = null;

    #navButtons = null;
    #navHamburger = null;
    #navButtonFishing = null;
    #navButtonForaging = null;
    #navButtonLogging = null;
    #navButtonMining = null;
    #navButtonAlchemy = null;
    #navButtonArmor = null;
    #navButtonWeapon = null;
    #navButtonCombat = null;

    #activityCards = null;
    #activityRewardList = null;
    #activityCostList = null;
    #activityStartButton = null;
    #activityLevelText = null;
    #activityXPText = null;
    #activityProgressBar = null;
    #activityTitle = null;
    #activityIcon = null;

    #activityProgressElapsed = null;
    #activityProgressDuration = null;
    #activityProgressTimeout = null;

    #inventoryFishingIcon = null;
    #inventoryFishingText = null;
    #inventoryAlchemyIcon = null;
    #inventoryAlchemyText = null;
    #inventoryForagingText = null;
    #inventoryLoggingText = null;
    #inventoryMiningText = null;

    #statsHealthText = null;
    #statsStaminaText = null;
    #statsWeaponsText = null;
    #statsArmorText = null;

    constructor() {
        //Instance check to ensure to stop creation of a second instance
        if (UIManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        UIManager.instance = this;
    }

    setup(activityManager, statManager) {
        //mangager reference
        this.#activityManager = activityManager;
        this.#statManager = statManager;

        //element references and listeners
        this.#navButtons = document.getElementById("navButtons");
        this.#navHamburger = document.getElementById("navHamburger");
        this.#navHamburger.addEventListener("click", this.navBarToggle);
        this.#navButtonFishing = document.getElementById("nav-button-fishing");
        this.#navButtonFishing.addEventListener("click",() => this.uiChangeTab("fishing"));
        this.#navButtonForaging = document.getElementById("nav-button-foraging");
        this.#navButtonForaging.addEventListener("click",() => this.uiChangeTab("foraging"));
        this.#navButtonLogging = document.getElementById("nav-button-logging");
        this.#navButtonLogging.addEventListener("click",() => this.uiChangeTab("logging"));
        this.#navButtonMining = document.getElementById("nav-button-mining");
        this.#navButtonMining.addEventListener("click",() => this.uiChangeTab("mining"));
        this.#navButtonAlchemy = document.getElementById("nav-button-alchemy");
        this.#navButtonAlchemy.addEventListener("click",() => this.uiChangeTab("alchemy"));
        this.#navButtonArmor = document.getElementById("nav-button-armor");
        this.#navButtonArmor.addEventListener("click",() => this.uiChangeTab("armor"));
        this.#navButtonWeapon = document.getElementById("nav-button-weapon");
        this.#navButtonWeapon.addEventListener("click",() => this.uiChangeTab("weapon"));
        this.#navButtonCombat = document.getElementById("nav-button-combat");
        this.#navButtonCombat.addEventListener("click",() => this.uiChangeTab("combat"));

        this.#activityCards = document.getElementById("activity-cards");
        this.#activityRewardList = document.getElementById("activity-reward-list");
        this.#activityCostList = document.getElementById("activity-cost-list");
        this.#activityStartButton = document.getElementById("activity-start");
        this.#activityStartButton.addEventListener("click", () => this.activityToggle());
        this.#activityLevelText = document.getElementById("activity-level");
        this.#activityXPText = document.getElementById("activity-xp");
        this.#activityProgressBar = document.getElementById("activity-progress");
        this.#activityTitle = document.getElementById("activity-title");
        this.#activityIcon = document.getElementById("activity-icon");

        this.#inventoryFishingIcon = document.getElementById("inventory-icon-fishing");
        this.#inventoryFishingIcon.addEventListener("click", () => this.#activityManager.playerEat());
        this.#inventoryFishingText = document.getElementById("inventory-text-fishing");
        this.#inventoryAlchemyIcon = document.getElementById("inventory-icon-alchemy");
        this.#inventoryAlchemyIcon.addEventListener("click", () => this.#activityManager.playerHeal());
        this.#inventoryAlchemyText = document.getElementById("inventory-text-alchemy");
        this.#inventoryForagingText = document.getElementById("inventory-text-foraging");
        this.#inventoryLoggingText = document.getElementById("inventory-text-logging");
        this.#inventoryMiningText = document.getElementById("inventory-text-mining");

        this.#statsHealthText = document.getElementById("stats-text-hp");
        this.#statsStaminaText = document.getElementById("stats-text-ap");
        this.#statsWeaponsText = document.getElementById("stats-text-weapons");
        this.#statsArmorText = document.getElementById("stats-text-armor");
    }

    activityToggle() {
        if (this.#activityManager.canStartActivity()) {
            if (this.#activityManager.timeout === null) {
                this.#activityManager.startActivity();
                this.#activityStartButton.innerHTML = "Stop";
            }
            else {
                this.#activityManager.stopActivity();
                this.#activityStartButton.innerHTML = "Start";
            }
        }
    }

    activityBarStart(duration) {
        this.activityBarReset();
        this.#activityProgressDuration = duration;
        this.#activityProgressElapsed = 1000;
        this.activityBarUpdate();
    }

    activityBarUpdate() {
        const progress = (this.#activityProgressElapsed / this.#activityProgressDuration) * 100;
        this.#activityProgressBar.setAttribute("style", "width: " + progress + "%")
        const tickDefault = 1000;
        let tick = 0;
        if (this.#activityProgressDuration - tickDefault > tickDefault) {
            tick = tickDefault;
            this.#activityProgressElapsed += tick;
            this.#activityProgressTimeout = setTimeout(() => this.activityBarUpdate(), tick);
        }
        else if (this.#activityProgressDuration - tickDefault > 0) {
            tick = tickDefault - this.#activityProgressDuration;
            this.#activityProgressElapsed += tick;
            this.#activityProgressTimeout = setTimeout(() => this.activityBarUpdate(), tick);
        }
    }

    activityBarReset() {
        if (this.#activityProgressTimeout != null) {
            clearTimeout(this.#activityProgressTimeout);
        }
        this.#activityProgressBar.setAttribute("style", "width: " + 0 + "%")
        this.#activityProgressElapsed = 0;
        this.#activityProgressDuration = 0;
    }

    uiUpdate() {
        let capitalize = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        let statFormat = (number, label) => {
            return label + " " + number + "/100"
        }

        let clearChildren =  (el) => {
            while (el.firstChild) {
                el.removeChild(el.lastChild);
              }
        }

        let addToList = (el, strings) => {
            for (const string of strings) {
                const listItem = document.createElement("li");
                listItem.innerHTML = string;
                el.appendChild(listItem);
            }
        }

        clearChildren(this.#activityRewardList);
        clearChildren(this.#activityCostList);

        switch (this.#activityManager.currentActivity) {
            case "foraging":
                this.#activityIcon.src = "images/btn-flower.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.foraging.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.foraging.xp, "XP");
                addToList(this.#activityRewardList, ["+XP", "+Herbs"]);
                addToList(this.#activityCostList, ["-Stamina"]);
                break;
            case "logging":
                this.#activityIcon.src = "images/btn-wood.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.logging.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.logging.xp, "XP");
                addToList(this.#activityRewardList, ["+XP", "+Wood"]);
                addToList(this.#activityCostList, ["-Stamina"]);
                break;
            case "fishing":
                this.#activityIcon.src = "images/btn-fish.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.fishing.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.fishing.xp, "XP");
                addToList(this.#activityRewardList, ["+XP", "+Fish"]);
                addToList(this.#activityCostList, ["Nothing"]);
                break;
            case "mining":
                this.#activityIcon.src = "images/btn-pickaxe.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.mining.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.mining.xp, "XP");
                addToList(this.#activityRewardList, ["+XP", "+Ore"]);
                addToList(this.#activityCostList, ["-Stamina"]);
                break;
            case "alchemy":
                this.#activityIcon.src = "images/btn-potion.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.alchemy.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.alchemy.xp, "XP");
                addToList(this.#activityRewardList, ["+XP", "+Health Potion"]);
                addToList(this.#activityCostList, ["-Stamina", "-Herbs", "-Wood"]);
                break;
            case "armor":
                this.#activityIcon.src = "images/btn-shield.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.armor.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.armor.xp, "XP");
                addToList(this.#activityRewardList, ["+XP"]);
                addToList(this.#activityCostList, ["-Stamina", "-Wood", "-Ore"]);
                break;
            case "weapon":
                this.#activityIcon.src = "images/btn-sword.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.weapon.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.weapon.xp, "XP");
                addToList(this.#activityRewardList, ["+XP"]);
                addToList(this.#activityCostList, ["-Stamina", "-Wood", "-Ore"]);
                break;
            case "combat":
                this.#activityIcon.src = "images/btn-skull.svg"
                this.#activityLevelText.innerHTML = statFormat(this.#statManager.combat.level, "LVL");
                this.#activityXPText.innerHTML = statFormat(this.#statManager.combat.xp, "XP");
                addToList(this.#activityRewardList, ["+XP"]);
                addToList(this.#activityCostList, ["-Stamina", "-Health"]);
                break;
        }

        if (this.#activityManager.canStartActivity()) {
            this.#activityStartButton.innerHTML = "Start";
        }
        else {
            this.#activityStartButton.innerHTML = "(Locked)";
        }

        this.#inventoryFishingText.innerHTML = this.#statManager.fishing.resource;
        this.#inventoryForagingText.innerHTML = this.#statManager.foraging.resource;
        this.#inventoryLoggingText.innerHTML = this.#statManager.logging.resource;
        this.#inventoryMiningText.innerHTML = this.#statManager.mining.resource;
        this.#inventoryAlchemyText.innerHTML = this.#statManager.alchemy.resource;
        this.#statsHealthText.innerHTML = statFormat(this.#statManager.player.hp, "Health");
        this.#statsStaminaText.innerHTML = statFormat(this.#statManager.player.ap, "Stamina");
        this.#statsWeaponsText.innerHTML = statFormat(this.#statManager.weapon.level, "Weapons");
        this.#statsArmorText.innerHTML = statFormat(this.#statManager.armor.level, "Armor");
        this.#activityTitle.innerHTML = capitalize(this.#activityManager.currentActivity);
    }

    uiChangeTab(activity) {
        if (activity != this.#activityManager.currentActivity) {
            this.#activityCards.classList.add("opacity-0");
            this.#activityManager.stopActivity();
            this.#activityManager.currentActivity = activity;
            this.#activityStartButton.innerHTML = "Start";
            this.uiUpdate();
            setTimeout(() => this.#activityCards.classList.remove("opacity-0"), 300);
        }
    }

    navBarToggle() {
        if (navButtons.classList.contains("d-none")) {
            navButtons.classList.remove("d-none");
            navButtons.classList.add("d-block");
        }
        else {
            navButtons.classList.add("d-none");
            navButtons.classList.remove("d-block");
        }
    }
}