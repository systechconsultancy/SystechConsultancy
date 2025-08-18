"use server";
import { cookies } from 'next/headers';

export async function initiateWorkshopRegistration(workshopId) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) { // Check for refresh token, as it's the long-lived one
    return { success: false, error: 'Authentication required. Please log in.' };
  }

  try {
    // 1. Make the initial API call
    let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workshops/${workshopId}/initiate-registration`, {
      method: "POST",
      headers: { 'Cookie': `access_token=${accessToken}` },
    });

    // 2. If the access token is expired, try to refresh it
    if (response.status === 401) {
      console.log("Access token expired, attempting refresh...");
      
      const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Cookie': `refresh_token=${refreshToken}` }
      });

      if (!refreshRes.ok) {
        throw new Error("Your session has expired. Please log in again.");
      }

      // 3. Get the new access token from the response
      const newAccessTokenCookie = refreshRes.headers.get('set-cookie');
      const newAccessToken = newAccessTokenCookie?.split(';')[0].split('=')[1];
      
      if (!newAccessToken) {
        throw new Error("Failed to get new access token from refresh response.");
      }

      // 4. Update the cookie in the user's browser for the next requests
      cookieStore.set("access_token", newAccessToken, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 15 * 60 });
      
      // 5. Retry the original request with the NEW access token
      response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/workshops/${workshopId}/initiate-registration`, {
        method: "POST",
        headers: { 'Cookie': `access_token=${newAccessToken}` },
      });
    }

    const data = await response.json();
    if (!response.ok) {
      return { success: false, error: data.message || 'An error occurred.' };
    }

    return { success: true };

  } catch (error) {
    return { success: false, error: error.message };
  }
}