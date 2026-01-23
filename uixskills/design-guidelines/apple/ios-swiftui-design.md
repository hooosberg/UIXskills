# SwiftUI Native Design

Native Apple SwiftUI design skill based on Human Interface Guidelines and iOS 26 Liquid Glass design language.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/apple |
| Platform | iOS / iPhone |
| Source | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| License | MIT |
| Version | iOS 26+ |

## 📱 Design Reference

### iOS 26 Liquid Glass Design Language

iOS 26 introduces the new **Liquid Glass** design language with core features:

- **Dynamic Glass Effects**: Use `.glassEffect()` for responsive glass effects
- **Fluid Shapes**: Rounded capsule/corner designs
- **Depth Layers**: Transparent overlays, soft shadows
- **Cross-Platform Unity**: Consistent across iOS, iPadOS, macOS, visionOS

### Core API

```swift
// iOS 26+ Glass Effect (Recommended)
.glassEffect()
.glassEffect(.regular)
.glassEffect(.prominent)

// iOS 15+ Material Background (Compatible)
.background(.ultraThinMaterial)
.background(.thinMaterial)
.background(.regularMaterial)
.background(.thickMaterial)
```

---

## 🎛️ Component Specifications

### 1. Bottom Tab Bar

**Native TabView (iOS 26+)**: Auto-adapts to Liquid Glass style

```swift
TabView {
    Tab("Home", systemImage: "house.fill") {
        HomeView()
    }
    Tab("Search", systemImage: "magnifyingglass") {
        SearchView()
    }
    Tab("Settings", systemImage: "gearshape") {
        SettingsView()
    }
}
```

**Best Practices**:
- iPhone: 3-5 Tabs
- iPad: Up to 8 Tabs
- Use SF Symbols filled variants
- Labels use single words, Title Case

---

### 2. Floating Segmented Picker

**Apple Photos App Style** - Bottom floating glass capsule picker:

```swift
struct FloatingSegmentedPicker<T: Hashable & CaseIterable>: View
    where T.AllCases: RandomAccessCollection, T: RawRepresentable, T.RawValue == String {

    @Binding var selection: T

    var body: some View {
        HStack(spacing: 0) {
            ForEach(T.allCases, id: \.self) { item in
                Button {
                    withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
                        selection = item
                    }
                } label: {
                    VStack(spacing: 4) {
                        Image(systemName: iconFor(item))
                            .font(.system(size: 22, weight: .medium))
                        Text(item.rawValue)
                            .font(.caption2)
                    }
                    .foregroundStyle(selection == item ? .primary : .secondary)
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 10)
                    .background {
                        if selection == item {
                            Capsule()
                                .fill(.white.opacity(0.2))
                        }
                    }
                }
                .buttonStyle(.plain)
            }
        }
        .padding(6)
        .background(.ultraThinMaterial, in: Capsule())
        .shadow(color: .black.opacity(0.15), radius: 12, y: 4)
    }
}
```

**Key Features**:
- Capsule shape (`Capsule()`)
- Frosted glass material (`.ultraThinMaterial`)
- Selected item highlight background
- Spring animation (`.spring()`)
- Soft shadow

---

### 3. Glass Toolbar Button

**GitHub App / Apple System Style**:

```swift
struct GlassButton: View {
    let icon: String
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: icon)
                .font(.system(size: 17, weight: .semibold))
                .foregroundStyle(.primary)
                .frame(width: 38, height: 38)
                .background(.ultraThinMaterial, in: Circle())
        }
        .buttonStyle(.plain)
    }
}
```

---

### 4. Inset Grouped List

```swift
List {
    Section("My Work") {
        ForEach(items) { item in
            HStack {
                Image(systemName: item.icon)
                    .foregroundColor(item.color)
                    .frame(width: 30)
                    .background(item.color.opacity(0.15), in: RoundedRectangle(cornerRadius: 6))
                Text(item.title)
                Spacer()
                Image(systemName: "chevron.right")
                    .font(.caption)
                    .foregroundStyle(.tertiary)
            }
        }
    }
}
.listStyle(.insetGrouped)
```

---

## 🎨 Color System

### Semantic Colors (Auto Dark Mode)

```swift
// Text
Color.primary      // Primary text
Color.secondary    // Secondary text
Color.tertiary     // Tertiary text

// Background
Color(.systemBackground)           // Main background
Color(.secondarySystemBackground)  // Secondary background
Color(.tertiarySystemBackground)   // List cell background

// Separators
Color(.separator)
Color(.opaqueSeparator)

// System Accent
Color.accentColor
```

---

## 📐 Layout Specifications

### Safe Areas

```swift
// Respect safe areas
.safeAreaInset(edge: .bottom) {
    CustomTabBar()
}

// Ignore safe areas (full screen content)
.ignoresSafeArea(.all)
```

### Spacing

```swift
// Standard spacing
.padding()           // 16pt
.padding(.small)     // 8pt
.padding(.large)     // 20pt
```

---

## ✅ Checklist

- [ ] **Use Native Components**: Prefer `TabView`, `NavigationStack`, `List`
- [ ] **Semantic Colors**: Use `Color.primary`, `Color(.systemBackground)`
- [ ] **Dark Mode**: Don't hardcode color values
- [ ] **SF Symbols**: Use system icons, filled variants for Tab Bar
- [ ] **Glass Effects**: iOS 26+ use `.glassEffect()`, fallback to `.ultraThinMaterial`
- [ ] **Animations**: Use `.spring()` or `.easeInOut` for smooth transitions
- [ ] **Accessibility**: Support Dynamic Type and VoiceOver
- [ ] **iPad Adaptation**: Use `@Environment(\.horizontalSizeClass)`

---

## 📚 Official Resources

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui/)
- [WWDC 2025 - Liquid Glass](https://developer.apple.com/wwdc25/)
