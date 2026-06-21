# Authentication — Product Requirements Document

## 1. Purpose

The Authentication module handles account creation, login, email verification, and password recovery. It establishes secure access to the CEven admin portal and manages user sessions.

---

## 2. Screens

### 2.1 Login Page
**Layout:** Split-panel — left side has the login form (white background), right side has a branded illustration on a dark brown panel.

**Left Panel (Form):**
- Greeting: "Stay Connected" with a friendly subtext
- Email address input
- Password input with show/hide toggle
- "Remember Me" checkbox
- "Forgot Password?" link
- "Log in" primary button (full width)
- Social authentication options: Google and Apple buttons
- Footer: "Don't have an account? Get Started" — links to signup

**Right Panel (Illustration):**
- CEven logo at top
- Centered illustration graphic
- Heading: "Welcome back, Care Champion!"
- Subtext about managing parent requests

### 2.2 Signup Page
**Layout:** Split-panel — reversed from login (illustration left, form right).

**Form Panel:**
- Heading: "Welcome to CEven" with wave emoji
- Creche name input
- Email address input
- Password input with 3-segment strength meter (fills green as criteria are met)
- Password hint: "Must contain 1 uppercase letter, 1 number or symbol, min. 8 characters"
- Confirm password input
- Terms of Service and Privacy Policy checkbox (required)
- "Get Started" primary button
- Social authentication: Google and Apple
- Footer: "Already have an account? Log in"

### 2.3 Email Verification (OTP)
**Layout:** Split-panel with illustration and form.

- Heading: "Check your Email"
- Subtext: "We've sent a one time OTP to your email [email address]"
- 4-digit OTP input (individual digit boxes that auto-advance on entry)
- Countdown timer (66 seconds) before resend becomes available
- "Get Started" primary button
- Back button

### 2.4 Password Reset Request
- Heading: "Password Reset"
- Subtext: "No worries, we'll send you reset instructions."
- Email address input
- "Continue" primary button

### 2.5 Password Reset OTP Verification
- Same OTP interface as email verification
- Navigates to new password screen on success

### 2.6 New Password
- Heading: "Password Reset"
- Subtext: "Set your new password to complete the reset."
- New password input with strength meter
- Confirm password input
- Error message area
- "Reset password" primary button
- Back button

### 2.7 Loading State
- Skeleton placeholder matching the split-panel layout with pulsing animation

---

## 3. User Flows

### 3.1 First-Time Signup
1. User clicks "Get Started" from login page → arrives at signup
2. Fills in creche name, email, password, confirms password
3. Accepts terms → clicks "Get Started"
4. Redirected to email verification OTP screen
5. Enters 4-digit code received via email
6. Account created → redirected to dashboard

### 3.2 Returning User Login
1. User enters email and password
2. Clicks "Log in"
3. Session is established → redirected to dashboard

### 3.3 Forgot Password
1. User clicks "Forgot Password?" on login screen
2. Enters email address → clicks "Continue"
3. Receives OTP via email
4. Enters OTP → verified
5. Sets new password → redirected to login

### 3.4 Session Behavior
- Authenticated users visiting login/signup are redirected to the dashboard
- Unauthenticated users are redirected to the login page
- Logging out clears the session and returns to login

---

## 4. Interactive Elements

| Element | Behavior |
|---|---|
| Password visibility toggle | Shows/hides password text with eye icon |
| Password strength meter | 3-segment bar that fills green as criteria are met (length ≥ 8, uppercase, digit/symbol) |
| OTP input | Individual digit boxes with auto-focus advance on entry |
| OTP countdown | 66-second timer before resend becomes available |
| Remember Me | Checkbox that persists login preference |
| Social auth buttons | Google and Apple branded buttons (UI only — no real OAuth) |
| Terms checkbox | Must be checked before signup proceeds |

---

## 5. Design Details

- All auth pages use the split-panel layout with branded illustrations on the left and forms on the right
- Illustrations are themed: family illustration for signup, person illustration for login, lock/key illustration for password reset
- Form inputs use consistent styling: rounded borders, brand-colored focus states, placeholder text
- Error messages appear inline below form fields
- Loading states use skeleton animations matching the page layout

---

## 6. User Stories & Acceptance Criteria

### US-1: Admin Creates an Account
**As a** crèche administrator,  
**I want to** create a new CEven account with my creche name, email, and password,  
**so that** I can access the platform and manage my crèche.

**Acceptance Criteria:**
- [ ] Signup form collects creche name, email, password, and confirm password
- [ ] Password strength meter updates in real time as the user types
- [ ] Password must contain at least 8 characters, 1 uppercase letter, and 1 number or symbol
- [ ] Terms of Service checkbox must be checked before submission is allowed
- [ ] On successful signup, user is redirected to email verification OTP screen
- [ ] User receives a 4-digit OTP via email (simulated)
- [ ] After OTP verification, account is created and user is redirected to the dashboard
- [ ] Social auth buttons (Google, Apple) are visible but do not perform real authentication

---

### US-2: Admin Logs In
**As a** returning crèche administrator,  
**I want to** log in with my email and password,  
**so that** I can access my crèche dashboard.

**Acceptance Criteria:**
- [ ] Login form collects email and password
- [ ] Password field has a show/hide toggle
- [ ] "Remember Me" checkbox persists login preference
- [ ] On successful login, session is established and user is redirected to the dashboard
- [ ] "Forgot Password?" link navigates to the password reset flow
- [ ] "Don't have an account? Get Started" link navigates to signup
- [ ] An authenticated user visiting the login page is automatically redirected to the dashboard

---

### US-3: Admin Resets Password
**As a** crèche administrator who has forgotten my password,  
**I want to** reset my password via email verification,  
**so that** I can regain access to my account.

**Acceptance Criteria:**
- [ ] User can enter their email address on the password reset request screen
- [ ] After submission, user receives a 4-digit OTP via email (simulated)
- [ ] OTP input auto-advances focus between digit boxes
- [ ] Resend code button becomes available after a 66-second countdown
- [ ] After OTP verification, user is prompted to enter a new password
- [ ] New password must meet strength requirements (same as signup)
- [ ] After successful reset, user is redirected to the login page
- [ ] User can navigate back to the previous step at any point

---

### US-4: Admin Logs Out
**As a** crèche administrator,  
**I want to** log out of my account,  
**so that** my session is securely terminated.

**Acceptance Criteria:**
- [ ] Logout button is accessible from the top bar on all admin pages
- [ ] Clicking logout clears the session
- [ ] After logout, user is redirected to the login page
- [ ] Attempting to access any admin page after logout redirects to the login page

---

### US-5: System Enforces Session Security
**As a** platform administrator,  
**I want** unauthenticated users to be blocked from accessing admin pages,  
**so that** the crèche data remains secure.

**Acceptance Criteria:**
- [ ] Any attempt to access an admin page without a valid session redirects to the login page
- [ ] Any attempt to access login/signup with a valid session redirects to the dashboard
- [ ] Session is stored securely (httpOnly cookie)
- [ ] Logout completely clears the session cookie

- No real OAuth integration — Google and Apple buttons are UI-only
- No actual email delivery for OTP codes
- No rate limiting on login attempts
- No JWT or token-based authentication — uses a simple cookie flag
- No multi-factor authentication beyond OTP
- No role-based access control beyond basic admin
- No session expiry or timeout mechanism
- No account lockout after failed attempts
