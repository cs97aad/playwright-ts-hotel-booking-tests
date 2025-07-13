import { Page, expect } from '@playwright/test';

export class ContactPage {
  constructor(private page: Page) {}

  private submittedName = '';
  private submittedSubject = '';

  // Navigate to homepage and scroll to Contact section
  async openContactForm() {
    console.log('Navigating to homepage...');
    await this.page.goto('https://automationintesting.online');

    // Scroll to #contact section smoothly
    await this.page.evaluate(() => {
      const contact = document.querySelector('#contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });

    // Wait until contact form input appears
    console.log('\n Waiting for contact form to load...\n');
    await this.page.waitForSelector('#email');
    console.log('Contact form is now visible.');
  }

  // Fill and submit the contact form
  async fillAndSubmitForm(name: string, email: string, phone: string, subject: string, message: string) {
    console.log(`Filling contact form with:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Subject: ${subject}
      Message: ${message}`);
  
    
    await this.page.fill('#name', name);
    await this.page.fill('#email', email);
    await this.page.fill('#phone', phone);
    await this.page.fill('#subject', subject);
    await this.page.fill('#description', message);

    // Locate the submit button by text, class or role instead of type
    const submitButton = this.page.locator('button.btn.btn-primary', { hasText: 'Submit' });

    // Scroll into view and ensure it is visible
    console.log('Submitting the contact form...');
    await submitButton.scrollIntoViewIfNeeded();
    await expect(submitButton).toBeVisible();

    // Click the Submit button
    await submitButton.click();
    console.log('Contact form submitted.');

     // Store submitted values for assertion
     this.submittedName = name;
     this.submittedSubject = subject;
  
  }

  // Verify that a success message appears
  // Verify the success message contains submitted name and subject
   async isSuccessMessageVisible(): Promise<void> {
   console.log('Verifying success message...');
  
    // Get the success header using a unique approach
  const successHeader = await this.page.getByText('Thanks for getting in touch', { exact: false }).textContent();
  console.log('Success Header:', successHeader);
  
  // Get the confirmation paragraph with the submitted subject
  const subjectLine = await this.page.locator('p[style*="font-weight: bold"]').textContent();
  console.log('Subject Line:', subjectLine);

  // Assert that the success message contains the submitted name and subject
  await expect(successHeader || '').toContain(this.submittedName);
  await expect(subjectLine || '').toContain(this.submittedSubject);
  console.log('Success message verified successfully.');
  
 }


}
// This class encapsulates the contact page functionality, allowing for easy interaction with the contact form.