import { Page, expect } from '@playwright/test';

export class BookingPage {
  constructor(private page: Page) {}

  // Navigate to the homepage
  async navigate() {
    console.log('Navigating to homepage...');
    await this.page.goto('https://automationintesting.online');
  }

  // Scroll down to the "Our Rooms" section
async goToRoomsSection() {
  // Scroll to the section directly using DOM API
  await this.page.evaluate(() => {
    const roomsSection = document.querySelector('#rooms');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  console.log(' Waiting for room cards to load...');

  // Wait for the first room card to appear and scroll it into view
  await this.page.waitForSelector('.room-card');
  await this.page.locator('.room-card').first().scrollIntoViewIfNeeded();
  // Verify that the room card is visible
  await expect(this.page.locator('.room-card').first()).toBeVisible();
}

  // Book the first room by clicking "Book now"
  async bookFirstRoom() {
    console.log(' Clicking "Book now" on the first available room...');
    const firstBookNow = this.page.locator('.room-card >> text=Book now').first();
    await firstBookNow.scrollIntoViewIfNeeded();
    await firstBookNow.click();
    console.log(' Navigated to booking form page.');
  }

    // Click the initial "Reserve Now" button to access the booking form
   async clickReserveNow() {
    console.log(' Clicking "Reserve Now" button...');

    const reserveNowButton = this.page.locator('button#doReservation');
    await reserveNowButton.scrollIntoViewIfNeeded();
    await expect(reserveNowButton).toBeVisible();
    await reserveNowButton.click();
    console.log(' Reserve Now button clicked, booking form should be visible now.');
  }

  // Fill in the booking form with generated user data
async fillBookingForm(firstName: string, lastName: string, email: string, phone: string) {
   console.log(`Filling booking form with:
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}`);
    
       // Fill each field in the form
    await this.page.fill('input[name="firstname"]', firstName);
    await this.page.fill('input[name="lastname"]', lastName);
    await this.page.fill('input[name="email"]', email);
    await this.page.fill('input[name="phone"]', phone);

    // Wait for button and click it
    const reserveNowButton = this.page.getByRole('button', { name: 'Reserve Now' });
    await expect(reserveNowButton).toBeVisible();
    await reserveNowButton.click();
    console.log('Booking form submitted.');
  }

  // Check if the booking was successful by verifying that a room is marked as booked
  async isBookingSuccessful() {
    console.log(' Checking if booking was successful...');
    return this.page.locator('.room .booked').first().isVisible();
  }
}


// This class encapsulates the booking page functionality, allowing for easy interaction with the booking form.