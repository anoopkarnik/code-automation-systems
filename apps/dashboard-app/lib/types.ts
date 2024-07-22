export type ConnectionTypes = 'Notion' | 'OpenAI' | 'Postgresql' | 'Google Drive' | 'Linkedin' | 'Youtube' | 'Twitter' |
 'Github' | 'Google Sheets' | 'Google Calendar' | 'Facebook' | 'Instagram' | 'Discord' | 'Gmail' | 'Google Search' | 'Reddit' | 'Voice Monkey'

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  accessTokenKey?: string
  alwaysTrue?: boolean
  showModal: boolean
  published: boolean
  formElements?: {
    label: string
    placeholder: string
    type: string
    name: string
  }[]
}
