import { LandmarkIcon, ArrowLeftRightIcon, BadgeCentIcon, BluetoothConnectedIcon, Briefcase, BriefcaseIcon, ClockIcon, Library, 
  LibraryIcon, Notebook, NotebookIcon, WebhookIcon, WorkflowIcon, FileLineChart, 
  Settings,
  BookPlusIcon,
  CameraIcon,
  ArchiveIcon,
  OctagonAlertIcon,
  PodcastIcon,
  Tv2Icon,
  ClapperboardIcon,
  NetworkIcon,
  FileBarChartIcon,
  PanelsTopLeftIcon,
  ListCollapseIcon,
  CalendarCheck2Icon,
  CalendarCheckIcon,
  ColumnsIcon,
  FerrisWheelIcon,
  RouteIcon,
  ContactIcon,
  KeyRoundIcon,
  ShoppingCartIcon,
  PieChartIcon,
  GoalIcon,
  TrophyIcon,
  WormIcon,
  YoutubeIcon,
  VideoIcon,
  DatabaseIcon,
  SproutIcon,
  FolderIcon,
  StoreIcon,
  HeartPulseIcon,
  BrainIcon,
  Gamepad2Icon,
  MehIcon,
  Clapperboard,
  HomeIcon,
  Code,
  CodeIcon} from "lucide-react";
import { Connection } from "./types";
import { types } from "util";

export const tablesInDatabase:any = {
  "Project Management":{'Projects':"projectsDb",'Epics / Features':"epicsDb", 'Tasks':"projectTasksDb", 
    'Sprints':"sprintsDb",'Bugs':"bugsDb", "People":"peopleDb"},
  "Personal Finance":{'Assets and Liabilities':"assetsDb",'Financial Transaction':"transactionsDb",
    'Budget':"budgetDb",'Funds':"fundsDb", "People":"peopleDb"},
  "Personal Productivity": {"Tasks": "tasksDb", "Scheduler": "schedulerDb", "Calendar": "calendarDb",
    "Duration Based Actions": "durationBasedActionsDb", "Time Tracking": "timeTrackingDb",
    "Weekly Focus Work Planner": "weeklyFocusWorkPlannerDb", "People":"peopleDb"},
  "Knowledge & Skill Development": {'Quick Capture':"quickCaptureDb",'Skill Trees':"skillTreesDb",
    'Areas':"areasDb",'Archive':"archiveDb",'Interesting':"interestingDb",'Books':"booksDb",
    'Podcasts':"podcastsDb",'Youtube Channels':"youtubeChannelsDb",'Videos':"videosDb", "People":"peopleDb"},
  "Resource Management": {'Inventory':"inventoryDb", "People":"peopleDb"},
  "Social & Relationships": {'Social Sphere':"socialSphereDb", "People":"peopleDb"},
  "Health & Fitness": {'Status':"statusDb",'Exercises':"exercisesDb", "People":"peopleDb"},
  "Emotional & Mental": {'Journal':"journalDb",'Mood Category':"moodCategoryDb",'Mood Tracker':"moodTrackerDb",
     "People":"peopleDb"},
  "Content Creation": {"Blog": "blogDb", "People":"peopleDb"},
  "Personal Goals": { "Goals": "goalsDb", "Rewards": "rewardsDb", "Punishments": "punishmentsDb", "People":"peopleDb"},
  "Decision Making": {"Decisions": "decisionsDb", "People":"peopleDb"},
  "Gamification": {"Level Settings": "levelSettingsDb", "People":"peopleDb"}
   
}

export const sidebarStartItems = [
  {
    title: "Home",
    image: "/home.png",
    href: "/home"
  },
  {
    title: "Systems",
    image: "/systems.png",
    show: true,
    subItems: [
      {
        title: "Project Management",
        icon: BriefcaseIcon,
        href: "/project-management",
      },
      {
        title: "Personal Finance",
        icon: BadgeCentIcon,
        href: "/personal-finance",
        tables: {'Assets and Liabilities':"assetsDb",'Financial Transaction':"transactionsDb",
          'Budget':"budgetDb",'Funds':"fundsDb"}
      },
      {
        title: "Personal Productivity",
        icon: CalendarCheck2Icon,
        href: "/personal-productivity",
        tables: ['Tasks','Scheduler','Calendar','Duration Based Actions','Time Tracking',"Weekly Focus Work Planner"]
      },
      {
        title: "Knowledge & Skill Development",
        icon: NetworkIcon,
        href: "/knowledge-skill-development",
        tables: ['Quick Capture','Skill Trees (Notion Db)','Areas','Archive','Interesting','Books','Podcasts',
          'Youtube Channels','Videos'
        ]
      },
      {
        title: "Resource Management",
        icon: StoreIcon,
        href: "/resource-management",
        tables: ['Inventory']
      },
      {
        title: "Social & Relationships",
        icon: ContactIcon,
        href: "social-relationships",
        tables: ['Social Sphere']
      },
      {
        title: "Health & Fitness",
        icon: HeartPulseIcon,
        href: "/health-fitness",
        tables: ['Status','Exercises']
      },
      {
        title: "Emotional & Mental",
        icon: MehIcon,
        href: "/emotional-mental",
        tables: ['Journal','Mood Category','Mood Tracker']
      },
      {
        title: "Content Creation",
        icon: Clapperboard,
        href: "/content-creation"
      },
      {
        title: "Personal Goals",
        icon: GoalIcon,
        href: "/personal-goals",
        tables: ['Goals','Rewards','Punishments']
      },
      {
        title: "Decision Making",
        icon: RouteIcon,
        href: "/decision-making",
        tables: ['Decisions']
      },
      {
        title: "Gamification",
        icon: Gamepad2Icon,
        href: "/gamification",
        tables: ['Level Settings']
      }
    ],
  },
  {
    title: "Portfolio",
    image: "/portfolio.png",
  },
  {
      title: "Automations",
      image: "/automations.png",
      href: "/automations"
  },
  {
      title: "Connections",
      image: '/connection.png',
      href: "/connections"
  },
  // {
  //     title: 'Youtube',
  //     image: '/youtube.png',
  //     href: '/youtube'
  // },
  // {
  //     title: "OpenAI",
  //     image: '/openai.png',
  //     href: "/openai"
  // }
]

export const sidebarEndItems = [
  // {
  //     title: "Settings",
  //     icon: Settings,
  //     href: "/settings"
  // },
  {
      title: "Documentation",
      icon: FolderIcon,
      href: "/docs"
  }
]

export const skillTreeTypes = [
  {title: 'Software', icon: DatabaseIcon,},
  {title: 'Extracurricular', icon: SproutIcon},
  {title: 'Life', icon: PieChartIcon},
  {title: 'Business', icon: BriefcaseIcon},
  {title: 'Mental', icon: BadgeCentIcon},
  {title: 'Social', icon: ContactIcon},
]

export const financeItems = [
  {title: 'Overview',icon: Briefcase,},
  {title: 'Account', icon: LandmarkIcon,},
  {title: 'Transactions',icon: ArrowLeftRightIcon,},
  {title: 'Monthly Budget', icon: ArrowLeftRightIcon, },
  {title: 'Budget Plan', icon: ArrowLeftRightIcon, },
  {title: 'Financial Goals', icon: ArrowLeftRightIcon, },
  {title: 'settings',icon: Settings, }
]

export const knowledgeBaseItems = [
  {title: 'Overview',icon: FileBarChartIcon,},
  {title: 'Books', icon: BookPlusIcon,},
  {title: 'Quick Capture',icon: CameraIcon,},
  {title: 'Areas', icon: LibraryIcon, },
  {title: 'Archive', icon: ArchiveIcon, },
  {title: 'Interesting', icon: OctagonAlertIcon },
  {title: 'Podcasts', icon: PodcastIcon, },
  {title: 'Channels', icon: Tv2Icon, },
  {title: 'Videos', icon: ClapperboardIcon, },
  {title: 'Skill Trees', icon: NetworkIcon, },
  {title: 'settings',icon: Settings, }
] 

export const projectItems = [
  {title: 'Overview',icon: FileBarChartIcon,},
  {title: 'Projects', icon: PanelsTopLeftIcon,},
  {title: 'Blogs', icon: ListCollapseIcon,},
  {title: 'Place of Work', icon: LandmarkIcon,},
  {title: 'settings',icon: Settings, }
]

export const plannerItems = [
  {title: 'Overview',icon: FileBarChartIcon,},
  {title: 'Scheduler', icon: CalendarCheck2Icon,},
  {title: 'Calendar', icon: CalendarCheckIcon,},
  {title: 'Eisenhower Matrix', icon: ColumnsIcon,},
  {title: 'Actions', icon: FerrisWheelIcon,},
  {title: 'Time Tracking', icon: ClockIcon,},
  {title: 'Weekly Planner', icon: RouteIcon,},
  {title: 'settings',icon: Settings, }
]


export const personalInfoItems = [
  {title: 'Overview',icon: FileBarChartIcon,},
  {title: 'Social Sphere', icon: ContactIcon,},
  {title: 'Passwords', icon: KeyRoundIcon,},
  {title: 'Journal', icon: NotebookIcon,},
  {title: 'Inventory', icon: ShoppingCartIcon,},
  {title: 'Status', icon: PieChartIcon,},
  {title: 'Goals', icon: GoalIcon,},
  {title: 'Rewards', icon: TrophyIcon,},
  {title: 'Punishments', icon: WormIcon,},
  {title: 'settings',icon: Settings, }
]

export const CONNECTIONS: Connection[] = [
    {
      title: 'Notion',
      description: 'Create entries in your notion dashboard and automate tasks.',
      image: '/notion.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: true
    },
    {
      title: 'OpenAI',
      description: 'Interact with openAI API',
      image: '/openai.png',
      accessTokenKey: 'accessToken',
      showModal: true,
      published: true,
      formElements: [
        {
          label: 'API Key',
          placeholder: 'Enter your OpenAI API Key',
          type: 'text',
          name: 'apiKey'
        }
      ]
    },
    {
      title: 'Postgresql',
      description: 'Connect to your Postgresql database',
      image: '/postgres.png',
      showModal: true,
      published: false,
      formElements: [
        {
          label: 'Host',
          placeholder: 'Enter your Postgresql Host',
          type: 'text',
          name: 'host'
        },
        {
          label: 'Username',
          placeholder: 'Enter your Postgresql Username',
          type: 'text',
          name: 'username'
        },
        {
          label: 'Password',
          placeholder: 'Enter your Postgresql Password',
          type: 'password',
          name: 'password'
        },
        {
          label: 'Database',
          placeholder: 'Enter your Postgresql Database',
          type: 'text',
          name: 'database'
        },
        {
          label: 'Port',
          placeholder: 'Enter your Postgresql Port',
          type: 'text',
          name: 'port'
        }
      ]   
    },
    {
      title: 'Google Drive',
      description: 'Connect to your Google Drive',
      image: '/googleDrive.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Youtube',
      description: 'Connect to your Youtube account',
      image: '/youtube.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: true
    },
    {
      title: 'Google Calendar',
      description: 'Connect to your Google Calendar account',
      image: '/calendar.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Google Sheets',
      description: 'Connect to your Google Sheets account',
      image: '/sheets.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Github',
      description: 'Connect to your Github account',
      image: '/github.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Gmail',
      description: 'Connect to your Gmail account',
      image: '/gmail.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Discord',
      description: 'Connect to your Discord account',
      image: '/discord.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Google Search',
      description: 'Connect to your Google Search account',
      image: '/googleSearch.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Reddit',
      description: 'Connect to your Reddit account',
      image: '/reddit.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Linkedin',
      description: 'Connect to your Linkedin account',
      image: '/linkedin.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Twitter',
      description: 'Connect to your Twitter account',
      image: '/twitter.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Voice Monkey',
      description: 'Connect to your Voice Monkey account',
      image: '/voiceMonkey.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    }
  ]

export const TRIGGER_TYPES:any = [
  {
    name: 'Schedule',
    icon: ClockIcon,
    description: "Schedule your workflow",
    types: [
      {name:'Cron',description:"", serverType: 'nodejs'}
    ]
  },
  {
    name: 'Webhook',
    icon: WebhookIcon,
    description: "Start your workflow by a webhook",
    types: [
      {name:'Internal Webhook',description:"", serverType: 'nodejs'}
    ]
  },
]

export const ACTION_TYPES:any = [
  {
    name: 'Webhook',
    icon: WebhookIcon,
    description: "Run the Webhook Actions",
    types: [
      {name:'Internal Webhook',description:"", serverType: 'nodejs'}
    ]
  },
  {
    name: 'Notion',
    image: '/notion.png',
    description: "Notion Commands",
    types: [
      {name:'Create Page',description:"Create a New Notion Page", serverType: 'nodejs'},
      {name:'Update Page',description:"Update an Existing Notion Page", serverType: 'nodejs'},
      {name:'Append Block', description:"Append a block to a Notion Page", serverType: 'nodejs'},
      {name:'Delete Page', description: "Delete a Notion Page", serverType: 'nodejs'},
      {name:'Notion Python Code',description:"Run Python Notion API", serverType: 'flask'}
    ]
  },
  {
    name: 'Code',
    icon: CodeIcon,
    description: "Run this Code",
    types:[
      {name:'Javascript Code',description:"Run the javascript code", serverType: 'nodejs'},
      {name:'Python Code',description:"Run the python code", serverType: 'flask'}
    ]
  }
]

export const ExpenseTypes = ['Living','Saving','Growth','Delight','Others']
export const ScheduleTypes = ['Monthly','BiMonthly','Quarterly','Half Yearly','Yearly']