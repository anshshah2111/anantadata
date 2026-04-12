import type { EchoState } from "@/components/EchoBlob";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ConversationBeat {
  triggerStep: number;
  echoState: EchoState;
  message: string;
  duration: number;
}

export interface GroupMember {
  id: string;
  name: string;
  tagline: string;
  color: string; // marker + leaderboard accent
  route: [number, number][]; // [lat, lng]
  beats: ConversationBeat[];
}

export interface DemoPersona {
  id: "jordan" | "kobe";
  name: string;
  tagline: string;
  description: string;
  mapCenter: [number, number]; // [lng, lat] for MapLibre
  mapZoom: number;
  stepIntervalMs: number;
  /** Solo walk mode */
  route: [number, number][]; // [lat, lng]
  conversationBeats: ConversationBeat[];
  userResponses: Record<number, string>;
  /** Group walk mode (Kobe only) */
  groupMembers?: GroupMember[];
}

/* ------------------------------------------------------------------ */
/*  Jordan — solo walk through UW campus                               */
/* ------------------------------------------------------------------ */

export const JORDAN: DemoPersona = {
  id: "jordan",
  name: "Jordan",
  tagline: "A walk alone",
  description:
    "Jordan, 29. Knowledge worker. Hasn\u2019t been outside today. Echo is the reason to put shoes on.",
  mapCenter: [-122.299, 47.655],
  mapZoom: 15,
  stepIntervalMs: 1300,
  route: [
    [47.655, -122.304],
    [47.6552, -122.3037],
    [47.6553, -122.3034],
    [47.6554, -122.3031],
    [47.6555, -122.3028],
    [47.6557, -122.3024],
    [47.6559, -122.302],
    [47.6561, -122.3015],
    [47.6563, -122.301],
    [47.6565, -122.3005],
    [47.6567, -122.3],
    [47.6569, -122.2994],
    [47.657, -122.2988],
    [47.6571, -122.2982],
    [47.657, -122.2976],
    [47.6568, -122.297],
    [47.6565, -122.2966],
    [47.6562, -122.2962],
    [47.6559, -122.2958],
    [47.6556, -122.2954],
    [47.6553, -122.295],
    [47.655, -122.2946],
    [47.6547, -122.2942],
    [47.6544, -122.2938],
    [47.6541, -122.294],
    [47.6538, -122.2944],
    [47.6535, -122.295],
    [47.6533, -122.2957],
    [47.6531, -122.2964],
    [47.653, -122.2972],
    [47.6529, -122.298],
    [47.653, -122.2988],
    [47.6532, -122.2996],
    [47.6534, -122.3003],
    [47.6537, -122.301],
    [47.654, -122.3017],
    [47.6543, -122.3023],
    [47.6546, -122.3028],
    [47.6549, -122.3033],
    [47.6551, -122.3036],
    [47.6553, -122.3035],
  ],
  conversationBeats: [
    {
      triggerStep: 0,
      echoState: "speaking",
      message: "Hey. Glad you\u2019re out here. Where are we headed today?",
      duration: 4000,
    },
    {
      triggerStep: 6,
      echoState: "speaking",
      message: "The light\u2019s nice right now. You notice that?",
      duration: 3500,
    },
    {
      triggerStep: 12,
      echoState: "speaking",
      message:
        "Oh \u2014 new street for us. What made you turn here?",
      duration: 3500,
    },
    {
      triggerStep: 17,
      echoState: "speaking",
      message:
        "The fountain\u2019s got this calm to it today. I like sitting in that for a second.",
      duration: 3800,
    },
    {
      triggerStep: 22,
      echoState: "speaking",
      message: "What\u2019s the best thing you ate today?",
      duration: 3000,
    },
    {
      triggerStep: 28,
      echoState: "speaking",
      message: "I like this route. Feels different from last time.",
      duration: 3200,
    },
    {
      triggerStep: 34,
      echoState: "speaking",
      message:
        "You walk here often, or is this the first time together?",
      duration: 3500,
    },
    {
      triggerStep: 39,
      echoState: "speaking",
      message: "Good walk. Same time tomorrow?",
      duration: 3500,
    },
  ],
  userResponses: {
    0: "Just... clearing my head, I think.",
    12: "Honestly? I don\u2019t know. My feet just went this way.",
    22: "A really good croissant from that place on the Ave.",
    34: "First time actually. Didn\u2019t expect it to feel this quiet.",
  },
};

/* ------------------------------------------------------------------ */
/*  Kobe — group exploration of Capitol Hill                           */
/* ------------------------------------------------------------------ */

// Kobe's solo route through Capitol Hill
const KOBE_ROUTE: [number, number][] = [
  [47.6300, -122.3168], // Volunteer Park entrance
  [47.6295, -122.3172],
  [47.6289, -122.3178],
  [47.6283, -122.3183],
  [47.6276, -122.3186],
  [47.6269, -122.3188], // Heading south on 15th
  [47.6262, -122.3190],
  [47.6255, -122.3192],
  [47.6248, -122.3193],
  [47.6241, -122.3193],
  [47.6234, -122.3192], // Near Group Health
  [47.6227, -122.3190],
  [47.6220, -122.3188],
  [47.6213, -122.3190],
  [47.6206, -122.3193],
  [47.6200, -122.3196], // Cal Anderson Park north
  [47.6194, -122.3198],
  [47.6188, -122.3196],
  [47.6182, -122.3192],
  [47.6177, -122.3186],
  [47.6172, -122.3180], // Cal Anderson south
  [47.6168, -122.3172],
  [47.6165, -122.3164],
  [47.6162, -122.3155],
  [47.6160, -122.3146], // Pike/Pine corridor
  [47.6158, -122.3137],
  [47.6157, -122.3128],
  [47.6158, -122.3118],
  [47.6160, -122.3108], // Near 12th Ave
  [47.6163, -122.3100],
  [47.6167, -122.3095],
];

// Priya's route — overlapping with Kobe at Cal Anderson
const PRIYA_ROUTE: [number, number][] = [
  [47.6220, -122.3230], // Broadway & John
  [47.6215, -122.3225],
  [47.6210, -122.3220],
  [47.6205, -122.3215],
  [47.6200, -122.3210], // Broadway south
  [47.6196, -122.3205],
  [47.6192, -122.3200],
  [47.6188, -122.3196], // Cal Anderson — overlaps Kobe
  [47.6184, -122.3192],
  [47.6180, -122.3188],
  [47.6176, -122.3184],
  [47.6172, -122.3180], // Cal Anderson south — overlaps Kobe
  [47.6168, -122.3176],
  [47.6164, -122.3172],
  [47.6160, -122.3168],
  [47.6156, -122.3164],
  [47.6152, -122.3160], // Toward Pike Place
  [47.6148, -122.3156],
  [47.6145, -122.3150],
  [47.6142, -122.3144],
];

// Marcus's route — overlapping at the Pike/Pine corridor
const MARCUS_ROUTE: [number, number][] = [
  [47.6190, -122.3100], // 12th & Pine
  [47.6186, -122.3108],
  [47.6182, -122.3116],
  [47.6178, -122.3124],
  [47.6174, -122.3132], // Along Pine toward Cal Anderson
  [47.6170, -122.3140],
  [47.6166, -122.3148],
  [47.6162, -122.3155], // Pike/Pine — overlaps Kobe
  [47.6158, -122.3162],
  [47.6155, -122.3170],
  [47.6152, -122.3178],
  [47.6149, -122.3186],
  [47.6146, -122.3194], // Further west
  [47.6143, -122.3202],
  [47.6140, -122.3210],
  [47.6138, -122.3218],
];

export const KOBE: DemoPersona = {
  id: "kobe",
  name: "Kobe",
  tagline: "New to Seattle",
  description:
    "Kobe, 24. Just moved to Seattle for his first job. Knows 3 people. Wants to explore the city \u2014 not like a tourist.",
  mapCenter: [-122.318, 47.622],
  mapZoom: 14,
  stepIntervalMs: 1100,
  route: KOBE_ROUTE,
  conversationBeats: [
    {
      triggerStep: 0,
      echoState: "speaking",
      message:
        "First week in Capitol Hill! Let\u2019s see what\u2019s out here.",
      duration: 3500,
    },
    {
      triggerStep: 6,
      echoState: "speaking",
      message:
        "Priya walked this block yesterday. She said the mural on 15th is worth a stop.",
      duration: 4000,
    },
    {
      triggerStep: 12,
      echoState: "speaking",
      message:
        "Hey, remind me to grab coffee beans on the way back \u2014 I\u2019ll tell you when we pass the shop.",
      duration: 3800,
    },
    {
      triggerStep: 17,
      echoState: "speaking",
      message:
        "Cal Anderson Park. Your group has walked this area 4 times already \u2014 it\u2019s glowing.",
      duration: 3800,
    },
    {
      triggerStep: 22,
      echoState: "speaking",
      message:
        "You said something worth remembering \u2014 saved it as a note.",
      duration: 3000,
    },
    {
      triggerStep: 28,
      echoState: "speaking",
      message:
        "Marcus just discovered a tile you haven\u2019t \u2014 somewhere near 12th. Want to check it out tomorrow?",
      duration: 4000,
    },
  ],
  userResponses: {
    0: "Yeah! I barely know this neighborhood.",
    12: "Oh nice, yeah save that. The good stuff on Olive Way.",
    22: "That thought about the skyline from the park \u2014 yeah, keep that.",
  },
  groupMembers: [
    {
      id: "kobe",
      name: "Kobe",
      tagline: "Just moved here",
      color: "#F4A261",
      route: KOBE_ROUTE,
      beats: [
        {
          triggerStep: 0,
          echoState: "speaking",
          message: "Kobe\u2019s out exploring Capitol Hill.",
          duration: 3000,
        },
        {
          triggerStep: 15,
          echoState: "speaking",
          message: "Kobe found Cal Anderson Park \u2014 new tiles lighting up.",
          duration: 3000,
        },
      ],
    },
    {
      id: "priya",
      name: "Priya",
      tagline: "PM at a startup",
      color: "#7B68EE",
      route: PRIYA_ROUTE,
      beats: [
        {
          triggerStep: 0,
          echoState: "speaking",
          message: "Priya\u2019s walk: Broadway down through Cal Anderson.",
          duration: 3000,
        },
        {
          triggerStep: 10,
          echoState: "speaking",
          message: "Overlap! Priya crossed Kobe\u2019s tiles at Cal Anderson \u2014 watch the color deepen.",
          duration: 3500,
        },
      ],
    },
    {
      id: "marcus",
      name: "Marcus",
      tagline: "Grad student, UW",
      color: "#00B4D8",
      route: MARCUS_ROUTE,
      beats: [
        {
          triggerStep: 0,
          echoState: "speaking",
          message: "Marcus is exploring Pike/Pine from the east side.",
          duration: 3000,
        },
        {
          triggerStep: 8,
          echoState: "speaking",
          message:
            "Triple overlap \u2014 everyone\u2019s walked through here. The heat map is glowing.",
          duration: 3500,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */

export const PERSONAS: DemoPersona[] = [JORDAN, KOBE];
