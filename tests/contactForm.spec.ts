import { test } from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';
import { faker } from '@faker-js/faker';

test('Send Contact Us message successfully', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Generate random data using faker
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const phone = '07' + faker.string.numeric(9);
  const subject = faker.lorem.words(3);
  const message = faker.lorem.sentences(2);

  // Navigate to the contact form
  await contactPage.openContactForm();

  // Fill in the form and submit
  await contactPage.fillAndSubmitForm(name, email, phone, subject, message);

  // Verify success message
  await contactPage.isSuccessMessageVisible();
});
