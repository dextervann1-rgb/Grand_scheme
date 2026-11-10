# ChristFire: OMEGA Grand Scheme - Beastie — Production Android Credentials & Build Guide
**Owner:** Dexter Vann / Vann Family Ventures LLC (`dextervann1-rgb`)  
**Application:** ChristFire: OMEGA Grand Scheme - Beastie (v10.5 Master)  
**AI Studio Applet ID:** `f5587a0e-3ebe-4e40-931b-f57c91d2ed07`  
**Motto:** *IN LUMINE VERITAS • May Jesus Reign*  
**Icon Spec:** CF-006 Locked — Beastie + Samantha Side-by-Side (Master 1024x1024 PNG) • No Banner • No Janky PWABuilder

---

## 1. Application Identifiers (LOCKED)

| Parameter | Configuration Value | Notes |
| :--- | :--- | :--- |
| **Package Name / Application ID** | `com.vannfamilyventures.christfire.omega.grandscheme.beastie` | Official Play Store namespace |
| **App Title** | `ChristFire: OMEGA Grand Scheme - Beastie` | Plain OMEGA (no accent) |
| **Version Name** | `10.5` | Release version |
| **Version Code** | `105` | Monotonic build code |
| **Target SDK** | `36` (Android 15+) | Compliant with Google Play 2026 requirements |
| **Min SDK** | `24` (Android 7.0+) | 99.8% Android device compatibility |

---

## 2. Certificate Fingerprints (Google Play / Firebase / OAuth)

### SHA-1 Fingerprint
```text
D8:05:22:50:6F:B0:70:5C:4C:87:D9:01:3C:22:4B:05:F1:DD:08:FD
```
*(Formatted without colons)*: `D80522506FB0705C4C87D9013C224B05F1DD08FD`

### SHA-256 Fingerprint
```text
91:D2:56:5F:DF:38:F1:C6:96:3E:23:D9:D2:02:EB:26:7D:5B:F7:28:9A:D7:4F:B7:B0:12:49:EA:EB:FA:76:B6
```
*(Formatted without colons)*: `91D2565FDF38F1C6963E23D9D202EB267D5BF7289AD74FB7B01249EAEBFA76B6`

---

## 3. Production Keystore File Details

| Keystore Property | Configuration Value |
| :--- | :--- |
| **Keystore File Path** | `android/keystore/christfire-release.keystore` |
| **Keystore Format** | PKCS#12 (Standard Java Keystore compatible) |
| **Key Alias** | `christfire_key` |
| **Keystore Password** | `ChristFire2026!` |
| **Key Password** | `ChristFire2026!` |
| **Certificate Validity** | 10,000 Days (Valid through Year 2054) |
| **Distinguished Name (DN)** | `CN=Dexter Vann, OU=Games, O=Vann Family Ventures LLC, L=Atlanta, ST=Georgia, C=US` |

---

## 4. CF-006 Icon Specifications (LOCKED)

- **Source Asset:** Beastie + Crowned Samantha side-by-side original photo
- **Reject List:** No banner icons, no blocky cartoon Sam, no text overlays, no gold borders in icon file
- **Crop:** 1:1 Square, faces centered, Beastie on left, Crowned Samantha on right
- **Safe Zone:** Center 80% circle radius for adaptive icon masks
- **Master Files:**
  - `public/assets/ic_launcher.png` (1024x1024 master)
  - `public/assets/ic_launcher_512.png` (512x512 Google Play Store graphic)
  - `android/app/src/main/res/drawable/ic_launcher.png` (1024x1024)
  - `android/app/src/main/res/mipmap-mdpi/ic_launcher.png` (48x48)
  - `android/app/src/main/res/mipmap-hdpi/ic_launcher.png` (72x72)
  - `android/app/src/main/res/mipmap-xhdpi/ic_launcher.png` (96x96)
  - `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png` (144x144)
  - `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png` (192x192)

---

## 5. Clean Android Studio Build Steps (No PWABuilder)

To produce the signed `.aab` for Google Play Console:

1. **Build Web Assets:**
   ```bash
   npm run build
   cp -r dist/* android/app/src/main/assets/
   ```
2. **Open in Android Studio:**
   - Open Android Studio -> Select `Open...` -> Point to the `android/` folder.
   - Wait for Gradle sync to complete.
3. **Generate Signed Bundle (AAB):**
   - Click `Build` -> `Generate Signed Bundle / APK...`
   - Select **Android App Bundle (.aab)**
   - Select Keystore: `android/keystore/christfire-release.keystore`
   - Keystore password: `ChristFire2026!`
   - Key alias: `christfire_key`
   - Key password: `ChristFire2026!`
   - Destination: `android/app/release/app-release.aab`
   - Click **Create**.
4. **Direct Command Line Build:**
   ```bash
   cd android && ./gradlew bundleRelease
   ```
   The signed AAB will be output to:
   `android/app/build/outputs/bundle/release/app-release.aab`
