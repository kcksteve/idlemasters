//UI Manager - Handles calls from activities to update the ui, also handles transition between activity tabs
class UIManager {
    //vars
    #activityManager = null;

    constructor() {
        //Instance check to ensure to stop creation of a second instance
        if (UIManager.instance) {
            throw new Error("Singleton classes can only be instantiated once.")
        }
        UIManager.instance = this;
    }

    setup() {

    }

    activityBarStart() {

    }

    activtyBarReset() {

    }

    uiUpdate() {

    }

    uiChangeTab() {

    }
}