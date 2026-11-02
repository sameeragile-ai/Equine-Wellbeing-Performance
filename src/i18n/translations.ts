import { Language } from '../types';

export const translations = {
  en: {
    common: {
      appName: 'Equora',
      tagline: 'Equine wellbeing & performance platform',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      done: 'Done',
      back: 'Back',
      close: 'Close',
      all: 'All',
      search: 'Search',
      loading: 'Loading...',
      error: 'Something went wrong',
      success: 'Saved successfully',
      bestViewedOnMobile: 'Best viewed on mobile',
      offlineBanner: "You're offline — changes are saved on this device",
      syncedBanner: 'All changes synced',
      syncingBanner: 'Syncing changes...',
      comfortStatus: {
        comfortable: 'Comfortable',
        humid: 'High Humidity',
        too_warm: 'Warm Alert',
        cool: 'Cool'
      }
    },
    nav: {
      home: 'Today',
      horses: 'Horses',
      scan: 'Scan',
      tasks: 'Tasks',
      profile: 'Profile'
    },
    home: {
      greetingMorning: 'Good morning',
      greetingAfternoon: 'Good afternoon',
      greetingEvening: 'Good evening',
      weatherSummary: 'Nordlys Stables · Crisp paddock morning',
      sensorCardTitle: 'Stable Environment',
      sensorLastSync: 'Synced 3m ago',
      viewSensorDetails: 'Tap for 7-day climate intelligence',
      temperature: 'Temperature',
      humidity: 'Humidity',
      todaysTasks: "Today's Tasks",
      tasksCompleted: '{done} of {total} completed',
      yourHorses: 'Your Horses',
      recentTraining: 'Recent Training',
      attentionRequired: 'Attention Required',
      humidityAlertDesc: 'Barn A humidity peaked at 82% at 04:15. Open north louver ventilation.',
      noTasksToday: 'All tasks completed for today',
      viewAll: 'View all'
    },
    horses: {
      title: 'Horses',
      searchPlaceholder: 'Search by name, breed, or box...',
      filters: {
        all: 'All Horses',
        training: 'In Training',
        resting: 'Resting',
        retired: 'Retired'
      },
      addNewHorse: 'Add Horse',
      ageYears: '{age} yrs',
      hands: '{height} hh',
      centimeters: '{height} cm',
      boxLabel: 'Box {box}',
      tabs: {
        overview: 'Overview',
        training: 'Training',
        environment: 'Climate',
        products: 'Passports'
      },
      overview: {
        keyFacts: 'Key Facts',
        breed: 'Breed',
        gender: 'Gender',
        height: 'Height',
        color: 'Color',
        microchip: 'Microchip',
        ueln: 'UELN / Life No.',
        owner: 'Registered Owner',
        temperament: 'Temperament',
        feedSchedule: 'Feeding Routine',
        morningFeed: 'Morning Feed',
        middayFeed: 'Midday Hay',
        eveningFeed: 'Evening Feed',
        supplements: 'Supplements',
        careSchedule: 'Care & Maintenance',
        nextFarrier: 'Next Farrier Visit',
        nextVet: 'Next Veterinary Check',
        vaccinations: 'Vaccinations Status',
        upToDate: 'Up to date'
      },
      addHorseSheet: {
        title: 'Register New Horse',
        nameLabel: 'Horse Name',
        breedLabel: 'Breed',
        genderLabel: 'Gender',
        birthYearLabel: 'Birth Year',
        heightLabel: 'Height',
        boxLabel: 'Stall / Box Number',
        statusLabel: 'Status',
        notesLabel: 'Notes & Temperament',
        submit: 'Register Horse'
      }
    },
    tasks: {
      title: 'Stable Tasks',
      searchPlaceholder: 'Search tasks or assignees...',
      tabs: {
        today: 'Today',
        overdue: 'Overdue',
        upcoming: 'Upcoming',
        done: 'Completed'
      },
      priority: {
        high: 'Urgent',
        normal: 'Normal',
        low: 'Routine'
      },
      recurrence: {
        daily: 'Daily',
        weekly: 'Weekly',
        none: 'One-off'
      },
      swipeToComplete: 'Swipe right to complete',
      swipeToDelete: 'Swipe left to delete',
      createTask: 'New Task',
      emptyToday: 'No remaining tasks for today. Everything is running smoothly.',
      emptySection: 'No tasks in this category.',
      createSheet: {
        title: 'Create Stable Task',
        titleLabel: 'Task Description',
        horseLabel: 'Related Horse (optional)',
        assigneeLabel: 'Assignee',
        dueDateLabel: 'Due Date',
        dueTimeLabel: 'Time',
        priorityLabel: 'Priority',
        recurrenceLabel: 'Recurrence',
        notesLabel: 'Additional Instructions',
        submit: 'Schedule Task'
      }
    },
    training: {
      title: 'Training Log',
      logSession: 'Log Session',
      weeklyLoad: 'Weekly Training Load',
      totalMinutes: '{minutes} min logged this week',
      intensity: 'Intensity Level',
      duration: 'Duration',
      rider: 'Rider',
      surface: 'Surface',
      notes: 'Session Notes',
      disciplines: {
        Dressage: 'Dressage',
        Jumping: 'Jumping',
        Hacking: 'Trail & Hacking',
        Lunging: 'Lunging',
        Groundwork: 'Groundwork',
        Rest: 'Active Rest'
      },
      logSheet: {
        title: 'Record Training Session',
        horseLabel: 'Horse',
        typeLabel: 'Discipline',
        durationLabel: 'Duration (minutes)',
        intensityLabel: 'Physical Intensity (1-5)',
        riderLabel: 'Rider / Handler',
        surfaceLabel: 'Arena / Surface',
        notesLabel: 'Observations & Feeling',
        submit: 'Save Session'
      }
    },
    sensor: {
      title: 'Climate Sensor',
      pairedDevice: 'Equora Climate S1',
      battery: 'Battery',
      firmware: 'Firmware',
      signal: 'Bluetooth Signal',
      liveReadings: 'Live Stall Telemetry',
      comfortRangeNotice: 'Optimal horse comfort: 10°C–20°C and 50%–70% RH',
      readStoredData: 'Sync Stored Flash Data',
      syncingDeviceData: 'Downloading 7-day memory logs...',
      chartTitle: 'Climate Trends',
      view24h: 'Last 24 Hours',
      view7d: 'Last 7 Days',
      disconnectSim: 'Simulate Connection Drop',
      reconnecting: 'Connection lost — searching for S1 sensor...',
      reconnected: 'Sensor reconnected',
      notPairedTitle: 'No Climate Sensor Connected',
      notPairedDesc: 'Pair an Equora Climate S1 sensor to monitor temperature, humidity, and dew point in real time.',
      startPairing: 'Pair Equora Sensor',
      pairingSteps: {
        step1Title: 'Step 1: Scan Sensor QR',
        step1Desc: 'Locate the QR code on the back of the Equora S1 sensor casing.',
        step2Title: 'Searching for Bluetooth Signal...',
        step2Desc: 'Hold your device within 3 meters of the sensor.',
        step3Title: 'Sensor Discovered',
        step3Desc: 'Found Equora Climate S1 · SN 4F2A-91',
        step4Title: 'Finalizing Secure Pairing...',
        failedTitle: 'Pairing Failed',
        failedDesc: 'Unable to establish BLE handshake. Verify sensor has battery and is nearby.',
        retry: 'Try Again'
      }
    },
    passport: {
      title: 'Digital Product Passport',
      scanTitle: 'Scan Equora Code',
      scanDesc: 'Align the camera with the QR code on any Equora gear or sensor.',
      simulateScan: 'Simulate QR Scan',
      cameraPermissionNotice: 'Camera preview ready. Use the simulate button if no physical QR is available.',
      verifiedSeal: 'Verified Authentic by Equora',
      certHashLabel: 'Cryptographic Passport ID',
      manufacturedIn: 'Crafted in',
      materialsLabel: 'Materials & Provenance',
      warrantyLabel: 'Manufacturer Warranty',
      warrantyActive: 'Active · {months} months remaining',
      sustainability: 'Sustainability & Lifecycle',
      carbonFootprint: 'CO₂e Footprint',
      recycledContent: 'Recycled Content',
      repairGuarantee: 'Lifetime seam repair guarantee',
      careGuide: 'Care & Maintenance Guide',
      ownershipHistory: 'Ownership & Service Timeline',
      linkedHorse: 'Assigned Equine Partner',
      registerSheet: {
        title: 'Register Equora Product',
        productName: 'Product Detected',
        assignToHorse: 'Assign to Horse',
        purchaseDate: 'Date of Acquisition',
        confirmRegister: 'Register to Stable'
      }
    },
    activity: {
      title: 'Activity Center',
      markAllRead: 'Mark all as read',
      today: 'Today',
      earlier: 'Earlier',
      empty: 'No new notifications'
    },
    profile: {
      title: 'Stable & Settings',
      stableRole: 'Head Stable Manager',
      stableName: 'Nordlys Stables · Lillehammer, Norway',
      teamMembers: 'Stable Crew & Vets',
      sections: {
        preferences: 'Preferences',
        devices: 'Equipment & Passports',
        developer: 'Developer & Prototype Controls',
        account: 'Account'
      },
      language: 'Language',
      units: 'Measurement Units',
      appearance: 'Appearance',
      appearanceOptions: {
        light: 'Light',
        dark: 'Dark',
        system: 'System'
      },
      textSize: 'Text Size',
      textSizeOptions: {
        standard: 'Standard',
        large: 'Large',
        xlarge: 'Extra Large'
      },
      reduceMotion: 'Reduce Motion',
      notifications: 'Push Alerts',
      myProducts: 'Registered Passports',
      pairedSensors: 'Bluetooth Sensors',
      offlineMode: 'Offline Simulation Mode',
      triggerConflict: 'Simulate Sync Conflict',
      triggerPush: 'Trigger Climate Push Banner',
      resetData: 'Reset Prototype Data',
      signOut: 'Sign Out'
    },
    sync: {
      queueTitle: 'Offline Sync Queue',
      queueDesc: 'Actions performed while offline are securely queued and will automatically sync when connectivity resumes.',
      pendingChanges: '{count} changes pending',
      syncNow: 'Sync Now',
      allSynced: 'Queue empty — fully in sync with server',
      conflictTitle: 'Sync Conflict Detected',
      conflictDesc: 'Changes were made on both this device and by another stable crew member while offline.',
      localVersion: 'Your Local Version',
      serverVersion: 'Server Version (Remote)',
      keepMine: 'Keep My Version',
      keepServer: 'Keep Server Version',
      mergeBoth: 'Merge Changes'
    }
  },

  de: {
    common: {
      appName: 'Equora',
      tagline: 'Plattform für Pferdegesundheit und Leistung',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      done: 'Fertig',
      back: 'Zurück',
      close: 'Schließen',
      all: 'Alle',
      search: 'Suchen',
      loading: 'Wird geladen...',
      error: 'Ein Fehler ist aufgetreten',
      success: 'Erfolgreich gespeichert',
      bestViewedOnMobile: 'Optimiert für Mobilgeräte',
      offlineBanner: 'Offline-Modus — Änderungen werden lokal gesichert',
      syncedBanner: 'Alle Daten synchronisiert',
      syncingBanner: 'Synchronisiere Änderungen...',
      comfortStatus: {
        comfortable: 'Optimal',
        humid: 'Hohe Feuchtigkeit',
        too_warm: 'Warnung: Zu warm',
        cool: 'Kühl'
      }
    },
    nav: {
      home: 'Heute',
      horses: 'Pferde',
      scan: 'Scannen',
      tasks: 'Aufgaben',
      profile: 'Profil'
    },
    home: {
      greetingMorning: 'Guten Morgen',
      greetingAfternoon: 'Guten Tag',
      greetingEvening: 'Guten Abend',
      weatherSummary: 'Nordlys Stables · Frischer Morgen auf der Koppel',
      sensorCardTitle: 'Stallklima & Umwelt',
      sensorLastSync: 'Vor 3 Min. synchronisiert',
      viewSensorDetails: 'Tippen für 7-Tage-Klimaanalyse',
      temperature: 'Temperatur',
      humidity: 'Luftfeuchtigkeit',
      todaysTasks: 'Heutige Aufgaben',
      tasksCompleted: '{done} von {total} erledigt',
      yourHorses: 'Ihre Pferde',
      recentTraining: 'Letzte Trainingseinheiten',
      attentionRequired: 'Handlungsbedarf',
      humidityAlertDesc: 'Stalltrakt A erreichte um 04:15 Uhr 82% Feuchtigkeit. Nordlüftung öffnen.',
      noTasksToday: 'Alle Aufgaben für heute erledigt',
      viewAll: 'Alle anzeigen'
    },
    horses: {
      title: 'Pferdebestand',
      searchPlaceholder: 'Nach Name, Rasse oder Box suchen...',
      filters: {
        all: 'Alle Pferde',
        training: 'Im Training',
        resting: 'Ruhend',
        retired: 'Im Ruhestand'
      },
      addNewHorse: 'Pferd registrieren',
      ageYears: '{age} Jahre',
      hands: '{height} Stockmaß',
      centimeters: '{height} cm',
      boxLabel: 'Box {box}',
      tabs: {
        overview: 'Übersicht',
        training: 'Training',
        environment: 'Klima',
        products: 'Pässe'
      },
      overview: {
        keyFacts: 'Stammdaten',
        breed: 'Rasse',
        gender: 'Geschlecht',
        height: 'Stockmaß',
        color: 'Farbe',
        microchip: 'Transponder-Nr.',
        ueln: 'UELN / Lebensnummer',
        owner: 'Eingetragener Besitzer',
        temperament: 'Charakter & Temperament',
        feedSchedule: 'Fütterungsplan',
        morningFeed: 'Morgenfütterung',
        middayFeed: 'Mittagsheu',
        eveningFeed: 'Abendfütterung',
        supplements: 'Zusatzfutter',
        careSchedule: 'Pflege & Termine',
        nextFarrier: 'Nächster Hufschmiedtermin',
        nextVet: 'Nächste tierärztliche Untersuchung',
        vaccinations: 'Impfstatus',
        upToDate: 'Vollständig geimpft'
      },
      addHorseSheet: {
        title: 'Neues Pferd anlegen',
        nameLabel: 'Name des Pferdes',
        breedLabel: 'Rasse',
        genderLabel: 'Geschlecht',
        birthYearLabel: 'Geburtsjahr',
        heightLabel: 'Stockmaß (cm)',
        boxLabel: 'Boxennummer',
        statusLabel: 'Status',
        notesLabel: 'Besonderheiten & Temperament',
        submit: 'Pferd speichern'
      }
    },
    tasks: {
      title: 'Stallaufgaben',
      searchPlaceholder: 'Aufgaben oder Zuständige suchen...',
      tabs: {
        today: 'Heute',
        overdue: 'Überfällig',
        upcoming: 'Demnächst',
        done: 'Erledigt'
      },
      priority: {
        high: 'Dringend',
        normal: 'Normal',
        low: 'Routine'
      },
      recurrence: {
        daily: 'Täglich',
        weekly: 'Wöchentlich',
        none: 'Einmalig'
      },
      swipeToComplete: 'Nach rechts wischen zum Erledigen',
      swipeToDelete: 'Nach links wischen zum Löschen',
      createTask: 'Neue Aufgabe',
      emptyToday: 'Keine offenen Aufgaben für heute. Der Stallbetrieb läuft perfekt.',
      emptySection: 'Keine Aufgaben in diesem Bereich.',
      createSheet: {
        title: 'Stallaufgabe erstellen',
        titleLabel: 'Beschreibung',
        horseLabel: 'Zugeordnetes Pferd (optional)',
        assigneeLabel: 'Zuständige Person',
        dueDateLabel: 'Fälligkeitsdatum',
        dueTimeLabel: 'Uhrzeit',
        priorityLabel: 'Priorität',
        recurrenceLabel: 'Wiederholung',
        notesLabel: 'Zusätzliche Anweisungen',
        submit: 'Aufgabe einplanen'
      }
    },
    training: {
      title: 'Trainingsbuch',
      logSession: 'Einheit eintragen',
      weeklyLoad: 'Wöchentliche Trainingsbelastung',
      totalMinutes: '{minutes} Min. diese Woche protokolliert',
      intensity: 'Intensitätsstufe',
      duration: 'Dauer',
      rider: 'Reiter / Vorführer',
      surface: 'Bodenbeschaffenheit',
      notes: 'Notizen & Verlauf',
      disciplines: {
        Dressage: 'Dressur',
        Jumping: 'Springreiten',
        Hacking: 'Ausreiten',
        Lunging: 'Longieren',
        Groundwork: 'Bodenarbeit',
        Rest: 'Aktive Erholung'
      },
      logSheet: {
        title: 'Trainingseinheit protokollieren',
        horseLabel: 'Pferd',
        typeLabel: 'Disziplin',
        durationLabel: 'Dauer (Minuten)',
        intensityLabel: 'Körperliche Intensität (1-5)',
        riderLabel: 'Reiter / Trainer',
        surfaceLabel: 'Reithalle / Platz',
        notesLabel: 'Beobachtungen & Rittigkeit',
        submit: 'Einheit speichern'
      }
    },
    sensor: {
      title: 'Klimasensor',
      pairedDevice: 'Equora Climate S1',
      battery: 'Batteriestand',
      firmware: 'Firmware-Version',
      signal: 'Bluetooth-Signal',
      liveReadings: 'Echtzeit-Stalltelemetrie',
      comfortRangeNotice: 'Optimaler Wohlfühlbereich: 10°C–20°C und 50%–70% rF',
      readStoredData: 'Flash-Speicher auslesen',
      syncingDeviceData: 'Lade 7-Tage-Historie vom Sensor herunter...',
      chartTitle: 'Klima-Verlauf',
      view24h: 'Letzte 24 Stunden',
      view7d: 'Letzte 7 Tage',
      disconnectSim: 'Verbindungsabbruch simulieren',
      reconnecting: 'Verbindung unterbrochen — suche S1-Sensor...',
      reconnected: 'Sensor wieder verbunden',
      notPairedTitle: 'Kein Sensor verbunden',
      notPairedDesc: 'Koppeln Sie einen Equora Climate S1, um Stalltemperatur und Luftfeuchtigkeit lückenlos zu überwachen.',
      startPairing: 'Equora-Sensor koppeln',
      pairingSteps: {
        step1Title: 'Schritt 1: QR-Code am Sensor scannen',
        step1Desc: 'Der QR-Code befindet sich auf der Rückseite des Equora S1-Gehäuses.',
        step2Title: 'Suche nach Bluetooth-Geräten...',
        step2Desc: 'Halten Sie das Smartphone im Umkreis von 3 Metern an den Sensor.',
        step3Title: 'Sensor gefunden',
        step3Desc: 'Equora Climate S1 · SN 4F2A-91 erkannt',
        step4Title: 'Sichere Verbindung wird hergestellt...',
        failedTitle: 'Kopplung fehlgeschlagen',
        failedDesc: 'Kein BLE-Handshake möglich. Stellen Sie sicher, dass Bluetooth aktiv ist.',
        retry: 'Erneut versuchen'
      }
    },
    passport: {
      title: 'Digitaler Produktpass',
      scanTitle: 'Equora-Code scannen',
      scanDesc: 'Richten Sie die Kamera auf den QR-Code von Ausrüstung oder Sensor.',
      simulateScan: 'Scan simulieren',
      cameraPermissionNotice: 'Kamerabild bereit. Nutzen Sie "Scan simulieren" ohne physischen Code.',
      verifiedSeal: 'Verifizierte Originalität von Equora',
      certHashLabel: 'Kryptografische Pass-ID',
      manufacturedIn: 'Hergestellt in',
      materialsLabel: 'Materialien & Herkunft',
      warrantyLabel: 'Herstellergarantie',
      warrantyActive: 'Aktiv · noch {months} Monate',
      sustainability: 'Nachhaltigkeit & Ökobilanz',
      carbonFootprint: 'CO₂e-Fußabdruck',
      recycledContent: 'Recycelter Anteil',
      repairGuarantee: 'Lebenslange Naht-Reparaturgarantie',
      careGuide: 'Pflege- & Waschanleitung',
      ownershipHistory: 'Besitz- & Wartungschronik',
      linkedHorse: 'Zugeordnetes Pferd',
      registerSheet: {
        title: 'Equora-Produkt registrieren',
        productName: 'Produkt erkannt',
        assignToHorse: 'Pferd zuweisen',
        purchaseDate: 'Kaufdatum',
        confirmRegister: 'Im Stall registrieren'
      }
    },
    activity: {
      title: 'Aktivitätszentrale',
      markAllRead: 'Alle als gelesen markieren',
      today: 'Heute',
      earlier: 'Früher',
      empty: 'Keine neuen Benachrichtigungen'
    },
    profile: {
      title: 'Stall & Einstellungen',
      stableRole: 'Leitende Stallmanagerin',
      stableName: 'Nordlys Stables · Lillehammer, Norwegen',
      teamMembers: 'Stallteam & Tierärzte',
      sections: {
        preferences: 'Einstellungen',
        devices: 'Ausrüstung & Pässe',
        developer: 'Entwickler- & Demo-Tools',
        account: 'Konto'
      },
      language: 'Sprache',
      units: 'Einheiten',
      appearance: 'Erscheinungsbild',
      appearanceOptions: {
        light: 'Hell',
        dark: 'Dunkel',
        system: 'System'
      },
      textSize: 'Schriftgröße',
      textSizeOptions: {
        standard: 'Standard',
        large: 'Groß',
        xlarge: 'Sehr groß'
      },
      reduceMotion: 'Bewegung reduzieren',
      notifications: 'Push-Mitteilungen',
      myProducts: 'Registrierte Pässe',
      pairedSensors: 'Bluetooth-Sensoren',
      offlineMode: 'Offline-Modus simulieren',
      triggerConflict: 'Synchronisationskonflikt auslösen',
      triggerPush: 'Klimawarnung-Push auslösen',
      resetData: 'Demo-Daten zurücksetzen',
      signOut: 'Abmelden'
    },
    sync: {
      queueTitle: 'Offline-Synchronisationswarteschlange',
      queueDesc: 'Offline vorgenommene Änderungen werden sicher im lokalen Speicher gehalten und bei Verbindung automatisch hochgeladen.',
      pendingChanges: '{count} ausstehende Änderungen',
      syncNow: 'Jetzt synchronisieren',
      allSynced: 'Warteschlange leer — vollständig synchronisiert',
      conflictTitle: 'Konflikt bei Synchronisation erkannt',
      conflictDesc: 'Sowohl lokal als auch von einem Teammitglied auf dem Server wurden zeitgleich Änderungen vorgenommen.',
      localVersion: 'Ihre lokale Version',
      serverVersion: 'Serverversion (Remote)',
      keepMine: 'Meine Version behalten',
      keepServer: 'Serverversion übernehmen',
      mergeBoth: 'Zusammenführen'
    }
  },

  nb: {
    common: {
      appName: 'Equora',
      tagline: 'Plattform for hestevelferd og ytelse',
      save: 'Lagre',
      cancel: 'Avbryt',
      delete: 'Slett',
      edit: 'Rediger',
      done: 'Ferdig',
      back: 'Tilbake',
      close: 'Lukk',
      all: 'Alle',
      search: 'Søk',
      loading: 'Laster...',
      error: 'Noe gikk galt',
      success: 'Vellykket lagret',
      bestViewedOnMobile: 'Best tilpasset mobil',
      offlineBanner: 'Frakoblet modus — endringer lagres lokalt på enheten',
      syncedBanner: 'Alt er synkronisert',
      syncingBanner: 'Synkroniserer endringer...',
      comfortStatus: {
        comfortable: 'Optimalt',
        humid: 'Høy luftfuktighet',
        too_warm: 'Varmt varsel',
        cool: 'Kjølig'
      }
    },
    nav: {
      home: 'I dag',
      horses: 'Hester',
      scan: 'Skann',
      tasks: 'Oppgaver',
      profile: 'Profil'
    },
    home: {
      greetingMorning: 'God morgen',
      greetingAfternoon: 'God ettermiddag',
      greetingEvening: 'God kveld',
      weatherSummary: 'Nordlys Stables · Frisk morgen i luftegården',
      sensorCardTitle: 'Stallmiljø & Klima',
      sensorLastSync: 'Synkronisert for 3 min siden',
      viewSensorDetails: 'Trykk for 7-dagers klimainnsikt',
      temperature: 'Temperatur',
      humidity: 'Luftfuktighet',
      todaysTasks: 'Dagens oppgaver',
      tasksCompleted: '{done} av {total} fullført',
      yourHorses: 'Dine hester',
      recentTraining: 'Nylige treningsøkter',
      attentionRequired: 'Tilsyn påkrevd',
      humidityAlertDesc: 'Stallfløy A nådde 82% fuktighet kl. 04:15. Åpne nordlig ventilasjonsluke.',
      noTasksToday: 'Alle oppgaver er fullført for i dag',
      viewAll: 'Se alle'
    },
    horses: {
      title: 'Hesteoversikt',
      searchPlaceholder: 'Søk etter navn, rase eller boks...',
      filters: {
        all: 'Alle hester',
        training: 'I trening',
        resting: 'Hvile',
        retired: 'Pensjonert'
      },
      addNewHorse: 'Registrer hest',
      ageYears: '{age} år',
      hands: '{height} hh',
      centimeters: '{height} cm',
      boxLabel: 'Boks {box}',
      tabs: {
        overview: 'Oversikt',
        training: 'Trening',
        environment: 'Klima',
        products: 'Pass'
      },
      overview: {
        keyFacts: 'Grunnfakta',
        breed: 'Rase',
        gender: 'Kjønn',
        height: 'Mankehøyde',
        color: 'Farge',
        microchip: 'Brikkenummer',
        ueln: 'UELN / Livsnummer',
        owner: 'Registrert eier',
        temperament: 'Gemytt & lynne',
        feedSchedule: 'Fôringsrutine',
        morningFeed: 'Morgenfôr',
        middayFeed: 'Middagshøy',
        eveningFeed: 'Kveldsfôr',
        supplements: 'Tilskudd',
        careSchedule: 'Pleie og oppfølging',
        nextFarrier: 'Neste hovslagerbesøk',
        nextVet: 'Neste veterinærkontroll',
        vaccinations: 'Vaksinestatus',
        upToDate: 'Oppdatert'
      },
      addHorseSheet: {
        title: 'Registrer ny hest',
        nameLabel: 'Hestens navn',
        breedLabel: 'Rase',
        genderLabel: 'Kjønn',
        birthYearLabel: 'Fødselsår',
        heightLabel: 'Mankehøyde (cm)',
        boxLabel: 'Boksnummer',
        statusLabel: 'Status',
        notesLabel: 'Merknader og gemytt',
        submit: 'Lagre hest'
      }
    },
    tasks: {
      title: 'Stalloppgaver',
      searchPlaceholder: 'Søk i oppgaver eller ansvarlige...',
      tabs: {
        today: 'I dag',
        overdue: 'Forfalt',
        upcoming: 'Kommende',
        done: 'Fullført'
      },
      priority: {
        high: 'Haster',
        normal: 'Normal',
        low: 'Rutine'
      },
      recurrence: {
        daily: 'Daglig',
        weekly: 'Ukentlig',
        none: 'Engangs'
      },
      swipeToComplete: 'Sveip til høyre for å fullføre',
      swipeToDelete: 'Sveip til venstre for å slette',
      createTask: 'Ny oppgave',
      emptyToday: 'Ingen gjenværende oppgaver for i dag. Alt går som smurt.',
      emptySection: 'Ingen oppgaver i denne visningen.',
      createSheet: {
        title: 'Opprett stalloppgave',
        titleLabel: 'Beskrivelse',
        horseLabel: 'Tilhørende hest (valgfritt)',
        assigneeLabel: 'Ansvarlig person',
        dueDateLabel: 'Fristdato',
        dueTimeLabel: 'Klokkeslett',
        priorityLabel: 'Prioritet',
        recurrenceLabel: 'Gjentakelse',
        notesLabel: 'Instruksjoner',
        submit: 'Planlegg oppgave'
      }
    },
    training: {
      title: 'Treningslogg',
      logSession: 'Loggfør økt',
      weeklyLoad: 'Ukentlig treningsbelastning',
      totalMinutes: '{minutes} min loggført denne uken',
      intensity: 'Intensitetsnivå',
      duration: 'Varighet',
      rider: 'Rytter / Trener',
      surface: 'Underlag',
      notes: 'Øktnotater',
      disciplines: {
        Dressage: 'Dressur',
        Jumping: 'Sprangridning',
        Hacking: 'Turridning',
        Lunging: 'Lonsjering',
        Groundwork: 'Bakkearbeid',
        Rest: 'Aktiv hvile'
      },
      logSheet: {
        title: 'Loggfør treningsøkt',
        horseLabel: 'Hest',
        typeLabel: 'Disiplin',
        durationLabel: 'Varighet (minutter)',
        intensityLabel: 'Fysisk intensitet (1-5)',
        riderLabel: 'Rytter',
        surfaceLabel: 'Ridebane / underlag',
        notesLabel: 'Observasjoner og følelse',
        submit: 'Lagre økt'
      }
    },
    sensor: {
      title: 'Klimasensor',
      pairedDevice: 'Equora Climate S1',
      battery: 'Batteri',
      firmware: 'Fastvare',
      signal: 'Bluetooth-signal',
      liveReadings: 'Sanntids stalltelemetri',
      comfortRangeNotice: 'Optimalt trivselsområde: 10°C–20°C og 50%–70% RF',
      readStoredData: 'Hent lagrede flash-data',
      syncingDeviceData: 'Laster ned 7 dagers loggminne...',
      chartTitle: 'Klimautvikling',
      view24h: 'Siste 24 timer',
      view7d: 'Siste 7 dager',
      disconnectSim: 'Simuler brudd på tilkobling',
      reconnecting: 'Tilkobling brutt — søker etter S1-sensor...',
      reconnected: 'Sensor tilkoblet igjen',
      notPairedTitle: 'Ingen klimasensor tilkoblet',
      notPairedDesc: 'Koble til en Equora Climate S1-sensor for kontinuerlig overvåking av temperatur og luftfuktighet.',
      startPairing: 'Koble til Equora-sensor',
      pairingSteps: {
        step1Title: 'Trinn 1: Skann sensorens QR-kode',
        step1Desc: 'Finn QR-koden på baksiden av Equora S1-enheten.',
        step2Title: 'Søker etter Bluetooth-signal...',
        step2Desc: 'Hold telefonen innenfor 3 meter fra sensoren.',
        step3Title: 'Sensor oppdaget',
        step3Desc: 'Fant Equora Climate S1 · SN 4F2A-91',
        step4Title: 'Fullfører kryptert tilkobling...',
        failedTitle: 'Tilkobling mislyktes',
        failedDesc: 'Kunne ikke opprette BLE-kontakt. Sjekk at Bluetooth er på.',
        retry: 'Prøv igjen'
      }
    },
    passport: {
      title: 'Digitalt produktpass',
      scanTitle: 'Skann Equora-kode',
      scanDesc: 'Rett kameraet mot QR-koden på Equora-utstyr eller sensor.',
      simulateScan: 'Simuler QR-skann',
      cameraPermissionNotice: 'Kamera er klart. Trykk "Simuler QR-skann" ved testing uten fysisk kode.',
      verifiedSeal: 'Verifisert ekthet fra Equora',
      certHashLabel: 'Kryptografisk pass-ID',
      manufacturedIn: 'Håndlaget i',
      materialsLabel: 'Materialer og opprinnelse',
      warrantyLabel: 'Fabrikkgaranti',
      warrantyActive: 'Aktiv · {months} måneder gjenstår',
      sustainability: 'Bærekraft og livsløp',
      carbonFootprint: 'CO₂e-fotavtrykk',
      recycledContent: 'Resirkulert andel',
      repairGuarantee: 'Livstidsgaranti på sømreparasjon',
      careGuide: 'Vedlikehold og vaskeguide',
      ownershipHistory: 'Eier- og servicehistorikk',
      linkedHorse: 'Tilknyttet hest',
      registerSheet: {
        title: 'Registrer Equora-produkt',
        productName: 'Produkt oppdaget',
        assignToHorse: 'Knytt til hest',
        purchaseDate: 'Kjøpsdato',
        confirmRegister: 'Registrer i stallen'
      }
    },
    activity: {
      title: 'Aktivitetssenter',
      markAllRead: 'Merk alle som lest',
      today: 'I dag',
      earlier: 'Tidligere',
      empty: 'Ingen nye varsler'
    },
    profile: {
      title: 'Stall & innstillinger',
      stableRole: 'Hovedstallmester',
      stableName: 'Nordlys Stables · Lillehammer',
      teamMembers: 'Stallteam og veterinærer',
      sections: {
        preferences: 'Innstillinger',
        devices: 'Utstyr og pass',
        developer: 'Utvikler- og demo-kontroller',
        account: 'Konto'
      },
      language: 'Språk',
      units: 'Måleenheter',
      appearance: 'Utseende',
      appearanceOptions: {
        light: 'Lyst',
        dark: 'Mørkt',
        system: 'System'
      },
      textSize: 'Tekststørrelse',
      textSizeOptions: {
        standard: 'Standard',
        large: 'Stor',
        xlarge: 'Ekstra stor'
      },
      reduceMotion: 'Reduser bevegelse',
      notifications: 'Push-varsler',
      myProducts: 'Registrerte produktpass',
      pairedSensors: 'Bluetooth-sensorer',
      offlineMode: 'Simuler frakoblet modus',
      triggerConflict: 'Utløs synkroniseringskonflikt',
      triggerPush: 'Utløs klimavarsel-banner',
      resetData: 'Tilbakestill demodata',
      signOut: 'Logg ut'
    },
    sync: {
      queueTitle: 'Frakoblet synkroniseringskø',
      queueDesc: 'Handlinger utført offline lagres trygt på enheten og overføres straks nettet er tilbake.',
      pendingChanges: '{count} endringer venter',
      syncNow: 'Synkroniser nå',
      allSynced: 'Køen er tom — alt er synkronisert',
      conflictTitle: 'Synkroniseringskonflikt oppdaget',
      conflictDesc: 'Det er gjort endringer både lokalt og på serveren fra en annen medarbeider mens du var frakoblet.',
      localVersion: 'Din lokale versjon',
      serverVersion: 'Serverversjon (Fjern)',
      keepMine: 'Behold min versjon',
      keepServer: 'Bruk serverversjon',
      mergeBoth: 'Flett sammen'
    }
  }
};
