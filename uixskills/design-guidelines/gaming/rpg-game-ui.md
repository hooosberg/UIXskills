# RPG Game UI Design

Specialized UI design guidelines for Role-Playing Games including inventory systems, character stats, dialog trees, and quest tracking.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/gaming |
| Platform | All Platforms |
| Source | RPG Design Patterns |
| License | MIT |
| Genre | RPG / Action RPG |

## 🎭 RPG UI Systems

### Core UI Components

1. **Character Stats** - HP, MP, Attributes
2. **Inventory** - Items, Equipment, Consumables
3. **Skills/Abilities** - Skill trees, Hotbars
4. **Quest Log** - Active, Completed, Tracking
5. **Dialog System** - Conversations, Choices
6. **Map/Minimap** - Navigation, Markers

---

## 📊 Character Stats Display

### Stat Panel

```swift
struct CharacterStatsPanel: View {
    let character: Character

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            // Portrait & Name
            HStack(spacing: 16) {
                Image(character.portrait)
                    .resizable()
                    .frame(width: 80, height: 80)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay(
                        RoundedRectangle(cornerRadius: 8)
                            .stroke(rarityColor(character.rarity), lineWidth: 3)
                    )

                VStack(alignment: .leading) {
                    Text(character.name)
                        .font(.title2.bold())
                    Text("Level \(character.level)")
                        .foregroundColor(.secondary)
                    ExperienceBar(current: character.xp, max: character.xpToNext)
                }
            }

            Divider()

            // Core Stats
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                StatRow(icon: "heart.fill", label: "HP", value: "\(character.hp)/\(character.maxHp)", color: .red)
                StatRow(icon: "drop.fill", label: "MP", value: "\(character.mp)/\(character.maxMp)", color: .blue)
                StatRow(icon: "flame.fill", label: "STR", value: "\(character.strength)", color: .orange)
                StatRow(icon: "shield.fill", label: "DEF", value: "\(character.defense)", color: .gray)
                StatRow(icon: "bolt.fill", label: "AGI", value: "\(character.agility)", color: .yellow)
                StatRow(icon: "sparkles", label: "INT", value: "\(character.intelligence)", color: .purple)
            }
        }
        .padding()
        .background(Color.black.opacity(0.8))
        .cornerRadius(16)
    }
}

struct StatRow: View {
    let icon: String
    let label: String
    let value: String
    let color: Color

    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(color)
                .frame(width: 24)
            Text(label)
                .foregroundColor(.secondary)
            Spacer()
            Text(value)
                .font(.system(.body, design: .monospaced))
                .fontWeight(.semibold)
        }
    }
}
```

---

## 🎒 Inventory System

### Grid Inventory

```swift
struct InventoryGrid: View {
    @ObservedObject var inventory: Inventory
    @State private var selectedItem: Item?

    let columns = Array(repeating: GridItem(.flexible(), spacing: 4), count: 6)

    var body: some View {
        VStack(spacing: 0) {
            // Category tabs
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(ItemCategory.allCases, id: \.self) { category in
                        CategoryTab(
                            category: category,
                            isSelected: inventory.selectedCategory == category
                        ) {
                            inventory.selectedCategory = category
                        }
                    }
                }
                .padding(.horizontal)
            }
            .padding(.vertical, 8)

            // Item grid
            ScrollView {
                LazyVGrid(columns: columns, spacing: 4) {
                    ForEach(inventory.filteredItems) { item in
                        InventorySlot(item: item, isSelected: selectedItem?.id == item.id)
                            .onTapGesture {
                                selectedItem = item
                            }
                    }

                    // Empty slots
                    ForEach(0..<inventory.emptySlots, id: \.self) { _ in
                        EmptySlot()
                    }
                }
                .padding()
            }

            // Selected item detail
            if let item = selectedItem {
                ItemDetailPanel(item: item)
            }
        }
    }
}

struct InventorySlot: View {
    let item: Item
    let isSelected: Bool

    var body: some View {
        ZStack {
            // Rarity background
            RoundedRectangle(cornerRadius: 8)
                .fill(item.rarity.color.opacity(0.3))

            // Item icon
            Image(item.icon)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .padding(8)

            // Stack count
            if item.stackCount > 1 {
                Text("\(item.stackCount)")
                    .font(.caption.bold())
                    .padding(4)
                    .background(Color.black.opacity(0.7))
                    .cornerRadius(4)
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomTrailing)
                    .padding(4)
            }

            // Selection border
            if isSelected {
                RoundedRectangle(cornerRadius: 8)
                    .stroke(Color.yellow, lineWidth: 2)
            }
        }
        .aspectRatio(1, contentMode: .fit)
    }
}
```

### Item Rarity System

```swift
enum ItemRarity: String, CaseIterable {
    case common, uncommon, rare, epic, legendary, mythic

    var color: Color {
        switch self {
        case .common: return .gray
        case .uncommon: return .green
        case .rare: return .blue
        case .epic: return .purple
        case .legendary: return .orange
        case .mythic: return .red
        }
    }

    var glowIntensity: Double {
        switch self {
        case .common: return 0
        case .uncommon: return 0.3
        case .rare: return 0.5
        case .epic: return 0.7
        case .legendary: return 0.9
        case .mythic: return 1.0
        }
    }
}
```

---

## 💬 Dialog System

### Dialog Box

```swift
struct DialogBox: View {
    @ObservedObject var dialog: DialogManager
    @State private var displayedText = ""

    var body: some View {
        VStack(spacing: 0) {
            // Speaker portrait & name
            HStack(alignment: .top, spacing: 16) {
                if let speaker = dialog.currentSpeaker {
                    Image(speaker.portrait)
                        .resizable()
                        .frame(width: 100, height: 100)
                        .clipShape(RoundedRectangle(cornerRadius: 12))

                    VStack(alignment: .leading) {
                        Text(speaker.name)
                            .font(.headline)
                            .foregroundColor(speaker.nameColor)
                    }
                }
                Spacer()
            }
            .padding()

            // Dialog text with typewriter effect
            Text(displayedText)
                .font(.body)
                .lineSpacing(4)
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()

            // Dialog choices
            if !dialog.choices.isEmpty {
                VStack(spacing: 8) {
                    ForEach(dialog.choices.indices, id: \.self) { index in
                        DialogChoice(
                            index: index + 1,
                            text: dialog.choices[index].text,
                            isAvailable: dialog.choices[index].isAvailable
                        ) {
                            dialog.selectChoice(index)
                        }
                    }
                }
                .padding()
            }

            // Continue indicator
            if dialog.canContinue {
                Image(systemName: "chevron.down")
                    .foregroundColor(.white.opacity(0.7))
                    .padding(.bottom, 8)
                    .opacity(dialog.isTyping ? 0 : 1)
                    .animation(.easeInOut(duration: 0.5).repeatForever(), value: dialog.isTyping)
            }
        }
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color.black.opacity(0.85))
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(Color.white.opacity(0.2), lineWidth: 1)
                )
        )
        .onAppear {
            typeText()
        }
    }

    func typeText() {
        displayedText = ""
        let fullText = dialog.currentText

        for (index, character) in fullText.enumerated() {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(index) * 0.03) {
                displayedText += String(character)
            }
        }
    }
}

struct DialogChoice: View {
    let index: Int
    let text: String
    let isAvailable: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack {
                Text("\(index).")
                    .fontWeight(.bold)
                Text(text)
                Spacer()
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 12)
            .background(Color.white.opacity(0.1))
            .cornerRadius(8)
        }
        .disabled(!isAvailable)
        .opacity(isAvailable ? 1 : 0.5)
    }
}
```

---

## 📜 Quest Log

### Quest Tracker

```swift
struct QuestTracker: View {
    @ObservedObject var questManager: QuestManager

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            // Active quest header
            Text("QUESTS")
                .font(.caption.bold())
                .foregroundColor(.secondary)

            // Tracked quests
            ForEach(questManager.trackedQuests) { quest in
                VStack(alignment: .leading, spacing: 4) {
                    // Quest name
                    Text(quest.name)
                        .font(.subheadline.bold())
                        .foregroundColor(quest.type.color)

                    // Current objective
                    if let objective = quest.currentObjective {
                        HStack(spacing: 4) {
                            Image(systemName: objective.isComplete ? "checkmark.circle.fill" : "circle")
                                .foregroundColor(objective.isComplete ? .green : .gray)
                                .font(.caption)

                            Text(objective.description)
                                .font(.caption)
                                .foregroundColor(.secondary)

                            if objective.hasProgress {
                                Text("(\(objective.current)/\(objective.target))")
                                    .font(.caption.monospacedDigit())
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                }
                .padding(8)
                .background(Color.black.opacity(0.6))
                .cornerRadius(8)
            }
        }
        .padding(12)
        .background(Color.black.opacity(0.4))
        .cornerRadius(12)
    }
}
```

---

## 🗺️ Minimap

```swift
struct Minimap: View {
    @ObservedObject var mapManager: MapManager
    let size: CGFloat = 150

    var body: some View {
        ZStack {
            // Map background
            Circle()
                .fill(Color.black.opacity(0.7))

            // Map content (rotates with player)
            Image(mapManager.currentAreaMap)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: size - 20, height: size - 20)
                .clipShape(Circle())
                .rotationEffect(.degrees(-mapManager.playerRotation))

            // Player indicator (always points up)
            Image(systemName: "location.north.fill")
                .foregroundColor(.blue)
                .font(.title3)

            // Markers
            ForEach(mapManager.visibleMarkers) { marker in
                MarkerIcon(marker: marker)
                    .offset(x: marker.offsetX, y: marker.offsetY)
            }

            // Border
            Circle()
                .stroke(Color.white.opacity(0.3), lineWidth: 2)
        }
        .frame(width: size, height: size)
    }
}
```

---

## ✅ Checklist

- [ ] **Stat Visibility**: Key stats always visible in HUD
- [ ] **Inventory Sorting**: Multiple sort options (type, rarity, name)
- [ ] **Item Comparison**: Show stat differences when hovering
- [ ] **Quest Tracking**: Pin important quests to HUD
- [ ] **Dialog Skip**: Allow skipping dialog animations
- [ ] **Minimap Zoom**: Adjustable zoom level
- [ ] **Color Coding**: Consistent rarity colors
- [ ] **Tooltips**: Detailed item/skill information

---

## 📚 Resources

- [Game UI Database](https://www.gameuidatabase.com/)
- [Interface In Game](https://interfaceingame.com/)
- [RPG Patterns](https://www.raphkoster.com/games/laws-of-online-world-design/)
