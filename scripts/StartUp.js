let statManager = new StatManager();
let uiManager = new UIManager();
let activityManager = new ActivityManager(statManager, uiManager);
activityManager.currentActivity = "fishing";
uiManager.uiUpdate();
uiManager.activityBarReset();
uiManager.welcomeShow();