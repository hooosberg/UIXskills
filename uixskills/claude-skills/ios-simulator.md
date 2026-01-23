# iOS Simulator Skill

Claude Code skill for iOS app building, navigation, and testing through automation with Xcode simulator.

## Overview

| Field | Value |
|-------|-------|
| Category | claude-skills |
| Tech Base | Claude Code + Xcode |
| Source | [Community](https://github.com/conorluddy/ios-simulator-skill) |
| License | MIT |
| Dependencies | Xcode, xcrun, simctl |

## Purpose

A Claude Code skill for automating iOS app development workflows including launching simulators, taking screenshots, simulating interactions, and running tests.

## Installation

```bash
git clone https://github.com/conorluddy/ios-simulator-skill.git ~/.claude/skills/ios-simulator
```

## Commands

### Launch Simulator

```bash
# List available simulators
xcrun simctl list devices

# Boot specific device
xcrun simctl boot "iPhone 15 Pro"

# Open Simulator app
open -a Simulator
```

### Take Screenshot

```bash
# Save screenshot to desktop
xcrun simctl io booted screenshot ~/Desktop/screenshot.png

# With timestamp
xcrun simctl io booted screenshot ~/Desktop/screenshot_$(date +%Y%m%d_%H%M%S).png
```

### Record Video

```bash
# Start recording
xcrun simctl io booted recordVideo ~/Desktop/recording.mov

# Press Ctrl+C to stop
```

### Install & Launch App

```bash
# Install app
xcrun simctl install booted /path/to/MyApp.app

# Launch app
xcrun simctl launch booted com.example.myapp

# Terminate app
xcrun simctl terminate booted com.example.myapp
```

### Simulate Interactions

```bash
# Tap at coordinates
xcrun simctl io booted input tap 200 400

# Type text
xcrun simctl io booted input text "Hello World"

# Press home button
xcrun simctl io booted input home
```

### Run Tests

```bash
xcodebuild test \
  -project MyApp.xcodeproj \
  -scheme MyApp \
  -destination 'platform=iOS Simulator,name=iPhone 15 Pro'
```

## SKILL.md Content

```markdown
# iOS Simulator Automation

You are an expert at iOS development and simulator automation.

## Capabilities

1. **Simulator Lifecycle**: Boot, shutdown, reset simulators
2. **App Management**: Install, launch, terminate apps
3. **UI Automation**: Tap, swipe, type interactions
4. **Debugging**: Take screenshots, record videos
5. **Testing**: Run XCTest suites

## Common Workflows

### Quick Debug Cycle
1. Build app with xcodebuild
2. Install on simulator
3. Launch and take screenshot
4. Check for visual issues

### Automated Testing
1. Boot clean simulator
2. Install app
3. Run test suite
4. Capture results and screenshots
5. Shutdown simulator

## Best Practices

- Use `booted` to target running simulator
- Always check `xcrun simctl list` for device names
- Use `-json` flag for parseable output
```

## AI Prompt

> Create a Claude Code skill for iOS simulator automation with:
> - Launching and managing simulators
> - Installing and launching apps
> - Simulating user interactions
> - Taking screenshots and recordings
> - Running XCTest suites
