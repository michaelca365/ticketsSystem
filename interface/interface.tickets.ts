export type createTicket = {
  issue_description: string;
  technician_id: string | undefined;
  estimated_days: number;
  owner_name: string;
};

export type updateTicket = {
  id: string;
  issue_description: string | undefined;
  technician_id: string | undefined;
  estimated_days: number | undefined;
  owner_name: string | undefined;
  state: boolean | undefined;
};

export type updateEndTicket = {
  ticket_id: string;
  fixed: boolean;
  technician_notes: string;
};

export type filterTickets = {
  from: string | undefined;
  to: string | undefined;
  technician_id: string | undefined;
  creatorId: string | undefined;
  ticket_id: string | undefined;
};
