import type { IGDBBase, IGDBImage } from "./base";

export interface Company extends IGDBBase {
  change_date?: number;
  change_date_category?: number;
  change_date_format?: number;
  changed_company_id?: number;
  company_size?: number;
  company_type_histories?: number[];
  country?: number;
  description?: string;
  developed?: number[];
  logo?: number;
  name?: string;
  parent?: number;
  published?: number[];
  slug?: string;
  start_date?: number;
  start_date_category?: number;
  start_date_format?: number;
  status?: number;
  url?: string;
  websites?: number[];
}

export interface CompanyLogo extends IGDBBase, IGDBImage {}

export interface CompanySize extends IGDBBase {
  name?: string;
}

export interface CompanyStatus extends IGDBBase {
  name?: string;
}

export interface CompanyType extends IGDBBase {
  name?: string;
}

export interface CompanyTypeHistory extends IGDBBase {
  company?: number;
  company_type?: number;
  parent_company?: number;
}

export interface CompanyWebsite extends IGDBBase {
  category?: number;
  trusted?: boolean;
  type?: number;
  url?: string;
}
