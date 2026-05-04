# Mining Equipment Marketplace

A premium, production-grade React Native mobile marketplace designed specifically for buying and selling used mining equipment, heavy vehicles, and industrial tools. 

This application features a dual-role interface, allowing **Buyers** to browse and inquire about equipment, and **Admins (Sellers)** to manage their inventory and process purchase inquiries seamlessly.

---

## 🚀 Features Implemented (MVP)

The current iteration of the application is a robust frontend showcase built to demonstrate the core workflow, UI/UX, and application state management.

### Buyer Experience
* **Marketplace Dashboard:** A clean, responsive grid layout for browsing available equipment.
* **Search & Filter UI:** Interface for searching specific tools or filtering by category.
* **Detailed Item View:** Professional gallery-style image viewing (no cropping restrictions) and detailed specifications.
* **Inquiry System:** Buyers can tap "Inquire to Buy" and provide their delivery location to instantly send a purchase request to the seller.

### Admin (Seller) Experience
* **Admin Dashboard:** Overview of active listings, new inquiry statistics, and category filtering.
* **Inventory Management:** Admins can easily edit existing listings (price, description, images) or delete them.
* **Unrestricted Image Uploads:** Integration with the native device gallery allowing full-size image uploads without forced square-cropping. Includes a quick "Change Image" feature.
* **Inquiries Hub:** A dedicated tab to view all incoming purchase requests and manage their fulfillment status (`Pending` ➔ `Processing` ➔ `Delivered`).

### UI/UX & Architecture
* **Premium Aesthetic:** Designed with a sleek "industrial" theme utilizing Caterpillar Yellow (`#FFB800`) and modern dark/light contrast elements.
* **State Management:** Fully functional local state management using React Context API to simulate database interactions.
* **Navigation:** Complex role-based routing using React Navigation (Stack & Bottom Tabs).

---

## 🚧 Roadmap: Transitioning to Production

The frontend foundation is complete. We are currently preparing to integrate the "heavy" backend architecture to transition this from a frontend showcase into a real-world, multi-vendor application.

### Upcoming Features:
1. **Authentication & Authorization (Supabase Auth)**
   * Secure email/password login.
   * Role-Based Access Control (RBAC) to ensure Admins and Buyers are routed correctly upon login.
2. **Database Integration (Supabase PostgreSQL)**
   * Moving from local memory to a cloud database.
   * **Multi-Vendor Architecture:** Ensuring that when an Admin logs in, they only see items they uploaded and inquiries sent directly to them.
3. **Admin Profiles & Settings**
   * Business profiles, logos, and verification badges for sellers.
4. **Real-Time Data (Supabase Realtime)**
   * Push notifications and instant dashboard updates when a buyer makes an inquiry.
5. **Advanced Uploads**
   * Multi-image carousels (3-5 images per item) and draft saving.

---

## 🛠️ Tech Stack
* **Framework:** [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/))
* **Navigation:** React Navigation (`native-stack`, `bottom-tabs`)
* **State Management:** React Context API
* **Icons:** `lucide-react-native`
* **Media:** `expo-image-picker`

---

## 💻 Running the App Locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npx expo start
   ```
4. Scan the QR code with the **Expo Go** app on your physical device (recommended for the best experience).
