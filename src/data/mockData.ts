import {
  Horse,
  Task,
  TrainingLog,
  SensorReading,
  SensorDevice,
  ProductPassport,
  ActivityItem,
  TeamMember
} from '../types';

export const initialHorses: Horse[] = [
  {
    id: 'h-saga',
    name: 'Saga',
    breed: 'Norwegian Fjord',
    age: 8,
    birthYear: 2018,
    gender: 'Mare',
    color: 'Brunblakk (Brown Dun)',
    heightHands: 14.2,
    heightCm: 147,
    microchip: '578098100293411',
    ueln: 'NOR-2018-0921',
    owner: 'Astrid & Henrik Lindqvist',
    box: 'Barn A · 01',
    status: 'training',
    photo: '/src/assets/images/horse_fjord_saga_1793636874142.jpg',
    temperament: 'Steady, highly intelligent, affectionate, exceptional focus in dressage',
    weightKg: 465,
    notes: 'Responsive to subtle seat aids. Loves outdoor paddock turnout in cool crisp weather.',
    feedSchedule: {
      morning: '2.5 kg Nordic Meadow Haylage + 400g Spelt mash',
      midday: '2.0 kg High-fiber meadow hay',
      evening: '3.0 kg Haylage + Equine Mineral Plus',
      supplements: 'Electrolytes after intensive work, Vitamin E & Selenium'
    },
    careSchedule: {
      nextFarrier: '2026-11-14',
      nextVet: '2026-12-05',
      nextDentist: '2027-03-20',
      vaccinationsUpToDate: true
    }
  },
  {
    id: 'h-marquis',
    name: 'Marquis du Bois',
    breed: 'Hanoverian Warmblood',
    age: 11,
    birthYear: 2015,
    gender: 'Gelding',
    color: 'Deep Dark Bay',
    heightHands: 16.3,
    heightCm: 170,
    microchip: '276020000492182',
    ueln: 'DE-2015-431310',
    owner: 'Nordlys Equestrian Syndicate',
    box: 'Barn A · 04',
    status: 'training',
    photo: '/src/assets/images/horse_warmblood_marquis_1793636875651.jpg',
    temperament: 'Sensitive, athletic, noble, high cadence in trot and collected canter',
    weightKg: 610,
    notes: 'Requires thorough 15-minute warm-up walk. Sensitive skin, use fleece-lined girth only.',
    feedSchedule: {
      morning: '3.5 kg Alpine Timothy hay + 800g Competition muesli',
      midday: '2.5 kg Timothy hay',
      evening: '4.0 kg Timothy hay + Micronized linseed',
      supplements: 'Joint support (Glucosamine/MSM) & Omega-3 marine oil'
    },
    careSchedule: {
      nextFarrier: '2026-11-10',
      nextVet: '2026-11-28',
      nextDentist: '2027-01-15',
      vaccinationsUpToDate: true
    }
  },
  {
    id: 'h-fjordlys',
    name: 'Fjordlys',
    breed: 'Norwegian Coldblood',
    age: 7,
    birthYear: 2019,
    gender: 'Gelding',
    color: 'Golden Chestnut with Flaxen Mane',
    heightHands: 15.1,
    heightCm: 155,
    microchip: '578098100341890',
    ueln: 'NOR-2019-1144',
    owner: 'Karin Lindqvist',
    box: 'Barn A · 02',
    status: 'training',
    photo: '/src/assets/images/horse_chestnut_fjordlys_1793636876665.jpg',
    temperament: 'Calm, confident, dependable trail navigator, bold over natural obstacles',
    weightKg: 530,
    notes: 'Exceptional hoof quality, barefoot conditioned. Thrives in group paddock turnout.',
    feedSchedule: {
      morning: '2.5 kg Timothy Haylage + Beet pulp',
      midday: '2.0 kg Mountain Meadow hay',
      evening: '3.0 kg Haylage + Cold-pressed flax oil',
      supplements: 'Bio-Zinc and Seaweed kelp blend'
    },
    careSchedule: {
      nextFarrier: '2026-11-20',
      nextVet: '2027-01-10',
      nextDentist: '2027-04-02',
      vaccinationsUpToDate: true
    }
  },
  {
    id: 'h-valegro',
    name: 'Valegro Star',
    breed: 'Dutch Warmblood (KWPN)',
    age: 9,
    birthYear: 2017,
    gender: 'Gelding',
    color: 'Liver Chestnut',
    heightHands: 17.0,
    heightCm: 173,
    microchip: '528210004812399',
    ueln: 'NLD-2017-5501',
    owner: 'Elena & Christian Berg',
    box: 'Barn B · 01',
    status: 'training',
    photo: '/src/assets/images/horse_warmblood_valegro_1793636936220.jpg',
    temperament: 'Energetic, expressive mover, loves show jumping gymnastics',
    weightKg: 625,
    notes: 'Wears Equora Kinetic Tendon boots during all arena jumping sessions.',
    feedSchedule: {
      morning: '3.5 kg Rye grass hay + 750g Sport oats mix',
      midday: '2.5 kg Meadow hay',
      evening: '4.0 kg Hay + Electrolytes',
      supplements: 'Magnesium calming balance + Biotin hoof fortifier'
    },
    careSchedule: {
      nextFarrier: '2026-11-18',
      nextVet: '2026-12-12',
      nextDentist: '2027-02-18',
      vaccinationsUpToDate: true
    }
  },
  {
    id: 'h-solvind',
    name: 'Solvind',
    breed: 'Icelandic Horse',
    age: 12,
    birthYear: 2014,
    gender: 'Stallion',
    color: 'Silver Dapple Black (Vindótt)',
    heightHands: 13.3,
    heightCm: 140,
    microchip: '352098100145229',
    ueln: 'ISL-2014-1082',
    owner: 'Snorri Thorsson',
    box: 'Barn B · 03',
    status: 'resting',
    photo: '/src/assets/images/horse_icelandic_solvind_1793636900616.jpg',
    temperament: 'Strong five-gaited stallion, spirited, gentle with humans',
    weightKg: 390,
    notes: 'Currently on 2-week active recovery following autumn mountain trekking season.',
    feedSchedule: {
      morning: '2.0 kg Mountain hay + Mineral lick',
      midday: '1.5 kg Mountain hay',
      evening: '2.5 kg Mountain hay + Mash with herbs',
      supplements: 'Icelandic Sea Kelp & Rosehip powder'
    },
    careSchedule: {
      nextFarrier: '2026-11-25',
      nextVet: '2026-11-30',
      nextDentist: '2027-05-14',
      vaccinationsUpToDate: true
    }
  },
  {
    id: 'h-epona',
    name: 'Epona Belle',
    breed: 'Irish Sport Horse',
    age: 6,
    birthYear: 2020,
    gender: 'Mare',
    color: 'Dappled Grey',
    heightHands: 16.1,
    heightCm: 165,
    microchip: '372140300184920',
    ueln: 'IRL-2020-8830',
    owner: 'Celine Dupont',
    box: 'Barn A · 07',
    status: 'training',
    photo: '/src/assets/images/horse_grey_epona_1793636936468.jpg',
    temperament: 'Curious, fast learner, gentle disposition, showing great promise in eventing',
    weightKg: 560,
    notes: 'Young horse progression plan. Keep sessions to 35 minutes max to preserve mental freshness.',
    feedSchedule: {
      morning: '3.0 kg Meadow hay + 500g Young Horse Balancer',
      midday: '2.0 kg Timothy hay',
      evening: '3.5 kg Meadow hay + Soaked beet pulp',
      supplements: 'Calcium/Phosphorus ratio balancer & Prebiotics'
    },
    careSchedule: {
      nextFarrier: '2026-11-12',
      nextVet: '2026-12-20',
      nextDentist: '2027-02-10',
      vaccinationsUpToDate: true
    }
  },
  {
    id: 'h-brimir',
    name: 'Brimir frá Holtsmula',
    breed: 'Icelandic Horse',
    age: 19,
    birthYear: 2007,
    gender: 'Gelding',
    color: 'Red Dun with Eel Stripe',
    heightHands: 13.2,
    heightCm: 138,
    microchip: '352098100004918',
    ueln: 'ISL-2007-0041',
    owner: 'Nordlys Stable School',
    box: 'Barn C · 02',
    status: 'retired',
    photo: '/src/assets/images/horse_elder_brimir_1793636936420.jpg',
    temperament: 'Wise, patient herd elder, loves grooming and grazing companion',
    weightKg: 380,
    notes: 'Honorable retirement. Daily light walk and herd leadership in north meadow.',
    feedSchedule: {
      morning: '2.0 kg Soft senior hay + Soaked alfalfa cubes',
      midday: '1.5 kg Soft hay',
      evening: '2.0 kg Soft hay + Senior mash with warm water',
      supplements: 'Senior joint mobility herb mix & Boswellia'
    },
    careSchedule: {
      nextFarrier: '2026-11-16',
      nextVet: '2026-11-22',
      nextDentist: '2026-12-08',
      vaccinationsUpToDate: true
    }
  }
];

export const initialTasks: Task[] = [
  // Overdue
  {
    id: 't-101',
    title: 'Inspect stable drainage and bedding',
    assigneeName: 'Ingrid Solheim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    dueTime: '06:30',
    dueDate: '2026-11-01',
    recurrence: 'daily',
    priority: 'high',
    completed: false,
    notes: 'Check moisture absorption in Barn A after heavy overnight frost.',
    category: 'stable'
  },
  {
    id: 't-102',
    title: 'Saga — hoof grease application',
    horseId: 'h-saga',
    horseName: 'Saga',
    assigneeName: 'Karin Lindqvist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueTime: '07:00',
    dueDate: '2026-11-01',
    recurrence: 'none',
    priority: 'normal',
    completed: false,
    notes: 'Laurel oil on coronet band before turnout.',
    category: 'vet'
  },
  // Today
  {
    id: 't-201',
    title: 'Morning feed & warm mash — Barn A',
    assigneeName: 'Ingrid Solheim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    dueTime: '07:00',
    dueDate: '2026-11-02',
    recurrence: 'daily',
    priority: 'high',
    completed: true,
    completedAt: '07:12',
    category: 'feed'
  },
  {
    id: 't-202',
    title: 'Paddock turnout 1 & 2 (Saga, Marquis)',
    horseId: 'h-marquis',
    horseName: 'Marquis du Bois',
    assigneeName: 'Henrik Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    dueTime: '08:30',
    dueDate: '2026-11-02',
    recurrence: 'daily',
    priority: 'high',
    completed: true,
    completedAt: '08:28',
    category: 'turnout'
  },
  {
    id: 't-203',
    title: 'Equora Climate S1 battery check & sync',
    assigneeName: 'Karin Lindqvist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueTime: '10:00',
    dueDate: '2026-11-02',
    recurrence: 'weekly',
    priority: 'normal',
    completed: true,
    completedAt: '09:55',
    category: 'stable'
  },
  {
    id: 't-204',
    title: 'Midday hay replenishment — All stalls',
    assigneeName: 'Ingrid Solheim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    dueTime: '12:30',
    dueDate: '2026-11-02',
    recurrence: 'daily',
    priority: 'normal',
    completed: false,
    category: 'feed'
  },
  {
    id: 't-205',
    title: 'Epona Belle — Groundwork session (30 min)',
    horseId: 'h-epona',
    horseName: 'Epona Belle',
    assigneeName: 'Henrik Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    dueTime: '14:00',
    dueDate: '2026-11-02',
    recurrence: 'none',
    priority: 'normal',
    completed: false,
    notes: 'Focus on pole work and straightness in arena 2.',
    category: 'training'
  },
  {
    id: 't-206',
    title: 'Farrier arrival: Marquis & Epona shoeing',
    horseId: 'h-marquis',
    horseName: 'Marquis du Bois',
    assigneeName: 'Karin Lindqvist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueTime: '15:30',
    dueDate: '2026-11-02',
    recurrence: 'none',
    priority: 'high',
    completed: false,
    notes: 'Farrier Ole Hansen arriving. Have Marquis groomed and in tie-stall.',
    category: 'vet'
  },
  {
    id: 't-207',
    title: 'Bring horses in from paddocks',
    assigneeName: 'Ingrid Solheim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    dueTime: '17:00',
    dueDate: '2026-11-02',
    recurrence: 'daily',
    priority: 'high',
    completed: false,
    category: 'turnout'
  },
  {
    id: 't-208',
    title: 'Evening feed & blankets check',
    assigneeName: 'Ingrid Solheim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    dueTime: '19:30',
    dueDate: '2026-11-02',
    recurrence: 'daily',
    priority: 'high',
    completed: false,
    category: 'feed'
  },
  {
    id: 't-209',
    title: 'Night barn lockup and temperature log',
    assigneeName: 'Karin Lindqvist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueTime: '21:30',
    dueDate: '2026-11-02',
    recurrence: 'daily',
    priority: 'normal',
    completed: false,
    category: 'stable'
  },
  // Upcoming
  {
    id: 't-301',
    title: 'Valegro Star — Gymnastic jumping line',
    horseId: 'h-valegro',
    horseName: 'Valegro Star',
    assigneeName: 'Henrik Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    dueTime: '10:00',
    dueDate: '2026-11-03',
    recurrence: 'weekly',
    priority: 'normal',
    completed: false,
    category: 'training'
  },
  {
    id: 't-302',
    title: 'Hay delivery inspection (12 metric tons)',
    assigneeName: 'Karin Lindqvist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueTime: '11:00',
    dueDate: '2026-11-04',
    recurrence: 'none',
    priority: 'high',
    completed: false,
    notes: 'Verify moisture meter <14% before offloading into dry barn loft.',
    category: 'stable'
  },
  {
    id: 't-303',
    title: 'Veterinary booster vaccines — Barn C',
    horseId: 'h-brimir',
    horseName: 'Brimir frá Holtsmula',
    assigneeName: 'Dr. Lars Moen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    dueTime: '14:00',
    dueDate: '2026-11-05',
    recurrence: 'none',
    priority: 'normal',
    completed: false,
    category: 'vet'
  },
  {
    id: 't-304',
    title: 'Saga — Arena Dressage Test Practise',
    horseId: 'h-saga',
    horseName: 'Saga',
    assigneeName: 'Karin Lindqvist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueTime: '15:00',
    dueDate: '2026-11-05',
    recurrence: 'none',
    priority: 'normal',
    completed: false,
    category: 'training'
  },
  {
    id: 't-305',
    title: 'Winter blanket waterproof treatment test',
    assigneeName: 'Ingrid Solheim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    dueTime: '09:00',
    dueDate: '2026-11-06',
    recurrence: 'none',
    priority: 'low',
    completed: false,
    category: 'stable'
  },
  // Done previously
  {
    id: 't-401',
    title: 'Clean automatic waterers — Barn A & B',
    assigneeName: 'Ingrid Solheim',
    assigneeAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    dueTime: '08:00',
    dueDate: '2026-11-01',
    recurrence: 'weekly',
    priority: 'normal',
    completed: true,
    completedAt: '08:45',
    category: 'stable'
  },
  {
    id: 't-402',
    title: 'Solvind — 30 min gentle in-hand walk',
    horseId: 'h-solvind',
    horseName: 'Solvind',
    assigneeName: 'Henrik Vance',
    assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    dueTime: '11:00',
    dueDate: '2026-11-01',
    recurrence: 'none',
    priority: 'low',
    completed: true,
    completedAt: '11:35',
    category: 'training'
  },
  {
    id: 't-403',
    title: 'Disinfect medical tack kit',
    assigneeName: 'Karin Lindqvist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    dueTime: '16:00',
    dueDate: '2026-11-01',
    recurrence: 'weekly',
    priority: 'normal',
    completed: true,
    completedAt: '16:20',
    category: 'vet'
  }
];

export const initialTrainingLogs: TrainingLog[] = [
  {
    id: 'tr-01',
    horseId: 'h-saga',
    horseName: 'Saga',
    type: 'Dressage',
    durationMinutes: 45,
    intensity: 4,
    rider: 'Karin Lindqvist',
    surface: 'Indoor arena',
    date: '2026-11-02',
    notes: 'Exceptional shoulder-in and travers on both reins. Cadence stayed relaxed through medium trot transitions.',
    rhythmScore: 9
  },
  {
    id: 'tr-02',
    horseId: 'h-marquis',
    horseName: 'Marquis du Bois',
    type: 'Dressage',
    durationMinutes: 50,
    intensity: 4,
    rider: 'Henrik Vance',
    surface: 'Indoor arena',
    date: '2026-11-01',
    notes: 'Working on flying changes every 4 strides. Marquis was alert and listening to subtle leg aids.',
    rhythmScore: 8
  },
  {
    id: 'tr-03',
    horseId: 'h-valegro',
    horseName: 'Valegro Star',
    type: 'Jumping',
    durationMinutes: 40,
    intensity: 5,
    rider: 'Henrik Vance',
    surface: 'Sand arena',
    date: '2026-10-31',
    notes: '1.20m gymnastic grid. Quick reflex off the front leg, baseline bascule in clean form.',
    rhythmScore: 9
  },
  {
    id: 'tr-04',
    horseId: 'h-fjordlys',
    horseName: 'Fjordlys',
    type: 'Hacking',
    durationMinutes: 65,
    intensity: 3,
    rider: 'Karin Lindqvist',
    surface: 'Trail',
    date: '2026-10-30',
    notes: 'Pine forest loop with 180m elevation ascent. Heart rate recovered within 4 minutes at top ridge.',
    rhythmScore: 8
  },
  {
    id: 'tr-05',
    horseId: 'h-epona',
    horseName: 'Epona Belle',
    type: 'Groundwork',
    durationMinutes: 30,
    intensity: 2,
    rider: 'Henrik Vance',
    surface: 'Indoor arena',
    date: '2026-10-29',
    notes: 'Cavesson work on the 15m circle. Good softness in poll and stepping under with inside hind.',
    rhythmScore: 8
  },
  {
    id: 'tr-06',
    horseId: 'h-saga',
    horseName: 'Saga',
    type: 'Lunging',
    durationMinutes: 35,
    intensity: 3,
    rider: 'Ingrid Solheim',
    surface: 'Indoor arena',
    date: '2026-10-28',
    notes: 'Side reins loose setting. Great forward-downward stretch in working trot.',
    rhythmScore: 9
  },
  {
    id: 'tr-07',
    horseId: 'h-marquis',
    horseName: 'Marquis du Bois',
    type: 'Hacking',
    durationMinutes: 45,
    intensity: 2,
    rider: 'Karin Lindqvist',
    surface: 'Trail',
    date: '2026-10-27',
    notes: 'Cool autumn recovery walk on soft needle path. Relaxed swinging back.',
    rhythmScore: 8
  },
  {
    id: 'tr-08',
    horseId: 'h-valegro',
    horseName: 'Valegro Star',
    type: 'Dressage',
    durationMinutes: 45,
    intensity: 4,
    rider: 'Henrik Vance',
    surface: 'Indoor arena',
    date: '2026-10-26',
    notes: 'Collection work in canter pirouette preparations. High engagement.',
    rhythmScore: 8
  },
  {
    id: 'tr-09',
    horseId: 'h-saga',
    horseName: 'Saga',
    type: 'Dressage',
    durationMinutes: 40,
    intensity: 3,
    rider: 'Karin Lindqvist',
    surface: 'Indoor arena',
    date: '2026-10-25',
    notes: 'Half passes and rein-back. Calm and focused.',
    rhythmScore: 9
  },
  {
    id: 'tr-10',
    horseId: 'h-solvind',
    horseName: 'Solvind',
    type: 'Rest',
    durationMinutes: 20,
    intensity: 1,
    rider: 'Henrik Vance',
    surface: 'Grass',
    date: '2026-10-24',
    notes: 'Active hand walking on pasture perimeter.',
    rhythmScore: 7
  },
  {
    id: 'tr-11',
    horseId: 'h-fjordlys',
    horseName: 'Fjordlys',
    type: 'Groundwork',
    durationMinutes: 35,
    intensity: 3,
    rider: 'Karin Lindqvist',
    surface: 'Indoor arena',
    date: '2026-10-23',
    notes: 'Long-reining practice around cones and poles. Steady cadence.',
    rhythmScore: 8
  },
  {
    id: 'tr-12',
    horseId: 'h-marquis',
    horseName: 'Marquis du Bois',
    type: 'Jumping',
    durationMinutes: 45,
    intensity: 4,
    rider: 'Henrik Vance',
    surface: 'Sand arena',
    date: '2026-10-22',
    notes: 'Triple bar combination, clean clearance with confident approach.',
    rhythmScore: 8
  }
];

// Generate 7 days of 15-minute readings for climate chart
export function generate7DaySensorReadings(): SensorReading[] {
  const readings: SensorReading[] = [];
  const totalPoints = 7 * 24 * 4; // 672 points
  const now = new Date('2026-11-02T08:00:00Z');

  for (let i = totalPoints - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 15 * 60 * 1000);
    const hour = timestamp.getUTCHours() + timestamp.getUTCMinutes() / 60;
    
    // Day-night sinusoidal pattern:
    // Coldest at 05:00 (~9-11°C), warmest at 14:00 (~18-21°C)
    const baseTemp = 15 + 5.2 * Math.sin(((hour - 9) * Math.PI) / 12);
    // Slight random drift
    const noiseTemp = (Math.sin(i * 0.17) + Math.cos(i * 0.05)) * 0.6;
    const tempC = Math.round((baseTemp + noiseTemp) * 10) / 10;
    const tempF = Math.round((tempC * 1.8 + 32) * 10) / 10;

    // Humidity inversely related to temp:
    // Highest at night (72-84%), lowest at mid-day (56-64%)
    const baseHum = 69 - 11 * Math.sin(((hour - 9) * Math.PI) / 12);
    const noiseHum = (Math.cos(i * 0.13) + Math.sin(i * 0.07)) * 2.5;
    const humidity = Math.min(92, Math.max(48, Math.round(baseHum + noiseHum)));

    let comfort: 'comfortable' | 'humid' | 'too_warm' | 'cool' = 'comfortable';
    if (humidity > 80) comfort = 'humid';
    else if (tempC > 21) comfort = 'too_warm';
    else if (tempC < 10) comfort = 'cool';

    const hh = String(timestamp.getUTCHours()).padStart(2, '0');
    const mm = String(timestamp.getUTCMinutes()).padStart(2, '0');

    readings.push({
      timestamp: timestamp.toISOString(),
      timeLabel: `${hh}:${mm}`,
      temperatureC: tempC,
      temperatureF: tempF,
      humidityPercent: humidity,
      comfort
    });
  }

  return readings;
}

export const initialSensorDevice: SensorDevice = {
  id: 'sensor-s1-4f2a',
  name: 'Equora Climate S1',
  serialNumber: 'EQ-S1-4F2A-91',
  paired: true,
  isConnected: true,
  batteryPercent: 94,
  firmwareVersion: 'v2.1.4-nordic',
  rssi: -58,
  lastSyncTime: '2026-11-02T08:05:00Z',
  location: 'Barn A · Main Aisle Center'
};

export const initialPassports: ProductPassport[] = [
  {
    id: 'prod-thermal-pro',
    serialNumber: 'EQ-RUG-2026-8821',
    name: 'Equora Thermal Air-Mesh Blanket',
    model: 'ThermaBreath 300g Pro',
    category: 'blanket',
    heroImage: '/src/assets/images/product_turnout_blanket_1793636876492.jpg',
    verifiedAuthentic: true,
    certHash: '0x8f2c...71be49a0e1',
    manufactureDate: '2026-08-14',
    origin: 'Gudbrandsdalen, Norway',
    materials: [
      '100% Recycled Post-Consumer Ballistic Ripstop',
      'Nordic Merino Wool blended wither lining',
      'Non-toxic fluorocarbon-free Bionic Finish Eco DWR',
      'Aerospace grade anodized alloy buckle hardware'
    ],
    warrantyMonths: 36,
    warrantyExpiryDate: '2029-08-14',
    co2FootprintKg: 4.8,
    recycledPercent: 88,
    careInstructions: [
      'Machine wash cold at 30°C on delicate wool cycle',
      'Use natural equestrian-safe technical detergent',
      'Hang dry naturally away from direct heaters',
      'Inspect front surcingle bar-tack stitching quarterly'
    ],
    ownershipTimeline: [
      {
        date: '2026-08-14',
        title: 'Precision Manufactured & Batch Tested',
        description: 'Passed 1500N hydrostatic head waterproof testing at Lillehammer atelier.',
        party: 'Equora Craft Labs'
      },
      {
        date: '2026-08-28',
        title: 'Quality Seal & Digital Passport Minted',
        description: 'Cryptographic authenticity tag verified with NFC / QR dual key.',
        party: 'Nordic Equine Standards Bureau'
      },
      {
        date: '2026-09-02',
        title: 'Registered to Nordlys Stables',
        description: 'Assigned to Saga for winter barn and turnout comfort.',
        party: 'Karin Lindqvist'
      }
    ],
    linkedHorseId: 'h-saga',
    linkedHorseName: 'Saga',
    purchaseDate: '2026-09-02'
  },
  {
    id: 'prod-boots-kinetic',
    serialNumber: 'EQ-BOT-2026-4419',
    name: 'Equora Kinetic Tendon Boots',
    model: 'AeroShield Carbon Mk II',
    category: 'boots',
    heroImage: '/src/assets/images/product_tendon_boots_1793636876657.jpg',
    verifiedAuthentic: true,
    certHash: '0x3a91...bce721008f',
    manufactureDate: '2026-06-20',
    origin: 'Stavanger, Norway',
    materials: [
      'Bio-based TPU shock absorption strike shell',
      'Perforated micro-mesh 3D airflow lining',
      'Forged titanium quick-release closure pegs',
      'Recycled marine ocean plastic binding webbing'
    ],
    warrantyMonths: 24,
    warrantyExpiryDate: '2028-06-20',
    co2FootprintKg: 2.3,
    recycledPercent: 74,
    careInstructions: [
      'Rinse with fresh hose water immediately after schooling',
      'Clean strike plate with soft horsehair brush',
      'Air dry in shaded tack room'
    ],
    ownershipTimeline: [
      {
        date: '2026-06-20',
        title: 'Forged & Assembled',
        description: 'Impact certified to exceed 120 Joules kinetic deflection.',
        party: 'Equora Technical Tack'
      },
      {
        date: '2026-07-15',
        title: 'Delivered & Assigned',
        description: 'Linked to Valegro Star for jumping protection.',
        party: 'Henrik Vance'
      }
    ],
    linkedHorseId: 'h-valegro',
    linkedHorseName: 'Valegro Star',
    purchaseDate: '2026-07-15'
  },
  {
    id: 'prod-bridle-ergonomic',
    serialNumber: 'EQ-BRL-2025-1108',
    name: 'Equora Ergonomic Anatomical Bridle',
    model: 'Cranio-Relief No. 3',
    category: 'bridle',
    heroImage: '/src/assets/images/product_bridle_ergo_1793636900020.jpg',
    verifiedAuthentic: true,
    certHash: '0x77ee...8820fbc412',
    manufactureDate: '2025-11-10',
    origin: 'Røros, Norway',
    materials: [
      'Vegetable-tanned organic Scandinavian steer leather',
      'Anatomical memory-foam occipital poll relief padding',
      'Solid hand-buffed surgical stainless steel buckles',
      'Waxed Irish linen hand-stitched keepers'
    ],
    warrantyMonths: 60,
    warrantyExpiryDate: '2030-11-10',
    co2FootprintKg: 3.1,
    recycledPercent: 62,
    careInstructions: [
      'Wipe down sweat with damp soft sponge after every ride',
      'Condition with beeswax-based saddle balm monthly',
      'Store in temperature-controlled tack room'
    ],
    ownershipTimeline: [
      {
        date: '2025-11-10',
        title: 'Master Saddler Inspection',
        description: 'Stitched by master saddler Torvald Eide. Serial stamped.',
        party: 'Equora Heritage Line'
      },
      {
        date: '2025-12-01',
        title: 'Acquired by Syndicate',
        description: 'Custom fitted for Marquis du Bois dressage grand prix circuit.',
        party: 'Nordlys Syndicate'
      }
    ],
    linkedHorseId: 'h-marquis',
    linkedHorseName: 'Marquis du Bois',
    purchaseDate: '2025-12-01'
  },
  {
    id: 'prod-sensor-s1',
    serialNumber: 'EQ-S1-4F2A-91',
    name: 'Equora Climate S1 Stable Sensor',
    model: 'S1 Long-Range BLE',
    category: 'sensor',
    heroImage: '/src/assets/images/sensor_climate_s1_1793636901160.jpg',
    verifiedAuthentic: true,
    certHash: '0x00bb...44f2a91901',
    manufactureDate: '2026-03-01',
    origin: 'Trondheim, Norway',
    materials: [
      'Ammonia-resistant UV-stabilized recycled polycarbonate',
      'Swiss Sensirion precision temperature/humidity MEMS chip',
      'Replaceable 2-year industrial lithium cell',
      'Sub-GHz and BLE 5.3 antenna array'
    ],
    warrantyMonths: 36,
    warrantyExpiryDate: '2029-03-01',
    co2FootprintKg: 1.4,
    recycledPercent: 82,
    careInstructions: [
      'Wipe dust from sensor grille with dry cloth monthly',
      'Keep away from high-pressure water jets',
      'Calibrate via Equora app annually'
    ],
    ownershipTimeline: [
      {
        date: '2026-03-01',
        title: 'Manufactured & Factory Calibrated',
        description: 'Calibrated to ±0.2°C and ±1.5% RH standards.',
        party: 'Sensirion & Equora'
      },
      {
        date: '2026-03-20',
        title: 'Paired to Nordlys Stables',
        description: 'Mounted at 2.2m height in Barn A Main Aisle.',
        party: 'Karin Lindqvist'
      }
    ],
    linkedHorseId: 'h-saga',
    linkedHorseName: 'Saga (Barn A)',
    purchaseDate: '2026-03-20'
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-01',
    type: 'climate',
    title: 'Barn A Climate Alert',
    description: 'Relative humidity peaked at 82% at 04:15. Consider ventilation.',
    timestamp: '2h ago',
    read: false,
    targetRoute: '/sensor'
  },
  {
    id: 'act-02',
    type: 'task',
    title: 'Task completed by Henrik',
    description: 'Paddock turnout 1 & 2 (Saga, Marquis) marked done at 08:28.',
    timestamp: '3h ago',
    read: false,
    targetRoute: '/tasks'
  },
  {
    id: 'act-03',
    type: 'sync',
    title: 'Offline synchronization completed',
    description: '3 offline task updates successfully merged with stable database.',
    timestamp: '4h ago',
    read: true,
    targetRoute: '/profile'
  },
  {
    id: 'act-04',
    type: 'team',
    title: 'Farrier visit confirmed',
    description: 'Ole Hansen confirmed arrival today at 15:30 for Marquis and Epona.',
    timestamp: '5h ago',
    read: true,
    targetRoute: '/tasks'
  },
  {
    id: 'act-05',
    type: 'product',
    title: 'Passport verified',
    description: 'Equora Thermal Air-Mesh Blanket certified authentic with cryptographic signature.',
    timestamp: '1d ago',
    read: true,
    targetRoute: '/passport/prod-thermal-pro'
  },
  {
    id: 'act-06',
    type: 'climate',
    title: 'Sensor firmware updated',
    description: 'Equora Climate S1 running latest stable firmware v2.1.4.',
    timestamp: '2d ago',
    read: true,
    targetRoute: '/sensor'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Karin Lindqvist',
    role: 'Head Stable Manager & Dressage Rider',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'active'
  },
  {
    id: 'tm-2',
    name: 'Henrik Vance',
    role: 'Head Trainer & Jumping Coach',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'in_arena'
  },
  {
    id: 'tm-3',
    name: 'Ingrid Solheim',
    role: 'Senior Barn Groom & Feeder',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    status: 'active'
  },
  {
    id: 'tm-4',
    name: 'Dr. Lars Moen',
    role: 'Equine Veterinary Consultant',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    status: 'off_duty'
  }
];
