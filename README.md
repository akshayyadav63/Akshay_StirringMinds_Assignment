# StartupPerks - Exclusive SaaS Benefits Platform

StartupPerks is a premium platform designed for early-stage founders, indie hackers, and startup teams to access exclusive deals and credits on essential SaaS tools like AWS, Stripe, HubSpot, and more.

## 🚀 Application Flow

1.  **Discovery**: Users land on a high-fidelity landing page with a 3D interactive hero section. They can explore the marketplace without an account.
2.  **Authentication**: Users register or log in using JWT-based authentication to claim deals.
3.  **Marketplace**: A searchable and filterable list of deals. Deals are categorized into "Public" (available to all logged-in users) and "Restricted" (requires founder verification).
4.  **Claiming**: Users can view deal details and claim them. Claiming a "Restricted" deal is blocked unless the user has completed the verification process in their dashboard.
5.  **Dashboard**: A centralized hub where users can track their verification status, view their claimed perks, and see real-time status updates (Pending/Approved).

## 🔐 Auth & Authorization Strategy

*   **Authentication**: Implemented using **JWT (JSON Web Tokens)**. Upon login/register, the server issues a token stored in `localStorage` on the client.
*   **Persistent Session**: An `AuthContext` provider manages user state globally and attaches the JWT to the `Authorization` header for all API requests via Axios.
*   **Authorization**: Middleware on the backend protects routes. Specific logic in the `claimDeal` controller prevents unverified users from claiming gated benefits.

## 🛠️ Internal Flow: Claiming a Deal

1.  **Frontend**: User clicks "Claim Benefit". The system checks the deal's `accessLevel`.
2.  **Validation**: If the deal is restricted, it verifies the `user.isVerified` flag.
3.  **API Call**: A `POST` request is sent to `/api/deals/:id/claim`.
4.  **Backend Logic**: 
    *   Find the deal in MongoDB.
    *   Verify the user's session.
    *   Check for existing claims to prevent duplicates.
    *   If restricted, re-verify `user.isVerified` on the server for security.
5.  **Persistence**: A new `Claim` document is created with a `pending` status.
6.  **Update**: UI updates immediately using Framer Motion to show a success state.

## 💻 Tech Stack

*   **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Three.js (via React Three Fiber).
*   **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT.

## ⚠️ Known Limitations & PRODUCTION READINESS

*   **Verification Simulation**: In this version, "Verification" is a button click in the dashboard. For production, this would integrate with an ID provider or manual document review.
*   **Logo Hosting**: Currently uses SVG URLs. Production should use a CDN or S3 for partner logos.
*   **Scalability**: For hundreds of thousands of deals, MongoDB indexing on `category` and `partnerName` is already planned, but Redis caching for the main listing would be beneficial.
*   **Security**: Use HTTP-only cookies for JWT instead of `localStorage` for better XSS protection.

## ✨ UI/UX Considerations

*   **Aesthetics**: Uses a deep slate/indigo theme with glassmorphism for a modern "SaaS" feel.
*   **Animations**: Framer Motion handles page transitions, layout changes in filters, and micro-interactions on buttons/cards.
*   **Performance**: Next.js Image optimization and lazy-loading for the Three.js canvas ensure fast initial loads.

---
Created with ❤️ by Antigravity for the Startup Community.
