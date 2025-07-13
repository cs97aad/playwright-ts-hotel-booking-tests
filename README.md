# 📘 Contact & Booking UI Automation with Playwright

##  Project Overview

This project automates user journey testing for the **Shady Meadows B&B** website using [Playwright](https://playwright.dev/), focusing on:
- Submitting messages via the Contact Us form
- Booking a room using the Booking form

The automation follows best practices using the **Page Object Model (POM)**, the **Faker.js** library for dynamic data, and includes logging and validation of key UI elements.

---

##  Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/cs97aad/playwright-ts-hotel-booking-tests.git
cd your-project
```

### 2. Install dependencies
Ensure you have Node.js (v18 or higher) installed.

```bash
npm install
```

### 3. Install Playwright browsers
```bash
npx playwright install
```

---

## Test Execution

### 1. Run all tests
```bash
npx playwright test
```

### 2. Run tests in headed mode for debugging
```bash
npx playwright test --headed
```

### 3. Run tests for a specific file
```bash
npx playwright test tests/contactForm.spec.ts
npx playwright test tests/bookingRoom.spec.ts
```

### 4. Show the last HTML report
```bash
npx playwright show-report
```

---

##  Testing Best Practices Used

###  Page Object Model (POM)
All locators and actions are encapsulated in dedicated page classes:
- `ContactPage.ts`
- `BookingPage.ts`

This ensures code reusability, clarity, and maintainability.

---

###  Data-Driven Testing
Randomised user data is generated using the `@faker-js/faker` package, which prevents test data collisions and simulates real-world input.

---

###  Console Logging
Each test step logs meaningful messages to the console using `console.log()` to improve test traceability and simplify debugging.

---

### Inline Waits & Assertions
- UI elements are waited on before interaction using `await page.waitForSelector` and `expect(...).toBeVisible()`
- Success messages are verified using `expect().toContain()` with actual values passed through from test input

---

### Clean Scroll & Visibility Checks
Smooth scrolling and `scrollIntoViewIfNeeded()` are used to ensure stable element interaction across various screen sizes.

---

##  Folder Structure

```
.
├── tests/
│   ├── contactForm.spec.ts
│   └── bookingRoom.spec.ts
├── pages/
│   ├── ContactPage.ts
│   └── BookingPage.ts
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Contact

Idris - cs97aad@yahoo.co.uk
