# Google Pixel Design Guidelines

Google Pixel-specific design guidelines for creating pure Android experiences with Material You and Pixel-exclusive features.

## Overview

| Field | Value |
|-------|-------|
| Category | design-guidelines/android |
| Platform | Google Pixel |
| Source | [Android Design](https://developer.android.com/design) |
| License | Apache 2.0 |
| Version | Android 14+ |

## 📱 Pixel Design Philosophy

### Pure Android Experience

- **Clean & Minimal**: No UI overlays, pure Material Design
- **Dynamic Theming**: Full Material You support
- **AI-First**: Integrate with Google AI features
- **Consistent**: Matches system app aesthetics

---

## 🎨 Material You on Pixel

### Dynamic Color (Default Experience)

```kotlin
@Composable
fun PixelTheme(content: @Composable () -> Unit) {
    val context = LocalContext.current

    // Pixel always supports dynamic color
    val colorScheme = if (isSystemInDarkTheme()) {
        dynamicDarkColorScheme(context)
    } else {
        dynamicLightColorScheme(context)
    }

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
```

### Monet Color Extraction

```kotlin
// Colors extracted from wallpaper
// Primary: Dominant color
// Secondary: Complementary color
// Tertiary: Accent color

// Use semantic colors
Surface(color = MaterialTheme.colorScheme.primaryContainer) {
    Text(
        "Dynamic Color",
        color = MaterialTheme.colorScheme.onPrimaryContainer
    )
}
```

---

## 🎛️ Pixel-Style Components

### 1. At a Glance Widget Style

```kotlin
@Composable
fun AtAGlanceCard() {
    Surface(
        shape = RoundedCornerShape(28.dp),
        color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.7f),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(20.dp)
        ) {
            Text(
                "Good morning",
                style = MaterialTheme.typography.headlineSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                "Tuesday, January 21",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Normal
            )
            Spacer(modifier = Modifier.height(16.dp))
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    Icons.Outlined.WbSunny,
                    contentDescription = null,
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("72°F Sunny")
            }
        }
    }
}
```

### 2. Pixel Search Bar

```kotlin
@Composable
fun PixelSearchBar(
    query: String,
    onQueryChange: (String) -> Unit
) {
    Surface(
        shape = RoundedCornerShape(28.dp),
        color = MaterialTheme.colorScheme.surfaceVariant,
        modifier = Modifier
            .fillMaxWidth()
            .height(56.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(horizontal = 16.dp)
        ) {
            // Google G logo
            Image(
                painter = painterResource(R.drawable.google_g),
                contentDescription = null,
                modifier = Modifier.size(24.dp)
            )

            BasicTextField(
                value = query,
                onValueChange = onQueryChange,
                textStyle = MaterialTheme.typography.bodyLarge,
                modifier = Modifier
                    .weight(1f)
                    .padding(horizontal = 16.dp),
                decorationBox = { innerTextField ->
                    if (query.isEmpty()) {
                        Text(
                            "Search",
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                    innerTextField()
                }
            )

            // Google Lens
            IconButton(onClick = { }) {
                Icon(Icons.Outlined.CameraAlt, "Lens")
            }

            // Voice search
            IconButton(onClick = { }) {
                Icon(Icons.Outlined.Mic, "Voice")
            }
        }
    }
}
```

### 3. Pixel Settings Style

```kotlin
@Composable
fun PixelSettingsItem(
    icon: ImageVector,
    title: String,
    subtitle: String? = null,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        color = Color.Transparent
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.primaryContainer,
                modifier = Modifier.size(40.dp)
            ) {
                Icon(
                    icon,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onPrimaryContainer,
                    modifier = Modifier
                        .padding(8.dp)
                        .size(24.dp)
                )
            }

            Column(
                modifier = Modifier
                    .weight(1f)
                    .padding(start = 16.dp)
            ) {
                Text(
                    title,
                    style = MaterialTheme.typography.bodyLarge
                )
                if (subtitle != null) {
                    Text(
                        subtitle,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}
```

---

## 🔔 Pixel Notifications

### Notification Style

```kotlin
// Pixel notification channels
val channel = NotificationChannel(
    "default",
    "Default",
    NotificationManager.IMPORTANCE_DEFAULT
).apply {
    description = "Default notifications"
    enableVibration(true)
    vibrationPattern = longArrayOf(0, 250, 250, 250) // Pixel haptic
}

// Build notification matching Pixel style
val notification = NotificationCompat.Builder(context, "default")
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle("Title")
    .setContentText("Message content")
    .setColor(dynamicColor) // Use Material You color
    .setStyle(NotificationCompat.BigTextStyle()
        .bigText("Extended message content..."))
    .build()
```

---

## 🤖 AI Integration

### Gemini Nano (On-Device AI)

```kotlin
// Check for AI features availability
val aiFeatures = context.getSystemService(AIFeatureManager::class.java)

if (aiFeatures.isFeatureAvailable(AIFeature.SUMMARIZATION)) {
    // Use on-device summarization
    val summary = aiFeatures.summarize(longText)
}

// Smart Reply suggestions
val replies = aiFeatures.generateSmartReplies(
    conversationHistory = messages,
    maxSuggestions = 3
)
```

---

## 📐 Layout Guidelines

### App Grid

```kotlin
// Pixel launcher grid: 5x5 on phones
LazyVerticalGrid(
    columns = GridCells.Fixed(5),
    contentPadding = PaddingValues(16.dp),
    horizontalArrangement = Arrangement.spacedBy(16.dp),
    verticalArrangement = Arrangement.spacedBy(16.dp)
) {
    items(apps) { app ->
        AppIcon(app)
    }
}
```

### Gesture Navigation

```kotlin
// Respect gesture insets
Modifier
    .systemBarsPadding()
    .navigationBarsPadding()

// Edge-to-edge content
WindowCompat.setDecorFitsSystemWindows(window, false)
```

---

## ✅ Checklist

- [ ] **Dynamic Color**: Use `dynamicColorScheme()` always
- [ ] **Pure Material 3**: Follow Material Design 3 exactly
- [ ] **Rounded Corners**: Use 28dp for large elements
- [ ] **Edge-to-Edge**: Implement gesture navigation
- [ ] **Google Fonts**: Use Google Sans or system font
- [ ] **AI Features**: Integrate Gemini Nano where appropriate
- [ ] **Haptics**: Use Pixel-specific haptic patterns
- [ ] **Now Playing**: Consider ambient music detection

---

## 📚 Resources

- [Android Developers](https://developer.android.com/)
- [Material Design 3](https://m3.material.io/)
- [Pixel Feature Drop](https://blog.google/products/pixel/)
