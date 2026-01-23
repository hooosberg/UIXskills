# watchOS Design Guidelines

Native Apple Watch design skill for creating glanceable, focused watchOS applications following Human Interface Guidelines.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/apple |
| Platform | watchOS / Apple Watch |
| Source | [Apple HIG - watchOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos) |
| License | MIT |
| Version | watchOS 10+ |

## ⌚ Watch Design Principles

### Core Philosophy

- **Glanceable**: Information visible in 2-3 seconds
- **Actionable**: Quick interactions, minimal taps
- **Responsive**: Immediate feedback
- **Personal**: Intimate, wrist-based experience

### Screen Sizes

| Device | Screen Size | Resolution |
|--------|-------------|------------|
| 41mm | 352 × 430 | @2x |
| 45mm | 396 × 484 | @2x |
| 49mm Ultra | 410 × 502 | @2x |

---

## 🎛️ Navigation Patterns

### 1. Tab-Based Navigation (watchOS 10+)

```swift
struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tag(0)
            ActivityView()
                .tag(1)
            SettingsView()
                .tag(2)
        }
        .tabViewStyle(.verticalPage) // Vertical scrolling tabs
    }
}
```

### 2. NavigationStack

```swift
struct MainView: View {
    var body: some View {
        NavigationStack {
            List {
                NavigationLink("Workouts") {
                    WorkoutListView()
                }
                NavigationLink("History") {
                    HistoryView()
                }
            }
            .navigationTitle("Fitness")
        }
    }
}
```

### 3. Toolbar with Digital Crown

```swift
struct DetailView: View {
    @State private var scrollAmount = 0.0

    var body: some View {
        ScrollView {
            // Content
        }
        .focusable()
        .digitalCrownRotation($scrollAmount)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button(action: {}) {
                    Image(systemName: "plus")
                }
            }
        }
    }
}
```

---

## 📊 Complications

### Widget Family Sizes

```swift
struct ComplicationProvider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        completion(SimpleEntry(date: Date()))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> ()) {
        let entry = SimpleEntry(date: Date())
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
    }
}

struct ComplicationView: View {
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .accessoryCircular:
            CircularView()
        case .accessoryRectangular:
            RectangularView()
        case .accessoryInline:
            Text("Inline Text")
        case .accessoryCorner:
            CornerView()
        @unknown default:
            EmptyView()
        }
    }
}
```

---

## 🎨 Visual Design

### Typography Scale

```swift
// watchOS optimized fonts
Text("Title")
    .font(.title2) // Large, bold
Text("Headline")
    .font(.headline)
Text("Body")
    .font(.body)
Text("Caption")
    .font(.caption)
```

### Color Usage

```swift
// High contrast colors for small screen
Color.red     // Alerts, stop
Color.green   // Success, go
Color.blue    // Links, actions
Color.orange  // Warnings
Color.yellow  // Highlights

// Avoid subtle colors - they're hard to see
```

### Safe Area & Edge-to-Edge

```swift
struct FullScreenView: View {
    var body: some View {
        ZStack {
            // Background extends to edges
            Color.blue
                .ignoresSafeArea()

            // Content respects safe area
            VStack {
                Text("Content")
            }
        }
    }
}
```

---

## 🏃 Workout & Health

### Workout Session

```swift
import HealthKit

struct WorkoutView: View {
    @State private var isActive = false

    var body: some View {
        TimelineView(.periodic(from: Date(), by: 1)) { context in
            VStack {
                Text(formatElapsedTime())
                    .font(.system(size: 50, weight: .bold, design: .rounded))
                    .monospacedDigit()

                HStack {
                    MetricView(value: "145", unit: "BPM", icon: "heart.fill")
                    MetricView(value: "3.2", unit: "MI", icon: "figure.run")
                }

                Button(isActive ? "Pause" : "Resume") {
                    isActive.toggle()
                }
                .tint(isActive ? .yellow : .green)
            }
        }
    }
}
```

---

## ⚡ Performance

### Always-On Display

```swift
struct AlwaysOnView: View {
    @Environment(\.isLuminanceReduced) var isLuminanceReduced

    var body: some View {
        VStack {
            if isLuminanceReduced {
                // Simplified, dimmer view
                Text("12:00")
                    .font(.title)
            } else {
                // Full detail view
                FullDetailView()
            }
        }
    }
}
```

### Efficient Updates

```swift
// Use TimelineView for time-based updates
TimelineView(.periodic(from: Date(), by: 1)) { context in
    Text(context.date, style: .timer)
}

// Avoid continuous animations
// Use .animation() sparingly
```

---

## ✅ Checklist

- [ ] **Glanceable**: Key info visible in 2-3 seconds
- [ ] **Large Tap Targets**: Minimum 44pt touch targets
- [ ] **Digital Crown**: Support scroll and selection
- [ ] **Complications**: Provide useful at-a-glance widgets
- [ ] **Always-On**: Implement reduced luminance state
- [ ] **Haptics**: Use `WKInterfaceDevice.current().play(.click)`
- [ ] **Dark Background**: Design for black/dark backgrounds
- [ ] **Quick Actions**: Enable direct actions from notifications

---

## 📚 Resources

- [Designing for watchOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos)
- [Complications](https://developer.apple.com/design/human-interface-guidelines/complications)
- [Digital Crown](https://developer.apple.com/design/human-interface-guidelines/digital-crown)
