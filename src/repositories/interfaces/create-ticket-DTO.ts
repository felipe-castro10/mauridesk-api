export interface CreateTicketDTO {
  title: string
  description: string
  category_id: string
  department: string
  priority: string
  creator_id: string
  branch_id: string
  dynamic_responses?: Record<string,any>
}
