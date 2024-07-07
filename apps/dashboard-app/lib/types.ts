export type ConnectionTypes = 'Notion' | 'OpenAI'

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  accessTokenKey?: string
  alwaysTrue?: boolean
  showModal: boolean
  formElements?: {
    label: string
    placeholder: string
    type: string
    name: string
  }[]
}
