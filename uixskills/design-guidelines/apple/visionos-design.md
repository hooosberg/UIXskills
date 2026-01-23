# visionOS Design Guidelines

Native Apple Vision Pro design skill for creating immersive spatial computing experiences following Human Interface Guidelines.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/apple |
| Platform | visionOS / Apple Vision Pro |
| Source | [Apple HIG - visionOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos) |
| License | MIT |
| Version | visionOS 1.0+ |

## 🥽 Spatial Design Principles

### Core Concepts

- **Windows**: 2D content floating in 3D space
- **Volumes**: 3D content contained in bounded space
- **Spaces**: Full immersive environments
- **Eye & Hand Tracking**: Primary input methods

### Interaction Model

```
Look → Pinch → Drag
  ↓      ↓       ↓
Focus  Select  Manipulate
```

---

## 🪟 Window Design

### Glass Material (Default)

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            Text("Welcome")
                .font(.largeTitle)
            // Content
        }
        .padding(40)
        .glassBackgroundEffect() // visionOS glass material
    }
}
```

### Window Sizing

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .windowStyle(.plain)
        .defaultSize(width: 1280, height: 720)

        // Volume for 3D content
        WindowGroup(id: "3d-model") {
            Model3DView()
        }
        .windowStyle(.volumetric)
        .defaultSize(width: 0.5, height: 0.5, depth: 0.5, in: .meters)
    }
}
```

---

## 👁️ Eye Tracking & Focus

### Hover Effects

```swift
struct InteractiveButton: View {
    var body: some View {
        Button(action: {}) {
            Label("Action", systemImage: "star.fill")
                .padding()
        }
        .buttonStyle(.bordered)
        .hoverEffect(.highlight) // Glow on eye focus
    }
}
```

### Custom Hover States

```swift
struct CustomHover: View {
    @State private var isHovered = false

    var body: some View {
        RoundedRectangle(cornerRadius: 20)
            .fill(isHovered ? .blue.opacity(0.3) : .clear)
            .overlay {
                Text("Look at me")
            }
            .onHover { hovering in
                withAnimation(.easeInOut(duration: 0.2)) {
                    isHovered = hovering
                }
            }
    }
}
```

---

## ✋ Hand Gestures

### Standard Gestures

| Gesture | Action |
|---------|--------|
| Look + Pinch | Tap/Select |
| Pinch + Drag | Move/Scroll |
| Two-hand pinch | Zoom/Resize |
| Pinch + Rotate | Rotate object |

### Gesture Implementation

```swift
struct DraggableView: View {
    @State private var position = CGPoint.zero

    var body: some View {
        Model3D(named: "cube")
            .gesture(
                DragGesture()
                    .onChanged { value in
                        position = value.location
                    }
            )
            .gesture(
                RotateGesture()
                    .onChanged { value in
                        // Handle rotation
                    }
            )
    }
}
```

---

## 🌐 Immersive Spaces

### Space Types

```swift
@main
struct MyApp: App {
    var body: some Scene {
        // Regular window
        WindowGroup {
            ContentView()
        }

        // Mixed immersion (passthrough visible)
        ImmersiveSpace(id: "mixed") {
            MixedRealityView()
        }
        .immersionStyle(selection: .constant(.mixed), in: .mixed)

        // Full immersion
        ImmersiveSpace(id: "full") {
            FullImmersiveView()
        }
        .immersionStyle(selection: .constant(.full), in: .full)
    }
}
```

### Opening Immersive Space

```swift
struct ContentView: View {
    @Environment(\.openImmersiveSpace) var openImmersiveSpace
    @Environment(\.dismissImmersiveSpace) var dismissImmersiveSpace

    var body: some View {
        Button("Enter Immersive") {
            Task {
                await openImmersiveSpace(id: "mixed")
            }
        }
    }
}
```

---

## 🎨 Visual Design

### Depth & Layering

```swift
// Z-axis positioning
VStack {
    Text("Front")
}
.offset(z: 50) // 50 points forward

// Shadow for depth
.shadow(color: .black.opacity(0.3), radius: 20, y: 10)
```

### Typography in Space

```swift
// Larger sizes for spatial readability
Text("Title")
    .font(.system(size: 48, weight: .bold))

Text("Body text")
    .font(.system(size: 24))
    .frame(maxWidth: 600) // Limit line length
```

### Color & Contrast

```swift
// Use vibrant colors in space
Color.blue.opacity(0.8)

// High contrast for glass backgrounds
.foregroundStyle(.primary) // Adapts automatically
```

---

## 📐 Spatial Layout

### Ornaments (Floating UI)

```swift
struct MainView: View {
    var body: some View {
        ContentView()
            .ornament(attachmentAnchor: .scene(.bottom)) {
                HStack {
                    Button("Play") { }
                    Button("Pause") { }
                }
                .padding()
                .glassBackgroundEffect()
            }
    }
}
```

### Tab Bar Placement

```swift
TabView {
    HomeView()
        .tabItem { Label("Home", systemImage: "house") }
    BrowseView()
        .tabItem { Label("Browse", systemImage: "square.grid.2x2") }
}
.tabViewStyle(.sidebarAdaptable) // Left side in visionOS
```

---

## ✅ Checklist

- [ ] **Glass Material**: Use `.glassBackgroundEffect()` for windows
- [ ] **Hover Effects**: Add `.hoverEffect()` to interactive elements
- [ ] **Eye-friendly Sizing**: Minimum 60pt touch targets
- [ ] **Depth**: Use shadows and z-offset for layering
- [ ] **Ergonomics**: Keep content at comfortable viewing angles
- [ ] **Hand Tracking**: Support pinch, drag, and zoom gestures
- [ ] **Immersive Spaces**: Provide entry/exit transitions
- [ ] **Accessibility**: Support pointer and keyboard alternatives

---

## 📚 Resources

- [Designing for visionOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos)
- [Spatial Design](https://developer.apple.com/design/human-interface-guidelines/spatial-layout)
- [Immersive Experiences](https://developer.apple.com/design/human-interface-guidelines/immersive-experiences)
