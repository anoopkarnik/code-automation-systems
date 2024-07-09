import { LandmarkIcon, ArrowLeftRightIcon, BadgeCentIcon, BluetoothConnectedIcon, Briefcase, BriefcaseIcon, ClockIcon, Library, 
  LibraryIcon, Notebook, NotebookIcon, WebhookIcon, WorkflowIcon, FileLineChart, 
  Settings} from "lucide-react";
import { Connection } from "./types";

export const sidebarItems = [
  {
      title: "Financial",
      icon: BadgeCentIcon,
      href: "/dashboard/financial"
  },
  {
      title: "Projects",
      icon: BriefcaseIcon,
      href: "/dashboard/projects"
  },
  {
      title: "Planner",
      icon: NotebookIcon,
      href: "/dashboard/planner"
  },
  {
      title: "Knowledge Base",
      icon: LibraryIcon,
      href: "/dashboard/knowledge-base"
  },
  {
      title: "Workflows",
      icon: WorkflowIcon,
      href: "/dashboard/workflows"
  },
  {
      title: "Connections",
      icon: BluetoothConnectedIcon,
      href: "/dashboard/connections"
  }
]

export const financeItems = [
  {
    title: 'Overview',
    icon: Briefcase,
  },
  {
    title: 'Account',
    icon: LandmarkIcon,
  },
  {
    title: 'Transactions',
    icon: ArrowLeftRightIcon,
  },
  {
    title: 'Monthly Budget',
    icon: ArrowLeftRightIcon,
  },
  {
    title: 'Budget Plan',
    icon: ArrowLeftRightIcon,
  },
  {
    title: 'Financial Goals',
    icon: ArrowLeftRightIcon,
  },
  {
    title: 'settings',
    icon: Settings,
  }
]

export const CONNECTIONS: Connection[] = [
    {
      title: 'Notion',
      description: 'Create entries in your notion dashboard and automate tasks.',
      image: '/notion.png',
      accessTokenKey: 'accessToken',
      showModal: false
    },
    {
      title: 'OpenAI',
      description: 'Interact with openAI API',
      image: '/openai.png',
      accessTokenKey: 'accessToken',
      showModal: true,
      formElements: [
        {
          label: 'API Key',
          placeholder: 'Enter your OpenAI API Key',
          type: 'text',
          name: 'apiKey'
        }
      ]

    }
  ]

  export const TRIGGER_TYPES:any = [
    {
      actionType: 'Schedule',
      icon: ClockIcon,
      subActions: [
        {   
          subActionType: 'Cron',
          params: [
            {name: 'Cron Expression', type: 'text', placeholder: '0 0 * * *'},
            {name: 'Timezone', type: 'options', placeholder: 'Asia/Kolkata', options: [
              'Asia/Kolkata',
              'Asia/Tokyo',
              'America/New_York',
              'Europe/London'
            ]},
            {name: 'Start Date', type: 'text', placeholder: '2022-01-01'}
          ]
        },
      ]
    },
    {
      actionType: 'Webhook',
      icon: WebhookIcon,
      subActions: [
        {
          subActionType: 'Internal Webhook',
          params: [
            { name:'Request Url', type: 'text', placeholder: 'https://example.com/webhook'},
            { name:'Request Method', type: 'options', placeholder: 'Select Method', options: ['GET', 'POST', 'PUT', 'DELETE','PATCH']},
            { name:'Request Body', type: 'json', placeholder: 'Enter JSON data'},
            { name:'Request Headers', type: 'json', placeholder: 'Enter JSON data'}
          ]
        }
      ]
    }
  ]

  export const ACTION_TYPES:any = [
    {
      actionType: 'Webhook',
      icon: WebhookIcon,
      subActions: [
        {
          subActionType: 'Internal Webhook',
          params: [
            { name:'Request Url', type: 'text', placeholder: 'https://example.com/webhook'},
            { name:'Request Method', type: 'options', placeholder: 'POST', options: ['GET', 'POST', 'PUT', 'DELETE','PATCH']},
            { name:'Request Body', type: 'json', placeholder: 'Enter JSON data'},
            { name:'Request Headers', type: 'json', placeholder: 'Enter JSON data'}
          ]
        }
      ]
    }
  ]