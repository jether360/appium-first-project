const { remote } = require("webdriverio");

const capabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": process.env.APPIUM_DEVICE_NAME || "nnh6o7vco7amongy",
  "appium:appPackage": "com.android.settings",
  "appium:appActivity": ".Settings",
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || "localhost",
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  path: "/wd/hub",
  logLevel: "info",
  capabilities,
};

async function runTest() {
  let driver;
  try {
    driver = await remote(wdOpts);
    console.log("Session started successfully!");

    // Try to locate the battery setting
    let batteryItem = await driver.$('//android.widget.TextView[contains(@text, "Battery")]');

    if (!(await batteryItem.isExisting())) {
      console.log("Battery option not visible. Scrolling...");
      await driver.execute("mobile: scroll", { strategy: "accessibility id", selector: "Battery" });
      batteryItem = await driver.$('//android.widget.TextView[contains(@text, "Battery")]');
    }

    if (await batteryItem.isExisting()) {
      await batteryItem.click();
      console.log("Battery settings opened.");
    } else {
      console.warn("Battery option not found.");
    }

  } catch (error) {
    console.error("Test execution failed:", error);
  } finally {
    if (driver) {
      await driver.pause(1000);
      await driver.deleteSession();
      console.log("Session closed.");
    }
  }
}

runTest().catch(console.error);
