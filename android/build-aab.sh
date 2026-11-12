#!/usr/bin/env bash
# © 2026 Vann Family Ventures LLC | Dexter Vann / dextervann1-rgb
# ChristFire: OMEGA Grand Scheme - Beastie (v10.5 Master Build)
# IN LUMINE VERITAS • May Jesus Reign

set -e

echo "=========================================================="
echo "✝️ ChristFire: OMEGA — Generating Release AAB (v10.5)"
echo "Package: com.vannfamilyventures.christfire.omega.grandscheme.beastie"
echo "Version: 10.5 (Code 105) | Target SDK 36"
echo "=========================================================="

if command -v gradlew &> /dev/null; then
    GRADLE_CMD="./gradlew"
elif command -v gradle &> /dev/null; then
    GRADLE_CMD="gradle"
else
    echo "⚠️ Gradle not found in PATH. Please open the android/ folder in Android Studio"
    echo "   and click: Build > Generate Signed Bundle / APK > Android App Bundle (.aab)"
    exit 1
fi

$GRADLE_CMD bundleRelease

echo "=========================================================="
echo "✅ SUCCESS! AAB Generated at:"
echo "   app/build/outputs/bundle/release/app-release.aab"
echo "   Upload this file directly to Google Play Console!"
echo "=========================================================="
