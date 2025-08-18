import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from "../../utils/emailUtils.js";

// Helper to generate tokens
const generateTokens = async (res, userId, rememberMe = false) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30m' });
  const refreshTokenExpiry = rememberMe ? '30d' : '1d';
  const refreshTokenMaxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiry });

  // Store refresh token in database (for security)
  await User.findByIdAndUpdate(userId, { refreshToken });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    domain: process.env.NODE_ENV === "production" ? ".systechconsultancy.in" : "localhost",
  };

  res.cookie('access_token', accessToken, {
    ...cookieOptions,
    maxAge: 30 * 60 * 1000,
  });
  res.cookie('refresh_token', refreshToken, {
    ...cookieOptions,
    maxAge: refreshTokenMaxAge,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'An user with this email already exists' });

  const user = await User.create({ name, email, password, phone });
  await generateTokens(res, user._id);
  res.status(201).json({ id: user._id, name: user.name, email: user.email, phone: user.phone });
};

export const loginUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    await generateTokens(res, user._id, rememberMe);
    res.status(200).json({ id: user._id, name: user.name, email: user.email, phone: user.phone });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await User.findOneAndUpdate({ refreshToken: req.cookies.refresh_token }, { refreshToken: null });

    res.cookie('access_token', '', {
      httpOnly: true,
      expires: new Date(0), // Set to a past date to expire immediately
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.cookie('refresh_token', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during logout' });
  }
}

export const refreshToken = async (req, res) => {
  let refreshToken = null;
  refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

  try {
    const { id } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Forbidden: Invalid refresh token." });
    }

    // Generate a new, short-lived access token
    const newAccessToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Send the new access token back
    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: 'Token refreshed' });
  } catch (error) {
    return res.status(403).json({ message: "Refresh token is invalid or expired" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      // Important: Send a generic success message even if user not found
      // This prevents attackers from checking which emails are registered.
      return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    // 1. Generate a random, unhashed token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash the token before saving it to the database
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 3. Set an expiration time (e.g., 10 minutes)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 4. Send the un-hashed token to the user's email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const emailHtml = `
      <div style="max-width: 600px; margin: 0 auto; padding: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; color: #111827; border: 1px solid #e5e7eb; border-radius: 8px; line-height: 1.6;">
        <header style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
          <h2 style="margin: 0; color: #1e3a8a;">Systech Consultancy</h2>
        </header>

        <main style="margin-top: 24px;">
          <p>Dear ${user.name},</p>

          <p>We received a request to reset the password for your <strong>Systech Consultancy</strong> account.</p>

          <p>If you made this request, please click the button below to reset your password. This link will remain valid for <strong>10 minutes</strong>.</p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px;">
              Reset Your Password
            </a>
          </div>

          <p>If you did not request this change, you can safely ignore this email. Your account remains secure.</p>

          <p style="margin-top: 32px;">Need help? Reach out to us at <a href="mailto:support@systechconsultancy.in" style="color: #2563eb;">support@systechconsultancy.in</a>.</p>

          <p>Regards,</p>
          <p><strong>Systech Consultancy Team</strong></p>
        </main>

        <footer style="margin-top: 40px; font-size: 12px; text-align: center; color: #6b7280;">
          <p>&copy; ${new Date().getFullYear()} Systech Consultancy. All rights reserved.</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: emailHtml,
      fromName: "Account Recovery – Systech Consultancy",
    });

    res.json({ message: 'If a user with that email exists, a password reset link has been sent.' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Reset a user's password
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    // 1. Hash the incoming token to match the one in the database
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // 2. Find the user by the hashed token and check if it's expired
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    const isSamePassword = await user.matchPassword(password);
    if (isSamePassword) {
      return res.status(400).json({ message: "New password cannot be the same as the old password." });
    }

    // 3. If the token is valid, update the password
    user.password = password;
    // Clear the reset token fields
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const emailHtml = `
      <div style="max-width: 600px; margin: 0 auto; padding: 24px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9fafb; color: #111827; border: 1px solid #e5e7eb; border-radius: 8px; line-height: 1.6;">
        <header style="text-align: center; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
          <h2 style="margin: 0; color: #1e3a8a;">Systech Consultancy</h2>
        </header>
        <main style="margin-top: 24px;">
          <p>Dear ${user.name},</p>
          <p>This is a confirmation that the password for your <strong>Systech Consultancy</strong> account was successfully changed.</p>

          <h3 style="margin-top: 32px; color: #1e293b; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            Didn't request this change?
          </h3>
          <p>If you did not authorize this password change, we strongly recommend taking the following actions immediately:</p>
          <ol style="padding-left: 20px; margin-top: 12px;">
            <li style="margin-bottom: 16px;">
              <a href="${process.env.FRONTEND_URL}/forgot-password"
                style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; text-align: center;">
                Reset Your Password
              </a>
            </li>
            <li style="margin-bottom: 8px;">
              Check your email and device activity for any unauthorized access.
            </li>
            <li>
              Contact our support team at <a href="mailto:support@systechconsultancy.in" style="color: #2563eb;">support@systechconsultancy.in</a> for further assistance.
            </li>
          </ol>

          <h3 style="margin-top: 32px; color: #1e293b; font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">
            Password Security Tips
          </h3>
          <ul style="padding-left: 20px; margin-top: 12px;">
            <li style="margin-bottom: 6px;">Use a unique password not used on other platforms.</li>
            <li style="margin-bottom: 6px;">Avoid sharing your login credentials with anyone.</li>
            <li>Use a trusted password manager for storing and generating strong passwords.</li>
          </ul>

          <p>Regards,</p>
          <p><strong>Systech Consultancy</strong></p>
        </main>
        <footer style="margin-top: 40px; font-size: 12px; text-align: center; color: #6b7280;">
          <p>&copy; ${new Date().getFullYear()} Systech Consultancy. All rights reserved.</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: 'Your Password Has Been Changed',
      html: emailHtml,
      fromName: "Security Update - Systech Consultancy",
    })

    res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};