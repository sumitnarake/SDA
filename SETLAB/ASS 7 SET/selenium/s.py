from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time
import os
from dotenv import load_dotenv
load_dotenv()
# Initializing the driver for MS Edge Browser
driver = webdriver.Edge()
# Maximizing the window
driver.maximize_window()

# Going to BrowserStack Login page
# driver.get("https://www.browserstack.com/users/sign_in")
driver.get("http://10.10.16.15/submission/Login.aspx?ReturnUrl=%2fsubmission%2f")
# http://10.10.16.15/submission/Login.aspx?ReturnUrl=%2fsubmission%2f

time.sleep(2)
# Login Page Elements
username = driver.find_element(By.ID, "TextBox1")
password = driver.find_element(By.ID, "TextBox2")
login_btn = WebDriverWait(driver,
                          20).until(EC.element_to_be_clickable((By.NAME, "Button1")))
# accept_btn = WebDriverWait(driver,
#    20).until(EC.element_to_be_clickable((By.ID, "accept-cookie-notification-cross-icon")))
# Setting the values in login fields
username.send_keys(os.getenv("BROWSERSTACK_EMAIL"))
password.send_keys(os.getenv("BROWSERSTACK_PASSWORD"))
# Closing the cookies dialog
# ActionChains(driver).move_to_element(accept_btn).click().perform()
time.sleep(2)
# Logging in
ActionChains(driver).move_to_element(login_btn).click().perform()
time.sleep(5)
# Checking for successful login
# driver.get("http://10.10.16.15/submission")
actualUrl = "http://10.10.16.15/submission"

# actualUrl = "https://live.browserstack.com/dashboard"
expectedUrl = driver.current_url
if actualUrl in expectedUrl:
    print("\n[TEST CASE] Logged in Successfully!")
else:
    print("\n[TEST CASE] Error while logging in!")
