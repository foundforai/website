/**
 * Shared community CRM types. One record shape for the file store and Postgres.
 * Past versus upcoming is computed at read time and is not stored.
 */

export type HostBrand = 'foundforai' | 'fripse';

export type RegistrationStatus = 'open' | 'closed';

export type EventTiming = 'upcoming' | 'past';

export type CommunityEvent = {
  id: string;
  title: string;
  description: string;
  hostBrand: HostBrand;
  start: string;
  end: string;
  timeZone: 'America/Denver';
  venue: string | null;
  onlineUrl: string | null;
  capacity: number | null;
  registrationStatus: RegistrationStatus;
  topic: string;
  instructor: string;
  image: string | null;
  registrationUrl: string | null;
};

export type PublicEvent = CommunityEvent & {
  timing: EventTiming;
  hostLabel: 'Hosted by FoundForAI' | 'Hosted by Fripse AI';
  dateLabel: string;
  timeLabel: string;
  registeredCount: number;
  seatsRemaining: number | null;
  /** True only for a real upcoming event. Public pages use this for Event schema. */
  schemaEligible: boolean;
};

export type Contact = {
  id: string;
  email: string;
  emailNormalized: string;
  name: string;
  businessName: string | null;
  businessCategory: string | null;
  organizationId: string | null;
  sourceBrand: HostBrand;
  createdAt: string;
  updatedAt: string;
};

export type Organization = {
  id: string;
  name: string;
  category: string | null;
  sourceBrand: HostBrand;
  createdAt: string;
};

export type Registration = {
  id: string;
  contactId: string;
  eventId: string;
  learningGoals: string | null;
  sourceBrand: HostBrand;
  createdAt: string;
};

export type AttendanceStatus = 'unknown' | 'attended' | 'no_show';

export type Attendance = {
  id: string;
  registrationId: string;
  status: AttendanceStatus;
  updatedAt: string;
};

export type Interest = {
  id: string;
  contactId: string;
  kind: string;
  value: string;
  sourceBrand: HostBrand;
  createdAt: string;
};

export type PartnerStatus = 'research' | 'conversation' | 'active' | 'paused';

export type Partner = {
  id: string;
  name: string;
  organizationType: string;
  status: PartnerStatus;
  notes: string;
  sourceBrand: HostBrand;
  createdAt: string;
  updatedAt: string;
};

export type FollowUpStatus = 'none' | 'needed' | 'scheduled' | 'done';

export type FollowUp = {
  id: string;
  contactId: string;
  status: FollowUpStatus;
  note: string;
  updatedAt: string;
};

export type ConsentType = 'workshop_communication' | 'marketing' | 'hosting_contact';

export type Consent = {
  id: string;
  contactId: string;
  registrationId: string | null;
  hostingRequestId: string | null;
  type: ConsentType;
  granted: boolean;
  sourceBrand: HostBrand;
  createdAt: string;
  withdrawnAt: string | null;
  token: string;
};

export type AssessmentRequest = {
  id: string;
  contactId: string | null;
  name: string;
  email: string;
  businessName: string | null;
  notes: string;
  originatingBrand: HostBrand;
  createdAt: string;
};

export type HostingRequest = {
  id: string;
  contactId: string;
  name: string;
  email: string;
  businessName: string | null;
  message: string;
  sourceBrand: HostBrand;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  detail: string | null;
  approved: boolean;
  publishingPermission: boolean;
  sourceBrand: HostBrand;
  createdAt: string;
};

export type OpportunityKind = 'inquiry' | 'assessment';

export type OpportunityStatus = 'new' | 'qualified' | 'proposal' | 'won' | 'lost';

/** Commercial pipeline. Never created from a community registration. */
export type Opportunity = {
  id: string;
  originatingBrand: HostBrand;
  kind: OpportunityKind;
  status: OpportunityStatus;
  title: string;
  notes: string;
  contactEmail: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Feedback = {
  id: string;
  eventId: string | null;
  note: string;
  sourceBrand: HostBrand;
  createdAt: string;
};

export type Outcome = {
  id: string;
  note: string;
  sourceBrand: HostBrand;
  createdAt: string;
};

export type RateBucket = {
  key: string;
  hits: number[];
};

export type CommunityDatabase = {
  events: CommunityEvent[];
  contacts: Contact[];
  organizations: Organization[];
  registrations: Registration[];
  attendance: Attendance[];
  interests: Interest[];
  partners: Partner[];
  followUps: FollowUp[];
  consents: Consent[];
  assessmentRequests: AssessmentRequest[];
  hostingRequests: HostingRequest[];
  testimonials: Testimonial[];
  opportunities: Opportunity[];
  feedback: Feedback[];
  outcomes: Outcome[];
  rateLimits: RateBucket[];
};

export type PublicTestimonial = {
  quote: string;
  attribution: string;
  detail: string | null;
};

export function emptyDatabase(): CommunityDatabase {
  return {
    events: [],
    contacts: [],
    organizations: [],
    registrations: [],
    attendance: [],
    interests: [],
    partners: [],
    followUps: [],
    consents: [],
    assessmentRequests: [],
    hostingRequests: [],
    testimonials: [],
    opportunities: [],
    feedback: [],
    outcomes: [],
    rateLimits: [],
  };
}
