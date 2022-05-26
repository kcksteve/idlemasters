//UI Manager - Handles calls from activities to update the ui, also handles transition between activity tabs
class UIManager {
    //vars
    #activityManager = null;
    #navButtons = null;
    #navHamburger = null;

    constructor() {
        //Instance check to ensure to stop creation of a second instance
        if (UIManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        UIManager.instance = this;
    }

    setup(activityManager) {
        //activity mangager reference
        this.#activityManager = activityManager;

        //nav element refernces and toggle listener
        this.#navButtons = document.getElementById("navButtons");
        this.#navHamburger = document.getElementById("navHamburger");
        this.#navHamburger.addEventListener("click", this.navBarToggle);
    }

    activityBarStart() {

    }

    activtyBarReset() {

    }

    uiUpdate() {

    }

    uiChangeTab() {

    }

    navBarToggle = () => {
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