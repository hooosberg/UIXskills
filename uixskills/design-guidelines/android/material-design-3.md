# Material Design 3 (Android)

Google Material Design 3 guidelines for creating modern, adaptive Android applications with dynamic color and expressive design.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/android |
| Platform | Android |
| Source | [Material Design 3](https://m3.material.io/) |
| License | Apache 2.0 |
| Version | Material 3 |

## 🎨 Material You - Dynamic Color

### Color Extraction

Material 3 extracts colors from user's wallpaper to create personalized themes:

```kotlin
// Dynamic color in Jetpack Compose
@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context)
            else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
```

### Color Roles

```kotlin
// Primary - Key actions, FAB
MaterialTheme.colorScheme.primary
MaterialTheme.colorScheme.onPrimary

// Secondary - Less prominent actions
MaterialTheme.colorScheme.secondary
MaterialTheme.colorScheme.onSecondary

// Tertiary - Contrast accents
MaterialTheme.colorScheme.tertiary

// Surface - Cards, sheets, dialogs
MaterialTheme.colorScheme.surface
MaterialTheme.colorScheme.surfaceVariant

// Background
MaterialTheme.colorScheme.background

// Error states
MaterialTheme.colorScheme.error
MaterialTheme.colorScheme.onError
```

---

## 🎛️ Components

### 1. Top App Bar

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MyScreen() {
    val scrollBehavior = TopAppBarDefaults.pinnedScrollBehavior()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Page Title") },
                navigationIcon = {
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.ArrowBack, "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.Search, "Search")
                    }
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.MoreVert, "More")
                    }
                },
                scrollBehavior = scrollBehavior
            )
        }
    ) { paddingValues ->
        // Content
    }
}
```

### 2. Navigation Bar (Bottom)

```kotlin
@Composable
fun BottomNavigation() {
    var selectedItem by remember { mutableStateOf(0) }
    val items = listOf("Home", "Search", "Profile")
    val icons = listOf(Icons.Default.Home, Icons.Default.Search, Icons.Default.Person)

    NavigationBar {
        items.forEachIndexed { index, item ->
            NavigationBarItem(
                icon = { Icon(icons[index], contentDescription = item) },
                label = { Text(item) },
                selected = selectedItem == index,
                onClick = { selectedItem = index }
            )
        }
    }
}
```

### 3. Floating Action Button

```kotlin
// Standard FAB
FloatingActionButton(
    onClick = { },
    containerColor = MaterialTheme.colorScheme.primaryContainer
) {
    Icon(Icons.Default.Add, "Add")
}

// Extended FAB
ExtendedFloatingActionButton(
    onClick = { },
    icon = { Icon(Icons.Default.Add, "Add") },
    text = { Text("Create") }
)

// Small FAB
SmallFloatingActionButton(onClick = { }) {
    Icon(Icons.Default.Add, "Add")
}

// Large FAB
LargeFloatingActionButton(onClick = { }) {
    Icon(Icons.Default.Add, "Add")
}
```

### 4. Cards

```kotlin
// Elevated Card
ElevatedCard(
    modifier = Modifier.fillMaxWidth()
) {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("Card Title", style = MaterialTheme.typography.titleMedium)
        Text("Card content goes here", style = MaterialTheme.typography.bodyMedium)
    }
}

// Filled Card
Card(
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surfaceVariant
    )
) {
    // Content
}

// Outlined Card
OutlinedCard {
    // Content
}
```

### 5. Buttons

```kotlin
// Filled button (primary actions)
Button(onClick = { }) {
    Text("Filled")
}

// Tonal button (secondary actions)
FilledTonalButton(onClick = { }) {
    Text("Tonal")
}

// Outlined button
OutlinedButton(onClick = { }) {
    Text("Outlined")
}

// Text button (low emphasis)
TextButton(onClick = { }) {
    Text("Text")
}

// Icon button
IconButton(onClick = { }) {
    Icon(Icons.Default.Favorite, "Favorite")
}
```

---

## 📐 Layout

### Adaptive Layouts

```kotlin
@Composable
fun AdaptiveLayout() {
    val windowSizeClass = calculateWindowSizeClass(LocalContext.current as Activity)

    when (windowSizeClass.widthSizeClass) {
        WindowWidthSizeClass.Compact -> {
            // Phone layout - single column
            CompactLayout()
        }
        WindowWidthSizeClass.Medium -> {
            // Tablet portrait - list/detail
            MediumLayout()
        }
        WindowWidthSizeClass.Expanded -> {
            // Tablet landscape / Desktop - multi-pane
            ExpandedLayout()
        }
    }
}
```

### Navigation Rail (Tablet)

```kotlin
@Composable
fun NavigationRailLayout() {
    Row {
        NavigationRail {
            NavigationRailItem(
                icon = { Icon(Icons.Default.Home, "Home") },
                label = { Text("Home") },
                selected = true,
                onClick = { }
            )
            NavigationRailItem(
                icon = { Icon(Icons.Default.Search, "Search") },
                label = { Text("Search") },
                selected = false,
                onClick = { }
            )
        }
        // Main content
        Content()
    }
}
```

---

## 🔤 Typography

```kotlin
// Material 3 Type Scale
MaterialTheme.typography.displayLarge   // 57sp
MaterialTheme.typography.displayMedium  // 45sp
MaterialTheme.typography.displaySmall   // 36sp

MaterialTheme.typography.headlineLarge  // 32sp
MaterialTheme.typography.headlineMedium // 28sp
MaterialTheme.typography.headlineSmall  // 24sp

MaterialTheme.typography.titleLarge     // 22sp
MaterialTheme.typography.titleMedium    // 16sp
MaterialTheme.typography.titleSmall     // 14sp

MaterialTheme.typography.bodyLarge      // 16sp
MaterialTheme.typography.bodyMedium     // 14sp
MaterialTheme.typography.bodySmall      // 12sp

MaterialTheme.typography.labelLarge     // 14sp
MaterialTheme.typography.labelMedium    // 12sp
MaterialTheme.typography.labelSmall     // 11sp
```

---

## ✅ Checklist

- [ ] **Dynamic Color**: Enable Material You on Android 12+
- [ ] **Color Roles**: Use semantic colors (primary, secondary, surface)
- [ ] **Elevation**: Use tonal elevation instead of shadows
- [ ] **Motion**: Implement Material Motion transitions
- [ ] **Adaptive**: Support phone, tablet, and foldable layouts
- [ ] **Typography**: Use Material 3 type scale
- [ ] **Touch Targets**: Minimum 48dp touch targets
- [ ] **Dark Theme**: Support system dark mode

---

## 📚 Resources

- [Material Design 3](https://m3.material.io/)
- [Material Components Android](https://github.com/material-components/material-components-android)
- [Jetpack Compose Material 3](https://developer.android.com/jetpack/compose/designsystems/material3)
