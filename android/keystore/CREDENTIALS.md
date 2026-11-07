# ChristFire: Omega Protocol — Production Android Credentials
**Owner:** Dexter Vann / Vann Family Ventures LLC  
**Application:** ChristFire: Omega Protocol (v9.1)  
**AI Studio Applet ID:** `f5587a0e-3ebe-4e40-931b-f57c91d2ed07`  

---

## 1. Application Identifiers

| Parameter | Value |
| :--- | :--- |
| **Applet ID (AI Studio)** | `f5587a0e-3ebe-4e40-931b-f57c91d2ed07` |
| **Android Package Name** | `com.vannfamilyventures.christfire` |
| **Alternate / Play Store ID** | `com.vannfamilyventures.christfire.omega` |
| **App Name** | `ChristFire: Omega Protocol` |

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

## 4. Gradle Signing Configuration (`android/app/build.gradle`)

```groovy
android {
    compileSdkVersion 36
    ...
    defaultConfig {
        applicationId "com.vannfamilyventures.christfire"
        minSdkVersion 24
        targetSdkVersion 36
        versionCode 1
        versionName "9.1.0"
    }

    signingConfigs {
        release {
            storeFile file("keystore/christfire-release.keystore")
            storePassword "ChristFire2026!"
            keyAlias "christfire_key"
            keyPassword "ChristFire2026!"
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

## 5. Inspection Command (Optional)
To verify the keystore using Java `keytool` on any local computer:
```bash
keytool -list -v -keystore android/keystore/christfire-release.keystore -alias christfire_key -storepass ChristFire2026!
```
