export type ConnectionTypes = 'Notion' | 'OpenAI' | 'Postgresql' | 'Google Drive' | 'Linkedin' | 'Youtube' | 'Twitter' |
 'Github' | 'Google Sheets' | 'Google Calendar' | 'Facebook' | 'Instagram' | 'Discord'

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
