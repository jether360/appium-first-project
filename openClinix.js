const { remote } = require("webdriverio");

//Authentication Test

const capabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": process.env.APPIUM_DEVICE_NAME || "nnh6o7vco7amongy",
  "appium:appPackage": "com.aquila.clinix_plus_app", 
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
    console.log("Clinix plus app opened successfully!");

    // Wait for a few seconds to allow the app to load
    await driver.pause(5000);

    const emailField = await driver.$('//android.widget.EditText[contains(@text, "email")]');
    if (await emailField.isExisting()) {
      await emailField.setValue("balabagnojether@gmail.com");
      console.log("Email field filled.");
    } else {
      console.warn("Email field not found.");
    }

    const passwordField = await driver.$('//android.widget.EditText[contains(@text, "password")]');
    if (await passwordField.isExisting()) {
      await passwordField.setValue("Pa$$w0rd");
      console.log("Password field filled.");
    } else {
      console.warn("Password field not found.");
    }
    
    const loginButton = await driver.$('//android.widget.TextView[contains(@text, "LOG IN")]');
    if (await loginButton.isExisting()) {
      await loginButton.click();
      console.log("Login button clicked.");
    } else {
      console.warn("Login button not found.");
    }

  } catch (error) {
    console.error("Test execution failed:", error);
  // } finally {
  //   if (driver) {
  //     await driver.pause(1000);
  //     await driver.deleteSession();
  //     console.log("Session closed.");
  //   }
  }
}

runTest().catch(console.error);
