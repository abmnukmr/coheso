// types.ts
export interface RequestField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'file';
  required: boolean;
  description?: string;
  validation?: (value: any) => boolean;
}

export interface RequestType {
  id: string;
  name: string;
  department: 'Sales' | 'Procurement' | 'Compliance' | 'HR';
  priority: 'High' | 'Medium' | 'Low';
  fields: RequestField[];
  integrationSystem?: 'Jira' | 'Other';
}
