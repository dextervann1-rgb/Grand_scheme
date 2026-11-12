@echo off
REM © 2026 Vann Family Ventures LLC | Dexter Vann / dextervann1-rgb
REM ChristFire: OMEGA Grand Scheme - Beastie (v10.5 Master Build)
REM IN LUMINE VERITAS • May Jesus Reign

echo ==========================================================
echo ✝️ ChristFire: OMEGA - Generating Release AAB (v10.5)
echo Package: com.vannfamilyventures.christfire.omega.grandscheme.beastie
echo Version: 10.5 (Code 105) ^| Target SDK 36
echo ==========================================================

call gradlew.bat bundleRelease

echo ==========================================================
echo ✅ SUCCESS! AAB Generated at:
echo    app\build\outputs\bundle\release\app-release.aab
echo    Upload this file directly to Google Play Console!
echo ==========================================================
pause
