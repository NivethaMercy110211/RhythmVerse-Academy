# RhythmVerse Academy — Image Setup Script
# Double-click this file or right-click > Run with PowerShell

$src = "C:\Users\NIVETHA\.gemini\antigravity-ide\brain\f0015918-4b31-4cae-b93a-276176f1d2c2"
$base = "d:\RhythmVerse Academy\RhythmVerse Academy\assets\images"

# Create directories
New-Item -ItemType Directory -Force "$base\banners"    | Out-Null
New-Item -ItemType Directory -Force "$base\dance-styles" | Out-Null
New-Item -ItemType Directory -Force "$base\faculty"    | Out-Null
New-Item -ItemType Directory -Force "$base\auth"       | Out-Null

# BANNERS
Copy-Item "$src\banner_home1_1783056672315.png"     "$base\banners\banner-home1.png"         -Force
Copy-Item "$src\banner_home2_1783056683147.png"     "$base\banners\banner-home2.png"         -Force
Copy-Item "$src\banner_about_1783056693525.png"     "$base\banners\banner-about.png"         -Force
Copy-Item "$src\banner_dance_styles_1783056712348.png" "$base\banners\banner-dance-styles.png" -Force
Copy-Item "$src\banner_faculty_1783056722481.png"   "$base\banners\banner-faculty.png"       -Force
Copy-Item "$src\banner_events_1783056732638.png"    "$base\banners\banner-events.png"        -Force
Copy-Item "$src\banner_contact_1783056755860.png"   "$base\banners\banner-contact.png"       -Force

# DANCE STYLES
Copy-Item "$src\dance_classical_1783056807280.png"  "$base\dance-styles\classical.png"   -Force
Copy-Item "$src\dance_hiphop_1783056818172.png"     "$base\dance-styles\hiphop.png"      -Force
Copy-Item "$src\dance_western_1783056836871.png"    "$base\dance-styles\western.png"     -Force
Copy-Item "$src\dance_salsa_1783056847123.png"      "$base\dance-styles\salsa.png"       -Force
Copy-Item "$src\dance_contemporary_1783056857040.png" "$base\dance-styles\contemporary.png" -Force
Copy-Item "$src\dance_freestyle_1783056876037.png"  "$base\dance-styles\freestyle.png"   -Force

# FACULTY
Copy-Item "$src\faculty_1_1783056887015.png"        "$base\faculty\faculty-1.png"        -Force

# AUTH BACKGROUNDS
Copy-Item "$src\auth_login_bg_1783056766714.png"    "$base\auth\login-bg.png"    -Force
Copy-Item "$src\auth_signup_bg_1783056776031.png"   "$base\auth\signup-bg.png"   -Force
Copy-Item "$src\auth_forgot_bg_1783056796222.png"   "$base\auth\forgot-bg.png"   -Force

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  All images copied successfully!" -ForegroundColor Green
Write-Host "  RhythmVerse Academy is ready to open." -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to close"
