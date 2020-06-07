import { EmployeeResponse } from './employee.model';
import { ProcedureResponse } from './procedure.model';

export interface QuotesResponse {
  date: string;
  employee: EmployeeResponse;
  id?: number;
  notes: string;
  picture_after?: string;
  picture_before?: string;
  procedure: ProcedureResponse;
}
