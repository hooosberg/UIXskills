# Mobile Game UI Design Guidelines

Comprehensive mobile game UI design guidelines for creating immersive, accessible, and engaging gaming experiences.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/gaming |
| Platform | Mobile Games (iOS/Android) |
| Source | Industry Best Practices |
| License | MIT |
| Genre | General Mobile Gaming |

## 🎮 Core Principles

### Game UI Philosophy

- **Immersive**: UI should enhance, not obstruct gameplay
- **Responsive**: Immediate visual/haptic feedback
- **Readable**: Clear at a glance during action
- **Thumb-Friendly**: Optimized for mobile ergonomics
- **Scalable**: Works across device sizes

---

## 📱 Screen Layout

### Safe Zones

```
┌─────────────────────────────────────────┐
│ ███ Status Bar (avoid) ███              │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────┐                     ┌─────┐   │
│  │ HP  │    GAME CONTENT     │Score│   │
│  │ Bar │                     │     │   │
│  └─────┘                     └─────┘   │
│                                         │
│              SAFE ZONE                  │
│         (Main gameplay area)            │
│                                         │
│  ┌────────────────────────────────┐    │
│  │      CONTROLS AREA (20%)       │    │
│  │   ┌───┐              ┌───┐     │    │
│  │   │ ◄ │              │ A │     │    │
│  │   │◄○►│              │B  │     │    │
│  │   │ ▼ │              └───┘     │    │
│  │   └───┘                        │    │
│  └────────────────────────────────┘    │
├─────────────────────────────────────────┤
│ ███ Home Indicator (avoid) ███          │
└─────────────────────────────────────────┘
```

### HUD Layout

```swift
// Unity/Unreal concept - SwiftUI example
struct GameHUD: View {
    @ObservedObject var gameState: GameState

    var body: some View {
        ZStack {
            // Top-left: Player stats
            VStack(alignment: .leading) {
                HealthBar(health: gameState.health)
                ManaBar(mana: gameState.mana)
                Spacer()
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(.leading, 16)
            .padding(.top, 60) // Below status bar

            // Top-right: Score/Currency
            VStack(alignment: .trailing) {
                ScoreDisplay(score: gameState.score)
                CurrencyDisplay(coins: gameState.coins)
                Spacer()
            }
            .frame(maxWidth: .infinity, alignment: .trailing)
            .padding(.trailing, 16)
            .padding(.top, 60)

            // Bottom: Controls
            VStack {
                Spacer()
                HStack {
                    JoystickControl()
                    Spacer()
                    ActionButtons()
                }
                .padding(.horizontal, 20)
                .padding(.bottom, 40) // Above home indicator
            }
        }
    }
}
```

---

## 🎯 Touch Controls

### Virtual Joystick

```swift
struct VirtualJoystick: View {
    @State private var position = CGPoint.zero
    @State private var isDragging = false

    let radius: CGFloat = 60
    let knobRadius: CGFloat = 25

    var body: some View {
        ZStack {
            // Base circle
            Circle()
                .fill(Color.white.opacity(isDragging ? 0.3 : 0.15))
                .frame(width: radius * 2, height: radius * 2)

            // Knob
            Circle()
                .fill(Color.white.opacity(0.6))
                .frame(width: knobRadius * 2, height: knobRadius * 2)
                .offset(x: position.x, y: position.y)
        }
        .gesture(
            DragGesture()
                .onChanged { value in
                    isDragging = true
                    let vector = CGPoint(
                        x: value.location.x - radius,
                        y: value.location.y - radius
                    )
                    let distance = sqrt(vector.x * vector.x + vector.y * vector.y)
                    if distance <= radius - knobRadius {
                        position = vector
                    } else {
                        let angle = atan2(vector.y, vector.x)
                        position = CGPoint(
                            x: cos(angle) * (radius - knobRadius),
                            y: sin(angle) * (radius - knobRadius)
                        )
                    }
                }
                .onEnded { _ in
                    isDragging = false
                    withAnimation(.spring(response: 0.3)) {
                        position = .zero
                    }
                }
        )
    }
}
```

### Action Buttons

```swift
struct ActionButton: View {
    let label: String
    let color: Color
    let action: () -> Void

    @State private var isPressed = false

    var body: some View {
        Button(action: {
            // Haptic feedback
            UIImpactFeedbackGenerator(style: .medium).impactOccurred()
            action()
        }) {
            Text(label)
                .font(.system(size: 20, weight: .bold))
                .foregroundColor(.white)
                .frame(width: 70, height: 70)
                .background(
                    Circle()
                        .fill(color)
                        .shadow(color: color.opacity(0.5), radius: 8, y: 4)
                )
        }
        .scaleEffect(isPressed ? 0.9 : 1.0)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in isPressed = true }
                .onEnded { _ in isPressed = false }
        )
    }
}
```

---

## 📊 HUD Elements

### Health Bar

```swift
struct HealthBar: View {
    let health: Double // 0.0 - 1.0
    let maxHealth: Int

    var healthColor: Color {
        switch health {
        case 0..<0.25: return .red
        case 0.25..<0.5: return .orange
        default: return .green
        }
    }

    var body: some View {
        HStack(spacing: 8) {
            // Heart icon
            Image(systemName: "heart.fill")
                .foregroundColor(.red)

            // Bar background
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    // Background
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.black.opacity(0.5))

                    // Fill
                    RoundedRectangle(cornerRadius: 4)
                        .fill(healthColor)
                        .frame(width: geo.size.width * health)
                        .animation(.easeOut(duration: 0.3), value: health)

                    // Shine effect
                    RoundedRectangle(cornerRadius: 4)
                        .fill(
                            LinearGradient(
                                colors: [.white.opacity(0.3), .clear],
                                startPoint: .top,
                                endPoint: .bottom
                            )
                        )
                        .frame(height: geo.size.height / 2)
                }
            }
            .frame(width: 120, height: 16)

            // Text
            Text("\(Int(health * Double(maxHealth)))/\(maxHealth)")
                .font(.system(size: 12, weight: .bold, design: .monospaced))
                .foregroundColor(.white)
        }
    }
}
```

### Damage Numbers

```swift
struct DamageNumber: View {
    let damage: Int
    let isCritical: Bool

    @State private var offset: CGFloat = 0
    @State private var opacity: Double = 1

    var body: some View {
        Text("-\(damage)")
            .font(.system(
                size: isCritical ? 32 : 24,
                weight: .bold,
                design: .rounded
            ))
            .foregroundColor(isCritical ? .yellow : .white)
            .shadow(color: .black, radius: 2, x: 1, y: 1)
            .offset(y: offset)
            .opacity(opacity)
            .onAppear {
                withAnimation(.easeOut(duration: 1.0)) {
                    offset = -50
                    opacity = 0
                }
            }
    }
}
```

---

## 🎨 Visual Style

### Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| Health | #FF4444 | HP bars, damage |
| Mana | #4444FF | MP bars, magic |
| Gold | #FFD700 | Currency, rewards |
| XP | #44FF44 | Experience, level |
| Rare | #9B59B6 | Epic items |
| Legendary | #F39C12 | Legendary items |

### Typography

```swift
// Game UI fonts
extension Font {
    static let gameTitle = Font.system(size: 48, weight: .black, design: .rounded)
    static let gameHeadline = Font.system(size: 24, weight: .bold)
    static let gameBody = Font.system(size: 16, weight: .medium)
    static let gameCaption = Font.system(size: 12, weight: .semibold, design: .monospaced)
    static let damageNumber = Font.system(size: 28, weight: .black, design: .rounded)
}
```

---

## 🏆 Menus & Popups

### Pause Menu

```swift
struct PauseMenu: View {
    @Binding var isPaused: Bool

    var body: some View {
        ZStack {
            // Dim background
            Color.black.opacity(0.7)
                .ignoresSafeArea()

            VStack(spacing: 20) {
                Text("PAUSED")
                    .font(.gameTitle)
                    .foregroundColor(.white)

                VStack(spacing: 12) {
                    MenuButton(title: "Resume", icon: "play.fill") {
                        isPaused = false
                    }
                    MenuButton(title: "Settings", icon: "gearshape.fill") { }
                    MenuButton(title: "Quit", icon: "xmark.circle.fill") { }
                }
            }
            .padding(40)
            .background(
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.black.opacity(0.8))
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.2), lineWidth: 2)
                    )
            )
        }
    }
}
```

---

## ✅ Checklist

- [ ] **Safe Zones**: Respect notch, status bar, home indicator
- [ ] **Touch Targets**: Minimum 44pt, prefer 60pt+ for action buttons
- [ ] **Feedback**: Haptic + visual + audio for all interactions
- [ ] **Readability**: High contrast, readable fonts
- [ ] **Orientation**: Lock to landscape or support both
- [ ] **Performance**: UI rendering under 2ms
- [ ] **Accessibility**: Support for reduced motion, colorblind modes
- [ ] **Localization**: UI scales for different text lengths

---

## 📚 Resources

- [Apple Game Center Guidelines](https://developer.apple.com/game-center/)
- [Google Play Games](https://developers.google.com/games)
- [Unity UI Best Practices](https://unity.com/how-to/unity-ui-optimization-tips)
