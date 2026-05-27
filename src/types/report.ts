import type { IGDBBase } from "./base.js";

export interface Report extends IGDBBase {
  entity_type?: number;
  report_type?: number;
  source_item_id?: number;
  target_item_id?: number;
}

export interface ReportType extends IGDBBase {
  name?: string;
}
