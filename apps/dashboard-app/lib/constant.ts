import { BadgeCentIcon,  BriefcaseIcon, ClockIcon,  WebhookIcon, NetworkIcon,
  CalendarCheck2Icon,ContactIcon, FolderIcon, CodeIcon} from "lucide-react";

export const tablesInDatabase:any = {
  "Project Management":{'Projects':"projectsDb",'Epics / Features':"epicsDb", 'Tasks':"projectTasksDb", 
    'Sprints':"sprintsDb",'Bugs':"bugsDb", "People":"peopleDb"},
  "Personal Finance":{'Assets and Liabilities':"assetsDb",'Financial Transaction':"transactionsDb",
    'Budget':"budgetDb",'Funds':"fundsDb", "People":"peopleDb"},
  "Personal Productivity": {"Tasks": "tasksDb", "Scheduler": "schedulerDb", "Calendar": "calendarDb",
    "Duration Based Actions": "durationBasedActionsDb", "Time Tracking": "timeTrackingDb",
    "Weekly Focus Work Planner": "weeklyFocusWorkPlannerDb", "People":"peopleDb"},
  "Skill Development": {'Quick Capture':"quickCaptureDb",'Skill Trees':"skillTreesDb",
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

export const propertiesInDatabase: any = {
  "Personal Finance": {
    "Portfolio Value": "The total current market value of all investments, including stocks, mutual funds, bonds, and other securities.",
    "Liquid Assets": "Cash or assets that can be easily converted into cash, such as savings accounts, cash equivalents, or short-term investments.",
    "Semi-Liquid Assets": "Assets that can be converted into cash but may take some time or incur a penalty, such as fixed deposits, gold, or certain types of bonds.",
    "Long-Term Assets": "Investments or holdings meant for long-term growth, such as real estate, retirement accounts, or stocks held for extended periods.",
    "Monthly Budget Spent": "The total amount of money spent from the monthly allocated budget during a specific period.",
    "Monthly Budget Allocation": "The planned or allocated amount of money to be spent or used in a given month for expenses and savings.",
    "Yearly Budget Spent": "The total amount of money spent from the yearly allocated budget during a specific year.",
    "Yearly Budget Allocation": "The planned or allocated amount of money to be spent or used in a given year for expenses and savings.",
    "Yearly Fund Spent": "The total money utilized from designated funds for yearly goals, emergencies, or specific financial activities.",
    "Yearly Fund Allocation": "The amount of money set aside annually for specific purposes such as savings, investments, or goals.",
    "Yearly Expenses": "The total expenditures over a year, covering all categories such as essentials, leisure, and investments.",
    "Lean FIRE": "Financial independence with a frugal lifestyle, requiring lower annual expenses and a smaller portfolio.",
    "FIRE": "Financial Independence Retire Early; a state where your investments generate enough income to cover all living expenses without active work.",
    "Coast FIRE": "A financial state where you've saved enough early that your investments grow on their own to support retirement without additional contributions.",
    "Fat FIRE": "A more comfortable form of financial independence, involving a larger portfolio to sustain a higher standard of living during retirement."
  },
  "Project Management":{
    "Total Tasks": "The total number of tasks assigned to you not completed.",
    "Total Tasks in Current Sprint": "The total number of tasks not completed assigned to you in the current sprint.",
    "Total Storypoints Left": "The total number of storypoints left to complete in the current sprint.",
    "Total Bugs": "The total number of bugs assigned to you not completed.",
  },
  "Personal Productivity":{
    "Habits Todo": "The total number of habits still to do",
    "Daily Habits": "The total number of daily habits",
    "Weekly Habits": "The total number of weekly habits",
    "Tasks Todo": "The total number of tasks still to do",
    "Daily Tasks": "The total number of daily tasks",
    "Weekly Tasks": "The total number of weekly tasks",
    "Monthly Tasks": "The total number of monthly tasks",
    "Financial Obligations Todo": "The total number of financial obligations still to be marked",
    "Financial Obligations": "The total number of financial obligations",
    "Important & Urgent Tasks": "The total number of important and urgent tasks to do",
    "Not Important & Urgent Tasks": "The total number of not important and urgent tasks to do",
    "Important & Not Urgent Tasks": "The total number of important and not urgent tasks to do",
    "Not Important & Not Urgent Tasks": "The total number of not important and not urgent tasks to do"
  },
  "Social & Relationships":{
    "Total People to Talk to": "The total number of people in your social sphere who you should talk to today",
    "Total Family Members": "The total number of family members you have in your social sphere",
    "Total Lifelong Friends": "The total number of lifelong friends you have in your social sphere",
    "Total Acquaintances": "The total number of acquaintances you have in your social sphere",
    "Total Professional Relationships": "The total number of professional relationships you have in your social sphere",
    "Healthy Relationships": "The total number of healthy relationships you have in your social sphere",
    "Unhealthy Relationships": "The total number of unhealthy relationships you have in your social sphere"
  },
  "Resource Management":{
    "Groceries": "The total number of groceries you check the stock of every weekend",
    "Toiletries": "The total number of toiletries you check the stock of every weekend",
    "Wishlist Items": "The total number of wishlist items you check the stock of every weekend",
    "Pantry Items": "The total number of pantry items you check the stock of every weekend",
    "Wishlist Cost": "The total cost of the wishlist items you have in your inventory",
  },
  "Skill Development":{
    "Total Interesting Left": "The total number of interesting items left to read",
    "To Read Non Fiction Books": "The total number of non fiction books you want to read",
    "Total Non Fiction Books": "The total number of non fiction books in your list",
    "Partially Read Non Fiction Books": "The total number of non fiction books you have read partially",
    "Currently Reading Non Fiction Books": "The total number of non fiction books you are currently reading",
    "Read Non Fiction Books": "The total number of non fiction books you have read",
    "Abandoned Non Fiction Books": "The total number of non fiction books you have abandoned",
    "Total Channels Subscribed": "The total number of youtube channels you are subscribed to",
    "Total Parent Skill Trees": "The total number of skill trees you want to learn",
    "Total Mental Skill Trees": "The total number of mental skill trees you want to learn",
    "Total Life Skill Trees": "The total number of life skill trees you want to learn",
    "Total Social Skill Trees": "The total number of social skill trees you want to learn",
    "Total Extracurricular Skill Trees": "The total number of extracurricular skill trees you want to learn",
    "Total Software Skill Trees": "The total number of software skill trees you want to learn",
    "Total Business Skill Trees": "The total number of business skill trees you want to learn",
  }


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
        image: "/project-management.png",
        imageDark: "/project-management-dark.png",
        href: "/systems/project-management",
      },
      {
        title: "Personal Finance",
        image: "/personal finance.png",
        imageDark: "/personal-finance-dark.png",
        href: "/systems/personal-finance",
        tables: {'Assets and Liabilities':"assetsDb",'Financial Transaction':"transactionsDb",
          'Budget':"budgetDb",'Funds':"fundsDb"}
      },
      {
        title: "Personal Productivity",
        icon: CalendarCheck2Icon,
        href: "/systems/personal-productivity",
        tables: ['Tasks','Scheduler','Calendar','Duration Based Actions','Time Tracking',"Weekly Focus Work Planner"]
      },
      {
        title: "Skill Development",
        icon: NetworkIcon,
        href: "/systems/skill-development",
        tables: ['Quick Capture','Skill Trees (Notion Db)','Areas','Archive','Interesting','Books','Podcasts',
          'Youtube Channels','Videos'
        ]
      },
      // {
      //   title: "Resource Management",
      //   icon: StoreIcon,
      //   href: "/systems/resource-management",
      //   tables: ['Inventory']
      // },
      {
        title: "Social & Relationships",
        icon: ContactIcon,
        href: "/systems/social-relationships",
        tables: ['Social Sphere']
      },
      // {
      //   title: "Health & Fitness",
      //   icon: HeartPulseIcon,
      //   href: "/systems/health-fitness",
      //   tables: ['Status','Exercises']
      // },
      // {
      //   title: "Emotional & Mental",
      //   icon: MehIcon,
      //   href: "/systems/emotional-mental",
      //   tables: ['Journal','Mood Category','Mood Tracker']
      // },
      // {
      //   title: "Content Creation",
      //   icon: Clapperboard,
      //   href: "/content-creation"
      // },
      // {
      //   title: "Personal Goals",
      //   icon: GoalIcon,
      //   href: "/systems/personal-goals",
      //   tables: ['Goals','Rewards','Punishments']
      // },
      // {
      //   title: "Decision Making",
      //   icon: RouteIcon,
      //   href: "/systems/decision-making",
      //   tables: ['Decisions']
      // },
      // {
      //   title: "Gamification",
      //   icon: Gamepad2Icon,
      //   href: "/gamification",
      //   tables: ['Level Settings']
      // }
    ],
  },
  // {
  //   title: "Portfolio",
  //   image: "/portfolio.png",
  // },
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
      href: process.env.NEXT_PUBLIC_DOCS_URL
  }
]

export const CONNECTIONS: any = [
    {
      title: 'Notion',
      description: 'Create entries in your notion dashboard and automate tasks.',
      image: '/connections/notion.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: true
    },
    {
      title: 'OpenAI',
      description: 'Interact with openAI API',
      image: '/connections/openai.png',
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
      image: '/connections/postgres.png',
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
      title: 'Drive',
      description: 'Connect to your Google Drive',
      image: '/connections/googleDrive.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: true
    },
    {
      title: 'Youtube',
      description: 'Connect to your Youtube account',
      image: '/connections/youtube.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: true
    },
    {
      title: 'Google Calendar',
      description: 'Connect to your Google Calendar account',
      image: '/connections/calendar.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Google Sheets',
      description: 'Connect to your Google Sheets account',
      image: '/connections/sheets.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Github',
      description: 'Connect to your Github account',
      image: '/connections/github.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Gmail',
      description: 'Connect to your Gmail account',
      image: '/connections/gmail.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Discord',
      description: 'Connect to your Discord account',
      image: '/connections/discord.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Google Search',
      description: 'Connect to your Google Search account',
      image: '/connections/googleSearch.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Reddit',
      description: 'Connect to your Reddit account',
      image: '/connections/reddit.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Linkedin',
      description: 'Connect to your Linkedin account',
      image: '/connections/linkedin.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Twitter',
      description: 'Connect to your Twitter account',
      image: '/connections/twitter.png',
      accessTokenKey: 'accessToken',
      showModal: false,
      published: false
    },
    {
      title: 'Voice Monkey',
      description: 'Connect to your Voice Monkey account',
      image: '/connections/voiceMonkey.png',
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