import { cookies } from 'next/headers';
import { jwtVerify } from "jose";

export async function getAdminSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (token) {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
            return {
                role: payload.role,
                name: payload.name,
            };
        } catch (error) {
            console.error("JWT verification error:", error);
        }
    }
}