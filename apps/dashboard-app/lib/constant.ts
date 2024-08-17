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
  SproutIcon} from "lucide-react";
import { Connection } from "./types";

export const sidebarItems = [
  {
      title: "Notion Dbs",
      image: '/notion.png',
      show: true,
      subItems: [
        {
            title: "Financial",
            icon: BadgeCentIcon,
            href: "/financial"
        },
        {
            title: "Projects",
            icon: BriefcaseIcon,
            href: "/projects"
        },
        {
            title: "Planner",
            icon: NotebookIcon,
            href: "/planner"
        },
        {
            title: "Knowledge Base",
            icon: LibraryIcon,
            href: "/knowledge-base"
        },
        {
            title: "Personal Info",
            icon: BadgeCentIcon,
            href: "/personal-info"
        },
      ]

  },
  {
      title: "Workflows",
      icon: WorkflowIcon,
      href: "/workflows"
  },
  {
      title: "Connections",
      icon: BluetoothConnectedIcon,
      href: "/connections"
  },
  {
      title: 'Youtube',
      image: '/youtube.png',
      href: '/youtube'
  },
  {
      title: "OpenAI",
      image: '/openai.png',
      href: "/openai"
  },
  {
      title: "Skill Trees",
      icon: NetworkIcon,
      href: "/skill-trees"
  },
  {
      title: "Settings",
      icon: Settings,
      href: "/settings"
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
    actionType: 'Schedule',
    icon: ClockIcon,
    subActions: ['Cron' ]
  },
  {
    actionType: 'Webhook',
    icon: WebhookIcon,
    subActions: ['Internal Webhook']
  },
]

export const ACTION_TYPES:any = [
  {
    actionType: 'Webhook',
    icon: WebhookIcon,
    subActions: ['Internal Webhook']
  },
  {
    actionType: 'Notion',
    image: '/notion.png',
    subActions: ['Create Page','Update Page','Append Block', 'Delete Page']
  }
]

export const ExpenseTypes = ['Living','Saving','Growth','Delight','Others']
export const ScheduleTypes = ['Monthly','BiMonthly','Quarterly','Half Yearly','Yearly']