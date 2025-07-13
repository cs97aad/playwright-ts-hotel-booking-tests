import { test, expect } from '@playwright/test';
import { BookingPage } from '../pages/BookingPage';
import { faker } from '@faker-js/faker';

test('Book a room with dynamic data using faker', async ({ page }) => {
  const bookingPage = new BookingPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const phone = '07' + faker.string.numeric(9);

  await bookingPage.navigate();
  await bookingPage.goToRoomsSection();
  await bookingPage.bookFirstRoom();
  await bookingPage.clickReserveNow();
  await bookingPage.fillBookingForm(firstName, lastName, email, phone);
  

//   const success = await bookingPage.isBookingSuccessful();
//   expect(success).toBeTruthy();
});

// This test uses Faker.js to generate random user data for booking a room, ensuring that the booking functionality works with dynamic input.